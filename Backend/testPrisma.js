// testPrisma.js
import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log("✅ Connected to DB. Users:", users);
  } catch (err) {
    console.error("❌ Error connecting to DB:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
