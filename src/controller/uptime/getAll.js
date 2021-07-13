const { prisma } = require("../../../prisma/prisma");

exports.GetAll = async (req, res) => {
    try {
        const monitors = await prisma.monitor.findMany()
        console.log(monitors)
        res.status(200).json({ monitors, sucess: true})
    } catch (error) {
        console.log(error)
        res.json({error, sucess: false})
    }
}