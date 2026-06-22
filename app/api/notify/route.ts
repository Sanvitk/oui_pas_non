import { NextResponse } from "next/server";

export async function POST() {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.GMAIL_USER;

  if (!apiKey || !toEmail) {
    return NextResponse.json({ error: "Missing env vars" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Paris Invitation <onboarding@resend.dev>",
        to: [toEmail],
        subject: "Ji pasake OUI!",
        text: "Kas nors paspaudė OUI tavo Paryžiaus kvietimo puslapyje!\n\nLaikas ruoštis kelionei!\n\nhttps://oui-pas-non.vercel.app",
      }),
    });

    const data = await res.json();
    if (!res.ok) return NextResponse.json({ error: data }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
