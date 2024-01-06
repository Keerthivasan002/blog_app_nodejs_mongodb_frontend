import Login from "./pages/Login/Login";
import Register from "./pages/Registration/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CreateBlog from "./pages/Create/CreateBlog";
import Home from "./pages/Home/Home";
import Profile from "./pages/MyAccount/Profile";
import UpdateBlog from "./pages/Update/UpdateBlog";
import ViewBlog from "./pages/View/ViewBlog";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="/updateBlog" element={<UpdateBlog />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/viewBlog" element={<ViewBlog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
