import "./App.css";
import Hero from "../src/views/Hero";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CreatePost from "./views/CreatePost";
import PostDetail from "./components/PostDetail";
import ProfilePage from "./views/ProfilePage";
import BlogDetail from "./components/BlogDetail"
import useUserTracking from "./hooks/useUserTracking";
// import Blog from "./views/Blog";
import BlogShimmer from "./components/BlogShimmer";
import { ToastContainer } from "react-toastify";
import { lazy, Suspense } from "react";
import UserProfile from "./views/UserProfile";
import EditPost from "./views/EditedPost";

const Blog = lazy(() => import("./views/Blog"));

function App() {
  useUserTracking();
  return (
    <Router basename="/selfserve">
      <Navbar />
      <ToastContainer pauseOnHover={false} />
      <Routes>
        <Route path="" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/new/:category" element={<CreatePost />}/>
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route
          path="/blog"
          element={
            <Suspense fallback={<BlogShimmer />}>
              <Blog />
            </Suspense>
          }
        />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
