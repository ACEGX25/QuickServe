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
import BookingCalendar from "./components/BookingCalendar";
import UpdateProfile from "./Service-Home/UpdateProfile";
import Confirm from "./BookingConfirm/BookingConfirm";
import Availability from "./Provider-Calendar/Availability";
import MyBookings from "./MyBookings/MyBookings";
import Penrequests from "./BookingRequest/ProviderBookingRequests"


function App() {
  return (
    <BrowserRouter>
        <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/search-results" element={< Search/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
            <Route path="provider/onboard" element={<Onboarding />} />
            <Route path="provider/homepage" element={< ServiceDash/>} />
            <Route path="provider/create" element={< CreateListing/>} />
            <Route path="provider/edit/:id" element={< EditListing/>} />
            <Route path="/bookingcalendar" element={<BookingCalendar />} />
<Route
          path="/provider/profile"
          element={<UpdateProfile />}
        />
            <Route path="/confirm" element={<Confirm/>}/>
            <Route path="/availability" element={<Availability/>} />
            <Route path="/mybookings" element={<MyBookings/>} />
            <Route path="/pending" element={<Penrequests/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
