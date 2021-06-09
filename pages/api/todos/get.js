const { prisma } = require("../../../prisma/prisma");

// export default async function get(req, res) {
//   try {
//     const todos = await prisma.todos.findMany({
//       where: { userId: 1 },
//       select: {
//         id: true,
//         text: true,
//         done: true,
//       },
//     });
//     console.log(todos)
//     res.json({ todos });
//   } catch (error) {
//     console.log(error);
//   }
// }

export default async function handle(req, res) {
  try {
    const posts = await prisma.ticket.findMany();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(404)
  }
}
