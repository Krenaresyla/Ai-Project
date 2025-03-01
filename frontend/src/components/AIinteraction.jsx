// import React, { useState } from 'react';
// import axios from 'axios';

// const AIInteraction = () => {
//   const [userInput, setUserInput] = useState('');
//   const [response, setResponse] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     setUserInput(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!userInput.trim()) return;

//     setLoading(true);
//     try {
//       const res = await axios.post('/api/ai', { input: userInput });
//       setResponse(res.data.output);
//     } catch (error) {
//       setResponse("Error: Unable to communicate with AI.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Interact with AI</h2>
//       <textarea
//         className="w-full p-3 border border-gray-300 rounded-lg mb-4"
//         value={userInput}
//         onChange={handleInputChange}
//         placeholder="Ask something to the AI..."
//       />
//       <button
//         onClick={handleSubmit}
//         className="bg-blue-500 text-white py-2 px-6 rounded-lg disabled:opacity-50"
//         disabled={loading}
//       >
//         {loading ? 'Processing...' : 'Submit'}
//       </button>
//       <div className="mt-4 p-4 border border-gray-300 rounded-lg">
//         {response ? <p className="text-lg">{response}</p> : <p className="text-gray-500">AI's response will appear here.</p>}
//       </div>
//     </div>
//   );
// };

// export default AIInteraction;



// import { useState } from 'react';
// import axios from 'axios';

// const AIInteraction = () => {
//   const [userInput, setUserInput] = useState('');
//   const [response, setResponse] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     setUserInput(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!userInput.trim()) return;

//     setLoading(true);
//     try {
//       // Update the URL and field name to match the backend
//       const res = await axios.post('http://127.0.0.1:8000/ai/hint', { question: userInput });
//       setResponse(res.data.hint);  // Update response handling based on the backend response
//     // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       setResponse("Error: Unable to communicate with AI.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Interact with AI</h2>
//       <textarea
//         className="w-full p-3 border border-gray-300 rounded-lg mb-4"
//         value={userInput}
//         onChange={handleInputChange}
//         placeholder="Ask something to the AI..."
//       />
//       <button
//         onClick={handleSubmit}
//         className="bg-blue-500 text-white py-2 px-6 rounded-lg disabled:opacity-50"
//         disabled={loading}
//       >
//         {loading ? 'Processing...' : 'Submit'}
//       </button>
//       <div className="mt-4 p-4 border border-gray-300 rounded-lg">
//         {response ? <p className="text-lg">{response}</p> : <p className="text-gray-500">AI's response will appear here.</p>}
//       </div>
//     </div>
//   );
// };

// export default AIInteraction;

import { useState } from "react";
import axios from "axios";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim()) {
      // Append the user message to the chat log
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "user" },
      ]);
      
      setLoading(true);
      try {
        // Make a POST request to your backend endpoint that integrates with Gemini API.
        const res = await axios.post("http://127.0.0.1:8000/ai/hint", {
          question: input,
        });
        // Assuming the backend returns a response in the form: { hint: "Actual AI response" }
        const aiResponse = res.data.hint;
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: aiResponse, sender: "ai" },
        ]);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Error: Unable to communicate with AI.", sender: "ai" },
        ]);
      } finally {
        setLoading(false);
        setInput("");
      }
    }
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col h-96">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.sender === "ai" ? "text-blue-600" : "text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      {/* Chat Input */}
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-l-lg p-2"
          placeholder="Type your message..."
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-r-lg"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}