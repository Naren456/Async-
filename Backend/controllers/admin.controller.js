import prisma from "../config/db.js";

// ---------------- GET ADMIN STATS ----------------
export const getAdminStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalSubjects,
      totalAssignments,
      activeCohorts
    ] = await Promise.all([
      prisma.user.count(),
      prisma.subject.count(),
      prisma.assignment.count(),
      prisma.cohort.count()
    ]);

    res.json({
      totalUsers,
      totalSubjects,
      totalAssignments,
      activeCohorts
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Server error fetching admin stats" });
  }
};
