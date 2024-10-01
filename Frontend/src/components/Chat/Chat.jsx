import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { responses, getResponse } from "../../chatResponse";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello this is your personal assistant." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return; // Prevent empty messages

    // Add user message to chat
    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);

    // Get response based on input
    const botResponse = getResponse(input);
    const botMessage = { text: botResponse, isUser: false };
    setMessages((prev) => [...prev, botMessage]);

    // Clear input
    setInput("");
  };

  return (
    <>
      <div className="w-full h-[90%] bg-white my-4 rounded-md shadow-md px-4 flex flex-col">
        <div className="w-full h-10 mt-4 flex gap-2 items-center rounded justify-center">
          <img
            src="/src/assets/hipaaslogo.svg"
            width={30}
            height={30}
            alt="hipaaslogo"
          />
          <h2 className="text-2xl font-medium">HiPaaS</h2>
        </div>

        <div className="w-full h-[78%] bg-white border-t-2 border-l-2 border-r-2 rounded-md py-4 overflow-y-scroll overflow-x-hidden scroll-smooth">
          <div className="mx-10  w-[95%] h-full flex flex-col gap-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`w-full h-fit flex ${
                  msg.isUser ? "justify-end" : "justify-start"
                }  transition-opacity duration-200 ease-in-out delay-100 animate-fadeIn`}
              >
                <div
                  className={`w-fit max-w-[60%] h-fit px-4 py-2 flex items-center gap-4 rounded-lg border-2`}
                >
                  {msg.isUser ? (
                    <h2>{msg.text}</h2>
                  ) : (
                    <>
                      <img
                        src="/src/assets/hipaaslogo.svg"
                        width={25}
                        height={25}
                        alt="user"
                      />
                      <h2>{msg.text}</h2>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-[11%] bg-gray-100 rounded-lg shadow-lg flex items-center px-4 py-2 gap-2">
          <Input
            className="w-full h-[80%] rounded-md"
            placeholder="Chat with our hipaas AI."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <Button className="h-[80%] px-10 text-lg" onClick={handleSend}>
            Send
          </Button>
        </div>
      </div>
    </>
  );
};

export default Chat;
