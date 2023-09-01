import { PrismaClient, Role } from "@prisma/client";
import { pbkdf2Sync } from "crypto";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "john@gmail.com",
      role: Role.ADMIN,
    },
  });

  const salt = pbkdf2Sync(
    "password",
    new Date().toISOString(),
    1000,
    64,
    `sha512`
  ).toString(`hex`);

  await prisma.auth.create({
    data: {
      userId: user.id,
      hash: pbkdf2Sync("password", salt, 1000, 64, `sha512`).toString(`hex`),
      salt: salt,
    },
  });

  console.log(`User created: ${user.id} ${user.email}`);
}

main();
