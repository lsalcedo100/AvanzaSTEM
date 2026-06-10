import { NextResponse } from "next/server"
import { isHoneypotFilled } from "../_utils/form-safety"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DEFAULT_RECIPIENT_EMAIL = "liam@avanzastem.org"
// Launch note: newsletter@avanzastem.org and contact@avanzastem.org must be verified in Resend DNS before launch.
const DEFAULT_FROM_EMAIL = "Avanza STEM <newsletter@avanzastem.org>"
const RESEND_API_URL = "https://api.resend.com/emails"
const RESEND_USER_AGENT = "avanza-stem-newsletter/1.0"
const MAX_EMAIL_LENGTH = 254

function redirectToBlog(request: Request, result: string) {
  const url = new URL("/blog", request.url)
  url.searchParams.set("newsletter", result)
  return NextResponse.redirect(url, { status: 303 })
}

function isSenderDomainSetupError(status: number, data: { message?: string; name?: string } | null) {
  const message = data?.message?.toLowerCase() ?? ""

  return (
    status === 403 &&
    data?.name === "validation_error" &&
    (message.includes("verify a domain") ||
      message.includes("domain is not verified") ||
      message.includes("domain not verified"))
  )
}

function jsonOrRedirect(
  request: Request,
  expectsJson: boolean,
  body: Record<string, unknown>,
  init?: ResponseInit,
) {
  if (expectsJson) {
    return NextResponse.json(body, init)
  }

  const result =
    typeof body.ok === "boolean" && body.ok
      ? "success"
      : typeof body.code === "string"
        ? body.code
        : "request_failed"

  return redirectToBlog(request, result)
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function buildTextEmail(email: string, submittedAt: string) {
  return [
    "New Avanza STEM newsletter signup",
    "",
    `Email: ${email}`,
    "Source: blog-newsletter",
    "Page: /blog",
    `Submitted at: ${submittedAt}`,
  ].join("\n")
}

function buildHtmlEmail(email: string, submittedAt: string) {
  const safeEmail = escapeHtml(email)
  const safeSubmittedAt = escapeHtml(submittedAt)

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
      <h1 style="font-size:20px;margin:0 0 16px">New Avanza STEM newsletter signup</h1>
      <p style="margin:0 0 8px"><strong>Email:</strong> ${safeEmail}</p>
      <p style="margin:0 0 8px"><strong>Source:</strong> blog-newsletter</p>
      <p style="margin:0 0 8px"><strong>Page:</strong> /blog</p>
      <p style="margin:0"><strong>Submitted at:</strong> ${safeSubmittedAt}</p>
    </div>
  `.trim()
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? ""
  const expectsJson = contentType.includes("application/json")
  let rawEmail: unknown
  let website: unknown

  try {
    if (expectsJson) {
      const payload = (await request.json()) as { email?: unknown; website?: unknown }
      rawEmail = payload.email
      website = payload.website
    } else {
      const formData = await request.formData()
      rawEmail = formData.get("email")
      website = formData.get("website")
    }
  } catch {
    return jsonOrRedirect(
      request,
      expectsJson,
      { code: "invalid_payload" },
      { status: 400 },
    )
  }

  const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : ""

  if (isHoneypotFilled(website)) {
    return jsonOrRedirect(
      request,
      expectsJson,
      { code: "request_failed" },
      { status: 400 },
    )
  }

  if (!EMAIL_PATTERN.test(email) || email.length > MAX_EMAIL_LENGTH) {
    return jsonOrRedirect(
      request,
      expectsJson,
      { code: "invalid_email" },
      { status: 400 },
    )
  }

  const recipientEmail =
    process.env.NEWSLETTER_RECIPIENT_EMAIL?.trim() || DEFAULT_RECIPIENT_EMAIL
  const resendApiKey = process.env.RESEND_API_KEY?.trim()
  const fromEmail =
    process.env.NEWSLETTER_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL

  if (!resendApiKey) {
    console.error("Newsletter provider is not configured.", {
      hasResendApiKey: Boolean(resendApiKey),
      fromEmail,
    })
    return jsonOrRedirect(
      request,
      expectsJson,
      { code: "provider_not_configured" },
      { status: 500 },
    )
  }

  const submittedAt = new Date().toISOString()
  const body = {
    from: fromEmail,
    to: [recipientEmail],
    subject: "New Avanza STEM newsletter signup",
    text: buildTextEmail(email, submittedAt),
    html: buildHtmlEmail(email, submittedAt),
  }

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
        "User-Agent": RESEND_USER_AGENT,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    })

    const data = (await response.json().catch(() => null)) as
      | { message?: string; name?: string }
      | null

    if (!response.ok) {
      console.error("Newsletter provider returned a non-OK status.", {
        status: response.status,
        data,
      })

      if (isSenderDomainSetupError(response.status, data)) {
        return jsonOrRedirect(
          request,
          expectsJson,
          { code: "sender_domain_not_verified" },
          { status: 502 },
        )
      }

      return jsonOrRedirect(
        request,
        expectsJson,
        { code: "upstream_error" },
        { status: 502 },
      )
    }

    return jsonOrRedirect(request, expectsJson, { ok: true })
  } catch (error) {
    console.error("Newsletter signup request failed.", error)
    return jsonOrRedirect(
      request,
      expectsJson,
      { code: "request_failed" },
      { status: 502 },
    )
  }
}
