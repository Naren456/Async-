import prisma from "./config/db.js";
const subjects = [
  { "code": "ZC212", "name": "Algorithm Design", "semester": 3, "term": 1 },
  { "code": "ZC317", "name": "Relational Databases", "semester": 3, "term": 2 },
  { "code": "ZC238", "name": "Web Programming", "semester": 3, "term": 1 },
  { "code": "ZC236", "name": "Software Design Principles", "semester": 3, "term": 2},
  { "code": "ZC216", "name": "Computer Systems and Performance", "semester": 3, "term": 1},
  { "code": "ZC113", "name": "Online Social Media", "semester": 3, "term": 2 },
    { "code": "ZC114", "name": "Video Games - Technology and Social Impacts", "semester": 3, "term": 2 }
]


async function main() {
  for (const subj of subjects) {
    await prisma.subject.create({ data: subj });
    console.log(`Inserted: ${subj.code}`);
  }
}

main()
  .then(() => console.log("All subjects added"))
  .catch(console.error)
  .finally(() => process.exit(0));
