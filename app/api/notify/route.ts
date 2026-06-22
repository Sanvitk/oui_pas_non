import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return NextResponse.json({ error: "Missing env vars" }, { status: 500 });
  }

  try {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.default.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Paris Invitation" <${user}>`,
      to: user,
      subject: "Ji pasake OUI!",
      text: "Kas nors paspaudė OUI tavo Paryžiaus kvietimo puslapyje!\n\nLaikas ruoštis kelionei!\n\nhttps://oui-pas-non.vercel.app",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
