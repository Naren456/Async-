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
// Only subjects <= user's semester
export const getUserSubjects = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Optional overrides via query params (?semester=&term=)
    const qpSemesterRaw = req.query.semester;
    const qpTermRaw = req.query.term;
    const qpSemester = qpSemesterRaw !== undefined ? Number(qpSemesterRaw) : undefined;
    const qpTerm = qpTermRaw !== undefined ? Number(qpTermRaw) : undefined;
    const effectiveSemester = Number.isFinite(qpSemester) ? qpSemester : user.semester;
    const effectiveTerm = Number.isFinite(qpTerm) ? qpTerm : user.term;

    // Exact when both provided, else only subjects with semester <= effectiveSemester
    const whereClause = (qpSemester !== undefined && qpTerm !== undefined)
      ? {
          AND: [
            { semester: { equals: effectiveSemester } },
            { term: { equals: effectiveTerm } },
          ],
        }
      : {
          semester: { lte: effectiveSemester },
        };

    const subjects = await prisma.subject.findMany({
      where: whereClause,
      include: { notes: true },
      orderBy: [
        { semester: 'asc' },
        { term: 'asc' },
        { code: 'asc' },
      ],
    });

    res.json({ subjects, filters: { semester: effectiveSemester, term: effectiveTerm }, mode: (qpSemester !== undefined && qpTerm !== undefined) ? 'exact' : 'inclusive' });
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
      where: { code: subjectId },
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
    const { subjectId } = req.params; // ✅ match frontend: /api/subjects/:subjectId
    
    if (!subjectId) {
      return res.status(400).json({ message: "Subject ID is required" });
    }

    // Check if subject exists first
    const existing = await prisma.subject.findUnique({
      where: { code: subjectId }, // assuming 'code' is the unique identifier
    });

    if (!existing) {
      return res.status(404).json({ message: "Subject not found" });
    }

    console.log(existing);

    // Delete subject
 await prisma.assignment.deleteMany({
  where: { subjectCode: subjectId }, // replace with your subject code
});
  await prisma.subject.delete({
    where : {code : subjectId}
  });
    return res.json({ success: true, message: `Subject '${subjectId}' deleted successfully` });

  } catch (error) {
    console.error("❌ Error deleting subject:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting subject",
    });
  }
};
