import { prisma } from "../prisma";

// Checks session token and returns user object
export async function checkSession(request: any) {
  const token = request.headers.authorization!.split(" ")[1];

  let session = await prisma.session.findUnique({
    where: {
      sessionToken: token,
    },
  });

  let user = await prisma.user.findUnique({
    where: { id: session!.userId },
  });

  return user;
}
