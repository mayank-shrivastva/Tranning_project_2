import React from 'react';
import './plan.css';

function Plan() {
  return (
    <div><br></br>
   <center><h1><u>Our plans</u></h1></center> 
    
    <div className="con-items">
    
      <div className="item item1">
        <div className="con-img">
        </div>
        <header>
          <h3>Basic</h3>
          <p>
            <b>
              200 Rs
            </b>
          </p>
        </header>
        <ul>
          <li>
            <i className='bx bx-check'></i>
           Your post is show upto <b>200 users</b>
          </li>
           
        </ul>
        <button>
          Choose Plan 
        </button>
      </div>
      <div className="item color item2">
        <div className="con-img">
        </div>
        <span className="badge">
          Popular
        </span>
        <header>
          <h3>Startup</h3>
          <p>
            <b>
              400 Rs
            </b>
          </p>
        </header>
        <ul>
          <li>
            <i className='bx bx-check'></i>
           Your post is show upto <b>500 users</b>
          </li>
           
        </ul>
        <button className="border">
          Choose Plan 
        </button>
      </div>
      <div className="item item3">
        <div className="con-img">
        </div>
        <header>
          <h3>Enterprise</h3>
          <p>
            <b>
              600 RS
            </b>
          </p>
        </header>
        <ul>
          <li>
            <i className='bx bx-check'></i>
           Your post is show upto <b>1000 users</b>
          </li>
           
        </ul>
        <button>
          Choose Plan 
        </button>
      </div>
      </div>
    </div>
  );
}

export default Plan;
