import React from 'react';
import Navbar from './components/navbar/navbar';
import { Routes, Route, Router } from "react-router-dom";
import Recruiter from './components/pages/recruiter';
// import Home from './components/pages/home';

const App = () => {

  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = React.useState(current_theme ? current_theme : "light");

  React.useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme])

  return (
    <div className={`container ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default App;