const mongoose = require("mongoose");

//Define User Schema 
const ResumeSchema = new mongoose.Schema(
    {
        work: [{
            company: { type: String, required: true },
            position: { type: String, required: true },
            website: { type: String },
            startDate: { type: Date, required: true },
            endDate: { type: Date, },
            summary: { type: String, required: true },
        }],
        volunteer: [{
            organization: { type: String },
            position: { type: String },
            website: { type: String },
            startDate: { type: Date, },
            endDate: { type: Date },
            summary: { type: String },
        }],
        education: [{
            institution: { type: String, required: true },
            major: { type: String, required: true },
            studyType: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true },
            gpa: Number,
            summary: { type: String },
        }],
        skills: [{
            name: { type: String },
            level: { type: String },
        }],
        languages: [{
            language: { type: String },
            fluency: { type: String }
        }],
    },
    { timestamps: true }
);

//Compile our Model
const Resume = mongoose.model("Resume", ResumeSchema);

//Export our Model
module.exports = Resume;