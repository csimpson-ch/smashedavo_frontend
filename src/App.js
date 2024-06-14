import Index from "./components/Index";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import BlogPosts from "./components/BlogPosts";
import Expenses from "./components/Expenses";
import RegularPayments from "./components/RegularPayments";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/blog" element={<BlogPosts />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/regularpayments" element={<RegularPayments />} />
    </Routes>
  );
}

export default App;
