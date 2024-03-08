import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Filter</h2><hr></hr>
      <div className="filter-option">
        <label>Sort by:</label>
        <div className="radio-options">
          <label htmlFor="sortByRecently">
            <input type="radio" id="sortByRecently" name="sortBy" value="recently" /> Recently
          </label>
          <label htmlFor="sortByAZ">
            <input type="radio" id="sortByAZ" name="sortBy" value="az" /> A-Z
          </label>
          <label htmlFor="sortByTopSalary">
            <input type="radio" id="sortByTopSalary" name="sortBy" value="topSalary" /> Top Salary
          </label>
          <label htmlFor="sortByRating">
            <input type="radio" id="sortByRating" name="sortBy" value="rating" /> Rating
          </label>
        </div>
      </div><hr></hr>
      <div className="filter-option">
        <label>Job type:</label>
        <div className="checkbox-options">
          <label htmlFor="fullTime">
            <input type="checkbox" id="fullTime" name="jobType" value="fullTime" /> Full time
          </label>
          <label htmlFor="partTime">
            <input type="checkbox" id="partTime" name="jobType" value="partTime" /> Part time
          </label>
          <label htmlFor="internship">
            <input type="checkbox" id="internship" name="jobType" value="internship" /> Internship
          </label>
          <label htmlFor="volunteer">
            <input type="checkbox" id="volunteer" name="jobType" value="volunteer" /> Volunteer
          </label>
        </div>
      </div><hr></hr>
      <div className="filter-option">
        <label>Experience:</label>
        <div className="checkbox-options">
          <label htmlFor="fresher">
            <input type="checkbox" id="fresher" name="experience" value="fresher" /> Fresher
          </label>
          <label htmlFor="beginner">
            <input type="checkbox" id="beginner" name="experience" value="beginner" /> Beginner
          </label>
          <label htmlFor="intermediate">
            <input type="checkbox" id="intermediate" name="experience" value="intermediate" /> Intermediate
          </label>
          <label htmlFor="expert">
            <input type="checkbox" id="expert" name="experience" value="expert" /> Expert
          </label>
        </div>
      </div><hr></hr>
      <div className="filter-option">
        <label>Position:</label>
        <div className="checkbox-options">
          <label htmlFor="onsite">
            <input type="checkbox" id="onsite" name="position" value="onsite" /> Onsite
          </label>
          <label htmlFor="remote">
            <input type="checkbox" id="remote" name="position" value="remote" /> Remote
          </label>
          <label htmlFor="hybrid">
            <input type="checkbox" id="hybrid" name="position" value="hybrid" /> Hybrid
          </label>
        </div>
      </div><hr></hr>
    </div>
  );
};

export default Sidebar;
