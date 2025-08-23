import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Project Manager",
      company: "TechCorp Solutions",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b714?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "Naveen delivered exceptional work on our web application. His attention to detail and problem-solving skills are outstanding. The project was completed ahead of schedule with excellent quality.",
      project: "E-commerce Platform"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Senior Developer",
      company: "InnovateLab",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "Working with Naveen was a pleasure. His React expertise and clean coding practices helped us build a scalable solution. He's also great at explaining complex technical concepts.",
      project: "Analytics Dashboard"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Startup Founder",
      company: "NextGen Apps",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "Naveen transformed our vision into reality. His full-stack skills and creative problem-solving approach made our MVP launch successful. Highly recommend for any web development project.",
      project: "MVP Development"
    },
    {
      id: 4,
      name: "David Kumar",
      role: "Tech Lead",
      company: "Digital Dynamics",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "Exceptional developer with strong communication skills. Naveen's ability to understand requirements and deliver robust solutions is impressive. He's a valuable team player.",
      project: "API Integration"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in">
            <h2 className="heading-lg mb-6">What People Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't just take my word for it. Here's what colleagues and clients have to say about working with me.
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6"></div>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative">
            <Card className="p-8 md:p-12 bg-background border-border card-hover max-w-4xl mx-auto">
              <div className="space-y-6">
                {/* Quote Icon */}
                <div className="flex justify-center">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Quote className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                  
                  <blockquote className="text-lg md:text-xl text-foreground leading-relaxed max-w-3xl mx-auto">
                    "{testimonials[currentIndex].content}"
                  </blockquote>

                  <div className="space-y-1">
                    <p className="text-sm text-primary font-medium">
                      Project: {testimonials[currentIndex].project}
                    </p>
                  </div>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-center gap-4 pt-6 border-t border-border">
                  <Avatar className="w-12 h-12">
                    <AvatarImage 
                      src={testimonials[currentIndex].avatar} 
                      alt={testimonials[currentIndex].name}
                    />
                    <AvatarFallback>
                      {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <p className="font-semibold text-foreground">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="rounded-full hover:bg-muted/50"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              {/* Dots Indicator */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-primary' : 'bg-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="rounded-full hover:bg-muted/50"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;