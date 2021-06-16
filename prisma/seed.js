const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
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
  
  const unkownClient = await prisma.client.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: "unknown",
      email: "unknown",
      contactName: "unknown",
      number: "12345678"
    }
  })

  const unkownUser = await prisma.user.upsert({
    where: { email: "unkown" },
    update: {},
    create: {
      id: 2,
      firstName: "unknown",
      lastName: "unknown",
      password: "unknown",
      email: "unknown",
      isAdmin: false,
      password: String(Math.floor(Math.random() * 1000))
    }
  })

  const internal = await prisma.client.upsert({
    where: { id: Number(1) },
    update: {},
    create: {
      id: 1,
      email: `internal@admin.com`,
      name: "internal",
      contactName: "admin",
      number: '123456789',
    },
  })

  console.log({ admin, internal, unkownClient, unkownUser });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
