# QR Campus API Documentation

## Application Workflow Overview

1. **Account Provisioning:**

   - All student accounts are pre-created by the university. Students do not self-register.
   - Each student is assigned a unique matricule, password, and profile information.

2. **Authentication:**

   - Students log in using their matricule and password to receive a JWT token.
   - All API requests (except login) require this token in the `Authorization` header.

3. **Student Dashboard:**

   - After login, students can view their profile and all registered courses for the current semester/year.
   - Students can download their QR code, which encodes their identity and registered courses for the current academic period.

4. **QR Code Generation:**

   - The QR code contains a payload like:
     ```
     {
       "matricule": "UBa21SCI001",
       "academicYear": "2024/2025",
       "semester": "First",
       "courses": ["CSC201", "MTH202", ...]
     }
     ```
   - The QR code is a PNG image and can be scanned by authorized personnel (lecturers).

5. **Exam Verification (Lecturer):**

   - During exams, a lecturer scans a student's QR code and submits its payload (base64 or raw JSON) along with the course code being written to the `/api/verify-qrcode` endpoint.
   - The backend decodes the QR, verifies the student is registered for the course, and returns eligibility status and student info.
   - If eligible, the student is allowed to write the exam; otherwise, access is denied.

6. **No Student-Initiated Registration:**

   - Students cannot register or unregister for courses via the app. All course registrations are managed by the university and reflected in the backend data.

7. **Results and Attendance:**
   - (If enabled) Students can view their results and attendance records, but cannot modify them.

---

# QR Campus API Documentation

## Authentication

### POST `/api/auth/login`

Authenticate a user (student or invigilator/lecturer) and receive a JWT token.

**Request Body:**

```
{
  "matricule": "FE20A001", // or "INVIG001" for invigilator
  "password": "password123" // or "invigpass" for invigilator
}
```

**Response:**

```
{
  "token": "<jwt-token>",
  "user": {
    "id": 1,
    "name": "Alice N. Fomum",
    "matricule": "FE20A001",
    "email": "alice.fomum@ubuea.cm",
    "role": "STUDENT",
    "faculty": "Faculty of Science",
    "department": "Department of Computer Science",
    "semester": "SEMESTER 2",
    "level": "LEVEL 300",
    "academicYear": "2024/2025"
  }
}
```

---

## Invigilator/Lecturer Login Note

> **Note:** The person scanning QR codes (invigilator/lecturer) must be logged in and use their token for all scan/verification actions. The student being scanned does not need to be logged in or provide a token. The backend will reject scan/verification requests if the scanner is not authenticated.

---

## Student Endpoints

### GET `/api/students/:matricule`

Get a student profile by matricule.

**Headers:** `Authorization: Bearer <token>`

**Response:**

```
{
  "id": 1,
  "name": "Alice N. Fomum",
  "matricule": "FE20A001",
  "email": "alice.fomum@ubuea.cm",
  "role": "STUDENT",
  "faculty": "Faculty of Science",
  "department": "Department of Computer Science",
  "semester": "SEMESTER 2",
  "level": "LEVEL 300",
  "academicYear": "2024/2025"
}
```

### GET `/api/students/:matricule/qrcode`

Get a PNG QR code for the student, encoding their matricule, academic year, semester, and registered course codes.

**Headers:** `Authorization: Bearer <token>`

**Response:**

- Content-Type: image/png
- Binary image data

**QR Code Payload Example (decoded):**

```
{
  "matricule": "FE20A001",
  "academicYear": "2024/2025",
  "semester": "SEMESTER 2",
  "courses": ["CSC301", "CSC305"]
}
```

### GET `/api/students/:matricule/courses`

Get all registered courses for a student (for the current semester/year).

**Headers:** `Authorization: Bearer <token>`

**Response:**

```
[
  { "id": 1, "code": "CSC301", "title": "Algorithms & Data Structures" },
  { "id": 2, "code": "CSC305", "title": "Operating Systems" }
]
```

---

## QR Code Verification (Lecturer)

### POST `/api/verify-qrcode`

Lecturer scans a student's QR code and submits its payload to retrieve student info and all registered courses.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```
{
  "qrcode": "<base64 or raw QR payload>"
}
```

**Response:**

```
{
  "student": {
    "id": 1,
    "name": "Alice N. Fomum",
    "matricule": "FE20A001",
    "email": "alice.fomum@ubuea.cm",
    "role": "STUDENT",
    "faculty": "Faculty of Science",
    "department": "Department of Computer Science",
    "semester": "SEMESTER 2",
    "level": "LEVEL 300",
    "academicYear": "2024/2025"
  },
  "courses": [
    { "id": 1, "code": "CSC301", "title": "Algorithms & Data Structures" },
    { "id": 2, "code": "CSC305", "title": "Operating Systems" }
  ]
}
```

---

## Course Endpoints

### GET `/api/courses/`

Get all available courses.

**Headers:** `Authorization: Bearer <token>`

**Response:**

```
[
  { "id": 1, "code": "CSC301", "title": "Algorithms & Data Structures" },
  { "id": 2, "code": "CSC305", "title": "Operating Systems" },
  ...
]
```

### GET `/api/courses/:code`

Get details for a specific course by code.

**Headers:** `Authorization: Bearer <token>`

**Response:**

```
{
  "id": 1,
  "code": "CSC301",
  "title": "Algorithms & Data Structures"
}
```

---

## Error Responses

All endpoints return errors in the following format:

```
{
  "error": "Error message"
}
```

---

## Authentication

All endpoints (except `/api/auth/login`) require a valid JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## Notes

- All dates are in ISO 8601 format (UTC).
- All IDs are integers unless otherwise specified.
- All endpoints return JSON unless otherwise noted.
- For QR code endpoints, the response is a PNG image.
- Students cannot self-register or unregister for courses; all accounts and registrations are pre-provisioned by the university.
- The QR code is the only means for a lecturer to verify a student's exam eligibility for a course.

---

For further details, see the source code or contact the backend team.
