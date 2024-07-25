import { createChatBotMessage } from "react-chatbot-kit";

let bot: string = "Unknown Model"

/**
 * Use this component to customize bot settings.
 */

const config = {
  botName: "BOT powered by " + bot,
  initialMessages: [createChatBotMessage(`How can I help you today?`, {})]
}

export default config