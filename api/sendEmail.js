const Resend = require("resend");
const { RESEND_API_KEY } = process.env;

const resend = new Resend(RESEND_API_KEY);

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { name, email, message } = req.body;
    console.log("Form Data:", { name, email, message });

    try {
      await resend.emails.send({
        from: "dungnguyen_2025@depauw.edu",
        to: "dungnguyen_2025@depauw.edu",
        subject: `New contact form submission from ${name}`,
        text: `You have received a new message from ${name} (${email}):\n\n${message}`,
      });

      console.log("Email sent successfully");
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Failed to send email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
