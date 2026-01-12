import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Camera, Save, X, Check, 
  Shield, Bell, CreditCard, Lock, ChevronRight, Edit3,
  Calendar, Heart, Star, Settings, Eye, EyeOff
} from 'lucide-react';
import { DeerIcon } from '@/components/icons/AnimalIcons';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  bio: string;
  dateOfBirth: string;
  profileImage: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  bookingReminders: boolean;
  promotionalEmails: boolean;
  serviceUpdates: boolean;
}

const CustomerProfile: React.FC = () => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setProfileData(prev => ({
      ...prev,
      profileImage: imageUrl,
    }));
  };

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bio: '',
    dateOfBirth: '1990-05-15',
    profileImage: '',
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: true,
    bookingReminders: true,
    promotionalEmails: false,
    serviceUpdates: true,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Calculate profile completion
  const calculateCompletion = () => {
    const fields = [
      profileData.firstName,
      profileData.lastName,
      profileData.email,
      profileData.phone,
      profileData.address,
      profileData.city,
      profileData.state,
      profileData.zipCode,
      profileData.bio,
      profileData.dateOfBirth,
    ];
    const filledFields = fields.filter(field => field && field.trim() !== '').length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const stats = [
    { label: 'Bookings', value: '24', icon: Calendar },
    { label: 'Favorites', value: '12', icon: Heart },
    { label: 'Reviews', value: '8', icon: Star },
  ];

  const settingsMenuItems = [
    { icon: Shield, label: 'Privacy Settings', description: 'Manage your privacy preferences' },
    { icon: CreditCard, label: 'Payment Methods', description: 'Add or remove payment options' },
    { icon: Bell, label: 'Notification Preferences', description: 'Control how we contact you' },
    { icon: Lock, label: 'Security', description: 'Password and authentication' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Settings className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Account Settings</h1>
              <p className="text-muted-foreground text-sm">Manage your profile and preferences</p>
            </div>
          </div>
          <Badge variant="outline" className="hidden md:flex items-center gap-2 px-3 py-1.5 border-primary/30">
            <DeerIcon className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Customer</span>
          </Badge>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Profile Overview Card */}
            <GlassCard className="p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-primary/20 to-primary/5" />
              
              <div className="relative">
                <div className="relative inline-block">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-primary/70 p-1 mx-auto"
                  >
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                      {profileData.profileImage ? (
                        <img 
                          src={profileData.profileImage} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <DeerIcon className="w-14 h-14 text-primary" />
                      )}
                    </div>
                  </motion.div>
                 <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => fileInputRef.current?.click()}
  className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-lg"
>
  <Camera className="w-4 h-4" />
</motion.button>

<input
  ref={fileInputRef}
  type="file"
  accept="image/*"
  className="hidden"
  onChange={handleImageSelect}
/>

                </div>

                <h2 className="mt-4 text-xl font-bold text-foreground">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-muted-foreground text-sm">{profileData.email}</p>

                {/* Profile Completion */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Profile Completion</span>
                    <span className="font-semibold text-primary">{calculateCompletion()}%</span>
                  </div>
                  <Progress value={calculateCompletion()} className="h-2" />
                  {calculateCompletion() < 100 && (
                    <p className="text-xs text-muted-foreground">
                      Complete your profile to unlock all features
                    </p>
                  )}
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
                    >
                      <stat.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-lg font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Quick Settings Menu */}
            <GlassCard className="p-4">
              <h3 className="font-semibold text-foreground mb-4 px-2">Quick Settings</h3>
              <div className="space-y-1">
                {settingsMenuItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={{ x: 4 }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group text-left"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <GlassCard className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6 bg-primary/5">
                  <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Lock className="w-4 h-4 mr-2" />
                    Security
                  </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                      <p className="text-sm text-muted-foreground">Update your personal details</p>
                    </div>
                    <AnimatedButton
                      variant={isEditing ? "outline" : "default"}
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? (
                        <>
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit Profile
                        </>
                      )}
                    </AnimatedButton>
                  </div>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        disabled={!isEditing}
                        className="bg-background/50 border-border/50 focus:border-primary disabled:opacity-70"
                        placeholder='Bayes'
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        disabled={!isEditing}
                        className="bg-background/50 border-border/50 focus:border-primary disabled:opacity-70"
                        placeholder='William'
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={!isEditing}
                          className="pl-10 bg-background/50 border-border/50 focus:border-primary disabled:opacity-70"
                          placeholder='will@gmail.com'
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!isEditing}
                          className="pl-10 bg-background/50 border-border/50 focus:border-primary disabled:opacity-70"
                          placeholder='88888888888888'
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="text-foreground">Date of Birth</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          disabled={!isEditing}
                          className="pl-10 bg-background/50 border-border/50 focus:border-primary disabled:opacity-70"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode" className="text-foreground">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={profileData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        disabled={!isEditing}
                        className="bg-background/50 border-border/50 focus:border-primary disabled:opacity-70"
                        placeholder='561000'
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-foreground">Street Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        disabled={!isEditing}
                        className="pl-10 bg-background/50 border-border/50 focus:border-primary disabled:opacity-70"
                        placeholder='1246 Downtown'
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-foreground">City</Label>
                      <Input
                        id="city"
                        value={profileData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        disabled={!isEditing}
                        className="bg-background/50 border-border/50 focus:border-primary disabled:opacity-70"
                        placeholder='Chicago'
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-foreground">State</Label>
                      <Input
                        id="state"
                        value={profileData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        disabled={!isEditing}
                        className="bg-background/50 border-border/50 focus:border-primary disabled:opacity-70"
                        placeholder='IL'
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-foreground">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                      className="bg-background/50 border-border/50 focus:border-primary disabled:opacity-70 resize-none"
                      placeholder="Tell us a little about yourself..."
                    />
                  </div>

                  <AnimatePresence>
                    {isEditing && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex justify-end gap-3"
                      >
                        <AnimatedButton
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </AnimatedButton>
                        <AnimatedButton
                          onClick={handleSave}
                          disabled={isSaving}
                          className="min-w-[120px]"
                        >
                          {isSaving ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                            />
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Save Changes
                            </>
                          )}
                        </AnimatedButton>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Notification Preferences</h3>
                    <p className="text-sm text-muted-foreground">Choose how you want to be notified</p>
                  </div>

                  <Separator />

                  <div className="space-y-6">
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
                      { key: 'smsNotifications', label: 'SMS Notifications', description: 'Get text message alerts' },
                      { key: 'bookingReminders', label: 'Booking Reminders', description: 'Reminders before your appointments' },
                      { key: 'promotionalEmails', label: 'Promotional Emails', description: 'Deals and offers from QuickServe' },
                      { key: 'serviceUpdates', label: 'Service Updates', description: 'Updates about services you\'ve used' },
                    ].map((item) => (
                      <motion.div
                        key={item.key}
                        whileHover={{ x: 4 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
                      >
                        <div className="space-y-0.5">
                          <p className="font-medium text-foreground">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch
                          checked={notifications[item.key as keyof NotificationSettings]}
                          onCheckedChange={(checked) =>
                            setNotifications(prev => ({ ...prev, [item.key]: checked }))
                          }
                        />
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
                    <p className="text-sm text-muted-foreground">Manage your password and security</p>
                  </div>

                  <Separator />

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-foreground">Current Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          value={passwords.currentPassword}
                          onChange={(e) => setPasswords(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-foreground">New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="newPassword"
                          type={showPassword ? "text" : "password"}
                          value={passwords.newPassword}
                          onChange={(e) => setPasswords(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                          placeholder="Enter new password"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-foreground">Confirm New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          value={passwords.confirmPassword}
                          onChange={(e) => setPasswords(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>

                    <AnimatedButton className="w-full md:w-auto">
                      <Lock className="w-4 h-4 mr-2" />
                      Update Password
                    </AnimatedButton>

                    <Separator />

                    {/* Two-Factor Authentication */}
                    <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Shield className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                        </div>
                        <AnimatedButton variant="outline" size="sm">
                          Enable
                        </AnimatedButton>
                      </div>
                    </div>

                    {/* Active Sessions */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">Active Sessions</h4>
                      <div className="space-y-3">
                        {[
                          { device: 'Chrome on Windows', location: 'New York, USA', current: true },
                          { device: 'Safari on iPhone', location: 'New York, USA', current: false },
                        ].map((session, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-xl bg-primary/5"
                          >
                            <div>
                              <p className="font-medium text-foreground text-sm">
                                {session.device}
                                {session.current && (
                                  <Badge variant="outline" className="ml-2 text-xs border-primary/30 text-primary">
                                    Current
                                  </Badge>
                                )}
                              </p>
                              <p className="text-xs text-muted-foreground">{session.location}</p>
                            </div>
                            {!session.current && (
                              <AnimatedButton variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                Revoke
                              </AnimatedButton>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
