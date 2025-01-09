import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      VITE_APPWRITE_PROJECT_ID: JSON.stringify(process.env.VITE_APPWRITE_PROJECT_ID),
      VITE_APPWRITE_ENDPOINT: JSON.stringify(process.env.VITE_APPWRITE_ENDPOINT),
      VITE_SMTP_HOST: JSON.stringify(process.env.VITE_SMTP_HOST),
      VITE_SMTP_PORT: JSON.stringify(process.env.VITE_SMTP_PORT),
      VITE_SMTP_USER: JSON.stringify(process.env.VITE_SMTP_USER),
      VITE_SMTP_PASS: JSON.stringify(process.env.VITE_SMTP_PASS),
      VITE_TWILIO_ACCOUNT_SID: JSON.stringify(process.env.VITE_TWILIO_ACCOUNT_SID),
      VITE_TWILIO_AUTH_TOKEN: JSON.stringify(process.env.VITE_TWILIO_AUTH_TOKEN),
      VITE_TWILIO_WHATSAPP_NUMBER: JSON.stringify(process.env.VITE_TWILIO_WHATSAPP_NUMBER),
    },
  },
})
