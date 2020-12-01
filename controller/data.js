const mongoose = require("mongoose");
const TicketSchema = mongoose.model("TicketSchema");

exports.countUnissuedTickets = (req, res) => {
    // console.log("Data api HIT")
     TicketSchema.count({ status: 'unissued'})
     .then(result => {
         res.json({result})
     })
     .catch (err => {
         console.log(err)
       })
 }
 
 exports.countOpenedTickets = (req, res) => {
    // console.log("Data api HIT")
     TicketSchema.count({ status: 'open'})
     .then(result => {
         res.json({result})
     })
     .catch (err => {
         console.log(err)
       })
 }
 
 exports.countCompletedTickets = (req, res) => {
     // console.log("Data api HIT")
      TicketSchema.count({ status: 'completed'})
      .then(result => {
          res.json({result})
      })
      .catch (err => {
          console.log(err)
        })
  }