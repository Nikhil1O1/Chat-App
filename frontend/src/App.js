import './App.css';
import Navigation from './components/Navigation';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/chat" element = {<Chat/>}/>
        <Route path="/signup" element = {<Signup/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App;
