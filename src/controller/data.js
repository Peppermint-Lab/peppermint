// TODO remove isUnissued from Ticket model and use isIssued (false) instead
// TODO maybe use a utility fun like below to avoid duplication
const { prisma } = require ("../../prisma/prisma");

const filterCount = (filterObj) => {
  return prisma.ticket.count({
    where: filterObj
  })
}

exports.countUnissuedTickets = async (req, res) => {
  await prisma.ticket.count({
    where: { isIssued: false }
  }).then((result) => {
    res.json({ result });
  }).catch((err) => {
    console.log(err);
  });
};

exports.countOpenedTickets = async (req, res) => {
  await prisma.ticket.count({
    where: { isIssued: true, userId: Number(req.user.id) }
  }).then((result) => {
    res.json({ result });
  }).catch((err) => {
    console.log(err);
  });
};

exports.countCompletedTickets = async (req, res) => {
  await prisma.ticket.count({
    where: { isComplete: true, userId: Number(req.user.id) }
  }).then((result) => {
    res.json({ result });
  }).catch((err) => {
    console.log(err);
  });
};

exports.countAllOpenedTickets = async (req, res) => {

  await prisma.ticket.count({
    where: { isIssued: true }
  }).then((result) => {
    res.json({ result });
  }).catch((err) => {
    console.log(err);
  });
};

exports.countAllCompletedTickets = async (req, res) => {
  await prisma.ticket.count({
    where: { isComplete: true }
  }).then((result) => {
    res.json({ result });
  }).catch((err) => {
    console.log(err);
  });
};
