import mongoose from "mongoose";
import { MONGO_PW } from "./constants.js";

let models = {};

main().catch(err => console.error(err));

async function main() {
    console.log('Connecting to database...');
    await mongoose.connect(`mongodb+srv://shima:${MONGO_PW}@shima-website.1q7b4aj.mongodb.net/`);
    console.log('...Success!');

    const WorkshopSchema = new mongoose.Schema({
        name: String,
        date: {type: Date, default: Date.now},
        description: String,
        speaker: String,
        flyer: String,
        attendee: [String],
        recordLink: String
    });

    const UserSchema = new mongoose.Schema({
        email: String,
        firstName: String,
        lastName: String,
        membershipType: {type: String, default: "none"},
        expireDate: Date,
        registeredEvents: [String],
        registeredPastRecordings: [String]
    });

    const BoardMemberSchema = new mongoose.Schema({
        firstName: String,
        lastName: String,
        position: String,
        imageURL: {type: String, default: "profile-photo.png"},
        about: String,
        degree: [String],
        currJob: String,
        linkedIn: String
    });

    models.User = mongoose.model('User', UserSchema);
    models.BoardMembers = mongoose.model('BoardMembers', BoardMemberSchema);
    models.Workshops = mongoose.model('Workshops', WorkshopSchema);
    console.log('Models created');
}

export default models;
