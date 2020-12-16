const mongoose = require("mongoose");
const News = mongoose.model("news");


// Create a new newsletter
exports.create = async (req, res) => {
    console.log('Creating a new newsletter')
    console.log(req.user.id)
    console.log(req.body)
    try {
        const { title, text } = req.body
        if(!title, !text ) {
            return res.status(422).json({ error: "Please add all the fields" });
        }
        const newsletter = await new News({
            title,
            text,
            createdBY: req.user.id,
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
    console.log('Get all newsletters')
    try {
        const newsletters = await News.find({ active : true })
        res.json({ newsletters })
        console.log(newsletters)
        return res.status(200);
    } catch (error) {
        console.log(error)
        res.status(500).json({ failed: true, message: 'Failed to get newsletters '})
    }
}

// Change status of Newsletter

// Delete newsletter

// Update newsletter