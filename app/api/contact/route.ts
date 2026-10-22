import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, program, message } = body;

    // Primary: Direct email delivery via FormSubmit AJAX
    const formSubmitResponse = await fetch("https://formsubmit.co/ajax/lsrnutrition@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Referer": "https://lsrnutritionclub.com",
        "Origin": "https://lsrnutritionclub.com"
      },
      body: JSON.stringify({
        _subject: `New LSR Nutrition Club Enquiry from ${name}`,
        _template: "table",
        Name: name,
        Phone: phone || "Not provided",
        Email: email,
        "Selected Programs": program || "General Enquiry",
        Message: message || "No message"
      })
    });

    const data = await formSubmitResponse.json();

    // Fallback/Secondary: Web3Forms if access key is set in environment
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_ACCESS_KEY;
    if (accessKey && accessKey !== "YOUR_ACCESS_KEY_HERE") {
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New LSR Nutrition Club Enquiry from ${name}`,
          from_name: "LSR Nutrition Club Website",
          name,
          phone,
          email,
          program,
          message
        })
      }).catch(() => {});
    }

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to send email enquiry" }, { status: 500 });
  }
}
