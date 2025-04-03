// Gemini API Integration
const GEMINI_API_KEY = "YOUR_API_KEY"; // Replace with your actual API key
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

// Function to send requests to Gemini API
async function queryGeminiAPI(prompt, maxTokens = 256) {
    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    maxOutputTokens: maxTokens,
                    temperature: 0.7,
                    topP: 0.8,
                    topK: 40
                }
            })
        });

        const data = await response.json();

        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error("No response from Gemini API");
        }
    } catch (error) {
        console.error("Error querying Gemini API:", error);
        return "Sorry, I couldn't process that request.";
    }
}

// Example function: Get AI-generated video editing tips
async function getVideoEditingTips() {
    const prompt = "Give me 3 professional video editing tips that would be helpful for a beginner. Keep it concise.";
    const tipsElement = document.getElementById('ai-tips');

    if (tipsElement) {
        tipsElement.innerHTML = "<p>Getting AI tips...</p>";

        try {
            const tips = await queryGeminiAPI(prompt);
            tipsElement.innerHTML = `<h4>AI Video Editing Tips:</h4><div class="ai-content">${tips}</div>`;
        } catch (error) {
            tipsElement.innerHTML = "<p>Could not load AI tips. Please try again later.</p>";
        }
    }
}

// Example function: AI project idea generator
async function generateProjectIdea() {
    const prompt = "Generate a creative video editing project idea that would showcase technical skills and creativity.";
    const ideaElement = document.getElementById('project-idea');
    const ideaButton = document.getElementById('idea-button');

    if (ideaElement && ideaButton) {
        ideaButton.disabled = true;
        ideaButton.innerHTML = "Generating...";
        ideaElement.innerHTML = "<p>AI is thinking...</p>";

        try {
            const idea = await queryGeminiAPI(prompt, 300);
            ideaElement.innerHTML = `<div class="ai-content">${idea}</div>`;
        } catch (error) {
            ideaElement.innerHTML = "<p>Could not generate an idea. Please try again later.</p>";
        } finally {
            ideaButton.disabled = false;
            ideaButton.innerHTML = "Generate Another Idea";
        }
    }
}

// Initialize Gemini features
document.addEventListener('DOMContentLoaded', () => {
    // Add Gemini section to the page if needed
    const aiSection = document.createElement('section');
    aiSection.id = 'ai-assistant';
    aiSection.className = 'ai-assistant';
    aiSection.innerHTML = `
        <div class="container">
            <div class="section-header">
                <h2>AI Assistant</h2>
                <div class="underline"></div>
            </div>
            <div class="ai-content-wrapper">
                <div class="ai-box">
                    <h3>Video Editing Tips</h3>
                    <div id="ai-tips">
                        <button onclick="getVideoEditingTips()" class="btn primary-btn">Get AI Tips</button>
                    </div>
                </div>
                <div class="ai-box">
                    <h3>Project Idea Generator</h3>
                    <div id="project-idea"></div>
                    <button id="idea-button" onclick="generateProjectIdea()" class="btn primary-btn">Generate Project Idea</button>
                </div>
            </div>
        </div>
    `;

    // Find where to insert the AI section (before contact section)
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        document.body.insertBefore(aiSection, contactSection);
    }
}); 