import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { context } from "../../chatResponse";
import ReactMarkdown from "react-markdown";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello, this is your personal assistant." },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  console.log(import.meta.env.VITE_GEMINI_KEY);

  const handleSend = async () => {
    if (!input.trim()) return; // Prevent empty messages

    // Add user message to chat
    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);

    // Set loading state
    setIsLoading(true);

    try {
      // Prepare the request body
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `${context}\nUser: ${input}\nAssistant (provide a short response):`,
              },
            ],
          },
        ],
      };

      console.log("Request Body:", JSON.stringify(requestBody, null, 2)); // Debugging log

      // Call the Gemini API with context
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
          import.meta.env.VITE_GEMINI_KEY
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error("Failed to fetch from API");
      }

      const data = await response.json();
      console.log("API Response:", data); // Debugging log

      const botMessage = {
        text:
          data.candidates && data.candidates.length > 0
            ? data.candidates[0].content.parts[0].text.trim()
            : "Sorry, I didn't understand that.",
        isUser: false,
      };

      // Add bot response to chat
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response from Gemini API:", error);
      const errorMessage = {
        text: "Sorry, something went wrong. Please try again later.",
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      // Clear input and reset loading state
      setInput("");
      setIsLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
                } transition-opacity duration-200 ease-in-out delay-100 animate-fadeIn`}
              >
                <div
                  className={`w-fit max-w-[60%] h-fit px-4 py-2 flex items-center shadow-md gap-4 rounded-lg border-2`}
                >
                  {msg.isUser ? (
                    <>
                      <h2>{msg.text}</h2>
                      <img
                        src="/src/assets/user.png"
                        width={28}
                        height={28}
                        alt="user"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src="/src/assets/hipaaslogo.svg"
                        width={25}
                        height={25}
                        alt="user"
                      />
                      <ReactMarkdown className="flex flex-col">{msg.text}</ReactMarkdown>
                    </>
                  )}
                </div>
              </div>
            ))}
            {/* Show loading message when fetching response */}
            {isLoading && (
              <div className="w-fit max-w-[60%] h-fit px-4 py-2 flex flex-row items-center shadow-md gap-4 rounded-lg border-2">
                <img
                  src="/src/assets/hipaaslogo.svg"
                  width={25}
                  height={25}
                  alt="user"
                />
                <h2>Generating</h2>
                <div className="w-5 h-5 rounded-full border-2 animate-spin border-l-gray-900 border-t-gray-700 border-r-gray-600 border-b-gray-300 "></div>
              </div>
            )}
            <div ref={chatEndRef} />
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
