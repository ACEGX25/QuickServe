import {useState, useRef, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";

import { 
  Star, 
  ArrowLeft, 
  Upload, 
  X, 
  CheckCircle2,
  Sparkles,
  Camera,
  Send,
  ThumbsUp,
  Heart,
  Smile,
  Meh,
  Frown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { PageTransition, FadeIn } from "@/components/layout/PageTransition";
import { GlassCard } from "@/components/ui/GlassCard";
import { useNavigate } from "react-router-dom";




const WriteReview = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);


  const ratingLabels = [
    { value: 1, label: "Poor", emoji: Frown, color: "text-red-500" },
    { value: 2, label: "Fair", emoji: Meh, color: "text-orange-500" },
    { value: 3, label: "Good", emoji: Smile, color: "text-yellow-500" },
    { value: 4, label: "Great", emoji: ThumbsUp, color: "text-emerald-500" },
    { value: 5, label: "Excellent", emoji: Heart, color: "text-pink-500" },
  ];

  const quickTags = [
    "On Time", "Professional", "Clean Work", "Fair Price", 
    "Friendly", "Expert", "Quick Service", "Recommended"
  ];

  const currentRatingInfo = ratingLabels.find(r => r.value === (hoverRating || rating));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files) return;

  const selectedImages = Array.from(files)
    .slice(0, 4 - images.length)
    .map(file => URL.createObjectURL(file));

  setImages(prev => [...prev, ...selectedImages]);

  // reset input so same file can be selected again
  e.target.value = "";
};


  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (!booking) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:8080/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          bookingId: booking.id,
          stars: rating,
          comment: review,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit review");
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Review already submitted or failed");
    } finally {
      setIsSubmitting(false);
    }
  };


  const progressValue = () => {
    let progress = 0;
    if (rating > 0) progress += 40;
    if (review.length >= 20) progress += 40;
    if (selectedTags.length > 0) progress += 20;
    return progress;
  };

  const { id } = useParams();

  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      const res = await fetch(
          `http://localhost:8080/api/bookings/my/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
      );

      const data = await res.json();
      setBooking(data);
    };

    fetchBooking();
  }, [id]);

  if (!booking) {
    return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading booking...</p>
        </div>
    );
  }

  if (booking.reviewed) {
    return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">
            You have already reviewed this booking.
          </p>
        </div>
    );
  }


  if (isSubmitted) {
    return (
      <PageTransition className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-3xl font-bold mb-3">Thank You!</h1>
            <p className="text-muted-foreground mb-8">
              Your review has been submitted successfully. It helps others make better decisions.
            </p>
            
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  key={star}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + star * 0.1 }}
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
                    }`}
                  />
                </motion.div>
              ))}
            </div>

            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate("/my-bookings")}>
                View Bookings
              </Button>
              <Button onClick={() => navigate("/customer")} className="bg-gradient-to-r from-primary to-accent">
                Back to Home
              </Button>
            </div>
          </motion.div>

          {/* Confetti Effect */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 1, 
                y: 0, 
                x: 0,
                scale: 1 
              }}
              animate={{ 
                opacity: 0, 
                y: -200 - Math.random() * 200,
                x: (Math.random() - 0.5) * 400,
                scale: 0,
                rotate: Math.random() * 360
              }}
              transition={{ duration: 2, delay: 0.3 + Math.random() * 0.5 }}
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
              }}
            >
              <Sparkles className={`w-4 h-4 ${
                ['text-amber-400', 'text-emerald-400', 'text-pink-400', 'text-blue-400'][i % 4]
              }`} />
            </motion.div>
          ))}
        </motion.div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="p-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Write a Review</h1>
                <p className="text-sm text-muted-foreground">Share your experience</p>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{progressValue()}% Complete</span>
              <div className="w-24">
                <Progress value={progressValue()} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Service Info Card */}
        <FadeIn>
          <GlassCard className="p-4 mb-8">
            <div className="flex items-center gap-4">
              {/*<div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">*/}
              {/*  <img src={service.image} alt={booking?.serviceTitle} className="w-full h-full object-cover" />*/}
              {/*</div>*/}
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-lg truncate">{booking?.serviceTitle}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={booking?.providerNameAvatar} />
                    <AvatarFallback className="text-xs bg-primary/20">{booking?.providerNameInitials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">{booking?.providerName}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{new Date(booking?.startTime).toLocaleDateString()}</p>
              </div>
            </div>
          </GlassCard>
        </FadeIn>

        {/* Rating Section */}
        <FadeIn delay={0.1}>
          <GlassCard className="p-8 mb-6 text-center">
            <h3 className="text-lg font-semibold mb-2">How was your experience?</h3>
            <p className="text-sm text-muted-foreground mb-6">Tap a star to rate</p>
            
            {/* Stars */}
            <div className="flex justify-center gap-3 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.2, rotate: star % 2 === 0 ? 5 : -5 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="relative"
                >
                  <Star
                    className={`w-12 h-12 transition-all duration-200 ${
                      star <= (hoverRating || rating)
                        ? "fill-amber-400 text-amber-400 drop-shadow-lg"
                        : "fill-muted text-muted hover:text-muted-foreground"
                    }`}
                  />
                  {star <= (hoverRating || rating) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300 absolute -top-1 -right-1" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Rating Label */}
            <AnimatePresence mode="wait">
              {currentRatingInfo && (
                <motion.div
                  key={currentRatingInfo.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center gap-2"
                >
                  <currentRatingInfo.emoji className={`w-6 h-6 ${currentRatingInfo.color}`} />
                  <span className={`text-xl font-semibold ${currentRatingInfo.color}`}>
                    {currentRatingInfo.label}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </FadeIn>

        {/* Quick Tags */}
        <FadeIn delay={0.2}>
          <GlassCard className="p-6 mb-6">
            <h3 className="text-sm font-medium mb-4">What did you like? (Optional)</h3>
            <div className="flex flex-wrap gap-2">
              {quickTags.map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {selectedTags.includes(tag) && (
                    <CheckCircle2 className="w-4 h-4 inline mr-1" />
                  )}
                  {tag}
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        {/* Review Text */}
        <FadeIn delay={0.3}>
          <GlassCard className="p-6 mb-6">
            <h3 className="text-sm font-medium mb-4">Tell us more about your experience</h3>
            <Textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="What made this service stand out? Share details that would help others..."
              className="min-h-[150px] bg-background/50 border-border/50 resize-none"
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-muted-foreground">
                {review.length < 20 && review.length > 0 && (
                  <span className="text-amber-500">Minimum 20 characters</span>
                )}
                {review.length >= 20 && (
                  <span className="text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Looks good!
                  </span>
                )}
              </p>
              <span className={`text-xs ${review.length > 450 ? "text-amber-500" : "text-muted-foreground"}`}>
                {review.length}/500
              </span>
            </div>
          </GlassCard>
        </FadeIn>

        {/* Photo Upload */}
        <FadeIn delay={0.4}>
          <GlassCard className="p-6 mb-8">
            <h3 className="text-sm font-medium mb-4">Add Photos (Optional)</h3>
            
            <div className="flex flex-wrap gap-3">
              {images.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative w-20 h-20 rounded-xl overflow-hidden group"
                >
                  <img src={img} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))}
              
              {images.length < 4 && (
  <>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => fileInputRef.current?.click()}
      className="w-20 h-20 rounded-xl border-2 border-dashed border-border/50 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
    >
      <Camera className="w-6 h-6" />
      <span className="text-xs">Add</span>
    </motion.button>

    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      multiple
      className="hidden"
      onChange={handleImageUpload}
    />
  </>
)}

            </div>
            <p className="text-xs text-muted-foreground mt-3">Add up to 4 photos</p>
          </GlassCard>
        </FadeIn>

        {/* Submit Button */}
        <FadeIn delay={0.5}>
          <motion.div
            whileHover={{ scale: rating > 0 ? 1.02 : 1 }}
            whileTap={{ scale: rating > 0 ? 0.98 : 1 }}
          >
            <Button
              onClick={handleSubmit}
              disabled={rating === 0 || review.length < 20 || isSubmitting}
              className="w-full h-14 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Review
                </>
              )}
            </Button>
          </motion.div>
          
          {rating === 0 && (
            <p className="text-center text-sm text-muted-foreground mt-3">
              Please select a rating to continue
            </p>
          )}
        </FadeIn>
      </div>
    </PageTransition>
  );
};

export default WriteReview;
