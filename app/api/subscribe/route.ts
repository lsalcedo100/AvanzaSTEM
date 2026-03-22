import { NextResponse } from "next/server"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DEFAULT_RECIPIENT_EMAIL = "liam@avanzastem.org"

export async function POST(request: Request) {
  let payload: { email?: unknown }

  try {
    payload = (await request.json()) as { email?: unknown }
  } catch {
    return NextResponse.json({ code: "invalid_payload" }, { status: 400 })
  }

  const email =
    typeof payload.email === "string" ? payload.email.trim().toLowerCase() : ""

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ code: "invalid_email" }, { status: 400 })
  }

  const recipientEmail =
    process.env.NEWSLETTER_RECIPIENT_EMAIL?.trim() || DEFAULT_RECIPIENT_EMAIL
  const formEndpoint =
    process.env.NEWSLETTER_FORMSUBMIT_ENDPOINT?.trim() ||
    `https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`

  const submittedAt = new Date().toISOString()
  const body = new URLSearchParams({
    email,
    source: "blog-newsletter",
    page: "/blog",
    submittedAt,
    _subject: "New Avanza STEM newsletter signup",
    _template: "table",
  })

  try {
    const response = await fetch(formEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      cache: "no-store",
    })

    if (!response.ok) {
      console.error("Newsletter provider returned a non-OK status.", {
        status: response.status,
      })
      return NextResponse.json({ code: "upstream_error" }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Newsletter signup request failed.", error)
    return NextResponse.json({ code: "request_failed" }, { status: 502 })
  }
}
