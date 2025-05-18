# QR Campus Backend

## Features

- **Student & Invigilator Authentication** (JWT-based)
- **Student Profile & Course List**
- **QR Code Generation** for students (encodes identity and registered courses)
- **QR Code Verification** for invigilators/lecturers
- **Scan Logs**
  - Invigilators: See all students scanned and when
  - Students: See all invigilators who scanned them and when
- **Attendance & Results** (view only)

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Bun](https://bun.sh/) (for running the server)
- [PostgreSQL](https://www.postgresql.org/) (for the database)

## Setup Instructions

### 1. Clone the Repository

```pwsh
git clone https://github.com/ValdeckJunior/barcode-backend
cd barcode-backend
```

### 2. Install Dependencies

```pwsh
bun install
```

### 3. PostgreSQL Database Setup

- **Create the database:**
  ```pwsh
  psql -U postgres -c "CREATE DATABASE qr_campus;"
  ```
- **Update your `.env` file** with the correct connection string:
  ```env
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/qr_campus?schema=public"
  ```

### 4. Run Database Migrations

```pwsh
npx prisma migrate dev
```

### 5. Seed the Database

```pwsh
psql -U postgres -d qr_campus -f prisma/seed.sql
```

### 6. Start the Server

```pwsh
bun run dev
```

## API Endpoints

See `Api.md` for full API documentation and workflow.

---

**Notes:**

- All endpoints (except login) require a valid JWT token in the `Authorization` header.
- Students cannot self-register or unregister for courses; all accounts and registrations are pre-provisioned by the university.
- The QR code is the only means for a lecturer to verify a student's exam eligibility for a course.
