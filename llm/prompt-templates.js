// ScoutMind Prompt Templates
// Reusable prompt templates for different LLM interactions

// Base system prompt
export const BASE_SYSTEM_PROMPT = 
  "You are an AI assistant specialized in web scraping and data extraction. " +
  "Your goal is to help extract structured data from websites based on user instructions.";

// Analyze page structure prompt
export function createAnalysisPrompt(pageContent, userInstruction) {
  return `
${BASE_SYSTEM_PROMPT}

TASK:
Analyze the following webpage HTML and identify elements that match the user's extraction request.

USER REQUEST:
${userInstruction}

WEBPAGE HTML (PARTIAL):
${truncateHtml(pageContent, 6000)}

INSTRUCTIONS:
1. Identify the most relevant elements based on the user's request
2. Provide appropriate CSS selectors to extract the requested data
3. Format your response as JSON with the following structure:
{
  "selectors": {
    "item1": "CSS selector for item1",
    "item2": "CSS selector for item2"
  },
  "dataTypes": {
    "item1": "text|number|date|url|image",
    "item2": "text|number|date|url|image"
  },
  "confidence": 0.8 // Confidence score between 0 and 1
}
`;
}

// Helper to truncate HTML for prompt
function truncateHtml(html, maxLength = 6000) {
  if (!html) return "";
  
  // If HTML is shorter than maxLength, return as is
  if (html.length <= maxLength) return html;
  
  // Otherwise, truncate and add indicator
  return html.substring(0, maxLength) + "\n\n[HTML truncated due to length...]";
}

// Create extraction plan prompt
export function createExtractionPlanPrompt(selectors, userInstruction) {
  return `
${BASE_SYSTEM_PROMPT}

TASK:
Create a step-by-step extraction plan based on the identified selectors and user request.

USER REQUEST:
${userInstruction}

IDENTIFIED SELECTORS:
${JSON.stringify(selectors, null, 2)}

INSTRUCTIONS:
Create a detailed extraction plan in JSON format with the following structure:
{
  "steps": [
    {
      "action": "extract",
      "selector": "selector string",
      "dataField": "fieldName",
      "dataType": "text|number|date|url|image"
    }
  ],
  "outputSchema": {
    "fieldName1": "dataType",
    "fieldName2": "dataType"
  }
}
`;
}
