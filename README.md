# 🏋️‍♂️ PulseStudio

PulseStudio is a modern full-stack web application designed for a fitness studio, featuring user authentication, interactive class scheduling with date/time selection, and secure payment processing via Stripe.

---

## 🚀 Key Features

- **User Authentication:** Secure sign-in and sign-up powered by **Better Auth** with session cookie management.
- **Class Booking System:** Interactive class catalog with custom date and time slot pickers (`09:00 AM`, `02:00 PM`, `06:30 PM`), preventing unauthenticated actions.
- **Secure Stripe Payments:** Integrated Stripe Checkout session generation with server-side price validation.
- **Webhook Processing:** Robust backend webhook handler (`checkout.session.completed`) that reliably updates order status and confirms secure transactions.
- **Responsive UI:** Clean, dark-mode-first modern interface built with Tailwind CSS and React Router.

---

## 🛠️ Tech Stack

### **Frontend**
- **React** (with Vite)
- **React Router** for client-side routing
- **Tailwind CSS** for styling

### **Backend**
- **Node.js** & **Express**
- **Better Auth** (Authentication & session handling)
- **Stripe API** (Checkout & Webhooks)

### **Database & Deployment**
- **PostgreSQL** hosted on **Neon**
- **Vercel** (Frontend hosting & API proxy rewrites)
- **Render** (Backend server hosting)

---

## 📂 Project Structure

```text
pulsestudio/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # UI Components (Header, ClassCard, Success, Login, etc.)
│   │   ├── lib/            # Utilities & Auth client configuration
│   │   ├── App.jsx         # Main router setup
│   │   └── main.jsx
│   └── vercel.json         # Vercel rewrites and routing rules
└── server/                 # Backend Express application
    ├── src/
    │   └── index.js        # API endpoints, Stripe checkout, and webhook handlers
    └── package.json