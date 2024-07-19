// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "BOT powered by llama3:70b",
  initialMessages: [createChatBotMessage(`Hello world`, {})]
}

export default config