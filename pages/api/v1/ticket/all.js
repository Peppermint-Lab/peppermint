export default async function allTickets() {
  try {
    await prisma.ticket
      .findMany({
        include: {
          client: {
            select: { id: true, name: true },
          },
          assignedTo: {
            select: { id: true, firstName: true, lastName: true },
          },
        },
      })
      .then((tickets) => {
        res.status(200).json({ tickets });
      });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}
