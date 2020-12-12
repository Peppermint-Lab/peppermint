const mongoose = require("mongoose");
const Client = mongoose.model("Clients");

exports.create = async (req, res) => {
    try {
        const { email, name, contactName, number } = req.body;
        if ((!email || !name || !contactName || !number)) {
            return res.status(422).json({ error: "Please add all fields" });
          }
        await Client.findOne({ name: name }).then((dupeClient) => {
            if (dupeClient) {
              return res
                .status(422)
                .json({ error: "client already exists" });
            }
            const client = new Client({
                name,
                email,
                contactName,
                number
            });
            client.save()
            .then((client) => {
                res.status(200).json({message: "Client saved successfully"});
            })
            .catch((err) => {
                console.log(err);
                res.json({ err });
              });
          });
    } catch (error) {
        console.log(error)
    }
}

exports.getAll = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}