import { useState } from "react";
import {DashboardLayout} from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/layout/DashboardLayout.tsx";
import { Card, CardContent } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/card.tsx";
import { Button } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/button.tsx";
import { Badge } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/badge.tsx";
import { Input } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/input.tsx";
import { Label } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/label.tsx";
import { Textarea } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/textarea.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/select.tsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../../../../tempD/QuickServe-ui/QuickServe-ui/src/components/ui/dialog.tsx";
import {
  Plus,
  Briefcase,
  IndianRupee,
  Edit,
  Trash2,
  Home,
  Users,
  Shield,
  BarChart3,
  Settings,
  Calendar, Star, Ticket, WrenchIcon
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  status: "active" | "pending" | "draft";
}

const initialServices: Service[] = [
  {
    id: "1",
    name: "Home Cleaning",
    category: "Cleaning",
    price: 1200,
    description: "Professional home cleaning service with eco-friendly products.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    status: "active",
  },
  {
    id: "2",
    name: "Electrical",
    category: "Electrical",
    price: 1200,
    description: "Expert electrical repairs and installations.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
    status: "active",
  },
  {
    id: "3",
    name: "Plumbing",
    category: "Plumbing",
    price: 1200,
    description: "Complete plumbing solutions for your home.",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop",
    status: "pending",
  },
];

const categories = ["Cleaning", "Electrical", "Plumbing", "Carpentry", "Painting", "Pest Control", "AC Repair", "Other"];

const MyServicesPage = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        category: service.category,
        price: service.price.toString(),
        description: service.description,
      });
    } else {
      setEditingService(null);
      setFormData({ name: "", category: "", price: "", description: "" });
    }
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingService) {
      setServices(services.map(s => 
        s.id === editingService.id 
          ? { ...s, ...formData, price: parseInt(formData.price) }
          : s
      ));
    } else {
      const newService: Service = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category,
        price: parseInt(formData.price),
        description: formData.description,
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
        status: "pending",
      };
      setServices([...services, newService]);
    }
    setDialogOpen(false);
    setFormData({ name: "", category: "", price: "", description: "" });
  };

  const handleDelete = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  const getStatusBadge = (status: Service["status"]) => {
    const styles = {
      active: "bg-primary/10 text-primary border-primary/30",
      pending: "bg-warning/10 text-warning border-warning/30",
      draft: "bg-muted text-muted-foreground border-muted",
    };
    return (
      <Badge variant="outline" className={styles[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/provider" },
    { icon: Calendar, label: "Bookings", path: "/provider/bookings" },
    { icon: Star, label: "Reviews", path: "/provider/reviews" },
    { icon: Settings, label: "Settings", path: "/providerprofile" },
    {icon : Ticket, label: "Listing", path: "/provider/listings"},
    {icon: WrenchIcon, label: "Services", path:"/provider/services"}
  ];

  return (
    <DashboardLayout role={"provider"} navItems={navItems}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">My Services</h1>
            <p className="text-muted-foreground mt-1">Manage the services you offer to customers.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => handleOpenDialog()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  {getStatusBadge(service.status)}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-1">{service.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <Briefcase className="w-3.5 h-3.5" />
                  {service.category}
                </div>
                <div className="flex items-center gap-1 text-lg font-semibold mb-4">
                  <span>Price -</span>
                  <IndianRupee className="w-4 h-4" />
                  <span>{service.price}</span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={() => handleOpenDialog(service)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Listing
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add New Service Card */}
          <Card 
            className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => handleOpenDialog()}
          >
            <CardContent className="p-4 h-full min-h-[300px] flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-current flex items-center justify-center mb-4">
                <Plus className="w-8 h-8" />
              </div>
              <p className="font-medium">Create New Listing</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add/Edit Service Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Edit Service" : "Add New Service"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                placeholder="e.g., Home Cleaning"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g., 1200"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your service..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
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
              disabled={!formData.name || !formData.category || !formData.price}
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
