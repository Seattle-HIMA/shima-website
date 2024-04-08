const mongoose = require('mongoose');

let models = {};

main().catch(err => console.log(err));

async function main() {
  console.log('Connecting to database...');
  await mongoose.connect(`mongodb+srv://shima:${process.env.MONGO_PW}@shima-website.1q7b4aj.mongodb.net/`);
  console.log('Success!');

  const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    profilePhoto: String,
    membership: String,
    paidWorkshops: [WorkshopSchema],
  });

  const BoardMemberSchema = new mongoose.Schema({
    username: String,
    password: String,
    imageURL: String,
    about: String,
    degree: [String],
    currJob: String
  });

  const WorkshopSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now },
    description: String,
    speaker: String,
    flyer: String,
    recordLink: String
  });

  models.User = mongoose.model('User', UserSchema);
  models.User = mongoose.model('Board', BoardMemberSchema);

  console.log('Models created');
}

module.exports = models;