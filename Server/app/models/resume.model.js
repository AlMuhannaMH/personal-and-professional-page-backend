const mongoose = require("mongoose");

//Define User Schema 
const ResumeSchema = new mongoose.Schema({
    workCompany: { type: String, required: true },
    workPosition: { type: String, required: true },
    workWebsite: { type: String },
    workStartDate: { type: Date, required: true },
    workEndDate: { type: Date, },
    workSummary: { type: String, required: true },

    volunteerOrganization: { type: String },
    volunteerPosition: { type: String },
    volunteerWebsite: { type: String },
    volunteerStartDate: { type: Date, },
    volunteerEndDate: { type: Date },
    volunteerSummary: { type: String },

    educationInstitution: { type: String, required: true },
    educationMajor: { type: String, required: true },
    educationStudyType: { type: String, required: true },
    educationStartDate: { type: Date, required: true },
    educationEndDate: { type: Date, required: true },
    educationGpa: Number,
    educationSummary: { type: String },

    skillsName: { type: String },
    skillsLevel: { type: String },

    languageName: { type: String },
    languageFluency: { type: String }

},
    { timestamps: true }
);

//Compile our Model
const Resume = mongoose.model("Resume", ResumeSchema);

//Export our Model
module.exports = Resume;