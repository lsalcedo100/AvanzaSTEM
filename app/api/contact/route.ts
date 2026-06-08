import { NextResponse } from "next/server"
import { checkRateLimit, getClientIp, isHoneypotFilled } from "../_utils/form-safety"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DEFAULT_RECIPIENT_EMAIL = "liam@avanzastem.org"
// Launch note: contact@avanzastem.org and newsletter@avanzastem.org must be verified in Resend DNS before launch.
const DEFAULT_FROM_EMAIL = "Avanza STEM <contact@avanzastem.org>"
const RESEND_API_URL = "https://api.resend.com/emails"
const RESEND_USER_AGENT = "avanza-stem-contact/1.0"
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const MAX_NAME_LENGTH = 100
const MAX_EMAIL_LENGTH = 254
const MAX_VENUE_LENGTH = 140
const MAX_MESSAGE_LENGTH = 2000

function genericError(status = 400) {
  return NextResponse.json({ code: "request_failed" }, { status })
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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function buildTextEmail(name: string, email: string, venue: string, message: string, submittedAt: string) {
  return [
    "New Avanza STEM hosting inquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Venue: ${venue}`,
    "",
    `Message:\n${message}`,
    "",
    `Source: host-page-contact`,
    `Page: /host`,
    `Submitted at: ${submittedAt}`,
  ].join("\n")
}

function buildHtmlEmail(name: string, email: string, venue: string, message: string, submittedAt: string) {
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeVenue = escapeHtml(venue)
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br>")
  const safeSubmittedAt = escapeHtml(submittedAt)

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
      <h1 style="font-size:20px;margin:0 0 16px">New Avanza STEM hosting inquiry</h1>
      <p style="margin:0 0 8px"><strong>Name:</strong> ${safeName}</p>
      <p style="margin:0 0 8px"><strong>Email:</strong> ${safeEmail}</p>
      <p style="margin:0 0 8px"><strong>Venue:</strong> ${safeVenue}</p>
      <p style="margin:0 0 4px"><strong>Message:</strong></p>
      <p style="margin:0 0 16px;white-space:pre-wrap">${safeMessage}</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0">
      <p style="margin:0 0 4px;font-size:12px;color:#6b7280"><strong>Source:</strong> host-page-contact</p>
      <p style="margin:0;font-size:12px;color:#6b7280"><strong>Submitted at:</strong> ${safeSubmittedAt}</p>
    </div>
  `.trim()
}

export async function POST(request: Request) {
  let name: string, email: string, venue: string, message: string, website: string

  try {
    const contentType = request.headers.get("content-type")?.toLowerCase() ?? ""
    if (contentType.includes("application/json")) {
      const payload = (await request.json()) as Record<string, unknown>
      name = typeof payload.name === "string" ? payload.name.trim() : ""
      email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : ""
      venue = typeof payload.venue === "string" ? payload.venue.trim() : ""
      message = typeof payload.message === "string" ? payload.message.trim() : ""
      website = typeof payload.website === "string" ? payload.website : ""
    } else {
      const formData = await request.formData()
      name = (formData.get("name") as string | null)?.trim() ?? ""
      email = (formData.get("email") as string | null)?.trim().toLowerCase() ?? ""
      venue = (formData.get("venue") as string | null)?.trim() ?? ""
      message = (formData.get("message") as string | null)?.trim() ?? ""
      website = (formData.get("website") as string | null) ?? ""
    }
  } catch {
    return NextResponse.json({ code: "invalid_payload" }, { status: 400 })
  }

  if (isHoneypotFilled(website)) {
    return genericError()
  }

  const clientIp = getClientIp(request)
  const rateLimit = checkRateLimit({
    key: `contact:${clientIp}`,
    limit: RATE_LIMIT_MAX_REQUESTS,
    windowMs: RATE_LIMIT_WINDOW_MS,
  })

  if (!rateLimit.allowed) {
    return genericError(429)
  }

  const errors: Record<string, string> = {}
  if (!name) errors.name = "Name is required."
  if (name.length > MAX_NAME_LENGTH) {
    errors.name = `Name must be ${MAX_NAME_LENGTH} characters or fewer.`
  }
  if (!email) {
    errors.email = "Email is required."
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address."
  } else if (email.length > MAX_EMAIL_LENGTH) {
    errors.email = `Email must be ${MAX_EMAIL_LENGTH} characters or fewer.`
  }
  if (!venue) errors.venue = "Venue or organization name is required."
  if (venue.length > MAX_VENUE_LENGTH) {
    errors.venue = `Venue or organization must be ${MAX_VENUE_LENGTH} characters or fewer.`
  }
  if (!message) errors.message = "Message is required."
  if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ code: "validation_error", errors }, { status: 400 })
  }

  const recipientEmail =
    process.env.CONTACT_RECIPIENT_EMAIL?.trim() || DEFAULT_RECIPIENT_EMAIL
  const resendApiKey = process.env.RESEND_API_KEY?.trim()
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL

  if (!resendApiKey) {
    console.error("Contact email provider is not configured.", { fromEmail })
    return NextResponse.json({ code: "provider_not_configured" }, { status: 500 })
  }

  const submittedAt = new Date().toISOString()
  const body = {
    from: fromEmail,
    to: [recipientEmail],
    reply_to: email,
    subject: `New hosting inquiry from ${name}`,
    text: buildTextEmail(name, email, venue, message, submittedAt),
    html: buildHtmlEmail(name, email, venue, message, submittedAt),
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
      console.error("Contact email provider returned a non-OK status.", {
        status: response.status,
        data,
      })

      if (isSenderDomainSetupError(response.status, data)) {
        return NextResponse.json({ code: "sender_domain_not_verified" }, { status: 502 })
      }

      return NextResponse.json({ code: "upstream_error" }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Contact form submission failed.", error)
    return NextResponse.json({ code: "request_failed" }, { status: 502 })
  }
}
