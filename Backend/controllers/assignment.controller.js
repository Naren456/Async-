
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
export const getAssignmentsByCohortGrouped = async (req, res) => {
  try {
    const { cohortNo } = req.params;
    const cohort = Number(cohortNo);
    if (Number.isNaN(cohort)) {
      return res.status(400).json({ success: false, message: 'Invalid cohort number' });
    }

    const assignments = await prisma.assignment.findMany({
      where: { cohortNo: cohort },
      include: { subject: true },
      orderBy: { dueDate: 'asc' },
    });

    const grouped = assignments.reduce((acc, a) => {
      const key = a.dueDate ? new Date(a.dueDate).toISOString().slice(0, 10) : 'No Due Date';
      if (!acc[key]) acc[key] = [];
      acc[key].push(a);
      return acc;
    }, {});

    return res.json({ success: true, cohortNo: cohort, grouped });
  } catch (err) {
    console.error(' Error fetching assignments:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};
