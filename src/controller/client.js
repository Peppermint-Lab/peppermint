const mongoose = require("mongoose");
const Client = mongoose.model("Clients");

exports.create = async (req, res) => {
  try {
    const { email, name, contactName, number } = req.body;
    if (!email || !name || !contactName || !number) {
      return res.status(422).json({ error: "Please add all fields" });
    }
    await Client.findOne({ name: name }).then((dupeClient) => {
      if (dupeClient) {
        return res.status(422).json({ error: "client already exists" });
      }
      const client = new Client({
        name,
        email,
        contactName,
        number,
      });
      client
        .save()
        .then(() => {
          res.status(200).json({ message: "Client saved successfully" });
        })
        .catch((err) => {
          console.log(err);
          res.json({ err });
        });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAll = async (req, res) => {
  //c console.log('getAll')
  try {
    const client = await Client.find();
    // console.log(client)
    res.status(200).json({ client });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.updateClient = async (req, res) => {
  console.log("Update Client Api");
  console.log(req.body);

  try {
    await Client.findByIdAndUpdate({
      _id: mongoose.Types.ObjectId(req.body.id),
    },
      {
        $set: {
          name: req.body.clientName,
          contactName: req.body.name,
          email: req.body.email,
          number: req.body.number,
        }
    }, { new: true }).exec();
  } catch (error) {}
};

exports.deleteClient = async (req, res) => {
  console.log("Delete Client");
  try {
    const client = await new mongoose.Types.ObjectId(req.params.id);
    if (!client) {
      return res.status(404).json({
        success: false,
        error: "Client not found",
      });
    }
    await Client.findOneAndDelete({ _id: req.params.id });
    return res.status(201);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
