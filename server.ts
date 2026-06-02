import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize express app
const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized GoogleGenAI client to prevent startup crashes when key is missing
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. API: Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", hasApiKey: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY" });
});

// 2. API: Generate AI Custom Keepsake Recap
app.post("/api/generate-recap", async (req, res) => {
  const { eventName, eventTagline, eventDescription, location, date, attendeeName, attendeeRole, attendeeBio, highlights } = req.body;

  if (!eventName || !attendeeName) {
    return res.status(400).json({ error: "Missing required event or attendee fields." });
  }

  const client = getAiClient();

  if (!client) {
    // Elegant fallback mock recap when Gemini API Key is missing, so UI stays premium
    const fallbackRecap = {
      story: `At ${eventName}, held in ${location} on ${date}, ${attendeeName} set foot as a vital participant. Emerging with the specialized identity of a ${attendeeRole || "Core Participant"}, their presence left a lasting stroke on the collaborative canvas of the evening. They explored the event's central theme: "${eventTagline || "Every event deserves a legacy"}". Through direct workshops and high-level collaborative intersections, they proved that active presence is the base of building professional ecosystems.`,
      highlights: [
        `Successfully integrated check-in flow at ${location}`,
        `Engaged with other attendee developers as a ${attendeeRole || "Builder"}`,
        `Committed persistent proof-of-presence into their verified Qeepsy wallet`
      ],
      keyConnections: [
        "Met 3 other builders during the key networking hours",
        `Bridged connection as a professional ${attendeeRole || "Maker"}`
      ],
      skillsProven: [
        attendeeRole || "Creative Intelligence",
        "Ecosystem Exploration",
        "Community Collaboration"
      ],
      quote: `"Presence is more than showing up; it is establishing a permanent footprint on the memory ledger."`,
      badgeTitle: `${attendeeRole ? attendeeRole : "Distinguished"} Legacy Custodian`,
      isMocked: true
    };
    return res.json(fallbackRecap);
  }

  try {
    const prompt = `
You are the elite AI Memory Engine for Qeepsy.
Generate an inspirational, beautifully worded narrative memory recap and digital keepsake for an attendee at a modern tech/social event.

Event Context:
- Event Name: ${eventName}
- Event Tagline: ${eventTagline}
- Description: ${eventDescription}
- Location: ${location}
- Date: ${date}

Attendee Context:
- Name: ${attendeeName}
- Professional/Social Role: ${attendeeRole}
- Bio/Background: ${attendeeBio}
- Selected Checked-in Moments or Highlights: ${highlights ? highlights.join(", ") : "checked in safely, claimed badge"}

Provide a rich, highly polished JSON response matching the schema below. Keep the story deeply personal and artistic, elevating their role and background with the theme of the event.

Required JSON Structure:
{
  "story": "A professional, beautiful 2-3 paragraph emotional narrative of their active presence, intellectual exploration, and contribution during the event.",
  "highlights": ["Narrative bullet point 1", "Narrative bullet point 2", "Narrative bullet point 3"],
  "keyConnections": ["Short fun description of connection with a fellow web3 dev or designer", "Professional synergy detail"],
  "skillsProven": ["Skill 1", "Skill 2", "Skill 3"],
  "quote": "A single premium, highly-quotable personal statement synthesizing their unique contribution at this event.",
  "badgeTitle": "A personalized creative title for their specific badge (e.g., 'Lead Frontend Alchemist' or 'Move Smart Contract Vanguard')"
}
`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["story", "highlights", "keyConnections", "skillsProven", "quote", "badgeTitle"],
          properties: {
            story: { type: Type.STRING, description: "A beautifully descriptive 2-3 paragraph narrative story of their attendance." },
            highlights: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Three prominent and beautiful highlights of their presence."
            },
            keyConnections: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Two fun or professional networking connection briefs."
            },
            skillsProven: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Three key skills proved at this event."
            },
            quote: { type: Type.STRING, description: "An elegant, highly quotable statement about their presence." },
            badgeTitle: { type: Type.STRING, description: "A highly custom and creative badge title fitting their specific role and event theme." }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No text returned from Gemini API");
    }

    const data = JSON.parse(text.trim());
    return res.json({ ...data, isMocked: false });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Graceful fallback on API generation failure
    return res.json({
      story: `A narrative of active presence at ${eventName}. ${attendeeName} stepped as a dedicated ${attendeeRole || "Core Builder"}, creating direct synergies in Yaba and validating that each presence contains the seed of an ecosystem's progress.`,
      highlights: [
        "Verified digital footprint securely",
        "Expanded attendee collaborative graphs",
        "Discovered local sponsorship structures"
      ],
      keyConnections: [
        "Networked with engineers in the local scene",
        "Shared architectural concepts"
      ],
      skillsProven: [
        attendeeRole || "Collaborative Power",
        "Systems Thinking",
        "Ecosystem Integration"
      ],
      quote: `"Collaborators build modules; communities build legacies."`,
      badgeTitle: `${attendeeRole || "Distinguished"} Tech Explorer`,
      isMocked: true,
      apiError: true
    });
  }
});

// Serve frontend assets based on environment
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static handler ready.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Qeepsy full-stack backend running on http://0.0.0.0:${PORT}`);
  });
}

initServer().catch(err => {
  console.error("Failed to start server:", err);
});
