import prisma from "../config/db";
import type { CourseData } from "../types/models";

export async function createCourse(courseData: CourseData) {
  const existingCourse = await prisma.course.findUnique({
    where: { code: courseData.code },
  });
  if (existingCourse) {
    throw new Error("Course already exists");
  }
  return prisma.course.create({ data: courseData });
}

export async function getAllCourses() {
  return prisma.course.findMany({ orderBy: { code: "asc" } });
}

export async function getCourseByCode(code: string) {
  const course = await prisma.course.findUnique({ where: { code } });
  if (!course) {
    throw new Error("Course not found");
  }
  return course;
}

export async function updateCourse(
  code: string,
  courseData: Partial<CourseData>
) {
  const existingCourse = await prisma.course.findUnique({ where: { code } });
  if (!existingCourse) {
    throw new Error("Course not found");
  }
  return prisma.course.update({ where: { code }, data: courseData });
}

export async function deleteCourse(code: string) {
  const existingCourse = await prisma.course.findUnique({ where: { code } });
  if (!existingCourse) {
    throw new Error("Course not found");
  }
  return prisma.course.delete({ where: { code } });
}
