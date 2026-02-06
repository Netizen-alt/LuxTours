# LuxTours - Premium Tour Booking System

A full-stack tour booking application built as a portfolio demonstration.

## features
- **Frontend**: Next.js 14, **Tailwind CSS**, Premium Dark UI, Responsive Design.
- **Backend**: Node.js, Express, Prisma (SQLite), JWT Authentication.
- **Admin Dashboard**: Full CRUD for Users and Tours, Analytics Overview.

## Getting Started

### 1. Backend Setup
```bash
cd server
npm install
npx prisma migrate dev --name init
node src/seed.js # Seeds data AND creates Admin user
npm start
```
Server runs on http://localhost:5000

### 2. Frontend Setup
```bash
cd client
npm install
# Ensure you are using Node v18+ 
npm run dev
```
Client runs on http://localhost:3000

## Admin Access
- **URL**: `http://localhost:3000/admin`
- **Default Admin**:
  - Email: `admin@example.com`
  - Password: `admin123`

## API Endpoints
- `GET /api/tours` - List all tours
- `GET /api/tours/:id` - Get tour details
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/users` - (Admin) List users

