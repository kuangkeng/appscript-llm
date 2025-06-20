//A simple test to learn about AppScript
function ECHO(input) {
  return `You gave me ${input}`;
}

//Anthropic API documentation: https://docs.anthropic.com/en/api/messages
//OpenAI API documentation: https://platform.openai.com/docs/api-reference/introduction

// Replace with your actual OpenAI API key
const OPENAI_API_KEY = "";

const ANTHROPIC_API_KEY = "";

//The call for OpenAI ChatGPT starts here
function OPENAI_CHAT(input) {
  const url = "https://api.openai.com/v1/chat/completions";
  const messages = [
    { role: "user", content: input } // 'input' is the prompt for LLM
  ];
 
  //define the input for the LLM. Adjustments can be done here.  
  const payload = {
    model: "o4-mini-2025-04-16",   // to change to other models, refer to https://platform.openai.com/docs/models 
    max_completion_tokens: 2048,    // adjust as needed. The higher it is, the more you pay. If it is too low, you might not get answer
    temperature: 1,  // the parameter that controls the randomness of the model's output. The higher it is, the more 'creative' and inconsistent output. Minimum value is 0 but for the model o4-mini-2025-04-16, the minimum value is 1
    messages: [{ role: "user", content: input }], // 'input' is the prompt for LLM
  };
  
  //Define how data is sent to LLM. Don't have to adjust this.
  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + OPENAI_API_KEY
    },
    payload: JSON.stringify(payload)
  };
  
  // Extract the LLM’s reply in a human readable format. Don't have to adjust this.
  const response = UrlFetchApp.fetch(url, options);
  const json = JSON.parse(response.getContentText());
  const reply = json.choices[0].message.content;
  return reply;
}
//The call for OpenAI ChatGPT ends here

//The call for Anthropic Claude starts here
function CLAUDE_CHAT(input) {
  const url = "https://api.anthropic.com/v1/messages";
  
  //define the input for the LLM. Adjustments can be done here. 
  const payload = {
    model: "claude-3-7-sonnet-20250219", // to change to other models, refer to https://docs.anthropic.com/en/docs/about-claude/models/overview 
    temperature: 0, // the parameter that controls the randomness of the model's output. The higher it is, the more 'creative' and inconsistent output. Minimum value is 0.
    max_tokens: 1024,
    messages: [{ role: "user", content: input }], // 'input' is the prompt for LLM
  };
  //Define how data is sent to LLM. Don't have to adjust this.
  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": '2023-06-01'
    },
    payload: JSON.stringify(payload)
  };

  // Extract the LLM’s reply in a human readable format. Don't have to adjust this.
  const response = UrlFetchApp.fetch(url, options);
  const parsedResponse = JSON.parse(response.getContentText());
  const output = parsedResponse.content[0].text;
  return output;
}
//The call for Anthropic Claude ends here
