import React from "react";
import Nav from "./components/Nav";
import "./App.css";
import { BrowserRouter  } from "react-router-dom";
const App = () => {
  return (
    <div className="App">
      <Nav />
    </div>
  );
};
export default App;

// // Vendor imports
// import { Routes, Route, useLocation } from "react-router-dom";
// import { AnimatePresence } from "framer-motion";

// // Project imports
// //Components
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import ContactAction from "./components/ContactAction";
// import Acknowledgement from "./components/Acknowledgement";
// import GradientStarBackground from "./components/GradientStarBackground";

// //Pages
// import Home from "./pages/Home";
// import Values from "./pages/Values";
// import Services from "./pages/Services";
// import Work from "./pages/Work";
// import Contact from "./pages/Contact";
// import Team from "./pages/Team";
// import NotFound from "./pages/NotFound";
// import About from "./pages/About";
// import Privacy from "./pages/Privacy";
// import CavalloCares from "./pages/CavalloCares";
// import Articles from "./pages/Articles";
// import ArticlePost from "./pages/ArticlePost";

// function App() {
//   const location = useLocation();

//   return (
//     <div className="App">
//       <Header />
//       <AnimatePresence mode="wait">
//         <Routes>
//           <Route path="/" element={<Home />}></Route>
//           <Route path="/about" element={<About />}></Route>
//           <Route path="/about/values" element={<Values />}></Route>
//           <Route path="/about/team" element={<Team />}></Route>
//           <Route path="/services" element={<Services />}></Route>
//           <Route path="/work" element={<Work />}></Route>
//           <Route path="/contact" element={<Contact />}></Route>
//           <Route path="/privacy-policy" element={<Privacy />}></Route>
//           <Route path="/about/cavallo-cares" element={<CavalloCares />}></Route>
//           <Route path="*" element={<NotFound />}></Route>
//           <Route path="/articles" element={<Articles />}></Route>
//           <Route path="/articles/:id" element={<ArticlePost />}></Route>
//         </Routes>
//       </AnimatePresence>
//       {location.pathname !== "/contact" && <ContactAction />}
//       <Acknowledgement />
//       <GradientStarBackground />
//       <Footer />
//     </div>
//   );
// }

// export default App;