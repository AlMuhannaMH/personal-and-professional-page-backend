const mongoose = require("mongoose");

//Define User Schema 
const ProfileSchema = new mongoose.Schema(
    {
        basics: {
            name: String,
            label: String,
            picture: String,
            email: String,
            phone: Number,
            website: String,
            summary: String,
            profiles: [{
                network: String,
                username: String,
                url: String,
            }]
        },
        //user object Schema
        user: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    { timestamps: true }
);

//Compile our Model
const Profile = mongoose.model("Profile", ProfileSchema);

//Export our Model
module.exports = Profile;