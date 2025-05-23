-- University of Buea Mock Data Seed Script (Faculties, Departments, Sample Students)

-- USERS (students and invigilators)
INSERT INTO "User" (id, name, matricule, email, password, role, faculty, department, level, semester, "academicYear", "createdAt", "updatedAt") VALUES
  ('1', 'Alice N. Fomum', 'FE20A001', 'alice.fomum@ubuea.cm', 'password123', 'STUDENT', 'Faculty of Science', 'Department of Computer Science', 'LEVEL 300', 'SEMESTER 2', '2024/2025', NOW(), NOW()),
  ('2', 'Benoit T. Mbah', 'FE20A002', 'benoit.mbah@ubuea.cm', 'password123', 'STUDENT', 'Faculty of Arts', 'Department of English', 'LEVEL 200', 'SEMESTER 1', '2024/2025', NOW(), NOW()),
  ('3', 'Chantal E. Ngu', 'FE20A003', 'chantal.ngu@ubuea.cm', 'password123', 'STUDENT', 'College of Technology (COT)', 'Software Engineering', 'LEVEL 400', 'SEMESTER 2', '2024/2025', NOW(), NOW()),
  ('4', 'Dr. Samuel Invigilator', 'INVIG001', 'samuel.invigilator@ubuea.cm', 'invigpass', 'ADMIN', 'Faculty of Science', 'Department of Computer Science', 'N/A', 'N/A', 'N/A', NOW(), NOW());

-- COURSES
INSERT INTO "Course" (id, code, title, credits, semester, lecturer, department, "createdAt", "updatedAt") VALUES
  ('1', 'CSC301', 'Algorithms & Data Structures', 3, 'SEMESTER 1', 'Dr. John Doe', 'Department of Computer Science', NOW(), NOW()),
  ('2', 'CSC305', 'Operating Systems', 3, 'SEMESTER 1', 'Dr. Jane Smith', 'Department of Computer Science', NOW(), NOW()),
  ('3', 'MAT201', 'Linear Algebra', 2, 'SEMESTER 1', 'Prof. Math Expert', 'Department of Mathematics', NOW(), NOW()),
  ('4', 'ENG201', 'English Literature', 3, 'SEMESTER 2', 'Dr. English Prof', 'Department of English', NOW(), NOW()),
  ('5', 'ENG205', 'Advanced Grammar', 2, 'SEMESTER 2', 'Dr. Grammar Expert', 'Department of English', NOW(), NOW()),
  ('6', 'HIS101', 'World History', 2, 'SEMESTER 1', 'Dr. History Prof', 'Department of History', NOW(), NOW()),
  ('7', 'SWE401', 'Software Project Management', 3, 'SEMESTER 2', 'Dr. Project Manager', 'Software Engineering', NOW(), NOW()),
  ('8', 'SWE405', 'Mobile App Development', 3, 'SEMESTER 2', 'Dr. Mobile Expert', 'Software Engineering', NOW(), NOW()),
  ('9', 'EEE201', 'Digital Electronics', 3, 'SEMESTER 1', 'Dr. Electronics Prof', 'Department of Electronics', NOW(), NOW());

-- REGISTRATIONS
INSERT INTO "Registration" (id, "userId", "courseId", "createdAt", "updatedAt") VALUES
  ('1', '1', '1', NOW(), NOW()), -- Alice: Algorithms & Data Structures
  ('2', '1', '2', NOW(), NOW()), -- Alice: Operating Systems
  ('3', '2', '4', NOW(), NOW()), -- Benoit: English Literature
  ('4', '2', '5', NOW(), NOW()), -- Benoit: Advanced Grammar
  ('5', '3', '7', NOW(), NOW()), -- Chantal: Software Project Management
  ('6', '3', '8', NOW(), NOW()); -- Chantal: Mobile App Development

-- ATTENDANCE (empty or add sample if needed)
-- No results table is seeded, as results are not part of the workflow.
