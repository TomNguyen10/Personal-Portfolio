// api/sendEmail.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    try {
      const response = await fetch("https://api.resend.io/v1/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`, // Securely store API key in environment variables
        },
        body: JSON.stringify({
          to: "dungnguyen_2025@depauw.edu",
          subject: `Contact Form Submission from ${name}`,
          text: `Message from ${name} (${email}):\n\n${message}`,
        }),
      });

      if (response.ok) {
        res.status(200).json({ message: "Message sent successfully!" });
      } else {
        const result = await response.json();
        res.status(response.status).json({ error: result.error.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
