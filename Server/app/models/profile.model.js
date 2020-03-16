const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Define User Schema 
const ProfileSchema = new mongoose.Schema(
    {
        basics: {
            username: {
                type: String,
                required: true,
                unique: true
            },
            label: String,
            email: String,
            phone: Number,
            website: String,
            summary: String,
            network: String,
            url: String,
        },

    },
    { timestamps: true }
);

//Compile our Model
const Profile = mongoose.model("Profile", ProfileSchema);

//Export our Model
module.exports = Profile;