import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider, useTheme } from "./ThemeContext";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Favorites from "./pages/Favorites";
import AppNavbar from "./components/AppNavbar";
import "./styles.css";

function App() {
  return (
    <ThemeProvider>
      <Router basename={process.env.PUBLIC_URL}> {/* Add basename */}
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <AppNavbar toggleTheme={toggleTheme} isDarkMode={theme === "dark"} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper component={<Home />} />} />
          <Route path="/movie/:id" element={<PageWrapper component={<MovieDetail />} />} />
          <Route path="/favorites" element={<PageWrapper component={<Favorites />} />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function PageWrapper({ component }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      {component}
    </motion.div>
  );
}

export default App;
