const { prisma } = require("../../../../prisma/prisma");
import { getSession } from "next-auth/react"


export default async function create(req, res) {
  const session = await getSession({ req })

  const { todo } = JSON.parse(req.body);

  try {

    if (!todo) {
      console.log("No text found!");
      return res.status(422);
    } else {
      await prisma.todos.create({
        data: {
          text: todo,
          userId: session.id,
        },
      });
      res.status(201).json({ success: true, message: "Ticket saved" });
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
