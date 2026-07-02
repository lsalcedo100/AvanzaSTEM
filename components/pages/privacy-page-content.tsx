"use client"

import { useLanguage } from "@/components/providers/language-provider"
import type { Language } from "@/i18n/translations"

const EMAIL = "liam@avanzastem.org"

const privacyCopy: Record<Language, {
  eyebrow: string
  title: string
  updated: string
  sections: Array<{
    title: string
    paragraphs?: string[]
    bullets?: Array<{ label?: string; text: string }>
  }>
  deletionSubject: string
}> = {
  en: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    updated: "Last updated: June 7, 2026",
    deletionSubject: "Data deletion request",
    sections: [
      {
        title: "Who we are",
        paragraphs: [
          "Avanza STEM is a free educational program that runs STEM workshops for young students, with a focus on Hispanic communities in New Jersey. This site is operated by Liam Salcedo. If you have questions about this policy, email us at {email}.",
        ],
      },
      {
        title: "What we collect",
        paragraphs: [
          "We only collect information you give us directly. We do not collect anything automatically beyond basic, anonymous site analytics.",
          "We do not collect payment information, government IDs, or any sensitive personal data. We do not use tracking cookies or third-party ad networks.",
          "To reduce spam and abuse, our forms also use a hidden anti-spam field and temporary per-IP rate limiting. This abuse-prevention data is not added to newsletter or contact submissions.",
        ],
        bullets: [
          { label: "Newsletter sign-ups:", text: "If you subscribe to our newsletter, we collect the parent, guardian, or teacher email address you provide. You can unsubscribe at any time by emailing us." },
          { label: "Contact and hosting inquiries:", text: "If you fill out our contact or host-a-workshop form, we collect your name, email address, venue or organization name, and the message you write. This information is used only to respond to your inquiry." },
          { label: "Basic site analytics:", text: "Vercel Analytics is active on this site and collects aggregated, anonymous data such as page views and country-level location. No personally identifiable information is collected through analytics." },
        ],
      },
      {
        title: "How we use your information",
        bullets: [
          { text: "To reply to messages or hosting inquiries you send us." },
          { text: "To send you Avanza STEM updates if you signed up for the newsletter." },
          { text: "To understand how the site is used so we can improve it, using anonymous analytics only." },
        ],
        paragraphs: ["We do not sell, rent, or share your personal information with third parties for marketing purposes, ever."],
      },
      {
        title: "How we store your information",
        paragraphs: [
          "Form submissions are delivered to us by Resend, a transactional email service. Your information is transmitted securely and is not stored on our servers beyond what Resend retains for email delivery logs.",
          "This site is hosted on Vercel. You can review Vercel's privacy practices at vercel.com/legal/privacy-policy.",
        ],
      },
      {
        title: "Children's privacy",
        paragraphs: ["Avanza STEM serves students as young as grade 2. We do not knowingly collect personal information from children under 13 without parental involvement. Our forms are intended to be filled out by parents, guardians, teachers, or venue staff, not students themselves. If you believe a child has submitted personal information without parental consent, please contact us and we will delete it promptly."],
      },
      {
        title: "Your rights and data deletion",
        paragraphs: ["You can request that we delete any personal information we hold about you at any time. To do so, email us at {email} with the subject line \"Data deletion request\"."],
      },
      {
        title: "Changes to this policy",
        paragraphs: ["If we make significant changes to this policy, we will update the \"Last updated\" date at the top of this page. We encourage you to review this page periodically."],
      },
      {
        title: "Contact",
        paragraphs: ["For any privacy-related questions or requests, contact us at {email}."],
      },
    ],
  },
  es: {
    eyebrow: "Legal",
    title: "Politica de privacidad",
    updated: "Ultima actualizacion: 7 de junio de 2026",
    deletionSubject: "Solicitud de eliminacion de datos",
    sections: [
      {
        title: "Quienes somos",
        paragraphs: [
          "Avanza STEM es un programa educativo gratuito que ofrece talleres STEM para estudiantes jovenes, con un enfoque en comunidades hispanas de Nueva Jersey. Este sitio es operado por Liam Salcedo. Si tienes preguntas sobre esta politica, escribenos a {email}.",
        ],
      },
      {
        title: "Que recopilamos",
        paragraphs: [
          "Solo recopilamos la informacion que nos das directamente. No recopilamos nada automaticamente mas alla de analiticas basicas y anonimas del sitio.",
          "No recopilamos informacion de pago, identificaciones oficiales ni datos personales sensibles. No usamos cookies de seguimiento ni redes de publicidad de terceros.",
          "Para reducir spam y abuso, nuestros formularios tambien usan un campo oculto antispam y limites temporales por direccion IP. Estos datos de prevencion de abuso no se agregan a las suscripciones ni a los mensajes de contacto.",
        ],
        bullets: [
          { label: "Suscripciones al boletin:", text: "Si te suscribes a nuestro boletin, recopilamos el correo electronico del padre, madre, tutor o docente que nos proporciones. Puedes cancelar la suscripcion en cualquier momento escribiendonos." },
          { label: "Mensajes de contacto y solicitudes para hospedar talleres:", text: "Si completas nuestro formulario de contacto o de hospedaje, recopilamos tu nombre, correo electronico, nombre del espacio u organizacion y el mensaje que escribes. Usamos esa informacion solo para responder a tu solicitud." },
          { label: "Analiticas basicas del sitio:", text: "Vercel Analytics esta activo en este sitio y recopila datos agregados y anonimos, como vistas de pagina y ubicacion a nivel de pais. Las analiticas no recopilan informacion que te identifique personalmente." },
        ],
      },
      {
        title: "Como usamos tu informacion",
        bullets: [
          { text: "Para responder a los mensajes o solicitudes de hospedaje que nos envies." },
          { text: "Para enviarte novedades de Avanza STEM si te registraste al boletin." },
          { text: "Para entender como se usa el sitio y poder mejorarlo, usando solo analiticas anonimas." },
        ],
        paragraphs: ["Nunca vendemos, alquilamos ni compartimos tu informacion personal con terceros para fines de marketing."],
      },
      {
        title: "Como guardamos tu informacion",
        paragraphs: [
          "Los formularios se nos entregan por medio de Resend, un servicio de correo transaccional. Tu informacion se transmite de forma segura y no se almacena en nuestros servidores mas alla de lo que Resend conserva en registros de entrega de correo.",
          "Este sitio esta alojado en Vercel. Puedes revisar las practicas de privacidad de Vercel en vercel.com/legal/privacy-policy.",
        ],
      },
      {
        title: "Privacidad de menores",
        paragraphs: ["Avanza STEM atiende a estudiantes desde segundo grado. No recopilamos intencionalmente informacion personal de menores de 13 anos sin participacion de un padre, madre o tutor. Nuestros formularios estan pensados para padres, tutores, docentes o personal de sedes, no para que los completen estudiantes por su cuenta. Si crees que un menor envio informacion personal sin consentimiento familiar, contactanos y la eliminaremos de inmediato."],
      },
      {
        title: "Tus derechos y eliminacion de datos",
        paragraphs: ["Puedes pedirnos que eliminemos cualquier informacion personal que tengamos sobre ti en cualquier momento. Para hacerlo, escribenos a {email} con el asunto \"Solicitud de eliminacion de datos\"."],
      },
      {
        title: "Cambios a esta politica",
        paragraphs: ["Si hacemos cambios importantes a esta politica, actualizaremos la fecha de \"Ultima actualizacion\" al inicio de esta pagina. Te recomendamos revisar esta pagina periodicamente."],
      },
      {
        title: "Contacto",
        paragraphs: ["Para cualquier pregunta o solicitud relacionada con privacidad, contactanos en {email}."],
      },
    ],
  },
  zh: {
    eyebrow: "法律信息",
    title: "隐私政策",
    updated: "最后更新：2026 年 6 月 7 日",
    deletionSubject: "数据删除请求",
    sections: [
      {
        title: "我们是谁",
        paragraphs: [
          "Avanza STEM 是一个免费的教育项目，为低龄学生举办 STEM 工作坊，并特别关注新泽西州的西班牙裔社区。本网站由 Liam Salcedo 运营。如果你对本政策有疑问，请发送邮件至 {email}。",
        ],
      },
      {
        title: "我们收集什么",
        paragraphs: [
          "我们只收集你主动提供给我们的信息。除基本、匿名的网站分析数据外，我们不会自动收集其他信息。",
          "我们不收集付款信息、政府身份证件或任何敏感个人数据。我们不使用跟踪 Cookie，也不使用第三方广告网络。",
          "为了减少垃圾信息和滥用行为，我们的表单还使用隐藏的反垃圾字段，并临时按 IP 限制提交频率。这些防滥用数据不会加入 newsletter 或联系表单提交内容中。",
        ],
        bullets: [
          { label: "邮件订阅：", text: "如果你订阅我们的更新，我们会收集你提供的家长、监护人或老师邮箱地址。你可以随时给我们发邮件取消订阅。" },
          { label: "联系与举办工作坊咨询：", text: "如果你填写联系表单或举办工作坊表单，我们会收集你的姓名、邮箱地址、场地或组织名称，以及你写下的信息。这些信息只用于回复你的咨询。" },
          { label: "基本网站分析：", text: "本网站启用了 Vercel Analytics，会收集汇总、匿名的数据，例如页面浏览量和国家层级的位置。分析工具不会收集可识别个人身份的信息。" },
        ],
      },
      {
        title: "我们如何使用你的信息",
        bullets: [
          { text: "回复你发送给我们的消息或举办工作坊咨询。" },
          { text: "如果你订阅了更新，向你发送 Avanza STEM 的消息。" },
          { text: "了解网站使用情况，以便改进网站；这一部分只使用匿名分析数据。" },
        ],
        paragraphs: ["我们绝不会为了营销目的出售、出租或与第三方共享你的个人信息。"],
      },
      {
        title: "我们如何保存你的信息",
        paragraphs: [
          "表单提交会通过交易邮件服务 Resend 发送给我们。你的信息会被安全传输，除了 Resend 为邮件发送日志保留的内容外，不会存储在我们的服务器上。",
          "本网站托管在 Vercel。你可以在 vercel.com/legal/privacy-policy 查看 Vercel 的隐私做法。",
        ],
      },
      {
        title: "儿童隐私",
        paragraphs: ["Avanza STEM 服务的学生年龄可低至二年级。未经家长或监护人参与，我们不会有意收集 13 岁以下儿童的个人信息。我们的表单面向家长、监护人、老师或场地工作人员，而不是学生本人。如果你认为有儿童在没有家长同意的情况下提交了个人信息，请联系我们，我们会及时删除。"],
      },
      {
        title: "你的权利与数据删除",
        paragraphs: ["你可以随时要求我们删除我们持有的关于你的个人信息。请发送邮件至 {email}，主题写明“数据删除请求”。"],
      },
      {
        title: "本政策的变更",
        paragraphs: ["如果我们对本政策做出重要更改，会更新页面顶部的“最后更新”日期。我们建议你定期查看本页面。"],
      },
      {
        title: "联系我们",
        paragraphs: ["如有任何隐私相关问题或请求，请通过 {email} 联系我们。"],
      },
    ],
  },
}

function paragraphWithEmail(text: string) {
  const parts = text.split("{email}")
  if (parts.length === 1) return text
  return (
    <>
      {parts[0]}
      <a
        href={`mailto:${EMAIL}`}
        className="text-avanza-green transition-colors hover:text-avanza-teal"
      >
        {EMAIL}
      </a>
      {parts.slice(1).join(EMAIL)}
    </>
  )
}

export function PrivacyPageContent() {
  const { language } = useLanguage()
  const copy = privacyCopy[language]

  return (
    <div className="bg-background py-20">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm font-bold uppercase tracking-widest text-avanza-green">
          {copy.eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-foreground md:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">{copy.updated}</p>

        <div className="mt-12 space-y-10 text-base leading-relaxed text-foreground">
          {copy.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-muted-foreground">
                  {paragraphWithEmail(paragraph)}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                  {section.bullets.map((bullet) => (
                    <li key={`${bullet.label ?? ""}${bullet.text}`}>
                      {bullet.label ? <strong className="text-foreground">{bullet.label}</strong> : null}{" "}
                      {bullet.text}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
