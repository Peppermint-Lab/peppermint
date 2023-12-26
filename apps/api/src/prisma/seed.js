const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");

const prisma = new PrismaClient();

async function main() {
  const setup = await prisma.config.findFirst({});

  if (setup === null) {
    await prisma.user.upsert({
      where: { email: "admin@admin.com" },
      update: {},
      create: {
        email: `admin@admin.com`,
        name: "admin",
        isAdmin: true,
        password:
          "$2b$10$BFmibvOW7FtY0soAAwujoO9y2tIyB7WEJ2HNq9O7zh9aeejMvRsKu",
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

    const encryptionKey = crypto.randomBytes(32); // Generates a random key

    const conf = await prisma.config.create({
      data: {
        gh_version: "0.3.6",
        client_version: "0.3.6",
        portal_locale: "en",
        encryption_key: encryptionKey,
      },
    });

    await prisma.config.update({
      where: {
        id: conf.id,
      },
      data: {
        first_time_setup: false,
      },
    });
  } else {
    console.log("No need to seed, already seeded");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
