const { prisma } = require("../../../../../prisma/prisma");

// query next auth for session id

export default async function unCompleteTicket(req,res) {
  const { id } = req.query

    try {
        await prisma.ticket.update({
          where: { id: Number(id) },
          data: {
            isComplete: false,
            isIssued: true,
            userId: Number(session.id),
          },
        });
    
        
        res.status(200).json({ message: "Ticketed marked as active" });
      } catch (error) {
        console.log(error);
        return res.status(500);
      }
}
