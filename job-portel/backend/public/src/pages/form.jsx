/*import React, { useState } from 'react';
import axios from 'axios';

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photo: '',
    jobPostingHeadline: '',
    employmentType: '',
    jobDescription: '',
    keySkills: '',
    workExperience: '',
    minSalary: '',
    maxSalary: '',
    candidateProfile: '',
    location: '',
    industry: '',
    functionalArea: '',
    role: '',
    referenceCode: '',
    numberOfVacancies: '',
    educationQualification: '',
    walkingInterview: false,
    question1: '',
    question2: '',
    question3: '',
    question4: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/newdata', formData);
      console.log(response.data);
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        photo: '',
        jobPostingHeadline: '',
        employmentType: '',
        jobDescription: '',
        keySkills: '',
        workExperience: '',
        minSalary: '',
        maxSalary: '',
        candidateProfile: '',
        location: '',
        industry: '',
        functionalArea: '',
        role: '',
        referenceCode: '',
        numberOfVacancies: '',
        educationQualification: '',
        walkingInterview: false,
        question1: '',
        question2: '',
        question3: '',
        question4: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Photo:
        <input
          type="file"
          name="photo"
          value={formData.photo}
          onChange={handleChange}
        />
      </label>
      <label>
        Job Posting Headline:
        <input
          type="text"
          name="jobPostingHeadline"
          value={formData.jobPostingHeadline}
          onChange={handleChange}
        />
      </label>
      <label>
        Employment Type:
        <input
          type="text"
          name="employmentType"
          value={formData.employmentType}
          onChange={handleChange}
        />
      </label>
      <label>
        Job Description:
        <textarea
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleChange}
        />
      </label>
      <label>
        Key Skills:
        <input
          type="text"
          name="keySkills"
          value={formData.keySkills}
          onChange={handleChange}
        />
      </label>
      <label>
        Work Experience:
        <input
          type="text"
          name="workExperience"
          value={formData.workExperience}
          onChange={handleChange}
        />
      </label>
      <label>
        Min Salary:
        <input
          type="number"
          name="minSalary"
          value={formData.minSalary}
          onChange={handleChange}
        />
      </label>
      <label>
        Max Salary:
        <input
          type="number"
          name="maxSalary"
          value={formData.maxSalary}
          onChange={handleChange}
        />
      </label>
      <label>
        Candidate Profile:
        <textarea
          name="candidateProfile"
          value={formData.candidateProfile}
          onChange={handleChange}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </label>
      <label>
        Industry:
        <input
          type="text"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
        />
      </label>
      <label>
        Functional Area:
        <input
          type="text"
          name="functionalArea"
          value={formData.functionalArea}
          onChange={handleChange}
        />
      </label>
      <label>
        Role:
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />
      </label>
      <label>
        Reference Code:
        <input
          type="text"
          name="referenceCode"
          value={formData.referenceCode}
          onChange={handleChange}
        />
      </label>
      <label>
        Number of Vacancies:
        <input
          type="number"
          name="numberOfVacancies"
          value={formData.numberOfVacancies}
          onChange={handleChange}
        />
      </label>
      <label>
        Education Qualification:
        <input
          type="text"
          name="educationQualification"
          value={formData.educationQualification}
          onChange={handleChange}
        />
      </label>
      <label>
        Walking Interview:
        <input
          type="checkbox"
          name="walkingInterview"
          checked={formData.walkingInterview}
          onChange={handleChange}
        />
      </label>
      <label>
        Question 1:
        <input
          type="text"
          name="question1"
          value={formData.question1}
          onChange={handleChange}
        />
      </label>
      <label>
        Question 2:
        <input
          type="text"
          name="question2"
          value={formData.question2}
          onChange={handleChange}
        />
      </label>
      <label>
        Question 3:
        <input
          type="text"
          name="question3"
          value={formData.question3}
          onChange={handleChange}
        />
      </label>
      <label>
        Question 4:
        <input
          type="text"
          name="question4"
          value={formData.question4}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;*/
