// Import necessary modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");

// Initialize Express app
const app = express();

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
mongoose
  .connect("mongodb://localhost:27017/jobportal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Terminate the application on connection error
  });

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Specify single origin instead of array if only one origin is allowed
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/", authRoutes);

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
  questions: [String],
}, { collection: 'JobPostData' });

// Create the model
const JobPostData = mongoose.model("JobPostData", jobPostDataSchema);

// Handle POST request to add new data
app.post("/newdata", upload.single("photo"), async (req, res) => {
  try {
    let photo = null;
    if (req.file) {
      photo = req.file.filename;
    }

    const newData = new JobPostData({
      name: req.body.name,
      email: req.body.email,
      photo: photo,
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
      questions: [req.body.question1, req.body.question2, req.body.question3, req.body.question4]
    });

    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    console.error("Error adding new data:", error);
    res.status(500).json({ message: "Failed to add new data" });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
