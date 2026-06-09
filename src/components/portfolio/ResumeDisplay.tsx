import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, MapPin, Phone, Mail, Github, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ResumeDisplay = () => {
  const { toast } = useToast();

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
    <section id="resume" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in">
            <h2 className="heading-lg mb-6">Resume</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive overview of my education, experience, and technical expertise.
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6"></div>
          </div>

          {/* Resume Card - Matching uploaded image format */}
          <Card className="p-8 bg-white text-black border-border shadow-2xl">
            {/* Header */}
            <div className="text-center border-b border-gray-300 pb-6 mb-6">
              <h1 className="text-3xl font-bold text-black mb-4">Naveen Reddy Tippasani</h1>
              <div className="text-sm text-black space-y-1">
                <div className="flex justify-center items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Kakinada, Andhra Pradesh, 533001</span>
                  <span>|</span>
                  <Phone className="w-4 h-4" />
                  <span>9390661948</span>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>naveenreddytippasani777.7@gmail.com</span>
                </div>
                <div className="flex justify-center items-center gap-4 text-blue-600">
                  <a href="https://www.linkedin.com/in/naveen-reddy-tippasani-5500402a5/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    https://www.linkedin.com/in/naveen-reddy-tippasani-5500402a5/
                  </a>
                </div>
                <div className="flex justify-center items-center gap-4 text-blue-600">
                  <a href="https://github.com/naveenchamp" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    https://github.com/naveenchamp
                  </a>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-black border-b border-gray-300 pb-2 mb-4">EDUCATION</h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold text-black">Nxtwave Disruptive Technologies</div>
                    <div className="text-black">Industry Ready Certification in Full-stack Development</div>
                  </div>
                  <div className="text-black">Jan 2024 - Ongoing</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold text-black">JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY COLLEGE OF KAKINADA, kakinada</div>
                    <div className="text-black">Bachelor of Technology - Electrical & Electronics Engineering (EEE) (7.3)</div>
                  </div>
                  <div className="text-black">2022 - 2026</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold text-black">SASI EDUCATIONAL INSTITUTIONS, velivennu</div>
                    <div className="text-black">Intermediate - MPC (95.5%)</div>
                  </div>
                  <div className="text-black">2021 - 2022</div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className="text-black">Secondary School (10) Certificate (9.2 CGPA)</div>
                  </div>
                  <div className="text-black">2019 - 2020</div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-black border-b border-gray-300 pb-2 mb-4">SKILLS</h2>
              <div className="space-y-2 text-sm">
                <div><span className="font-semibold text-black">Frontend:</span> <span className="text-black">HTML, CSS, Bootstrap, JavaScript, React.js</span></div>
                <div><span className="font-semibold text-black">Backend:</span> <span className="text-black">Python, Express, Node.js</span></div>
                <div><span className="font-semibold text-black">Databases:</span> <span className="text-black">SQLite</span></div>
                <div><span className="font-semibold text-black">Other Skills:</span> <span className="text-black">Automation Testing, Data Structures & Algorithms, OOPs, PHP, XR (AR, VR, MR)</span></div>
              </div>
            </div>

            {/* Projects */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-black border-b border-gray-300 pb-2 mb-4">PROJECTS</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-semibold text-black">Chatbot <span className="text-blue-600">(naveenaichatbot.ccbp.tech)</span></div>
                  <ul className="list-disc list-inside text-black space-y-1 mt-1">
                    <li>Innovative Chatbot designed to offer personalized and engaging interactions with users.</li>
                    <li>User-friendly UI created using HTML, CSS, and Bootstrap to display user-chatbot interactions.</li>
                    <li>Dynamic display of user inputs and chatbot responses achieved through JavaScript DOM operations and Array methods.</li>
                    <li>Chatbot responses tailored to user inputs by filtering relevant answers from its predefined list.</li>
                  </ul>
                  <div className="text-xs text-gray-600 mt-2">Technologies used: HTML, CSS, JS, Bootstrap</div>
                </div>

                <div>
                  <div className="font-semibold text-black">Todos Application <span className="text-blue-600">(todospice.ccbp.tech)</span></div>
                  <div className="text-black mt-1">A task management solution, designed to make life easier.</div>
                  <ul className="list-disc list-inside text-black space-y-1 mt-1">
                    <li>Streamlined task management through a combination of HTML, CSS, and Bootstrap for an intuitive interface.</li>
                    <li>Seamless CRUD operations through JavaScript event listeners and dynamic UI updates.</li>
                    <li>Secure task persistence with local storage methods, ensuring that your tasks are always available.</li>
                  </ul>
                  <div className="text-xs text-gray-600 mt-2">Technologies used: HTML, CSS, JS, Bootstrap</div>
                </div>

                <div>
                  <div className="font-semibold text-black">My Library (Books Page) <span className="text-blue-600">(libraryb00ks.ccbp.tech)</span></div>
                  <div className="text-black mt-1">Established an informative website for users to discover my book endorsements and gather details on well-known books.</div>
                  <ul className="list-disc list-inside text-black space-y-1 mt-1">
                    <li>Assembled an attention-grabbing banner area featuring my preferred popular book, incorporating various HTML block and inline elements.</li>
                    <li>Implemented CSS3 capabilities for design, including background, flex, box model properties, and a combination of relative (vh, vw) and absolute (px) units.</li>
                  </ul>
                  <div className="text-xs text-gray-600 mt-2">Technologies used: HTML, CSS, Bootstrap</div>
                </div>

                <div>
                  <div className="font-semibold text-black">Model Context Protocol(MCP) - Learning Path Generator</div>
                  <div className="text-blue-600 text-xs">(https://naveenchamp-mcp-learning-path-app-absw4u.streamlit.app/)</div>
                  <div className="text-black mt-1">This project is a Streamlit-based web application that generates personalized learning paths using the Model Context Protocol MCP. It integrates with various services including YouTube, Google Drive, and Notion to create comprehensive learning experiences.</div>
                  <div className="text-xs text-gray-600 mt-2">Technologies used: Python</div>
                </div>
              </div>
            </div>

            {/* Certificates */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-black border-b border-gray-300 pb-2 mb-4">CERTIFICATES</h2>
              <div className="text-sm">
                <div className="font-semibold text-black">Smart Interviews</div>
                <div className="text-black">Proficient in problem-solving and algorithmic thinking, mastered through Smart Interviews with hands-on coding experience in arrays, linked lists, stacks, queues, trees, graphs, and dynamic programming.</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-black border-b border-gray-300 pb-2 mb-4">ACHIEVEMENTS</h2>
              <div className="text-sm">
                <div className="font-semibold text-black">Data Structures</div>
                <div className="text-black">Successfully completed structured problem-solving and advanced data structures training, solving 100+ problems with optimal solutions.</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-6 border-t border-gray-300">
              <Button variant="outline" size="sm" asChild>
                <a href="https://www.linkedin.com/in/naveen-reddy-tippasani-5500402a5/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/naveenchamp" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button onClick={handleDownloadResume} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ResumeDisplay;