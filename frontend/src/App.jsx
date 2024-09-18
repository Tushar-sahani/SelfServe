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
import BlogDetail from "./components/BlogDetail";
import useUserTracking from "./hooks/useUserTracking";
import BlogShimmer from "./components/BlogShimmer";
import { lazy, Suspense } from "react";
import UserProfile from "./views/UserProfile";
import EditPost from "./views/EditedPost";
import NotFound from "./components/404";
import SearchResults from "./components/SearchResult";
import PostPage from "./views/PostPage";
import {Toaster} from "react-hot-toast"
const Blog = lazy(() => import("./views/Blog"));

function App() {
  useUserTracking();
  return (
    <Router basename="/selfserve">
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/*" element={<Hero />}>
          <Route path="" element={<PostPage />} />
          <Route path="search" element={<SearchResults />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/new/:category" element={<CreatePost />} />
        <Route path="/edit/:category/:id" element={<EditPost />} />
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

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
