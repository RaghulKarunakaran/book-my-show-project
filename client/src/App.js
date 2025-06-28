import './App.css';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import SingleMovie from "./pages/SingleMovie";
import BookShow from './pages/BookShow';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

          <Route path="/movie/:id" element={
            <ProtectedRoute>
              <SingleMovie />
            </ ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book-show/:id" element={
            <ProtectedRoute>
              <BookShow />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
