import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set filename with timestamp to avoid duplicates
  },
});

const upload = multer({ storage: storage });

// MongoDB connection
mongoose.connect("mongodb+srv://ks:FBL3CkPJITXPtlqV@cluster0.hhl4xxj.mongodb.net/jobportel", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("DB connected");
}).catch((error) => {
  console.error("Error connecting to database:", error);
});

// Define the schema
const jobPostDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  photo: String,
  jobPostingHeadline: String,
  employmentType: String,
  jobDescription: String,
  keySkills: String,
  workExperience: String,
  minSalary: Number,
  maxSalary: Number,
  candidateProfile: String,
  location: String,
  industry: String,
  functionalArea: String,
  role: String,
  referenceCode: String,
  numberOfVacancies: Number,
  educationQualification: String,
  walkingInterview: Boolean,
  question1: String,
  question2: String, // Add question2 field
  question3: String, // Add question3 field
  question4: String  // Add question4 field
}, { collection: 'JobPostData' }); // Specify the collection name explicitly

// Create the model
const JobPostData = mongoose.model("JobPostData", jobPostDataSchema);

// Handle POST request to add new data
app.post("/newdata", upload.single("photo"), async (req, res) => {
  try {
    const newData = new JobPostData({
      name: req.body.name,
      email: req.body.email,
      photo: req.file.filename,
      jobPostingHeadline: req.body.jobPostingHeadline,
      employmentType: req.body.employmentType,
      jobDescription: req.body.jobDescription,
      keySkills: req.body.keySkills,
      workExperience: req.body.workExperience,
      minSalary: req.body.minSalary,
      maxSalary: req.body.maxSalary,
      candidateProfile: req.body.candidateProfile,
      location: req.body.location,
      industry: req.body.industry,
      functionalArea: req.body.functionalArea,
      role: req.body.role,
      referenceCode: req.body.referenceCode,
      numberOfVacancies: req.body.numberOfVacancies,
      educationQualification: req.body.educationQualification,
      walkingInterview: req.body.walkingInterview,
      question1: req.body.question1,
      question2: req.body.question2, // Assign question2
      question3: req.body.question3, // Assign question3
      question4: req.body.question4  // Assign question4
    });
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    console.error("Error adding new data:", error);
    res.status(500).json({ message: "Failed to add new data" });
  }
});

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

// Start the server
app.listen(9002, () => {
  console.log("BE Started at port 9002");
});
