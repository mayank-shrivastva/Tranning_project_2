import React, { useState, useEffect } from "react";
import axios from "axios";
import "./homepage.css";

const Homepage = () => {
  const [users, setUsers] = useState([]);
  const [newData, setNewData] = useState({ 
    name: "", 
    email: "", 
    photo: null, 
    jobPostingHeadline: "", 
    employmentType: "", 
    jobDescription: "", 
    keySkills: "", 
    workExperience: "", 
    minSalary: "", 
    maxSalary: "", 
    candidateProfile: "", 
    location: "", 
    industry: "", 
    functionalArea: "", 
    role: "", 
    referenceCode: "", 
    numberOfVacancies: "", 
    educationQualification: "", 
    walkingInterview: false,
    question1: "",
    question2: "", // Add question2 field
    question3: "", // Add question3 field
    question4: ""  // Add question4 field
  });
  const [errors, setErrors] = useState({ 
    name: "", 
    email: "", 
    photo: "", 
    jobPostingHeadline: "", 
    employmentType: "", 
    jobDescription: "", 
    keySkills: "", 
    workExperience: "", 
    minSalary: "", 
    maxSalary: "", 
    candidateProfile: "", 
    location: "", 
    industry: "", 
    functionalArea: "", 
    role: "", 
    referenceCode: "", 
    numberOfVacancies: "", 
    educationQualification: "", 
    walkingInterview: "",
    question1: "",
    question2: "", // Add question2 error state
    question3: "", // Add question3 error state
    question4: ""  // Add question4 error state
  });

  useEffect(() => {
    fetchNewData();
  }, []);

  const fetchNewData = async () => {
    try {
      const response = await axios.get("http://localhost:9002/newdata");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddData = async () => {
    if (!newData.name.trim() || !newData.email.trim() || !newData.photo || !newData.jobPostingHeadline.trim() || !newData.employmentType.trim() || !newData.jobDescription.trim() || !newData.keySkills.trim() || !newData.workExperience.trim() || !newData.minSalary.trim() || !newData.maxSalary.trim() || !newData.candidateProfile.trim() || !newData.location.trim() || !newData.industry.trim() || !newData.functionalArea.trim() || !newData.role.trim() || !newData.referenceCode.trim() || !newData.numberOfVacancies.trim() || !newData.educationQualification.trim() || !newData.question1.trim() || !newData.question2.trim() || !newData.question3.trim() || !newData.question4.trim()) {
      setErrors({ 
        name: "Name is required", 
        email: "Email is required", 
        photo: "Photo is required",
        jobPostingHeadline: "Job Posting Headline is required",
        employmentType: "Employment Type is required",
        jobDescription: "Job Description is required",
        keySkills: "Key Skills are required",
        workExperience: "Work Experience is required",
        minSalary: "Min Salary is required",
        maxSalary: "Max Salary is required",
        candidateProfile: "Candidate Profile is required",
        location: "Location is required",
        industry: "Industry is required",
        functionalArea: "Functional Area is required",
        role: "Role is required",
        referenceCode: "Reference Code is required",
        numberOfVacancies: "Number of Vacancies is required",
        educationQualification: "Education Qualification is required",
        walkingInterview: "Walking Interview is required",
        question1: "Question 1 is required",
        question2: "Question 2 is required", // Add error message for question2
        question3: "Question 3 is required", // Add error message for question3
        question4: "Question 4 is required"  // Add error message for question4
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", newData.name);
    formData.append("email", newData.email);
    formData.append("photo", newData.photo);
    formData.append("jobPostingHeadline", newData.jobPostingHeadline);
    formData.append("employmentType", newData.employmentType);
    formData.append("jobDescription", newData.jobDescription);
    formData.append("keySkills", newData.keySkills);
    formData.append("workExperience", newData.workExperience);
    formData.append("minSalary", newData.minSalary);
    formData.append("maxSalary", newData.maxSalary);
    formData.append("candidateProfile", newData.candidateProfile);
    formData.append("location", newData.location);
    formData.append("industry", newData.industry);
    formData.append("functionalArea", newData.functionalArea);
    formData.append("role", newData.role);
    formData.append("referenceCode", newData.referenceCode);
    formData.append("numberOfVacancies", newData.numberOfVacancies);
    formData.append("educationQualification", newData.educationQualification);
    formData.append("walkingInterview", newData.walkingInterview);
    formData.append("question1", newData.question1);
    formData.append("question2", newData.question2); // Append question2 to formData
    formData.append("question3", newData.question3); // Append question3 to formData
    formData.append("question4", newData.question4); // Append question4 to formData

    try {
      await axios.post("http://localhost:9002/newdata", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setNewData({ 
        name: "", 
        email: "", 
        photo: null, 
        jobPostingHeadline: "", 
        employmentType: "", 
        jobDescription: "", 
        keySkills: "", 
        workExperience: "", 
        minSalary: "", 
        maxSalary: "", 
        candidateProfile: "", 
        location: "", 
        industry: "", 
        functionalArea: "", 
        role: "", 
        referenceCode: "", 
        numberOfVacancies: "", 
        educationQualification: "", 
        walkingInterview: false,
        question1: "",
        question2: "", // Reset question2 after successful submission
        question3: "", // Reset question3 after successful submission
        question4: ""  // Reset question4 after successful submission
      });
      fetchNewData();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleFormChange = (e) => {
    if (e.target.name === "photo") {
      setNewData({ ...newData, photo: e.target.files[0] });
    } else if (e.target.name === "walkingInterview") {
      setNewData({ ...newData, walkingInterview: e.target.checked });
    } else {
      setNewData({ ...newData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="homepage">
      <h1>Job post</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newData.name}
          onChange={handleFormChange}
        />
        {errors.name && <div className="error">{errors.name}</div>}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={newData.email}
          onChange={handleFormChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}
        <input
          type="text"
          placeholder="Job Posting Headline"
          name="jobPostingHeadline"
          value={newData.jobPostingHeadline}
          onChange={handleFormChange}
        />
        {errors.jobPostingHeadline && <div className="error">{errors.jobPostingHeadline}</div>}
        <input
          type="text"
          placeholder="Employment Type"
          name="employmentType"
          value={newData.employmentType}
          onChange={handleFormChange}
        />
        {errors.employmentType && <div className="error">{errors.employmentType}</div>}
        <textarea
          placeholder="Job Description"
          name="jobDescription"
          value={newData.jobDescription}
          onChange={handleFormChange}
        />
        {errors.jobDescription && <div className="error">{errors.jobDescription}</div>}
        <input
          type="text"
          placeholder="Key Skills"
          name="keySkills"
          value={newData.keySkills}
          onChange={handleFormChange}
        />
        {errors.keySkills && <div className="error">{errors.keySkills}</div>}
        <input
          type="text"
          placeholder="Work Experience"
          name="workExperience"
          value={newData.workExperience}
          onChange={handleFormChange}
        />
        {errors.workExperience && <div className="error">{errors.workExperience}</div>}
        <input
          type="text"
          placeholder="Min Salary"
          name="minSalary"
          value={newData.minSalary}
          onChange={handleFormChange}
        />
        {errors.minSalary && <div className="error">{errors.minSalary}</div>}
        <input
          type="text"
          placeholder="Max Salary"
          name="maxSalary"
          value={newData.maxSalary}
          onChange={handleFormChange}
        />
        {errors.maxSalary && <div className="error">{errors.maxSalary}</div>}
        <textarea
          placeholder="Candidate Profile"
          name="candidateProfile"
          value={newData.candidateProfile}
          onChange={handleFormChange}
        />
        {errors.candidateProfile && <div className="error">{errors.candidateProfile}</div>}
        <input
          type="text"
          placeholder="Location"
          name="location"
          value={newData.location}
          onChange={handleFormChange}
        />
        {errors.location && <div className="error">{errors.location}</div>}
        <input
          type="text"
          placeholder="Industry"
          name="industry"
          value={newData.industry}
          onChange={handleFormChange}
        />
        {errors.industry && <div className="error">{errors.industry}</div>}
        <input
          type="text"
          placeholder="Functional Area"
          name="functionalArea"
          value={newData.functionalArea}
          onChange={handleFormChange}
        />
        {errors.functionalArea && <div className="error">{errors.functionalArea}</div>}
        <input
          type="text"
          placeholder="Role"
          name="role"
          value={newData.role}
          onChange={handleFormChange}
        />
        {errors.role && <div className="error">{errors.role}</div>}
        <input
          type="text"
          placeholder="Reference Code"
          name="referenceCode"
          value={newData.referenceCode}
          onChange={handleFormChange}
        />
        {errors.referenceCode && <div className="error">{errors.referenceCode}</div>}
        <input
          type="text"
          placeholder="Number of Vacancies"
          name="numberOfVacancies"
          value={newData.numberOfVacancies}
          onChange={handleFormChange}
        />
        {errors.numberOfVacancies && <div className="error">{errors.numberOfVacancies}</div>}
        <input
          type="text"
          placeholder="Education Qualification"
          name="educationQualification"
          value={newData.educationQualification}
          onChange={handleFormChange}
        />
        {errors.educationQualification && <div className="error">{errors.educationQualification}</div>}
        <input
          type="text"
          placeholder="Question 1"
          name="question1"
          value={newData.question1}
          onChange={handleFormChange}
        />
        {errors.question1 && <div className="error">{errors.question1}</div>}
        <input
          type="text"
          placeholder="Question 2" // New input field for question 2
          name="question2"
          value={newData.question2}
          onChange={handleFormChange}
        />
        {errors.question2 && <div className="error">{errors.question2}</div>}
        <input
          type="text"
          placeholder="Question 3" // New input field for question 3
          name="question3"
          value={newData.question3}
          onChange={handleFormChange}
        />
        {errors.question3 && <div className="error">{errors.question3}</div>}
        <input
          type="text"
          placeholder="Question 4" // New input field for question 4
          name="question4"
          value={newData.question4}
          onChange={handleFormChange}
        />
        {errors.question4 && <div className="error">{errors.question4}</div>}
        <label>
          Walking Interview: 
          <input
            type="checkbox"
            name="walkingInterview"
            checked={newData.walkingInterview}
            onChange={handleFormChange}
          />
        </label>
        {errors.walkingInterview && <div className="error">{errors.walkingInterview}</div>}
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleFormChange}
        />
        {errors.photo && <div className="error">{errors.photo}</div>}
        <button onClick={handleAddData}>Add Data</button>
      </div>
      {/* Remainder of your component code */}
    </div>
  );
};

export default Homepage;
