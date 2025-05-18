/** @jest-environment node */
import request from "supertest";
import { app } from "../index";

// Helper to get a valid JWT token for tests (replace with real credentials if needed)
async function getTestToken() {
  const res = await request(app)
    .post("/api/auth/login")
    .send({ matricule: "UBa21SCI001", password: "password123" });
  return res.body.token;
}

describe("Attendance API", () => {
  it("should mark attendance", async () => {
    const token = await getTestToken();
    const res = await request(app)
      .post("/api/attendance/mark")
      .set("Authorization", `Bearer ${token}`)
      .send({ courseId: 1, date: "2025-05-10" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("userId", 1);
    expect(res.body).toHaveProperty("courseId", 1);
  });

  it("should get attendance by date", async () => {
    const token = await getTestToken();
    const res = await request(app)
      .get("/api/attendance/course/1/date?date=2025-05-10")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get student attendance", async () => {
    const token = await getTestToken();
    const res = await request(app)
      .get("/api/attendance/student/1/course/1")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get attendance stats", async () => {
    const token = await getTestToken();
    const res = await request(app)
      .get("/api/attendance/course/1/stats")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("totalClasses");
    expect(res.body).toHaveProperty("studentAttendance");
  });
});

describe("Student API", () => {
  it("should get student profile", async () => {
    const token = await getTestToken();
    const res = await request(app)
      .get("/api/students/UBa21SCI001")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("matricule", "UBa21SCI001");
  });
  it("should get student QR code", async () => {
    const token = await getTestToken();
    const res = await request(app)
      .get("/api/students/UBa21SCI001/qrcode")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/image\/png/);
  });
  it("should get registered courses", async () => {
    const token = await getTestToken();
    const res = await request(app)
      .get("/api/students/UBa21SCI001/courses")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("Course API", () => {
  it("should get all courses", async () => {
    const token = await getTestToken();
    const res = await request(app)
      .get("/api/courses/")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  it("should get course by code", async () => {
    const token = await getTestToken();
    const res = await request(app)
      .get("/api/courses/CSC201")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("code", "CSC201");
  });
});

describe("Result API", () => {
  it("should get student results", async () => {
    const token = await getTestToken();
    const res = await request(app)
      .get("/api/results/UBa21SCI001/results")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("QR Code Verification API", () => {
  it("should verify eligibility for a registered course", async () => {
    const token = await getTestToken();
    // Get student QR code payload (simulate what would be encoded)
    const qrPayload = {
      matricule: "UBa21SCI001",
      academicYear: "2024/2025",
      semester: "First",
      courses: ["CSC201", "MTH202"],
    };
    const qrcode = Buffer.from(JSON.stringify(qrPayload), "utf-8").toString(
      "base64"
    );
    const res = await request(app)
      .post("/api/verify-qrcode")
      .set("Authorization", `Bearer ${token}`)
      .send({ qrcode, courseCode: "CSC201" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("eligible", true);
    expect(res.body.student).toHaveProperty("matricule", "UBa21SCI001");
    expect(Array.isArray(res.body.courses)).toBe(true);
  });

  it("should deny eligibility for an unregistered course", async () => {
    const token = await getTestToken();
    const qrPayload = {
      matricule: "UBa21SCI001",
      academicYear: "2024/2025",
      semester: "First",
      courses: ["CSC201", "MTH202"],
    };
    const qrcode = Buffer.from(JSON.stringify(qrPayload), "utf-8").toString(
      "base64"
    );
    const res = await request(app)
      .post("/api/verify-qrcode")
      .set("Authorization", `Bearer ${token}`)
      .send({ qrcode, courseCode: "PHY101" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("eligible", false);
    expect(res.body.student).toHaveProperty("matricule", "UBa21SCI001");
    expect(Array.isArray(res.body.courses)).toBe(true);
  });
});
