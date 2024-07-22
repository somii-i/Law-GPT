"use strict";
////////////////////////////////////////////////////////GPT COMMANDS

const gptCommands =
  "Answer the question to the point(100 words), make chat more legal if question required ipc section then give ipc section of it."

///////////////////////////////GPT COMMANDS ABOVE

const API_KEY = "sk-keyyyyyyyyyyyyyy";
const searchResults = document.querySelector(".search_results");
searchResults.addEventListener("click", sendMessage);
let gptResult;
const userInput = document.getElementById("user-input");
const chatContainer = document.getElementById("chat-container");
function sendMessage(e) {
  e.preventDefault();

  // Get user input
  const userMessage = userInput.value.trim();
  if (userMessage === "") return;

  // Display user message
  const userBubble = document.createElement("div");
  userBubble.classList.add("chat-bubble", "user");
  userBubble.textContent = userMessage;
  chatContainer.append(userBubble);

  // Simulate bot response (replace with your logic)
  //   const botBubble = document.createElement("div");
  //   botBubble.classList.add("chat-bubble", "bot");

  //api call
  const chatGptResponse = generateResponse(userMessage + gptCommands);

  //   botBubble.textContent = responseGenerator(userMessage);
  //   chatContainer.appendChild(botBubble);

  // Clear input field
  userInput.value = "";

  // Scroll to the bottom of the chat container
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function responseGenerator(search) {
  return `I can provide information about ${search}.`;
}

const generateResponse = function (searchKey) {
  const API_URL = "https://api.openai.com/v1/chat/completions";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "user",
          content: searchKey,
        },
      ],
    }),
  };

  //sending post request to API get response,
  fetch(API_URL, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      gptResult = data.choices[0].message.content;
      const botBubble = document.createElement("div");
      botBubble.classList.add("chat-bubble", "bot");
      botBubble.textContent = gptResult;
      chatContainer.appendChild(botBubble);
    })
    .catch((error) => {
      console.log(error);
    });
};
