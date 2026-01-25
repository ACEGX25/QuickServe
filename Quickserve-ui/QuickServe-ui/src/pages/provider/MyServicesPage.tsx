import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Plus,
  Briefcase,
  IndianRupee,
  Edit,
  Trash2,
  Home,
  Calendar,
  Star,
  Settings,
  Ticket,
  WrenchIcon, Clock1Icon,
} from "lucide-react";

/* ================= TYPES ================= */

interface Service {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  location?: string;
}

/* ================= CONSTANTS ================= */

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const categories = [
  { label: "Cleaning", value: "CLEANING" },
  { label: "Electrical", value: "ELECTRICAL" },
  { label: "Plumbing", value: "PLUMBING" },
  { label: "Repairs", value: "REPAIRS" },
  { label: "Movers", value: "MOVERS" },
  { label: "Beauty", value: "BEAUTY" },
  { label: "AC Service", value: "AC_SERVICE" },
];


/* ================= COMPONENT ================= */

const MyServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceImage, setServiceImage] = useState<File | null>(null);


  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    location: "",
  });

  /* ---------- FETCH PROVIDER SERVICES ---------- */
  useEffect(() => {
    const fetchServices = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE}/provider/listings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch services");

        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error("FETCH SERVICES ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  /* ---------- OPEN DIALOG ---------- */
  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        category: service.category,
        price: service.price.toString(),
        description: service.description,
        location: service.location ?? "",
      });

      setServiceImage(null);
    } else {
      setEditingService(null);
      setFormData({
        title: "",
        category: "",
        price: "",
        description: "",
        location:"",
      });
    }
    setDialogOpen(true);
  };

  /* ---------- CREATE / UPDATE ---------- */
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const payload = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      price: Number(formData.price),
      location: formData.location,
    };

    const multipartData = new FormData();

// 🔑 REQUIRED by backend (@RequestPart("data"))
    multipartData.append(
        "data",
        new Blob([JSON.stringify(payload)], { type: "application/json" })
    );

// optional image
    if (serviceImage) {
      multipartData.append("image", serviceImage);
    }


    try {
      const res = await fetch(
          editingService
              ? `${API_BASE}/provider/listings/${editingService.id}`
              : `${API_BASE}/provider/listings`,
          {
            method: editingService ? "POST" : "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              // ❌ not setting to raw data , we movin to multipart data
            },
            body: multipartData,
          }
      );


      if (!res.ok) throw new Error("Save failed");

      const saved = await res.json();

      setServices((prev) =>
          editingService
              ? prev.map((s) => (s.id === saved.id ? saved : s))
              : [...prev, saved]
      );

      setDialogOpen(false);
    } catch (err) {
      console.error("SAVE SERVICE ERROR:", err);
    }
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(
          `${API_BASE}/provider/listings/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );

      if (!res.ok) throw new Error("Delete failed");

      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("DELETE SERVICE ERROR:", err);
    }
  };

  /* ---------- NAV ---------- */
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/provider" },
    { icon: Calendar, label: "Bookings", path: "/provider/bookings" },
    { icon: Star, label: "Reviews", path: "/provider/reviews" },
    { icon: Settings, label: "Settings", path: "/providerprofile" },
    { icon: Ticket, label: "Listing", path: "/provider/listings" },
    { icon: WrenchIcon, label: "Services", path: "/provider/services" },
    {icon : Clock1Icon, label: "Availability", path: "/provider/availability"}
  ];

  return (
      <DashboardLayout role="provider" navItems={navItems}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="page-title">My Services</h1>
              <p className="text-muted-foreground mt-1">
                Manage the services you offer.
              </p>
            </div>
            <Button
                className="bg-primary hover:bg-primary/90"
                onClick={() => handleOpenDialog()}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>

          {loading && <p>Loading services...</p>}

          {!loading && services.length === 0 && (
              <p className="text-muted-foreground">
                No services created yet.
              </p>
          )}

          {/* SERVICES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
                <Card key={service.id}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{service.title}</h3>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                      <Briefcase className="w-3.5 h-3.5" />
                      {service.category}
                    </div>

                    <div className="flex items-center gap-1 text-lg font-semibold mb-4">
                      <IndianRupee className="w-4 h-4" />
                      {service.price}
                    </div>

                    <div className="flex gap-2">
                      <Button
                          className="flex-1 bg-primary hover:bg-primary/90"
                          onClick={() => handleOpenDialog(service)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDelete(service.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
            ))}
          </div>
        </div>

        {/* ADD / EDIT DIALOG */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingService ? "Edit Service" : "Add New Service"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <Label>Service Name</Label>
                <Input
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({...formData, title: e.target.value})
                    }
                />
              </div>

              <div>
                <Label>Category</Label>
                <Select
                    value={formData.category}
                    onValueChange={(value) =>
                        setFormData({...formData, category: value})
                    }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category"/>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

              </div>

              <div className="space-y-2">
                <Label>Service Image</Label>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setServiceImage(e.target.files[0]);
                      }
                    }}
                />
              </div>


              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                    placeholder="e.g., Bangalore"
                    value={formData.location}
                    onChange={(e) =>
                        setFormData({...formData, location: e.target.value})
                    }
                />
              </div>


              <div>
                <Label>Price (₹)</Label>
                <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                        setFormData({...formData, price: e.target.value})
                    }
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                    }
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                  className="bg-primary hover:bg-primary/90"
                  onClick={handleSave}
                  disabled={
                      !formData.title ||
                      !formData.category ||
                      !formData.price||
                      !(formData.description ?? "").trim() ||
                      !(formData.location ?? "").trim()
                  }
              >
                {editingService ? "Save Changes" : "Add Service"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
  );
};

export default MyServicesPage;
