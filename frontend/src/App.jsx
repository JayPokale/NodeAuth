import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import UserList from "./pages/Dashboard/UserList";
import EditForm from "./components/EditForm";
import Profile from "./pages/Profile/Profile";
import NavBar from "./components/NavBar";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<UserList />} />{" "}
        <Route
          path="/editprofile"
          element={<EditForm apiUrl="/users" redirectPath="/" />}
        />
        <Route
          path="/editprofile/:id"
          element={<EditForm apiUrl="/admin/users" redirectPath="/dashboard" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
