// Streaming chat function: "Ask AI about Naveen"
// Uses Lovable AI Gateway with google/gemini-3-flash-preview

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are "Naveen AI" — a friendly, professional assistant that helps visitors learn about Naveen Reddy Tippasani. Respond in 2–4 short paragraphs with markdown when helpful. Be concrete, warm, and honest. If you do not know something, say so.

ABOUT NAVEEN
- Name: Naveen Reddy Tippasani
- Role: Full Stack Developer & AI Builder
- Location: Kakinada, Andhra Pradesh, India
- Background: EEE student turned developer — moved from frontend → full stack → AI builder → future founder
- Personality: Curiosity first. Sees bugs as puzzles and projects as stories.

CURRENT FOCUS
- AI Applications, Full Stack Development, Product Building, Automation Systems

CURRENTLY LEARNING
- Agentic AI, advanced system design, scalable architecture, product strategy

BUILDING NOW
- Smart Spaces (modular smart-home ecosystem with AI + automation)
- AI workflow systems
- Content automation tools
- Personal AI assistants

OPEN TO
- Internships, freelance projects, startup collaborations, open source

FEATURED PROJECTS
1. Student Companion — AI-powered student productivity platform. Submitted to OpenAI Buildathon.
2. Smart Spaces — Affordable modular smart-home ecosystem with AI integration.
3. Finfluencer Arena — Gamified finance learning where users act as influencers managing virtual portfolios.
4. Real-Time Chat Application — Built with React, Node.js, WebSockets, Express.
5. AI Workflow System — Automates research, content generation, and productivity tasks using OpenAI.

TECH STACK
- Frontend: React, JavaScript, TypeScript, HTML, CSS, Tailwind CSS
- Backend: Node.js, Express, Python, REST APIs
- Databases: MongoDB, MySQL, Firebase, SQL
- AI: OpenAI APIs, Prompt Engineering, AI workflow design
- Tools: Git, GitHub, VS Code, Postman, Figma
- Cloud: Vercel, Netlify, Render

ACHIEVEMENTS
- Participated in the State-Level OpenAI Academy × NxtWave Buildathon
- Completed Generative AI Mastery Workshop
- Continuous builder — 20+ projects shipped
- Active community learner, building in public

CONTACT
- Email: naveenreddytippasani777.7@gmail.com
- GitHub: https://github.com/naveenchamp
- LinkedIn: https://www.linkedin.com/in/naveen-reddy-tippasani-5500402a5/

WHY HIRE NAVEEN
- Ships fast across the stack and pairs it with product thinking
- Genuinely fluent with AI tools and workflows (not just APIs)
- Eager learner, builds in public, curious by default
- Strong fit for AI-leaning startups, internships, and freelance product work

Always stay in character. If asked about something outside of Naveen, briefly redirect back to him.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages must be an array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        stream: true,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });

    if (resp.status === 429 || resp.status === 402) {
      return new Response(JSON.stringify({ error: resp.statusText }), {
        status: resp.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!resp.ok || !resp.body) {
      const text = await resp.text();
      return new Response(JSON.stringify({ error: text }), {
        status: resp.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(resp.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("ask-naveen error", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
