import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login-signup/login";
import Register from "./login-signup/Register";
import Onboarding from "./Service-Provider-Onboarding/ProviderOnboardingPage"
import ServiceDash from "./Service-Home/ProviderListings"
import CreateListing from "./CreateListings/CreateLisiting"
import EditListing from "./EditListing/EditListing"
import Home from "./Home/Home"
import Search from "./SearchResult/SearchResult"


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search-results" element={< Search/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            <Route path="provider/onboard" element={<Onboarding />} />
            <Route path="provider/homepage" element={< ServiceDash/>} />
            <Route path="provider/create" element={< CreateListing/>} />
            <Route path="provider/edit/:id" element={< EditListing/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
