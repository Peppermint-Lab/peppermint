const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: `admin@admin.com`,
      name: "admin",
      isAdmin: true,
      password: "$2b$10$BFmibvOW7FtY0soAAwujoO9y2tIyB7WEJ2HNq9O7zh9aeejMvRsKu",
      language: "en",
    },
  });

  await prisma.client.upsert({
    where: { email: `internal@admin.com` },
    update: {},
    create: {
      email: `internal@admin.com`,
      name: "internal",
      contactName: "admin",
      number: "123456789",
      active: true,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
