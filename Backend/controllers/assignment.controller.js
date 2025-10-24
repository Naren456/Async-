
import prisma from "../config/db.js";


export const createAssignment = async (req, res) => {
  try {
    const { title, dueDate, cohortNo, subjectCode, link } = req.body;
    
    if (!title || !cohortNo || !subjectCode || !link) {
      return res.status(400).json({ 
        success: false, 
        message: "Title, description, cohortNo, subjectCode, and link are required" 
      });
    }

    const assignment = await prisma.assignment.create({
      data: {
        title,
        dueDate: dueDate ? new Date(dueDate) : null,
        cohortNo: Number(cohortNo),
        subjectCode,
        link,
      },
    });

    res.status(201).json({ success: true, assignment });
  } catch (err) {
    console.error("❌ Error creating assignment:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /assignments/by-cohort/:cohortNo 
const formatDateKey = (date) => {
  if (!date) return "No Due Date";

  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0"); // 2-digit day
  const month = d.toLocaleString("en-US", { month: "short" }); // Jan, Feb, ...
  const year = d.getFullYear();

  return `${day}-${month}-${year}`; // e.g., 24-Oct-2025
};

export const getAssignmentsByCohortGrouped = async (req, res) => {
  try {
    const { cohortNo } = req.params;
    const cohort = Number(cohortNo);
    if (Number.isNaN(cohort)) {
      return res.status(400).json({ success: false, message: "Invalid cohort number" });
    }

    const assignments = await prisma.assignment.findMany({
      where: { cohortNo: cohort },
      include: { subject: true },
      orderBy: { dueDate: "asc" },
    });

    const grouped = assignments.reduce((acc, a) => {
      const key = formatDateKey(a.dueDate);

      if (!acc[key]) acc[key] = []; // initialize array if key doesn't exist

      acc[key].push({
        id: a.id,
        title: a.title,
        subject: a.subject,
        dueDate: a.dueDate,
        link: a.link,
        displayDate: a.dueDate
          ? new Date(a.dueDate).toLocaleString(undefined, {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "No due date",
        isoDate: a.dueDate ? new Date(a.dueDate).toISOString() : "",
      });

      return acc;
    }, {});

    return res.json({ success: true, cohortNo: cohort, grouped, count: assignments.length });
  } catch (err) {
    console.error("Error fetching assignments:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /assignments/:id
export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Assignment ID is required" });
    }

    // Check if assignment exists
    const existing = await prisma.assignment.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ success: false, message: "Assignment not found" });
    }

    // Delete assignment
    await prisma.assignment.delete({
      where: { id },
    });

    return res.json({ success: true, message: "Assignment deleted successfully" });
  } catch (err) {
    console.error("Error deleting assignment:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

