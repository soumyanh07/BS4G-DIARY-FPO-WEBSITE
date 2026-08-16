# BS4G Dairy FPO

### Digital Milk Requirement & Customer Connection Platform

A modern full-stack website built for **BS4G Dairy FPO**, a dairy Farmer Producer Organization based at Ghatboral, near Humnabad, Bidar District, Karnataka.

The platform helps BS4G Dairy FPO:

- Introduce the organization and its activities
- Showcase dairy and milk procurement operations
- Highlight its presence through 7 outlets around Bidar
- Allow customers to submit milk requirements
- Store customer requirements securely
- Provide an authenticated internal requirement register
- Export customer requirements for follow-up

---

## About BS4G Dairy FPO

BS4G Dairy FPO works with dairy farmers and primarily focuses on **buffalo milk procurement**.

### Organization at a glance

| Metric | Details |
|---|---|
| Daily milk procurement | Approximately 3,500 litres |
| Milk focus | Buffalo milk |
| Outlets | 7 around Bidar |
| Board members | 8 |
| President | Mr. Shashanka Salunkai |
| Location | Ghatboral, near Humnabad, Bidar District, Karnataka |

> **Note:** Outlet names, exact outlet locations, and official contact details are currently represented as placeholders until confirmed by BS4G Dairy FPO.

---

# Features

## Public Website

The public website allows visitors to:

- Learn about BS4G Dairy FPO
- Understand its dairy procurement activities
- View its local presence
- Learn about the leadership
- Submit a milk requirement
- Provide delivery information
- Connect with the organization

### Customer requirement form

Customers can submit:

- Name
- Phone / WhatsApp number
- Required quantity in litres/day
- Delivery location
- Additional note

The requirement is sent to the FastAPI backend and stored in PostgreSQL.

---

# Internal FPO Team Register

The `/team` area is protected by authentication.

Authorized BS4G team members can:

- Enter the team passcode
- View submitted customer requirements
- Refresh the register
- Copy all requirements as text
- Export requirements as CSV
- Sign out

Authentication uses a short-lived JWT issued by the FastAPI backend.

---

# Design System

The website uses a custom visual language called:

## Procurement Ledger

The interface is inspired by physical dairy procurement registers and local milk collection records.

### Visual language

- Cream paper-inspired backgrounds
- Navy typography
- Brass accents
- Sage secondary accents
- Ledger-style rows
- Ruled sections
- Serif display headings
- Monospace data labels and statistics

### Typography

- **Fraunces** — display headings
- **Public Sans** — body text
- **IBM Plex Mono** — statistics, labels and data

The interface is designed to be:

- Professional
- Friendly
- User-friendly
- Responsive
- Mobile-friendly
- Accessible
- Easy to navigate

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React

## Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- JWT
- Passlib / bcrypt
- Uvicorn

## Database

- PostgreSQL

## Deployment

Planned production architecture:

- Frontend → Vercel
- Backend → Render
- Database → Neon / Supabase / Render PostgreSQL

---

# Project Structure

```text
BS4G-DIARY-FPO-WEBSITE/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Nav.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── LedgerStrip.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Activities.tsx
│   │   │   ├── Outlets.tsx
│   │   │   ├── Connect.tsx
│   │   │   ├── RequirementForm.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   └── Team.tsx
│   │   │
│   │   ├── lib/
│   │   │   └── api.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── auth.py
│   │   │
│   │   └── routers/
│   │       ├── requirements.py
│   │       └── team.py
│   │
│   ├── alembic/
│   ├── .env.example
│   └── requirements.txt
│
├── .gitignore
└── README.md