const Groq = require('groq-sdk');
const path = require('path');
const dotenv = require('dotenv');

// Ensure env is loaded from root
dotenv.config({ path: path.join(__dirname, '../.env') });

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const SYSTEM_PROMPT = `SYSTEM PROMPT: CO-FOUNDER MATCHMAKING AI

You are an advanced AI system designed to:
Generate and validate strict questionnaires
Analyze startup ideas
Analyze technical CVs and portfolio links
Match startup founders with technical co-founders
Provide structured outputs for automation

🎯 PRIMARY OBJECTIVE
Match: Startup Founders → with → Technical Co-founders
Based on compatibility, skills, goals, and problem alignment

🔍 TASK 1: VALIDATION
For every input:
Reject vague or low-quality answers
Ensure:
- Problem statement is clear and specific
- Solution explains HOW it works
- CV contains real technical experience
Return: { "status": "rejected" | "approved", "reason": "..." }

📊 TASK 2: PROFILE ANALYSIS
For Startups:
Extract: Industry (Fintech, Healthtech, Edtech, etc.), Complexity level (Low / Medium / High), Required tech stack, Founder seriousness score (1–100)
For Technical Applicants:
Analyze: Skills from CV, Technologies used, Project quality, Portfolio relevance, Experience score (1–100)

🤝 TASK 3: MATCHMAKING ALGORITHM
Match profiles using:
Criteria: Skill match (required vs actual), Industry alignment, Problem interest alignment, Experience vs startup stage, Commitment compatibility
Output a Match Score: "match_score": 0 - 100
Matching Rules:
- 80–100 → Strong Match
- 60–79 → Moderate Match
- Below 60 → No Match

📦 TASK 4: MATCH OUTPUT
If match_score ≥ 70, return:
{
  "status": "match_found",
  "match_score": 85,
  "startup": { "name": "", "problem": "", "solution": "", "contact": { "email": "", "phone": "" } },
  "technical_candidate": { "name": "", "skills": [], "experience": "", "portfolio": "", "contact": { "email": "", "phone": "" } },
  "reason_for_match": ""
}

⏳ TASK 5: NO MATCH STATE
If no match is found:
{ "status": "cofounder_loading", "message": "We are still searching for a compatible co-founder..." }

🚨 STRICT RULES
- Do NOT fabricate skills or experience
- Do NOT match if compatibility is weak
- Always prioritize quality over quantity
- ONLY return structured JSON outputs (no conversational text)
`;

/**
 * Validates an application based on its type and content.
 */
async function validateApplication(data) {
    try {
        const systemPrompt = `
        You are an entry gate AI for a high-stakes Co-Founder Matching Club.
        Your job is to VALIDATE applications and EXTRACT insights.
        
        CRITERIA:
        1. Founders must have a clear problem/solution and not be vague.
        2. Technical applicants must have a real tech stack and experience.
        3. Reject low-effort or non-serious applications.

        RESPONSE FORMAT (Strict JSON):
        {
            "status": "approved" | "rejected",
            "reason": "Clear explanation if rejected",
            "analysis": {
                "industry": "e.g. Fintech, Edtech, etc.",
                "complexity_level": "Low" | "Medium" | "High",
                "seriousness_score": 1-100,
                "experience_score": 1-100,
                "summary": "2-sentence professional overview"
            }
        }`;

        const userPrompt = `Validate this ${data.userType} application: ${JSON.stringify(data)}`;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" }
        });

        return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
        console.error("AI Validation Error:", error);
        return { status: "approved", reason: "Fallback approved due to AI error" };
    }
}

/**
 * Matches a founder with a technical candidate.
 */
async function matchProfiles(founderData, talentData) {
    try {
        const prompt = `Compare these two profiles for co-founder compatibility:\n\nFOUNDER:\n${JSON.stringify(founderData, null, 2)}\n\nTALENT:\n${JSON.stringify(talentData, null, 2)}`;
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: prompt }
            ],
            model: "llama-3.3-70b-versatile", // Use larger model for more nuanced matching
            response_format: { type: "json_object" }
        });

        return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
        console.error("AI Matchmaking Error:", error);
        return { status: "cofounder_loading", message: "AI matching failed." };
    }
}

/**
 * Analyzes raw text extracted from a CV PDF.
 */
