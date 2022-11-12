import './App.css';
import Homepage from './pages/home/Home';
import Topbar from './components/topbar/TopBar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import SignIn from './pages/signIn/SignIn';
import Login from './pages/login/Login';
import Write from './pages/write/Write';
import Settings from "./pages/settings/Settings";
import Single from './pages/single/Single';
import { Context } from './context/Context';
import { useContext } from 'react';
import Footer from './components/footer/Footer';
function App() {
  const { user } = useContext(Context);
  return (
    <Router>
    <Topbar/>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={user ? <Homepage/> :<SignIn />} />
      <Route path="/login" element={user ? <Homepage/> :<Login />} />
      <Route path="/write" element={user ? <Write/> :<SignIn />} />
      <Route path="/settings" element={user ? <Settings/> :<SignIn />} />
      <Route path="/post/:postId" element={<Single />} />
    </Routes>
<Footer/>
    </Router>
  );
}

export default App;
