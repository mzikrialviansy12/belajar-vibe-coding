# Bun + ElysiaJS + Drizzle + MySQL Starter API

Backend API starter built using **Bun** runtime, **ElysiaJS** framework, and **Drizzle ORM** communicating with a **MySQL** database.

## Prerequisites

- [Bun](https://bun.sh/) (v1.x or higher)
- Running **MySQL** database instance

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   bun install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and fill in your database credentials:
   ```env
   PORT=3000
   DATABASE_HOST=127.0.0.1
   DATABASE_PORT=3306
   DATABASE_USER=your_username
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=your_database
   ```

3. **Generate Database Migrations**:
   Drizzle Kit compiles schema files and generates raw SQL migrations under `/drizzle`:
   ```bash
   bun run db:generate
   ```

4. **Run Database Migrations**:
   Execute migrations to construct/update table schemas in your MySQL database:
   ```bash
   bun run db:migrate
   ```

5. **Start Development Server**:
   ```bash
   bun run dev
   ```
   The API will be available at `http://localhost:3000`.

---

## API Endpoints

### Base / Health Check
- `GET /` — Welcome message / healthcheck

### User Endpoints (`/api/users`)
- `GET /api/users` — Get all users
- `GET /api/users/:id` — Get a user by ID
- `POST /api/users` — Create a new user
  - Body (JSON): `{ "name": "string", "email": "valid-email@domain.com" }`
- `PUT /api/users/:id` — Update user's name and/or email by ID
  - Body (JSON): `{ "name": "optional-string", "email": "optional-valid-email" }`
- `DELETE /api/users/:id` — Delete a user by ID
