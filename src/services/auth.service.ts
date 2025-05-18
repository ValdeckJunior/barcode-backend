import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/db";
import { SERVER_CONFIG } from "../config/server";
import type { LoginCredentials, UserData } from "../types/models";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePasswords(
  password: string,
  storedPassword: string
): Promise<boolean> {
  // If the stored password is a bcrypt hash, use bcrypt compare
  if (
    storedPassword.startsWith("$2a") ||
    storedPassword.startsWith("$2b") ||
    storedPassword.startsWith("$2y")
  ) {
    return bcrypt.compare(password, storedPassword);
  }
  // Otherwise, use plain text comparison (for legacy/mock data)
  return password === storedPassword;
}

export function generateToken(
  userId: string,
  matricule: string,
  role: string
): string {
  return jwt.sign({ userId, matricule, role }, SERVER_CONFIG.jwtSecret, {
    expiresIn: "24h",
  });
}

export async function register(userData: UserData) {
  const existingUser = await prisma.user.findUnique({
    where: { matricule: userData.matricule },
  });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await hashPassword(userData.password);
  const createdUser = await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
      email: userData.email,
      role: userData.role,
    },
  });
  const token = generateToken(
    String(createdUser.id),
    createdUser.matricule,
    createdUser.role
  );
  const { password, ...userWithoutPassword } = createdUser;
  return { user: userWithoutPassword, token };
}

export async function login(credentials: LoginCredentials) {
  const foundUser = await prisma.user.findUnique({
    where: { matricule: credentials.matricule },
  });
  if (!foundUser) {
    throw new Error("Invalid credentials");
  }
  const isPasswordValid = await comparePasswords(
    credentials.password,
    foundUser.password
  );
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }
  const token = generateToken(
    String(foundUser.id),
    foundUser.matricule,
    foundUser.role
  );
  const { password, ...userWithoutPassword } = foundUser;
  return { user: userWithoutPassword, token };
}
