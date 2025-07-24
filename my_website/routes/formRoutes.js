const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/send-form', async (req, res) => {
  const { firstName, lastName, email, phone, comment } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: email,
      to: 'Info@Billfify.com',
      subject: '📬 New Form Submission from Billfify',
      html: `
        <h3>Customer Info</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Comment:</strong> ${comment}</p>
      `
    });

    res.json({ message: '✅ Form submitted and email sent!' });
  } catch (err) {
    res.status(500).json({ message: '❌ Failed to send email', error: err.message });
  }
});

module.exports = router;

