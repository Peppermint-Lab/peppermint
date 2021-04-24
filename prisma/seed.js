const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      id: 1,
      email: `admin@admin.com`,
      firstName: "admin",
      lastName: "admin",
      isAdmin: true,
      password: "$2b$10$BFmibvOW7FtY0soAAwujoO9y2tIyB7WEJ2HNq9O7zh9aeejMvRsKu",
    },
  });

  await prisma.client.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "unknown",
      email: "unknown",
      contactName: "unknown",
    }
  })

  await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      firstName: "unknown",
      lastName: "unknown",
      password: "unknown",
      email: "unknown",
      isAdmin: false,
    }
  })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
