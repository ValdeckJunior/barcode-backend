import prisma from "../config/db";

export async function markAttendance(
  userId: number,
  courseId: number,
  date: string
) {
  if (!userId || !courseId || !date) throw new Error("Missing required fields");
  return await prisma.attendance.upsert({
    where: {
      userId_courseId_date: {
        userId,
        courseId,
        date: new Date(date),
      },
    },
    update: {},
    create: {
      userId,
      courseId,
      date: new Date(date),
    },
  });
}

export async function getAttendanceByDate(courseId: number, date: string) {
  if (!courseId || !date) throw new Error("Missing required fields");
  return await prisma.attendance.findMany({
    where: {
      courseId,
      date: new Date(date),
    },
    include: {
      user: true,
    },
  });
}

export async function getStudentAttendance(userId: number, courseId: number) {
  if (!userId || !courseId) throw new Error("Missing required fields");
  return await prisma.attendance.findMany({
    where: {
      userId,
      courseId,
    },
    orderBy: {
      date: "desc",
    },
  });
}

export async function getAttendanceStats(courseId: number) {
  if (!courseId) throw new Error("Missing required fields");
  const totalClasses = await prisma.attendance.groupBy({
    by: ["date"],
    where: { courseId },
  });
  const studentAttendance = await prisma.attendance.groupBy({
    by: ["userId"],
    where: { courseId },
    _count: { date: true },
  });
  return {
    totalClasses: totalClasses.length,
    studentAttendance,
  };
}
