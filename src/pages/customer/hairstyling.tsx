import { motion } from "framer-motion";

import {
  Star,
  MapPin,
  CheckCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServiceDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50">
      {/* HERO SECTION */}
      <div className="relative h-[420px]">
        <img
          src="/hair.jpg"
          alt="Service"
          className="w-full h-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40" />

        {/* FLOATING CARD (FIXED CENTER) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-8 inset-x-0 mx-auto w-[90%] max-w-4xl"
        >
          <div className="backdrop-blur-xl bg-white/90 rounded-2xl p-6 shadow-xl">
            <h1 className="text-3xl font-bold">
            </h1>
Hair Styling
            <p className="text-gray-600 mt-1">
Elegance Salon            </p>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">4.9</span>
                <span className="text-gray-500">(299)</span>
              </div>

              <div className="flex items-center gap-1 text-green-700">
                <MapPin className="w-4 h-4" />
                <span>2.1 km away</span>
              </div>

              <div className="flex items-center gap-1 text-green-700">
                <Clock className="w-4 h-4" />
                <span>10-20 mins</span>
              </div>

              <span className="text-green-700 font-medium">
                Available in 10 areas
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MAIN CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 py-10 space-y-6"
      >
        {/* ABOUT */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold mb-2">
            About this Service
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
Upgrade your look with our professional hair styling service. Our trained stylists create personalized styles using premium products to match your personality and occasion.</p>
        </div>

        {/* INCLUDED */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold mb-4">
            What’s Included
          </h2>

          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              "Hair cutting & styling",
              "Blow-dry & straightening",
              "Curling & hair setting",
              "Bridal & party styling",
              "Hair care consultation",
              "Premium styling products",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TRUST BADGE */}
        <div className="bg-green-100 rounded-2xl p-6 flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-green-700" />
          <p className="text-sm text-green-800">
            Verified professionals • Background checked • Insured service
          </p>
        </div>

        {/* PRICE + CTA */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Starting From
            </p>
            <p className="text-3xl font-bold text-green-700">
              $ 50
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/bookingcalendar")}
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-xl font-semibold shadow-lg"
          >
            Book Now
            
          </motion.button>
          
        </div>
        
      </motion.div>
      
    </div>
  );
};

export default ServiceDetails;
