import nodemailer from 'nodemailer';
import twilio from 'twilio';

// Configurar o transporter do nodemailer para Gmail
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true para porta 465, false para outras portas
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Configurar o cliente do Twilio
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER;

export const sendEmail = async (to: string, subject: string, content: string) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html: content,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const sendWhatsApp = async (to: string, message: string) => {
  try {
    // Formatar o número para o formato do WhatsApp
    const formattedNumber = to.startsWith('+') ? to : `+55${to.replace(/\D/g, '')}`;

    await twilioClient.messages.create({
      body: message,
      from: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${formattedNumber}`,
    });
  } catch (error) {
    console.error('Error sending WhatsApp:', error);
    throw error;
  }
};
