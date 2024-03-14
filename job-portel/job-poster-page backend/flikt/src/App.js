import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Homepage from './components/homepage/homepage'; 
import Plan from './components/plan/plan'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Homepage />} /> 
          <Route exact path="/plan" element={<Plan />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
