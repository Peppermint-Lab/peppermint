const { prisma } = require("../../../prisma/prisma");

exports.Add = async (req,res) => {
    try {
        console.log(req.body)
        const {name, url, hostname, port, type} = req.body
        const monitor = await prisma.monitor.create({
            data: {
                name,
                url,
                hostname, 
                port: Number(port),
                type,
                Active: true
            }
        })
        console.log(monitor)
        res.status(200).json({monitor, sucess: true})
    } catch (error) {
        console.log(error)
        res.json({error, sucess: false})
    }
}