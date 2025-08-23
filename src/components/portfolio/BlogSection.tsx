import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, ExternalLink } from "lucide-react";

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable React Applications with TypeScript",
      excerpt: "A comprehensive guide to architecting large-scale React applications using TypeScript, covering best practices, patterns, and performance optimization techniques.",
      category: "React",
      readTime: "8 min read",
      publishDate: "2024-02-15",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      tags: ["React", "TypeScript", "Architecture"],
      href: "#blog-1"
    },
    {
      id: 2,
      title: "API Design Best Practices for Modern Web Applications",
      excerpt: "Learn how to design robust, scalable APIs that power modern web applications. Covering RESTful principles, GraphQL considerations, and security best practices.",
      category: "Backend",
      readTime: "12 min read",
      publishDate: "2024-02-08",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
      tags: ["API", "Backend", "Architecture"],
      href: "#blog-2"
    },
    {
      id: 3,
      title: "Mastering CSS Grid and Flexbox for Responsive Design",
      excerpt: "Deep dive into CSS Grid and Flexbox layouts. Learn when to use each, how to combine them effectively, and create truly responsive designs.",
      category: "CSS",
      readTime: "10 min read",
      publishDate: "2024-01-28",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      tags: ["CSS", "Responsive", "Layout"],
      href: "#blog-3"
    },
    {
      id: 4,
      title: "JavaScript Performance Optimization Techniques",
      excerpt: "Explore advanced JavaScript optimization techniques including lazy loading, code splitting, memory management, and performance monitoring tools.",
      category: "JavaScript",
      readTime: "15 min read",
      publishDate: "2024-01-20",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
      tags: ["JavaScript", "Performance", "Optimization"],
      href: "#blog-4"
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      React: "text-blue-600 bg-blue-50 border-blue-200",
      Backend: "text-green-600 bg-green-50 border-green-200",
      CSS: "text-purple-600 bg-purple-50 border-purple-200",
      JavaScript: "text-yellow-600 bg-yellow-50 border-yellow-200"
    };
    return colors[category as keyof typeof colors] || "text-gray-600 bg-gray-50 border-gray-200";
  };

  return (
    <section id="blog" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in">
            <h2 className="heading-lg mb-6">Latest Articles</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Sharing insights, tutorials, and thoughts on modern web development, 
              best practices, and emerging technologies.
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6"></div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <Card 
                key={post.id}
                className="group bg-background border-border card-hover overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Post Image */}
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getCategoryColor(post.category)}>
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Post Meta */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.publishDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Post Title */}
                  <h3 className="heading-sm group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Post Excerpt */}
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge 
                        key={tag}
                        variant="outline" 
                        className="text-xs bg-muted/50 border-border"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Read More Button */}
                  <div className="pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="group/btn p-0 h-auto text-primary hover:text-primary/80"
                      asChild
                    >
                      <a href={post.href} className="flex items-center gap-2">
                        Read Article
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg" 
              className="glow-effect group"
              asChild
            >
              <a 
                href="#all-articles" 
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                View All Articles
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          {/* Newsletter Signup */}
          <Card className="mt-16 p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-border text-center">
            <div className="max-w-2xl mx-auto space-y-4">
              <h3 className="heading-sm text-foreground">Stay Updated</h3>
              <p className="text-muted-foreground">
                Get notified when I publish new articles about web development, 
                programming insights, and industry trends.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-md border border-border bg-background text-foreground"
                />
                <Button className="bg-primary hover:bg-primary/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;