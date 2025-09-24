import prisma from "../config/db.js";

// ---------------- GET ALL SUBJECTS ----------------
// For admin or general listing
export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany({
      include: {
        notes: true,
      },
      orderBy: {
        semester: "asc",
      },
    });

    res.json({ subjects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching subjects" });
  }
};

// ---------------- GET SUBJECTS FOR USER ----------------
// Only subjects <= user's semester & term
export const getUserSubjects = async (req, res) => {
  try {
    const { userId } = req.params;

    // fetch user to get semester & term
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // fetch subjects eligible for this user
    const subjects = await prisma.subject.findMany({
      where: {
        semester: { lte: user.semester },
        term: { lte: user.term },
      },
      include: {
        notes: true, // include notes if needed
      },
      orderBy: {
        semester: "asc",
      },
    });

    res.json({ subjects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching user subjects" });
  }
};

// ---------------- CREATE SUBJECT ----------------
// Admin only
export const createSubject = async (req, res) => {
  try {
    const { code, name, semester, term } = req.body;

    if (!code || !name || semester === undefined || term === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const subject = await prisma.subject.create({
      data: {
        code,
        name,
        semester,
        term,
      },
    });

    res.status(201).json({ subject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error creating subject" });
  }
};

// ---------------- GET SINGLE SUBJECT ----------------
export const getSubjectById = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
      include: { notes: true },
    });

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json({ subject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching subject" });
  }
};

// ---------------- UPDATE SUBJECT ----------------
export const updateSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { code, name, semester, term } = req.body;

    const subject = await prisma.subject.update({
      where: { id: subjectId },
      data: { code, name, semester, term },
    });

    res.json({ subject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error updating subject" });
  }
};

// ---------------- DELETE SUBJECT ----------------
export const deleteSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    await prisma.subject.delete({
      where: { id: subjectId },
    });

    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error deleting subject" });
  }
};
