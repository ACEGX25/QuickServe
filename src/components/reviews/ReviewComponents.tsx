import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ThumbsUp, MessageSquare, Calendar, User, Quote } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: number;
  customer: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
  helpful: number;
  response?: string;
}

const sampleReviews: Review[] = [
  {
    id: 1,
    customer: "Hafsa",
    rating: 5,
    comment:
      "Absolutely fantastic service! Mike arrived on time and fixed our leaky faucet in no time. Very professional and cleaned up after himself. Highly recommend!",
    date: "2 days ago",
    service: "Professional Plumbing",
    helpful: 10,
    response: "Thank you so much for your kind words, Hafsa! We're glad we could help.",
  },
  {
    id: 2,
    customer: "Rutuh kumari",
    rating: 4,
    comment:
      "Good service overall. The technician was knowledgeable and explained everything clearly. Only minor delay in arrival time.",
    date: "1 week ago",
    service: "Electrical Repairs",
    helpful: 8,
  },
  {
    id: 3,
    customer: "Vaishnavi",
    rating: 5,
    comment:
      "Best cleaning service I've ever used! My apartment looks spotless. The team was friendly and very thorough. Will definitely book again.",
    date: "2 weeks ago",
    service: "House Cleaning",
    helpful: 4,
  },
  {
    id: 4,
    customer: "Geetesh",
    rating: 4,
    comment:
      "Great experience with the car detailing. My car looks brand new! Fair pricing and quick turnaround.",
    date: "3 weeks ago",
    service: "Car Detailing",
    helpful: 6,
    response:"Thank you, Geetesh, for taking the time to share your experience. We’re glad our service met your expectations and appreciate your trust in us."

  },
  {
    id: 5,
    customer: "Ravi prakash",
    rating: 5,
    comment:"Excellent wall painting service! The team was punctual, worked neatly, and the finish looks smooth and premium. Our house feels brand new.",
    date: "2 days ago",
    service: "wall painting",
    helpful: 7,
    response: "Thanks a lot, Ravi Prakash! Your feedback honestly means a lot to our team. We’re glad we could help and look forward to assisting you again in the future.",
  },
{
    id: 5,
    customer: "Nithish",
    rating: 5,
    comment:"Absolutely fantastic service! The gardener arrived on time and transformed our garden beautifully. The plants were trimmed perfectly, the area was left clean, and the attention to detail was impressive. Very professional and reliable—highly recommend!",
    date: "2 days ago",
    service: "Gradening",
    helpful: 22,
  },
];

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export const StarRating = ({
  rating,
  size = "md",
  interactive = false,
  onChange,
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-8 w-8",
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          whileHover={interactive ? { scale: 1.2 } : undefined}
          whileTap={interactive ? { scale: 0.9 } : undefined}
          className={cn("transition-colors", interactive && "cursor-pointer")}
        >
          <Star
            className={cn(
              sizes[size],
              "transition-colors",
              (hoverRating || rating) >= star
                ? "fill-amber-500 text-amber-500"
                : "text-muted-foreground/30"
            )}
          />
        </motion.button>
      ))}
    </div>
  );
};

interface ReviewCardProps {
  review: Review;
  showResponse?: boolean;
}

export const ReviewCard = ({ review, showResponse = true }: ReviewCardProps) => {
  const [helpful, setHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);

  const handleHelpful = () => {
    if (!helpful) {
      setHelpful(true);
      setHelpfulCount((prev) => prev + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <GlassCard className="h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-semibold">
              {review.customer
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground">{review.customer}</h3>
                <p className="text-sm text-muted-foreground">{review.service}</p>
              </div>
              <div className="text-right">
                <StarRating rating={review.rating} size="sm" />
                <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mb-4">
          <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/10" />
          <p className="text-foreground/80 leading-relaxed pl-4">{review.comment}</p>
        </div>

        {showResponse && review.response && (
          <div className="bg-secondary/50 rounded-xl p-4 mb-4">
            <p className="text-sm font-medium text-primary mb-1">Provider Response</p>
            <p className="text-sm text-muted-foreground">{review.response}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleHelpful}
            className={cn(
              "text-muted-foreground",
              helpful && "text-primary"
            )}
          >
            <ThumbsUp className={cn("h-4 w-4 mr-2", helpful && "fill-primary")} />
            Helpful ({helpfulCount})
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <MessageSquare className="h-4 w-4 mr-2" />
            Reply
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  );
};

interface WriteReviewProps {
  serviceName: string;
  onSubmit: (rating: number, comment: string) => void;
}

export const WriteReview = ({ serviceName, onSubmit }: WriteReviewProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a star rating",
        variant: "destructive",
      });
      return;
    }
    onSubmit(rating, comment);
    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback",
    });
    setRating(0);
    setComment("");
  };

  return (
    <GlassCard>
      <h3 className="text-lg font-display font-semibold text-foreground mb-4">
        Write a Review for {serviceName}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Your Rating</p>
          <StarRating rating={rating} size="lg" interactive onChange={setRating} />
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Your Review</p>
          <Textarea
            placeholder="Share your experience with this service..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        <AnimatedButton
          type="submit"
          className="w-full bg-primary hover:bg-primary/90"
          glowOnHover
        >
          Submit Review
        </AnimatedButton>
      </form>
    </GlassCard>
  );
};

export const ReviewsList = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-foreground">
          Customer Reviews
        </h2>
        <div className="flex items-center gap-2">
          <StarRating rating={4.8} size="sm" />
          <span className="font-semibold text-foreground">4.8</span>
          <span className="text-muted-foreground text-sm">
            ({sampleReviews.length} reviews)
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sampleReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};
const ReviewComponents = () => {
  return <ReviewsList />;
};

export default ReviewComponents;
