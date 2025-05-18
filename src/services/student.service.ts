import prisma from "../config/db.js";
import QRCode from "qrcode";

export async function getStudentProfile(matricule: string) {
  const user = await prisma.user.findUnique({
    where: { matricule },
    include: {
      registrations: { include: { course: true } },
    },
  });
  if (!user) throw new Error("Student not found");
  const { password, ...profile } = user;
  return profile;
}

export async function getStudentQrCode(matricule: string) {
  const user = await prisma.user.findUnique({ where: { matricule } });
  if (!user) throw new Error("Student not found");
  const qrData = JSON.stringify({
    matricule: user.matricule,
    name: user.name,
    faculty: user.faculty,
    department: user.department,
    level: user.level,
    semester: user.semester,
    academicYear: user.academicYear,
  });
  return await QRCode.toBuffer(qrData);
}

export async function getStudentRegisteredCourses(matricule: string) {
  const user = await prisma.user.findUnique({
    where: { matricule },
    include: {
      registrations: { include: { course: true } },
    },
  });
  if (!user) throw new Error("Student not found");
  return (user.registrations || []).map((reg: any) => reg.course);
}

export async function getStudentProfileByMatricule(matricule: string) {
  const user = await prisma.user.findUnique({
    where: { matricule },
  });
  if (!user) return null;
  const { password, ...profile } = user;
  return profile;
}
