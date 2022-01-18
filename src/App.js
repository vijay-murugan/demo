import Login from './components/login'
import Home from './components/home'
import './App.css';
import {Container} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route  path="/" element = {<Login/>}> 
          </Route>
          <Route path="/home" element = {<Home/>}> 
          </Route>
        </Routes>

        </BrowserRouter>

  );
}
export default App;
