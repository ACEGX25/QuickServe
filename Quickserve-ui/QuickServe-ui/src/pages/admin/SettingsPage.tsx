import {DashboardLayout} from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  CreditCard,
  Building2,
  Upload,
  Check,
  Home,
  Users,
  BarChart3, Settings
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: Shield, label: "Approvals", path: "/admin/approvals" },
  { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

const SettingsPage = () => {
  return (
    <DashboardLayout role={"admin"} navItems={navItems}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your platform settings and preferences</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto gap-2 bg-transparent p-0">
            <TabsTrigger value="general" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Building2 className="w-4 h-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CreditCard className="w-4 h-4 mr-2" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Palette className="w-4 h-4 mr-2" />
              Appearance
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Information</CardTitle>
                <CardDescription>Update your platform's basic information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      QS
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                    <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="platformName">Platform Name</Label>
                    <Input id="platformName" defaultValue="QuickServe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input id="tagline" defaultValue="Your Services, Delivered Fast" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Support Email</Label>
                    <Input id="email" type="email" defaultValue="support@quickserve.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Support Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 000-0000" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Textarea 
                      id="address" 
                      defaultValue="123 Business Center, Suite 100, New York, NY 10001"
                      rows={2}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Settings</CardTitle>
                <CardDescription>Configure timezone and language preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select defaultValue="est">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                        <SelectItem value="cst">Central Time (CT)</SelectItem>
                        <SelectItem value="est">Eastern Time (ET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Default Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="cad">CAD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <Select defaultValue="mdy">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Configure which emails you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "New User Registrations", description: "Get notified when a new user signs up" },
                  { title: "Service Provider Applications", description: "Get notified about new provider applications" },
                  { title: "Booking Notifications", description: "Receive alerts for new bookings" },
                  { title: "Payment Alerts", description: "Get notified about payment activities" },
                  { title: "Weekly Reports", description: "Receive weekly platform performance reports" },
                ].map((item) => (
                  <div key={item.title} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>Manage in-app notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Real-time Alerts", description: "Show real-time notifications in the admin panel" },
                  { title: "Sound Notifications", description: "Play sound for important notifications" },
                  { title: "Desktop Notifications", description: "Show browser desktop notifications" },
                ].map((item) => (
                  <div key={item.title} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Update your admin password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div></div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Update Password</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Authenticator App</p>
                      <p className="text-sm text-muted-foreground">Use an authenticator app to generate codes</p>
                    </div>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Manage your active login sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Chrome on MacOS</p>
                      <p className="text-sm text-muted-foreground">New York, US • Current session</p>
                    </div>
                  </div>
                  <Badge>Active</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Settings */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your current subscription details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-6 rounded-lg border-2 border-primary bg-primary/5">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold">Business Pro</h3>
                      <Badge>Current</Badge>
                    </div>
                    <p className="text-muted-foreground mt-1">$199/month • Renews on Feb 1, 2025</p>
                    <ul className="mt-4 space-y-2">
                      {["Unlimited users", "Priority support", "Advanced analytics", "Custom branding"].map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="outline">Change Plan</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Manage your payment information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-muted">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>Customize the look and feel of the admin panel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">Toggle dark mode theme</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex gap-3">
                    {["hsl(145, 63%, 42%)", "hsl(221, 83%, 53%)", "hsl(262, 83%, 58%)", "hsl(346, 77%, 50%)"].map((color, i) => (
                      <button
                        key={i}
                        className={`w-10 h-10 rounded-lg border-2 ${i === 0 ? "border-foreground" : "border-transparent"}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sidebar</CardTitle>
                <CardDescription>Configure sidebar behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">Collapsed by Default</p>
                    <p className="text-sm text-muted-foreground">Start with the sidebar collapsed</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