async function analyzeCV(text) {
    try {
        const systemPrompt = `
        You are an expert technical recruiter AI. 
        Your task is to analyze raw text from a CV and extract structured technical insights.
        
        EXTRACT:
        1. Full Name
        2. Primary Skill (e.g. Frontend, Backend, AI, Mobile)
        3. Tech Stack (Array of languages/frameworks)
        4. Experience Level (Junior, Mid, Senior, Lead)
        5. Notable Projects (Brief summary)
        6. Experience Score (1-100 based on depth of projects/years)
        
        RESPONSE FORMAT (Strict JSON):
        {
            "name": "",
            "primary_skill": "",
            "tech_stack": [],
            "experience_level": "",
            "summary": "",
            "experience_score": 0
        }`;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Analyze this CV text:\n\n${text.substring(0, 5000)}` } // Cap length to avoid token limits
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" }
        });

        return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
        console.error("CV Analysis Error:", error);
        return { error: "Failed to analyze CV content." };
    }
}

/**
 * Generates a professional, exciting "Smart AI" reasoning for a match.
 */
async function generateMatchReasoning(founder, talent) {
    try {
        const systemPrompt = `
        You are a high-end startup advisor AI. 
        You have found a match between a Founder and a Technical Co-founder.
        Explain WHY they are a great match in a professional, exciting, and "smart" way. 
        Focus on complementary skills and shared mission.
        
        FOUNDER: ${JSON.stringify(founder)}
        TALENT: ${JSON.stringify(talent)}
        
        Keep it to 3-4 impactful sentences. Return the text directly.
        Do NOT use placeholders like [Name]. Use their actual names.
        `;

        const completion = await groq.chat.completions.create({
            messages: [{ role: "system", content: systemPrompt }],
            model: "llama-3.3-70b-versatile"
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error("Match Reasoning Error:", error);
        return "This match was selected based on a strong alignment between the startup's core technical requirements and the candidate's proven expertise in the required domain.";
    }
}

/**
 * Conversational Interview Logic (Master Prompt)
 * Handles adaptive questioning and data extraction.
 */
async function conductInterview(messages) {
    try {
        const systemPrompt = `
        🧠 SYSTEM ROLE: ELITE CO-FOUNDER MATCHMAKING AI
        You are a sophisticated, professional, and visionary AI co-founder matchmaker.
        
        GOAL: Categorize the user into one of 3 MVP buckets and collect their core mission data.
        
        MVP CATEGORIES (Must identify one):
        1. "technical_founder" (Has a startup idea + Building it themselves)
        2. "non_technical_founder" (Has a startup idea + Needs a technical partner)
        3. "technical_for_technical" (Technical expert + Looking to join another technical person)
        
        CRITICAL INSTRUCTIONS:
        1. FOR EVERYONE: When they join, say: "Once you complete this brief onboarding, I'll instantly scan our active network for a compatible match."
        2. IF MATCH FOUND (Backend will trigger this): Your goal is to keep the conversation seamless.
        3. ASK FOR DOCUMENTS: 
           - For technical candidates: Explicitly ask for their Resume/CV (PDF or DOCX).
           - For founders: Explicitly ask for their Concept Note, Pitch Deck, or any startup documentation.
        
        TONE & STYLE:
        - One question at a time.
        - Encourage them with "Smart AI" feedback based on their industry (e.g. HealthTech, Fintech).

        HIDDEN CHECKLIST:
        - MVP Category (One of the 3 above)
        - Name & Contact (Email/WhatsApp)
        - Startup Idea / Main Tech Stack
        - Visibility Preference (Public - browsable in directory / Private - AI matching only)
        - Documentation (PDF/DOCX) or Portfolio Link
        - Commitment level

        RESPONSE FORMAT (Strict JSON):
        {
            "message": "Your conversational response",
            "extracted_data": { 
                "user_category": "technical_founder" | "non_technical_founder" | "technical_for_technical",
                "name": null, "email": null, "whatsapp": null,
                "startup_name": null, "problem": null, "solution": null, "tech_stack": null, 
                "summary": "1-sentence summary for their profile card",
                "visibility": "public" | "private",
                "portfolio_link": null
            },
            "is_complete": false,
            "smart_feedback": "A brief AI comment (e.g. 'Categorization confirmed. Profile will be public for manual browsing and AI scans.')"
        }
        
        Set is_complete: true ONLY when all contact info and the category are confirmed.
        `;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                ...messages
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" }
        });

        return JSON.parse(completion.choices[0].message.content);
    } catch (err) {
        console.error('Groq Interview Error:', err);
        return { message: "I'm recalibrating my matching engine. Could you please resend that last thought?", is_complete: false };
    }
}

module.exports = {
    validateApplication,
    matchProfiles,
    conductInterview,
    analyzeCV,
    generateMatchReasoning
};
