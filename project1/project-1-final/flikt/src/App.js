import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Login from './components/login/login';  
import Register from './components/register/register'; 
import Homepage from './components/homepage/homepage'; 
import NotFound from './components/NotFound/NotFound';

function App() {
  
  return (
    <Router>
      <div className="App">
       <Routes>
        <Route  path="/login" element={<Login />} /> 
          <Route  path="/" element={<Register />} /> 
          
          <Route  exect path="/homepage" element={<Homepage />} /> 
          <Route path="*" element={<NotFound />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
