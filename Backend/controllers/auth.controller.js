import prisma from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/token.js";

// ---------------- SIGNUP ----------------
export const signup = async (req, res) => {
  try {
    const { email, password, name, cohortNo, role, semester, term } = req.body;

    if (!email || !password || !name || cohortNo === undefined || semester === undefined || term === undefined) {
      return res.status(400).json({ message: "All fields including cohortNo, semester & term are required" });
    }

    // check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        cohortNo,
        role: role || "STUDENT",
        semester,
        term,
      },
    });

    const token = generateToken(user);

    res.status(201).json({ 
      user: { id: user.id, email: user.email, name: user.name, role: user.role, cohortNo: user.cohortNo, semester: user.semester, term: user.term },
      token 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- LOGIN ----------------
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.json({ 
      user: { id: user.id, email: user.email, name: user.name, role: user.role, cohortNo: user.cohortNo, semester: user.semester, term: user.term }, 
      token 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
