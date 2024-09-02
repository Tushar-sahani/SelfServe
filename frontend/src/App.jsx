import "./App.css";
import Hero from "../src/views/Hero";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CreatePost from "./views/CreatePost";
import PostDetail from "./components/PostDetail";
import Blog from "./views/Blog";
function App() {
  return (
    <Router basename="/selfserve">
      <Navbar />
      <Routes>
        <Route path="" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/new" element={<CreatePost />} />
        <Route path="/post" element={<PostDetail />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
