import Login from './components/login'
import Home from './components/home'
import './App.css';
import {Container} from 'react-bootstrap';
import {BrowserRouter,Routes ,Route} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
    <Route path = '/' component = {Home}></Route>
    </BrowserRouter>
  );
}
export default App;
