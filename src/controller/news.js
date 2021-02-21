const mongoose = require("mongoose");
const News = mongoose.model("news");

// Create a new newsletter
exports.create = async (req, res) => {
    try {
        const { title, text, active } = req.body
        if(!title, !text ) {
            return res.status(422).json({ error: "Please add all the fields" });
        }
        const newsletter = await new News({
            title,
            text,
            createdBy: req.user.id,
            active
        });
        newsletter.save().then((newsletter) => {
            res.status(200).json({ failed: false, newsletter })
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ failed: true, message: 'Failed to create '})
    }
}

// Get All newsletters
exports.getNewsletters = async (req, res) => {
    try {
        const newsletters = await News.find()
        .populate('createdBy', '_id name')
        res.json({ newsletters })
        console.log(newsletters)
        return res.status(200);
    } catch (error) {
        console.log(error)
        res.status(500).json({ failed: true, message: 'Failed to get newsletters '})
    }
}

// Change status of Newsletter
exports.updateStatus = async (req, res) => {
    try {
        await News.find(
            { _id : req.body.id },
            {
                $set: {
                    title : req.body.title,
                    text: req.body.text,
                    active: req.body.active
                }
            }, { new: true }
            ).exec();
            console.log("Updated record");
            res.status(200)
    } catch (error) {
        console.log(error)
        res.status(500).json({ failed: true, message: 'Failed to update '})
    }
}

// Delete newsletter
exports.deleteN = async (req, res) => {
    try {
        await News.findByIdAndDelete({ id: req.params.id})
        const newsletters = await News.find()
        .populate('createdBy', '_id name')
        res.json({ newsletters })
        console.log(newsletters)
        return res.status(200);
    } catch (error) {
        console.log(error)
        res.status(500).json({ failed: true, message: 'Failed to delete '})
    }
}