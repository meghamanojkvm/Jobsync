import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";

function App() {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const handleStorage = () => {
  //     // Place for a function responsible for
  //     // pulling and displaying local storage data
  //     const userData = localStorage.getItem('user');
  //     setUser(userData);
  //   };

  //   window.addEventListener('storage', handleStorage());
  //   return () => window.removeEventListener('storage', handleStorage());
  // }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
