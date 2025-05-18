import prisma from "../config/db";

export async function getResultsByMatricule(matricule: string) {
  const user = await prisma.user.findUnique({
    where: { matricule },
    include: {
      results: {
        include: { course: true },
      },
    },
  });
  if (!user) throw new Error("User not found");
  return user.results || [];
}
