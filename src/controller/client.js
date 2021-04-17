const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');
import { prisma } from "../../prisma/prisma";

exports.create = async (req, res) => {
  try {
    const { email, name, contactName, number } = req.body;
    if (!email || !name || !contactName || !number) {
      return res.status(422).json({ error: "Please add all fields" });
    }

    prisma.client.findUnique({
      where: { name: name }
    }).then((dupeClient) => {
      if (dupeClient) {
        return res.status(422).json({ error: "client already exists" });
      }
      const client = await prisma.client.create({
        data: {
          name,
          email,
          contactName,
          number,
        }
      })
      res.status(200).json({ message: "Client saved successfully", client });
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

exports.getAll = async (req, res) => {
  try {
    const clients = await prisma.client.findMany();
    res.status(200).json({ clients });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.updateClient = async (req, res) => {
  console.log("Update Client Api");
  console.log(req.body);

  try {
    await prisma.client.update({
      where: { id: Number(req.body.id) },
      data: {
        name: req.body.clientName,
        contactName: req.body.name,
        email: req.body.email,
        number: Number(req.body.number),
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.deleteClient = async (req, res) => {
  console.log("Delete Client");
  try {
    await prisma.client.delete({
      where: { id: Number(req.params.id) }
    });
    return res.status(201).json({
      data: {},
    });
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(404).json({
        success: false,
        error: "Client not found.",
      });
    }
    return res.status(500).json({ message: error });
  }
};

exports.createNote = async (req, res) => {
  console.log(req.body);
  try {
    await prisma.client.update({
      where: { id: Number(req.body.id) },
      data: { notes: req.body.note }
    });
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(404).json({
        success: false,
        error: "Client not found.",
      });
    }
    return res.status(500).json({ message: error });
  }
};

exports.getNote = async (req, res) => {
  console.log(req.params.id);
  try {
    const find = await prisma.client.findUnique({
      where: { id: Number(req.params.i) }
    })
    return res.status(200).json({ find });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
