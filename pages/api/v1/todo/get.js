const { prisma } = require("../../../../prisma/prisma");
import { getSession } from "next-auth/react"


export default async function getTodo(req, res) {
  const session = await getSession({ req })

  console.log(session)

  try {
    const todos = await prisma.todos.findMany({
      where: { userId: session.id },
      select: {
        id: true,
        text: true,
        done: true,
      },
    });

    res.status(201).json({ success: true, message: "Todo saved", todos });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
