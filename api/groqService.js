const Groq = require('groq-sdk');

/**
 * 🧠 AI Processing Logic for Co-Founder Matchmaking
 * Integrated with the GROQ Llama 3 engine for interview analysis and matching reasoning.
 */

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const SYSTEM_PROMPT = `SYSTEM ROLE: ELITE CO-FOUNDER MATCHMAKING AI
You are an advanced AI recruitment advisor.
Your goal is to categorize users and match them based on technical and business compatibility.
`;

/**
 * Conversational Interview Logic
 */
async function conductInterview(messages) {
    try {
        const interviewPrompt = `
        You are a sophisticated AI matchmaker. 
        Categorize the user into: technical_founder, non_technical_founder, or technical_for_technical.
        Ask about their problem, solution, tech stack, and contact details.
        
        RESPONSE (Strict JSON):
        {
            "message": "Conversational response",
            "extracted_data": { "user_category": null, "name": null, "email": null, "whatsapp": null, "summary": null },
            "is_complete": false,
            "smart_feedback": "AI analysis"
        }`;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: interviewPrompt },
                ...messages
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" }
        });

        return JSON.parse(completion.choices[0].message.content);
    } catch (err) {
        console.error('Groq Interview Error:', err);
        return { message: "I'm recalibrating. Please resend that last message.", is_complete: false };
    }
}

/**
 * CV Analysis
 */
async function analyzeCV(text) {
    const systemPrompt = `Analyze this CV text and return { name, primary_skill, tech_stack: [], experience_level, summary, experience_score: 0 } as JSON.`;
    const completion = await groq.chat.completions.create({
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: text.substring(0, 5000) }],
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" }
    });
    return JSON.parse(completion.choices[0].message.content);
}

module.exports = {
    conductInterview,
    analyzeCV
};
