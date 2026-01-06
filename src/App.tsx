
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import ReviewComponents from "@/components/reviews/ReviewComponents";
import CustomerProfile from "./pages/customer/customerprofile";
import ProviderProfile from "./pages/provider/providerprofile";
import BookingCalendar from "./pages/bookings/bookingcalender";
import HomeCleaning from "./pages/customer/homecleaningservice";
import Confirm from "./pages/customer/confirm";
import ManageBookings from "./pages/customer/managebookings.tsx";
import MyBookings from "./pages/customer/MyBookings";
import BookingDetails from "./pages/customer/BookingDetails";
import GardenService from "./pages/customer/gradeningservice";
import ElectricalService from "./pages/customer/electricalservice";
import PaintingService from "./pages/customer/paintingservice";
import PlumbingService from "./pages/customer/plumbingservice";
import CarService from "./pages/customer/carservice";
import LegalService from "./pages/customer/legalservice";
import HairStyling from "./pages/customer/hairstyling";
import EventService from "./pages/customer/eventservice";
import CreateReview from "./pages/customer/reviewandrating";





const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/customer/*" element={<CustomerDashboard />} />
          <Route path="/ReviewComponents" element={<ReviewComponents/>} />
<Route
  path="/customerprofile"
  element={<CustomerProfile />}
/>
<Route
  path="/ProviderProfile"
  element={<ProviderProfile />}
/>
<Route
  path="/BookingCalendar"
  element={<BookingCalendar />}
/>
<Route
  path="/customer/homecleaningservice"
  element={<HomeCleaning/>}
/>
<Route path="/booking/confirm/:id" element={<MyBookings/>} />

            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/booking/:id" element={<BookingDetails />} />
<Route
  path="/Confirm"
  element={<Confirm />}
/>
<Route
  path="/customer/managebookings"
  element={<ManageBookings />}
/>
<Route
  path="/customer/gradeningservice"
  element={<GardenService />}
/>
<Route
  path="/customer/electricalservice"
  element={<ElectricalService/>}
/>
<Route
  path="/customer/paintingservice"
  element={<PaintingService/>}
/>
<Route
  path="/customer/plumbingservice"
  element={<PlumbingService/>}
/>
<Route
  path="/customer/carservice"
  element={<CarService/>}
/>

<Route
  path="/customer/legalservice"
  element={<LegalService/>}
/>
<Route
  path="/customer/hairstyling"
  element={<HairStyling/>}
/>
<Route
  path="/customer/eventservice"
  element={<EventService/>}
/>
<Route
  path="/CreateReview"
  element={<CreateReview/>}
/>



</Routes>
<Routes>
          <Route path="/provider" element={<ProviderDashboard />} />
          <Route path="/provider/*" element={<ProviderDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
