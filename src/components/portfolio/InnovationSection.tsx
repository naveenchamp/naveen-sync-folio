import { Card } from "@/components/ui/card";

const InnovationSection = () => {

  return (
    <section id="innovation" className="py-20 bg-background/60 backdrop-blur-md relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in">
            <h2 className="heading-lg mb-6">How I Think</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          {/* Main Philosophy */}
          <div className="text-center mb-16 slide-up">
            <Card className="max-w-4xl mx-auto p-8 md:p-12 bg-background border-border card-hover">
              <blockquote className="space-y-6">
                <p className="text-xl md:text-2xl leading-relaxed text-foreground font-light">
                  "I approach problems with <span className="text-[hsl(270_95%_75%)] font-semibold">curiosity first</span> — 
                  every bug is a puzzle, every feature is an opportunity, and every project is a chance to 
                  <span className="text-[hsl(270_95%_75%)] font-semibold">reimagine what's possible</span>."
                </p>
                
                <p className="text-lg md:text-xl text-foreground leading-relaxed">
                  My focus is on creating solutions that feel intuitive for users while being scalable for the future. 
                  I believe great code isn't just written — it's 
                  <span className="text-[hsl(217_91%_70%)] font-semibold"> crafted with intention, empathy, and vision</span>.
                </p>
                
                <div className="pt-4">
                  <cite className="text-lg font-semibold gradient-text">— Naveen Reddy Tippasani</cite>
                </div>
              </blockquote>
            </Card>
          </div>


          {/* Call to Action */}
          <div className="text-center mt-16 fade-in">
            <div className="max-w-3xl mx-auto space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">
                Always exploring new technologies and pushing the boundaries of what's possible
              </h3>
              <p className="text-lg text-muted-foreground">
                The best solutions emerge when diverse perspectives unite around a shared vision. 
                <span className="gradient-text font-semibold"> Let's chat</span> and build something extraordinary together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;