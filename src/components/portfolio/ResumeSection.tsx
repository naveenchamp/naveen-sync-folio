import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, MapPin, Phone, Mail, ExternalLink, Github, Linkedin, Calendar, Award, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ResumeSection = () => {
  const { toast } = useToast();

  const personalInfo = {
    name: "Naveen Reddy Tippasani",
    location: "Kakinada, Andhra Pradesh, 533001",
    phone: "9390661948",
    email: "naveenreddytippasani777.7@gmail.com",
    linkedin: "https://www.linkedin.com/in/naveen-reddy-tippasani-5500402a5/",
    github: "https://github.com/naveenchamp"
  };

  const education = [
    {
      institution: "Nxtwave Disruptive Technologies",
      degree: "Industry Ready Certification in Full-stack Development",
      period: "Jan 2024 - Ongoing",
      status: "current"
    },
    {
      institution: "Jawaharlal Nehru Technological University College of Kakinada",
      degree: "B Tech (Bachelor of Technology) - Electrical & Electronics Engineering (EEE)",
      grade: "7.3 CGPA",
      period: "2022 - 2026"
    },
    {
      institution: "Sasi Educational Institutions, Velinvennu",
      degree: "Intermediate - MPC",
      grade: "95.5%",
      period: "2021 - 2022"
    },
    {
      institution: "Sasi Educational Institutions, Velivennu",
      degree: "Secondary School Certificate",
      grade: "9.2 CGPA",
      period: "2019 - 2020"
    }
  ];

  const skillCategories = [
    {
      category: "Frontend",
      skills: ["HTML", "CSS", "Bootstrap", "JavaScript", "React.js"]
    },
    {
      category: "Backend",
      skills: ["Python", "Express", "Node.js"]
    },
    {
      category: "Databases",
      skills: ["SQLite"]
    },
    {
      category: "Other Skills",
      skills: ["Automation Testing", "Data Structures & Algorithms", "Express(node)", "OOPs", "PHP", "XR (AR, VR, MR)"]
    }
  ];

  const projects = [
    {
      name: "Chatbot",
      url: "naveenaichatbot.ccbp.tech",
      description: "An innovative Chatbot designed to offer personalized and engaging interactions with users.",
      highlights: [
        "User-friendly UI created using HTML, CSS, and Bootstrap to display user-chatbot interactions.",
        "Dynamic display of user inputs and chatbot responses achieved through JavaScript DOM operations and Array methods.",
        "Chatbot responses tailored to user inputs by filtering relevant answers from its predefined list."
      ],
      technologies: ["HTML", "CSS", "JS", "Bootstrap"]
    },
    {
      name: "Todos Application",
      url: "todospice.ccbp.tech",
      description: "A task management solution, designed to make life easier.",
      highlights: [
        "Streamlined task management through a combination of HTML, CSS, and Bootstrap for an intuitive interface.",
        "Seamless CRUD operations through JavaScript event listeners and dynamic UI updates.",
        "Secure task persistence with local storage methods, ensuring that your tasks are always available."
      ],
      technologies: ["HTML", "CSS", "JS", "Bootstrap"]
    },
    {
      name: "My Library (Books Page)",
      url: "libraryb00ks.ccbp.tech",
      description: "Established an informative website for users to discover my book endorsements and gather details on well-known books.",
      highlights: [
        "Assembled an attention-grabbing banner area featuring my preferred popular book, incorporating various HTML block and inline elements.",
        "Implemented CSS3 capabilities for design, including background, flex, box model properties, and a combination of relative (vh, vw) and absolute (px) units."
      ],
      technologies: ["HTML", "CSS", "Bootstrap"]
    },
    {
      name: "Model Context Protocol(MCP) - Learning Path Generator",
      url: "https://naveenchamp-mcp-learning-path-app-absw4u.streamlit.app/",
      description: "This project is a Streamlit-based web application that generates personalized learning paths using the Model Context Protocol (MCP). It integrates with various services including YouTube, Google Drive, and Notion to create comprehensive learning experiences.",
      highlights: [],
      technologies: ["Python"]
    }
  ];

  const certificates = [
    {
      name: "Smart Interviews",
      description: "Proficient in problem-solving and algorithmic thinking, mastered through Smart Interviews with hands-on coding experience in arrays, linked lists, stacks, queues, trees, graphs, and dynamic programming.",
      category: "Problem Solving"
    }
  ];

  const achievements = [
    {
      name: "Data Structures",
      description: "Successfully completed structured problem-solving and advanced data structures training, solving 100+ problems with optimal solutions.",
      category: "Technical Achievement"
    }
  ];

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/naveen-resume.pdf';
    link.download = 'Naveen_Reddy_Tippasani_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Resume Downloaded!",
      description: "Resume has been downloaded to your system.",
    });
  };

  return (
    <section id="resume" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in">
            <h2 className="heading-lg mb-6">Resume</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive overview of my education, experience, and technical expertise.
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6"></div>
          </div>

          {/* Personal Information */}
          <Card className="p-8 mb-8 bg-card border-border">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-foreground">{personalInfo.name}</h1>
              <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${personalInfo.email}`} className="hover:text-primary transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
              <div className="flex justify-center gap-4 pt-4">
                <Button variant="outline" size="sm" asChild>
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button onClick={handleDownloadResume} className="bg-primary hover:bg-primary/90">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Education */}
            <Card className="p-8 bg-card border-border">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-primary" />
                  <h3 className="heading-sm text-foreground">Education</h3>
                </div>
                
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-primary/20 pl-6 relative">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{edu.period}</span>
                          {edu.status === "current" && (
                            <Badge variant="outline" className="text-xs text-primary border-primary">
                              Current
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-semibold text-foreground">{edu.institution}</h4>
                        <p className="text-sm text-muted-foreground">{edu.degree}</p>
                        {edu.grade && (
                          <p className="text-sm font-medium text-primary">{edu.grade}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Skills */}
            <Card className="p-8 bg-card border-border">
              <div className="space-y-6">
                <h3 className="heading-sm text-foreground">Technical Skills</h3>
                
                <div className="space-y-6">
                  {skillCategories.map((category) => (
                    <div key={category.category} className="space-y-3">
                      <h4 className="font-semibold text-primary">{category.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <Badge 
                            key={skill} 
                            variant="outline" 
                            className="bg-muted/50 border-border"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Certificates & Achievements */}
            <Card className="p-8 bg-card border-border">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-primary" />
                  <h3 className="heading-sm text-foreground">Certificates & Achievements</h3>
                </div>
                
                <div className="space-y-6">
                  {certificates.map((cert, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{cert.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {cert.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{cert.description}</p>
                    </div>
                  ))}
                  
                  {achievements.map((achievement, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{achievement.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {achievement.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Projects */}
            <Card className="p-8 bg-card border-border">
              <div className="space-y-6">
                <h3 className="heading-sm text-foreground">Featured Projects</h3>
                
                <div className="space-y-6">
                  {projects.map((project, index) => (
                    <div key={index} className="space-y-3 border-b border-border/50 pb-6 last:border-b-0 last:pb-0">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold text-foreground">{project.name}</h4>
                          {project.url && (
                            <Button variant="ghost" size="sm" asChild>
                              <a 
                                href={project.url.startsWith('http') ? project.url : `https://${project.url}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                      
                      {project.highlights.length > 0 && (
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {project.highlights.map((highlight, hIndex) => (
                            <li key={hIndex} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="outline" 
                            className="text-xs bg-primary/10 border-primary/20"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;