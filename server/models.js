import mongoose from "mongoose";

let models = {};

main().catch(err => console.log(err));

async function main() {
    console.log('Connecting to database...');
    await mongoose.connect(`mongodb+srv://shima:${process.env.MONGO_PW}@shima-website.1q7b4aj.mongodb.net/`);
    console.log('Success!');

    const WorkshopSchema = new mongoose.Schema({
        name: String,
        date: {type: Date, default: Date.now},
        description: String,
        speaker: String,
        flyer: String,
        recordLink: String
    });

    const UserSchema = new mongoose.Schema({
        username: String,
        firstName: String,
        email: String,
        lastName: String,
        password: String,
        membershipType: {type: String, default: "none"},
        customerId: {type: String, default: "none"},
        paidWorkshops: [WorkshopSchema]
    });

    const BoardMemberSchema = new mongoose.Schema({
        imageURL: String,
        about: String,
        degree: [String],
        currJob: String
    });

    models.User = mongoose.model('User', UserSchema);
    models.BoardMembers = mongoose.model('BoardMembers', BoardMemberSchema);

    console.log('Models created');
}

export default models