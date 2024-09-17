const mongoose = require("mongoose");
const { ObjectId } = require('mongodb')
mongoose.connect("mongodb://localhost:27017/logInForm", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

const logInSchema = {
   name: String,
   password: String
}

const collection = new mongoose.model("logInCollection", logInSchema)


const signpost = async (req, res) => {
   const data = {
      name: req.body.name,
      password: req.body.password
   }
   await collection.insertMany([data])
   res.render('home')
}

const logpost = async (req, res) => {
   try {
      const check = await collection.findOne({ name: req.body.name })
      if (check.password === req.body.password) {
         res.render("home")
      }
      else {
         res.send("Wrong Password")
      }
   }

   catch {
      res.send("Wrong Details")
   }
};



module.exports = { collection, logpost ,signpost};