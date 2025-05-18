-- University of Buea Mock Data Seed Script (Faculties, Departments, Sample Students)

-- USERS (students and invigilators)
INSERT INTO "User" (id, name, matricule, email, password, role, faculty, department, semester, level, "academicYear") VALUES
  (1, 'Alice N. Fomum', 'FE20A001', 'alice.fomum@ubuea.cm', 'password123', 'STUDENT', 'Faculty of Science', 'Department of Computer Science', 'SEMESTER 2', 'LEVEL 300', '2024/2025'),
  (2, 'Benoit T. Mbah', 'FE20A002', 'benoit.mbah@ubuea.cm', 'password123', 'STUDENT', 'Faculty of Arts', 'Department of English', 'SEMESTER 1', 'LEVEL 200', '2024/2025'),
  (3, 'Chantal E. Ngu', 'FE20A003', 'chantal.ngu@ubuea.cm', 'password123', 'STUDENT', 'College of Technology (COT)', 'Software Engineering', 'SEMESTER 2', 'LEVEL 400', '2024/2025'),
  (4, 'Dr. Samuel Invigilator', 'INVIG001', 'samuel.invigilator@ubuea.cm', 'invigpass', 'ADMIN', 'Faculty of Science', 'Department of Computer Science', '', '', '');

-- COURSES
INSERT INTO "Course" (id, code, title) VALUES
  (1, 'CSC301', 'Algorithms & Data Structures'),
  (2, 'CSC305', 'Operating Systems'),
  (3, 'MAT201', 'Linear Algebra'),
  (4, 'ENG201', 'English Literature'),
  (5, 'ENG205', 'Advanced Grammar'),
  (6, 'HIS101', 'World History'),
  (7, 'SWE401', 'Software Project Management'),
  (8, 'SWE405', 'Mobile App Development'),
  (9, 'EEE201', 'Digital Electronics');

-- REGISTRATIONS (only for courses where isRegistered: true)
INSERT INTO "Registration" (id, "userId", "courseId") VALUES
  (1, 1, 1), -- Alice: Algorithms & Data Structures
  (2, 1, 2), -- Alice: Operating Systems
  (3, 2, 4), -- Benoit: English Literature
  (4, 2, 5), -- Benoit: Advanced Grammar
  (5, 3, 7), -- Chantal: Software Project Management
  (6, 3, 8); -- Chantal: Mobile App Development

-- ATTENDANCE (empty or add sample if needed)
-- No results table is seeded, as results are not part of the workflow.
