export interface UserData {
  matricule: string;
  name: string;
  password: string;
  email: string;
  role: "STUDENT" | "ADMIN";
  faculty: string;
  department: string;
  level: string;
  semester: string;
  academicYear: string;
}

export interface CourseData {
  code: string;
  title: string;
  credits: number;
  semester: string;
  lecturer: string;
  department: string;
}

export interface LoginCredentials {
  matricule: string;
  password: string;
}

export interface JwtPayload {
  id: number;
  userId: string;
  matricule: string;
}
