import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return NextResponse.json({ error: "Missing env vars" }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Paris Invitation" <${user}>`,
      to: user,
      subject: "🇫🇷 Ji pasakė OUI!",
      text: "Kas nors paspaudė ❤️ OUI tavo Paryžiaus kvietimo puslapyje!\n\nLaikas ruoštis kelionei! 🥂\n\noui-pas-non.vercel.app",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
