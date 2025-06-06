import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Lock, 
  Shield,
  Building,
  Globe,
  ShieldAlert,
  Loader2,
  LifeBuoy,
  AtSign,
  Phone,
  Tag,
  PlusCircle,
  X,
  ShoppingBag,
  Target,
  Heart,
  Languages,
  Users,
  Save,
  UserCog,
  BookOpen,
  Megaphone,
  Handshake
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import BrandLayout from "@/components/layouts/BrandLayout";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";

// Enhanced animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: { 
      duration: 0.3,
      ease: "easeIn" 
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const Settings = () => {
  const { isAuthenticated, user, role } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  
  // Form states
  const [companyName, setCompanyName] = useState(user?.companyName || "Eco Foods");
  const [email, setEmail] = useState(user?.email || "contact@ecofoods.com");
  const [phone, setPhone] = useState("+1 (555) 987-6543");
  const [website, setWebsite] = useState("https://www.ecofoods.com");
  const [address, setAddress] = useState("456 Brand Avenue");
  const [city, setCity] = useState("Marketing City");
  const [state, setState] = useState("NY");
  const [zipCode, setZipCode] = useState("10001");
  const [description, setDescription] = useState("Eco Foods is a leading brand of sustainable and healthy food products, committed to quality and environmental responsibility.");
  
  // Tags functionality
  const [tags, setTags] = useState(["Organic", "Eco-friendly", "Health", "Sustainable"]);
  const [newTag, setNewTag] = useState("");
  
  // Activity log
  const [activityLog, setActivityLog] = useState([
    { action: "Profile updated", timestamp: "2023-10-15 09:15 AM" },
    { action: "New product added", timestamp: "2023-09-22 02:30 PM" },
    { action: "Brand guidelines updated", timestamp: "2023-09-05 11:25 AM" },
  ]);
  
  // Brand specific fields
  const [targetMarket, setTargetMarket] = useState("Health-conscious consumers, 25-45 years");
  const [brandValues, setBrandValues] = useState("Sustainability, Health, Quality, Transparency");
  const [usp, setUSP] = useState("Sustainable packaging with organic ingredients");
  
  // Product categories
  const [productCategories, setProductCategories] = useState([
    "Breakfast Foods", "Snacks", "Beverages", "Condiments"
  ]);
  const [newCategory, setNewCategory] = useState("");
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [partnershipNotifications, setPartnershipNotifications] = useState(true);
  const [marketingNotifications, setMarketingNotifications] = useState(false);
  
  // Security settings
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  
  // Language settings
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("light");
  
  // Auto-save functionality
  const [autoSave, setAutoSave] = useState(true);
  
  useEffect(() => {
    document.title = t("settings-title");
    
    // If not authenticated or not a brand, redirect
    if (!isAuthenticated) {
      navigate("/auth?type=signin");
    } else if (role !== "brand") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, role, t]);

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
      
      // Log activity
      addToActivityLog(t("added-new-tag") + ": " + newTag.trim());
    }
  };
  
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
    
    // Log activity
    addToActivityLog(t("removed-tag") + ": " + tagToRemove);
  };
  
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() && !productCategories.includes(newCategory.trim())) {
      setProductCategories([...productCategories, newCategory.trim()]);
      setNewCategory("");
      
      // Log activity
      addToActivityLog(t("added-new-product-category") + ": " + newCategory.trim());
    }
  };
  
  const handleRemoveCategory = (categoryToRemove) => {
    setProductCategories(productCategories.filter(category => category !== categoryToRemove));
    
    // Log activity
    addToActivityLog(t("removed-product-category") + ": " + categoryToRemove);
  };
  
  const addToActivityLog = (action) => {
    const now = new Date();
    const timestamp = now.toLocaleDateString() + " " + now.toLocaleTimeString();
    const newActivity = { action, timestamp };
    setActivityLog([newActivity, ...activityLog]);
  };

  const handleSaveGeneral = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t("settings-updated"),
        description: t("company-settings-saved"),
      });
      
      // Log activity
      addToActivityLog(t("updated-general-settings"));
    }, 1000);
  };

  const handleSaveBrand = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t("brand-details-updated"),
        description: t("brand-info-saved"),
      });
      
      // Log activity
      addToActivityLog(t("updated-brand-details"));
    }, 1000);
  };

  const handleSaveNotifications = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t("notification-preferences-updated"),
        description: t("notification-settings-saved"),
      });
    }, 1000);
  };

  const handleSaveSecurity = () => {
    setIsLoading(true);
    // Validate password inputs
    if (newPassword && newPassword !== confirmPassword) {
      setIsLoading(false);
      toast({
        title: t("passwords-dont-match"),
        description: t("ensure-passwords-match"),
        variant: "destructive"
      });
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t("security-settings-saved"),
        description: t("security-preferences-updated")
      });
    }, 1000);
  };

  const handleSaveBranding = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t("brand-settings-updated"),
        description: t("brand-details-saved"),
      });
    }, 1000);
  };

  if (!isAuthenticated || role !== "brand") {
    return null;
  }
  
  return (
    <BrandLayout>
      <div className="max-w-none px-4 sm:px-6 lg:px-8 pb-6">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-3xl font-bold tracking-tight">{t("settings")}</h1>
              <p className="text-muted-foreground">
                {t("manage-account-preferences")}
              </p>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge variant="outline" className="text-xs px-2 py-1">
                <span className="text-primary font-medium">{t("brand")}</span>
              </Badge>
              {autoSave && (
                <Badge variant="secondary" className="text-xs px-2 py-1 flex items-center gap-1">
                  <Save className="h-3 w-3" />
                  <span>{t("auto-save-on")}</span>
                </Badge>
              )}
            </motion.div>
          </div>

          <Tabs
            defaultValue="general"
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <motion.div 
              className="bg-background sticky top-0 z-10 pb-4 pt-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1">
                <TabsTrigger value="general" className="flex items-center gap-1.5">
                  <Building className="h-4 w-4" />
                  <span>{t("general")}</span>
                </TabsTrigger>
                <TabsTrigger value="brand" className="flex items-center gap-1.5">
                  <ShoppingBag className="h-4 w-4" />
                  <span>{t("brand")}</span>
                </TabsTrigger>
                <TabsTrigger value="notification" className="flex items-center gap-1.5">
                  <Bell className="h-4 w-4" />
                  <span>{t("notifications")}</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4" />
                  <span>{t("security")}</span>
                </TabsTrigger>
                <TabsTrigger value="preferences" className="flex items-center gap-1.5">
                  <SettingsIcon className="h-4 w-4" />
                  <span>{t("preferences")}</span>
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center gap-1.5">
                  <UserCog className="h-4 w-4" />
                  <span>{t("activity")}</span>
                </TabsTrigger>
              </TabsList>
            </motion.div>

            <AnimatePresence mode="wait">
              {/* General Settings Tab */}
              {activeTab === "general" && (
                <motion.div
                  key="general"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeIn}
                >
                  <TabsContent value="general" className="space-y-6">
                    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                      <Card>
                        <CardHeader>
                          <motion.div variants={itemAnimation}>
                            <CardTitle>{t("company-information")}</CardTitle>
                            <CardDescription>
                              {t("update-company-details")}
                            </CardDescription>
                          </motion.div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <motion.div variants={itemAnimation} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="companyName">{t("company-name")}</Label>
                              <div className="relative">
                                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                  id="companyName"
                                  value={companyName}
                                  onChange={(e) => setCompanyName(e.target.value)}
                                  className="pl-10"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="email">{t("email-address")}</Label>
                              <div className="relative">
                                <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                  id="email"
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="pl-10"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="phone">{t("phone-number")}</Label>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                  id="phone"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  className="pl-10"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="website">{t("website")}</Label>
                              <div className="relative">
                                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                  id="website"
                                  value={website}
                                  onChange={(e) => setWebsite(e.target.value)}
                                  className="pl-10"
                                />
                              </div>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="address">{t("address")}</Label>
                              <Input
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="city">{t("city")}</Label>
                              <Input
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="state">{t("state")}</Label>
                                <Input
                                  id="state"
                                  value={state}
                                  onChange={(e) => setState(e.target.value)}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="zipCode">{t("zip-code")}</Label>
                                <Input
                                  id="zipCode"
                                  value={zipCode}
                                  onChange={(e) => setZipCode(e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="description">{t("company-description")}</Label>
                              <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                              />
                            </div>
                          </motion.div>
                          
                          <motion.div variants={itemAnimation} className="space-y-4">
                            <Label>{t("company-tags")}</Label>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {tags.map((tag, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Badge 
                                    variant="secondary" 
                                    className="px-3 py-1 gap-1 cursor-pointer hover:bg-secondary/80 transition-colors"
                                    onClick={() => handleRemoveTag(tag)}
                                  >
                                    {tag}
                                    <span className="ml-1 text-xs">×</span>
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                            
                            <form onSubmit={handleAddTag} className="flex gap-2">
                              <Input 
                                placeholder={t("add-a-tag")}
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                className="max-w-xs"
                              />
                              <Button type="submit" size="sm">{t("add")}</Button>
                            </form>
                          </motion.div>
                          
                          <motion.div variants={itemAnimation} className="flex justify-end">
                            <Button 
                              onClick={handleSaveGeneral} 
                              disabled={isLoading}
                              className="group"
                            >
                              {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <Save className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                              )}
                              {t("save-changes")}
                            </Button>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>
                </motion.div>
              )}

              {/* Brand Tab */}
              {activeTab === "brand" && (
                <motion.div
                  key="brand"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeIn}
                >
                  <TabsContent value="brand" className="space-y-6">
                    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                      <Card>
                        <CardHeader>
                          <motion.div variants={itemAnimation}>
                            <CardTitle>{t("brand-information")}</CardTitle>
                            <CardDescription>
                              {t("manage-brand-details")}
                            </CardDescription>
                          </motion.div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <motion.div variants={itemAnimation} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="targetMarket">{t("target-market")}</Label>
                              <div className="relative">
                                <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Textarea
                                  id="targetMarket"
                                  value={targetMarket}
                                  onChange={(e) => setTargetMarket(e.target.value)}
                                  className="pl-10 min-h-[80px]"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="brandValues">{t("brand-values")}</Label>
                              <div className="relative">
                                <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Textarea
                                  id="brandValues"
                                  value={brandValues}
                                  onChange={(e) => setBrandValues(e.target.value)}
                                  className="pl-10 min-h-[80px]"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="usp">{t("unique-selling-proposition")}</Label>
                              <div className="relative">
                                <Tag className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
                                <Textarea
                                  id="usp"
                                  value={usp}
                                  onChange={(e) => setUSP(e.target.value)}
                                  className="pl-10"
                                  placeholder={t("what-makes-brand-unique")}
                                  rows={3}
                                />
                              </div>
                            </div>
                          </motion.div>
                          
                          <motion.div variants={itemAnimation} className="space-y-4">
                            <Label>{t("product-categories")}</Label>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {productCategories.map((category, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Badge 
                                    variant="secondary" 
                                    className="px-3 py-1 gap-1 cursor-pointer hover:bg-secondary/80 transition-colors"
                                    onClick={() => handleRemoveCategory(category)}
                                  >
                                    {category}
                                    <span className="ml-1 text-xs">×</span>
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                            
                            <form onSubmit={handleAddCategory} className="flex gap-2">
                              <Input 
                                placeholder={t("add-product-category")}
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                className="max-w-xs"
                              />
                              <Button type="submit" size="sm">{t("add")}</Button>
                            </form>
                          </motion.div>
                          
                          <motion.div variants={itemAnimation} className="border rounded-md p-4 bg-muted/30">
                            <h3 className="font-medium mb-2 flex items-center gap-2">
                              <ShoppingBag className="h-4 w-4" />
                              {t("brand-highlights")}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div className="flex items-center space-x-2">
                                <Switch id="highlight-sustainable" defaultChecked />
                                <Label htmlFor="highlight-sustainable">{t("sustainable")}</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch id="highlight-organic" defaultChecked />
                                <Label htmlFor="highlight-organic">{t("organic")}</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch id="highlight-vegan" />
                                <Label htmlFor="highlight-vegan">{t("vegan")}</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch id="highlight-glutenfree" />
                                <Label htmlFor="highlight-glutenfree">{t("gluten-free")}</Label>
                              </div>
                            </div>
                          </motion.div>
                          
                          <motion.div variants={itemAnimation} className="flex justify-end">
                            <Button 
                              onClick={handleSaveBranding} 
                              disabled={isLoading}
                              className="group"
                            >
                              {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <Save className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                              )}
                              {t("save-brand-details")}
                            </Button>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>
                </motion.div>
              )}

              {/* Notification Tab */}
              {activeTab === "notification" && (
                <motion.div
                  key="notification"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeIn}
                >
                  <TabsContent value="notification" className="space-y-6">
                    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                      <Card>
                        <CardHeader>
                          <motion.div variants={itemAnimation}>
                            <CardTitle>{t("notification-preferences")}</CardTitle>
                            <CardDescription>
                              {t("choose-notification-updates")}
                            </CardDescription>
                          </motion.div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <motion.div variants={itemAnimation} className="space-y-4">
                            <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                              <div className="space-y-0.5">
                                <Label htmlFor="emailNotifications" className="flex items-center gap-2">
                                  <AtSign className="h-4 w-4 text-primary" />
                                  {t("email-notifications")}
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  {t("receive-important-updates")}
                                </p>
                              </div>
                              <Switch
                                id="emailNotifications"
                                checked={emailNotifications}
                                onCheckedChange={setEmailNotifications}
                              />
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                              <div className="space-y-0.5">
                                <Label htmlFor="messageNotifications" className="flex items-center gap-2">
                                  <Bell className="h-4 w-4 text-primary" />
                                  {t("message-notifications")}
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  {t("notified-new-messages")}
                                </p>
                              </div>
                              <Switch
                                id="messageNotifications"
                                checked={messageNotifications}
                                onCheckedChange={setMessageNotifications}
                              />
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                              <div className="space-y-0.5">
                                <Label htmlFor="partnershipNotifications" className="flex items-center gap-2">
                                  <Handshake className="h-4 w-4 text-primary" />
                                  {t("partnership-notifications")}
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  {t("notified-partnership-opportunities")}
                                </p>
                              </div>
                              <Switch
                                id="partnershipNotifications"
                                checked={partnershipNotifications}
                                onCheckedChange={setPartnershipNotifications}
                              />
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                              <div className="space-y-0.5">
                                <Label htmlFor="marketingNotifications" className="flex items-center gap-2">
                                  <Megaphone className="h-4 w-4 text-primary" />
                                  {t("marketing-emails")}
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  {t("receive-tips-updates")}
                                </p>
                              </div>
                              <Switch
                                id="marketingNotifications"
                                checked={marketingNotifications}
                                onCheckedChange={setMarketingNotifications}
                              />
                            </div>
                          </motion.div>
                          
                          <motion.div variants={itemAnimation} className="flex justify-end">
                            <Button 
                              onClick={handleSaveNotifications} 
                              disabled={isLoading}
                              className="group"
                            >
                              {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <Save className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                              )}
                              {t("save-notification-settings")}
                            </Button>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeIn}
                >
                  <TabsContent value="security" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>{t("password-security")}</CardTitle>
                        <CardDescription>
                          {t("manage-password-security")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">{t("current-password")}</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                              <Input
                                id="currentPassword"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="pl-10"
                              />
                            </div>
                          </div>
                          
                          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="newPassword">{t("new-password")}</Label>
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                  id="newPassword"
                                  type="password"
                                  value={newPassword}
                                  onChange={(e) => setNewPassword(e.target.value)}
                                  className="pl-10"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="confirmPassword">{t("confirm-new-password")}</Label>
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                  id="confirmPassword"
                                  type="password"
                                  value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                  className="pl-10"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="md:col-span-2">
                            <Separator className="my-6" />
                          </div>
                          
                          <div className="md:col-span-2">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label htmlFor="twoFactorEnabled">{t("two-factor-authentication")}</Label>
                                <p className="text-sm text-muted-foreground">
                                  {t("add-extra-security")}
                                </p>
                              </div>
                              <Switch
                                id="twoFactorEnabled"
                                checked={twoFactorEnabled}
                                onCheckedChange={setTwoFactorEnabled}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button onClick={handleSaveSecurity} disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {t("update-security-settings")}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </motion.div>
              )}

              {/* Preferences Tab */}
              {activeTab === "preferences" && (
                <motion.div
                  key="preferences"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeIn}
                >
                  <TabsContent value="preferences" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>{t("application-preferences")}</CardTitle>
                        <CardDescription>
                          {t("customize-application-experience")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="language">{t("language")}</Label>
                              <Select value={language} onValueChange={setLanguage}>
                                <SelectTrigger id="language" className="w-full">
                                  <div className="flex items-center gap-2">
                                    <Languages className="h-4 w-4 text-muted-foreground" />
                                    <SelectValue placeholder={t("select-language")} />
                                  </div>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="en">English</SelectItem>
                                  <SelectItem value="vi">Tiếng Việt</SelectItem>
                                  <SelectItem value="fr">Français</SelectItem>
                                  <SelectItem value="es">Español</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="theme">{t("theme")}</Label>
                              <Select value={theme} onValueChange={setTheme}>
                                <SelectTrigger id="theme" className="w-full">
                                  <SelectValue placeholder={t("select-theme")} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="light">{t("light")}</SelectItem>
                                  <SelectItem value="dark">{t("dark")}</SelectItem>
                                  <SelectItem value="system">{t("system")}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="compact-sidebar">{t("compact-sidebar")}</Label>
                              <p className="text-sm text-muted-foreground">
                                {t("use-compact-sidebar")}
                              </p>
                            </div>
                            <Switch
                              id="compact-sidebar"
                              defaultChecked={true}
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {t("save-preferences")}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>{t("help-support")}</CardTitle>
                        <CardDescription>
                          {t("get-help-platform")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                          <LifeBuoy className="h-8 w-8 text-primary" />
                          <div>
                            <h3 className="text-lg font-medium">{t("need-assistance")}</h3>
                            <p className="text-sm text-muted-foreground">
                              {t("support-team-help")}
                            </p>
                            <Button variant="outline" className="mt-2">
                              {t("contact-support")}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </motion.div>
              )}

              {/* Add Activity Tab Content */}
              {activeTab === "activity" && (
                <motion.div
                  key="activity"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeIn}
                >
                  <TabsContent value="activity" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>{t("account-activity")}</CardTitle>
                        <CardDescription>
                          {t("recent-changes-activity")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {activityLog.map((activity, index) => (
                            <motion.div 
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="flex justify-between items-center border-b pb-2 last:border-0"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <UserCog className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium">{activity.action}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {activity.timestamp}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>{t("documentation-guides")}</CardTitle>
                        <CardDescription>
                          {t("resources-help-platform")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <motion.div 
                            className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <BookOpen className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{t("brand-settings-guide")}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {t("learn-configure-settings")}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <ShieldAlert className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{t("security-best-practices")}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {t("tips-secure-account")}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </BrandLayout>
  );
};

export default Settings;
