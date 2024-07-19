import './App.css';
import Chatbot from "react-chatbot-kit";

import config from "./configs/chatbotConfig";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";

function App() {
  // console.log(document.getElementsByClassName("react-chatbot-kit-chat-input").item(0)?.addEventListener())

  // document.getElementsByClassName("react-chatbot-kit-chat-input").item(0).on

  return (
    <div className="App">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}

export default App;