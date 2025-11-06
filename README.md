## Van Queue & Departure System – Sprint 1 Foundation

This repository is organised as a multi-workspace project for the Van Queue & Departure System described in `doc/`. Sprint 1 delivers the shared infrastructure that later sprints will build upon.

### Structure
- `vanqueue-server/` – Node.js + Express backend with MongoDB, JWT authentication, Socket.IO bootstrap, and Joi validation.
- `vanqueue-client/` – React + Vite frontend shell prepared for passenger/driver/admin flows.
- `doc/` – Reference documentation supplied by the product team.

### Getting Started
1. Copy `.env.example` to `.env` in both `vanqueue-server` and `vanqueue-client`.
2. Install dependencies:
   - `cd vanqueue-server && npm install`
   - `cd vanqueue-client && npm install`
3. Seed the database (requires MongoDB connection configured in `.env`):
   - `npm run seed` from `vanqueue-server`.
4. Run the backend: `npm run dev` (defaults to port `4000`).
5. Run the frontend: `npm run dev` (defaults to port `5173`).

### Sprint 1 Deliverables
- Project scaffolding with consistent lint/format tooling.
- Auth endpoints (`/api/auth/register`, `/api/auth/login`, `/api/auth/profile`) with JWT + bcrypt.
- MongoDB schemas and initial seed data for passengers, drivers, vans, routes, trips.
- API health check and baseline Socket.IO server.
- Security middleware: Helmet, CORS whitelisting, payload validation.
- Deployment stubs documented in `vanqueue-server/DEPLOYMENT.md`.

Subsequent sprints (passenger booking, driver tools, admin dashboards) will extend this foundation.
