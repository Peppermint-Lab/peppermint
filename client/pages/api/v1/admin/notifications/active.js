const { prisma } = require("../../../../../prisma/prisma");
import { getSession } from "next-auth/react";

// Send back notifcation status's to the client

export default async function handler(req,res) {
    const session = await getSession({ req });

    try {
        if (session.user) {
            if (session.user.isAdmin) {
                const emails = await prisma.email.findMany(); 

                res.status(200).json({ success: true, emails: emails[0] });
            } else {
                res.status(403).json({ error: "Forbidden" });
            }
        } else {
            res.status(403).json({ error: "Not authorized" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", error: error });
    }
}