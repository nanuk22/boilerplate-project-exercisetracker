const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const mySecret = process.env['mongodb']

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});

mongoose.connect(mySecret).then((connection) => {
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

app.use(express.urlencoded({ extended: true }));

app.post("/api/users", function(req, res, next) {
  const username = req.body.username;
  console.log(username);
  const createAndSaveUsername = (done) => {
        let newUser = new User({ username: username });
        newUser.save(function(err, data) {
          if (err) return console.error(err);
          done(null, data)
        });
      };
  createAndSaveUsername((err, data) => {
        res.json({ username: data.username, _id: data.id });
      });
})

