import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Camera, Save, X, Check, 
  Shield, Bell, CreditCard, Lock, ChevronRight, Edit3,
  Briefcase, Star, Clock, DollarSign, Award, FileText,
  Upload, Trash2, Plus, Eye, EyeOff, Settings, Building2,
  Globe, Instagram, Facebook, Linkedin
} from 'lucide-react';
import { WolfIcon } from '@/components/icons/AnimalIcons';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProviderProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  bio: string;
  experience: string;
  hourlyRate: string;
  website: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  profileImage: string;
  certifications: string[];
  workingHours: {
    monday: { start: string; end: string; enabled: boolean };
    tuesday: { start: string; end: string; enabled: boolean };
    wednesday: { start: string; end: string; enabled: boolean };
    thursday: { start: string; end: string; enabled: boolean };
    friday: { start: string; end: string; enabled: boolean };
    saturday: { start: string; end: string; enabled: boolean };
    sunday: { start: string; end: string; enabled: boolean };
  };
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  newBookingAlerts: boolean;
  reviewAlerts: boolean;
  paymentAlerts: boolean;
  marketingEmails: boolean;
}

const ProviderProfile: React.FC = () => {
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
  const [newCertification, setNewCertification] = useState('');

  const [profileData, setProfileData] = useState<ProviderProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bio: '',
    experience: '10',
    hourlyRate: '45',
    website: 'www.mikeservices.com',
    instagram: '@Mikeservices',
    facebook: 'Mikehomeservices',
    linkedin: 'Mike-services',
    profileImage: '',
    certifications: ['Licensed & Insured', 'EPA Certified', 'OSHA Trained'],
    workingHours: {
      monday: { start: '09:00', end: '17:00', enabled: true },
      tuesday: { start: '09:00', end: '17:00', enabled: true },
      wednesday: { start: '09:00', end: '17:00', enabled: true },
      thursday: { start: '09:00', end: '17:00', enabled: true },
      friday: { start: '09:00', end: '17:00', enabled: true },
      saturday: { start: '10:00', end: '14:00', enabled: true },
      sunday: { start: '00:00', end: '00:00', enabled: false },
    },
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: true,
    newBookingAlerts: true,
    reviewAlerts: true,
    paymentAlerts: true,
    marketingEmails: false,
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
      profileData.businessName,
      profileData.businessType,
      profileData.address,
      profileData.city,
      profileData.state,
      profileData.zipCode,
      profileData.bio,
      profileData.experience,
      profileData.hourlyRate,
    ];
    const filledFields = fields.filter(field => field && field.trim() !== '').length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ProviderProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      setProfileData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }));
      setNewCertification('');
    }
  };

  const removeCertification = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const toggleWorkingDay = (day: string) => {
    setProfileData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day as keyof typeof prev.workingHours],
          enabled: !prev.workingHours[day as keyof typeof prev.workingHours].enabled
        }
      }
    }));
  };

  const stats = [
    { label: 'Completed', value: '156', icon: Check },
    { label: 'Rating', value: '4.9', icon: Star },
    { label: 'Earnings', value: '$12.4K', icon: DollarSign },
  ];

  const businessTypes = [
    { value: 'home-services', label: 'Home Services' },
    { value: 'beauty-wellness', label: 'Beauty & Wellness' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'technology', label: 'Technology' },
    { value: 'education', label: 'Education' },
    { value: 'health', label: 'Health Services' },
    { value: 'events', label: 'Events & Entertainment' },
    { value: 'other', label: 'Other' },
  ];

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
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
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Provider Settings</h1>
              <p className="text-muted-foreground text-sm">Manage your business profile and preferences</p>
            </div>
          </div>
          <Badge variant="outline" className="hidden md:flex items-center gap-2 px-3 py-1.5 border-primary/30">
            <WolfIcon className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Service Provider</span>
          </Badge>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Profile Overview Card */}
            <GlassCard className="p-6 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/5" />
              
              <div className="relative">
                <div className="relative inline-block">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/70 p-1 mx-auto"
                  >
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                      {profileData.profileImage ? (
                        <img 
                          src={profileData.profileImage} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <WolfIcon className="w-16 h-16 text-primary" />
                      )}
                    </div>
                  </motion.div>
                  <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => fileInputRef.current?.click()}
  className="absolute bottom-1 right-1 p-2.5 rounded-full bg-primary text-primary-foreground shadow-lg"
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

                <div className="mt-4 space-y-1">
                  <h2 className="text-xl font-bold text-foreground">
                    {profileData.firstName} {profileData.lastName}
                  </h2>
                  <p className="text-primary font-medium">{profileData.businessName}</p>
                  <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>{profileData.city}, {profileData.state}</span>
                  </div>
                </div>

                {/* Verification Badge */}
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">Verified Provider</span>
                </div>

                {/* Profile Completion */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Profile Strength</span>
                    <span className="font-semibold text-primary">{calculateCompletion()}%</span>
                  </div>
                  <Progress value={calculateCompletion()} className="h-2.5" />
                  {calculateCompletion() < 100 && (
                    <p className="text-xs text-muted-foreground">
                      Complete your profile to attract more customers
                    </p>
                  )}
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/15 hover:to-primary/10 transition-colors"
                    >
                      <stat.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-lg font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Hourly Rate Display */}
                <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Hourly Rate</span>
                    <span className="text-2xl font-bold text-primary">${profileData.hourlyRate}</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Certifications Card */}
            <GlassCard className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Certifications
                </h3>
                <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                  {profileData.certifications.length}
                </Badge>
              </div>
              <div className="space-y-2">
                {profileData.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-primary/5 group"
                  >
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">{cert}</span>
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => removeCertification(index)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive/80"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </motion.div>
                ))}
                {isEditing && (
                  <div className="flex gap-2 mt-3">
                    <Input
                      value={newCertification}
                      onChange={(e) => setNewCertification(e.target.value)}
                      placeholder="Add certification..."
                      className="bg-background/50 text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && addCertification()}
                    />
                    <AnimatedButton size="icon" onClick={addCertification}>
                      <Plus className="w-4 h-4" />
                    </AnimatedButton>
                  </div>
                )}
              </div>
            </GlassCard>

            {/* Social Links */}
            <GlassCard className="p-5">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Online Presence
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Globe, label: 'Website', value: profileData.website, field: 'website' },
                  { icon: Instagram, label: 'Instagram', value: profileData.instagram, field: 'instagram' },
                  { icon: Facebook, label: 'Facebook', value: profileData.facebook, field: 'facebook' },
                  { icon: Linkedin, label: 'LinkedIn', value: profileData.linkedin, field: 'linkedin' },
                ].map((social) => (
                  <div key={social.label} className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <social.icon className="w-4 h-4 text-primary" />
                    </div>
                    {isEditing ? (
                      <Input
                        value={social.value}
                        onChange={(e) => handleInputChange(social.field as keyof ProviderProfileData, e.target.value)}
                        placeholder={social.label}
                        className="bg-background/50 text-sm h-9"
                      />
                    ) : (
                      <span className="text-sm text-foreground truncate">{social.value || 'Not set'}</span>
                    )}
                  </div>
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
                <TabsList className="grid w-full grid-cols-4 mb-6 bg-primary/5">
                  <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm">
                    <User className="w-4 h-4 mr-1 md:mr-2" />
                    <span className="hidden md:inline">Profile</span>
                  </TabsTrigger>
                  <TabsTrigger value="business" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm">
                    <Briefcase className="w-4 h-4 mr-1 md:mr-2" />
                    <span className="hidden md:inline">Business</span>
                  </TabsTrigger>
                  <TabsTrigger value="availability" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm">
                    <Clock className="w-4 h-4 mr-1 md:mr-2" />
                    <span className="hidden md:inline">Hours</span>
                  </TabsTrigger>
                  <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm">
                    <Lock className="w-4 h-4 mr-1 md:mr-2" />
                    <span className="hidden md:inline">Security</span>
                  </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                      <p className="text-sm text-muted-foreground">Your personal details</p>
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
                          Edit
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
                        placeholder='mike'
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
                                                placeholder='Jhon'

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
                                                  placeholder='mike@icould.com'

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
                         placeholder='8888888888888'

                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-foreground">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                      className="bg-background/50 border-border/50 focus:border-primary disabled:opacity-70 resize-none"
                      placeholder="Tell potential customers about your experience and expertise..."
                    />
                    <p className="text-xs text-muted-foreground">{profileData.bio.length}/500 characters</p>
                  </div>

                  <AnimatePresence>
                    {isEditing && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex justify-end gap-3"
                      >
                        <AnimatedButton variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </AnimatedButton>
                        <AnimatedButton onClick={handleSave} disabled={isSaving} className="min-w-[120px]">
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

                {/* Business Tab */}
                <TabsContent value="business" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Business Details</h3>
                    <p className="text-sm text-muted-foreground">Information about your business</p>
                  </div>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="businessName" className="text-foreground">Business Name</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="businessName"
                          value={profileData.businessName}
                          onChange={(e) => handleInputChange('businessName', e.target.value)}
                          disabled={!isEditing}
                          className="pl-10 bg-background/50 border-border/50 focus:border-primary disabled:opacity-70"
                         placeholder='mike/Home-Services'

                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessType" className="text-foreground">Business Type</Label>
                      <Select
                        value={profileData.businessType}
                        onValueChange={(value) => handleInputChange('businessType', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="bg-background/50 border-border/50">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-foreground">Years of Experience</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="experience"
                          type="number"
                          value={profileData.experience}
                          onChange={(e) => handleInputChange('experience', e.target.value)}
                          disabled={!isEditing}
                          className="pl-10 bg-background/50 border-border/50 focus:border-primary disabled:opacity-70"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate" className="text-foreground">Hourly Rate ($)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="hourlyRate"
                          type="number"
                          value={profileData.hourlyRate}
                          onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                          disabled={!isEditing}
                          className="pl-10 bg-background/50 border-border/50 focus:border-primary disabled:opacity-70"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Business Location</h4>
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
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-foreground">City</Label>
                        <Input
                          id="city"
                          value={profileData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          disabled={!isEditing}
                          className="bg-background/50 border-border/50 focus:border-primary disabled:opacity-70"
                                                  placeholder='chicago'

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
                      <div className="space-y-2">
                        <Label htmlFor="zipCode" className="text-foreground">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={profileData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          disabled={!isEditing}
                          className="bg-background/50 border-border/50 focus:border-primary disabled:opacity-70"
                                                  placeholder='10800'

                        />
                      </div>
                    </div>
                  </div>

                  {/* Document Upload */}
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Business Documents
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {['Business License', 'Insurance Certificate'].map((doc) => (
                        <motion.div
                          key={doc}
                          whileHover={{ scale: 1.02 }}
                          className="p-4 border-2 border-dashed border-primary/30 rounded-xl text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                        >
                          <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                          <p className="font-medium text-foreground text-sm">{doc}</p>
                          <p className="text-xs text-muted-foreground mt-1">Click to upload</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Availability Tab */}
                <TabsContent value="availability" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Working Hours</h3>
                    <p className="text-sm text-muted-foreground">Set your availability for bookings</p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    {days.map((day) => {
                      const dayData = profileData.workingHours[day as keyof typeof profileData.workingHours];
                      return (
                        <motion.div
                          key={day}
                          whileHover={{ x: 4 }}
                          className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                            dayData.enabled ? 'bg-primary/5' : 'bg-muted/30'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <Switch
                              checked={dayData.enabled}
                              onCheckedChange={() => toggleWorkingDay(day)}
                            />
                            <span className={`font-medium capitalize ${dayData.enabled ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {day}
                            </span>
                          </div>
                          {dayData.enabled ? (
                            <div className="flex items-center gap-2">
                              <Input
                                type="time"
                                value={dayData.start}
                                onChange={(e) => {
                                  setProfileData(prev => ({
                                    ...prev,
                                    workingHours: {
                                      ...prev.workingHours,
                                      [day]: { ...dayData, start: e.target.value }
                                    }
                                  }));
                                }}
                                className="w-28 bg-background/50 text-sm"
                              />
                              <span className="text-muted-foreground">to</span>
                              <Input
                                type="time"
                                value={dayData.end}
                                onChange={(e) => {
                                  setProfileData(prev => ({
                                    ...prev,
                                    workingHours: {
                                      ...prev.workingHours,
                                      [day]: { ...dayData, end: e.target.value }
                                    }
                                  }));
                                }}
                                className="w-28 bg-background/50 text-sm"
                              />
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">Closed</span>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Notification Settings within Availability */}
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Booking Notifications</h4>
                    {[
                      { key: 'newBookingAlerts', label: 'New Booking Alerts', description: 'Get notified for new bookings' },
                      { key: 'reviewAlerts', label: 'Review Alerts', description: 'When customers leave reviews' },
                      { key: 'paymentAlerts', label: 'Payment Alerts', description: 'Payment confirmations and updates' },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-4 rounded-xl bg-primary/5"
                      >
                        <div>
                          <p className="font-medium text-foreground">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch
                          checked={notifications[item.key as keyof NotificationSettings]}
                          onCheckedChange={(checked) =>
                            setNotifications(prev => ({ ...prev, [item.key]: checked }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
                    <p className="text-sm text-muted-foreground">Manage password and account security</p>
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

                    <div className="grid md:grid-cols-2 gap-6">
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
                        <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
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
                    </div>

                    <AnimatedButton>
                      <Lock className="w-4 h-4 mr-2" />
                      Update Password
                    </AnimatedButton>

                    <Separator />

                    {/* Two-Factor Authentication */}
                    <div className="p-5 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-xl bg-primary/20">
                            <Shield className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">Two-Factor Authentication</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Protect your account with an additional security layer
                            </p>
                          </div>
                        </div>
                        <AnimatedButton variant="outline" size="sm">
                          Enable 2FA
                        </AnimatedButton>
                      </div>
                    </div>

                    {/* Account Actions */}
                    <Separator />
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">Account Actions</h4>
                      <div className="flex flex-wrap gap-3">
                        <AnimatedButton variant="outline" className="text-muted-foreground">
                          Download My Data
                        </AnimatedButton>
                        <AnimatedButton variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                          Deactivate Account
                        </AnimatedButton>
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

export default ProviderProfile;
