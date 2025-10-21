import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./Context/AuthContext";
import SignUp from "./components/common/SignUp";
import SignIn from "./components/common/SignIn";
import Dashboard from "./components/Users/Dashboard";
import { useContext } from "react"; 
import Post from "./components/Users/Post";
import AdminUsersManage from "./components/Admin/AdminUserManage";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

function App() {
  return (
    
    <AuthProvider>
      <Router>
    
           <Navbar />
      
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
           <Route path="/" element={<Dashboard />} />
           <Route path="*" element={<Navigate to="/signin" />} />
           <Route path="/post" element={<Post/>} />
           <Route path ="/AdminUserManage" element={<AdminUsersManage/>}/>



          <Route
            path="/post"
            element={
              <ProtectedRoute>
                <Post/>
              </ProtectedRoute>
            }
          />
         
        </Routes>
      </Router>
      <Footer/>
    </AuthProvider>
  );
}

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/signin" />;
  return children;
};

export default App;
