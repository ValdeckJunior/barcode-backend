import prisma from "../config/db";

export async function registerStudentForCourse(
  matricule: string,
  courseId: string
) {
  const user = await prisma.user.findUnique({ where: { matricule } });
  if (!user) throw new Error("Student not found");
  const course = await prisma.course.findUnique({
    where: { id: Number(courseId) },
  });
  if (!course) throw new Error("Course not found");
  const existing = await prisma.registration.findUnique({
    where: { userId_courseId: { userId: user.id, courseId: Number(courseId) } },
  });
  if (existing) throw new Error("Already registered");
  return prisma.registration.create({
    data: { userId: user.id, courseId: Number(courseId) },
  });
}

export async function unregisterStudentFromCourse(
  matricule: string,
  courseId: string
) {
  const user = await prisma.user.findUnique({ where: { matricule } });
  if (!user) throw new Error("Student not found");
  const course = await prisma.course.findUnique({
    where: { id: Number(courseId) },
  });
  if (!course) throw new Error("Course not found");
  return prisma.registration.delete({
    where: { userId_courseId: { userId: user.id, courseId: Number(courseId) } },
  });
}
