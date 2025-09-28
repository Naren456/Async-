
import prisma from "../config/db.js";


export const createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, cohortNo, subjectId } = req.body;
    const assignment = await prisma.assignment.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        cohortNo: Number(cohortNo),
        subjectId,
      },
    });

    res.status(201).json({ success: true, assignment });
  } catch (err) {
    console.error("❌ Error creating assignment:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
