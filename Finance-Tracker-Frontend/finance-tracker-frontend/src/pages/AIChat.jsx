import { useState, useContext } from "react";
import { askAI } from "../api/api";
import { AuthContext } from "../context/AuthContext";

function AIChat() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const handleAsk = async () => {
    if (!question.trim()) return;

    if (!user) {
      alert("Please login first");
      return;
    }

    // Add user message
    const newMessages = [
      ...messages,
      { type: "user", text: question },
    ];
    setMessages(newMessages);
    setQuestion("");
    setLoading(true);

    try {
      const res = await askAI({
        userId: user.userId,
        question,
      });

      setMessages([
        ...newMessages,
        { type: "ai", text: res.data.answer },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { type: "ai", text: "Something went wrong." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[85vh] bg-gray-100 rounded-xl shadow">

      {/* 🔹 Header */}
      <div className="p-4 border-b bg-white rounded-t-xl">
        <h2 className="text-lg font-semibold">🤖 AI Finance Assistant</h2>
        <p className="text-sm text-gray-500">
          Ask anything about your spending & finances
        </p>
      </div>

      {/* 🔹 Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-10">
            Start a conversation with AI...
          </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-xl text-sm ${
                msg.type === "user"
                  ? "bg-green-600 text-white"
                  : "bg-white shadow text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <p className="text-sm text-gray-400">AI is thinking...</p>
        )}
      </div>

      {/* 🔹 Input Bar */}
      <div className="p-4 border-t bg-white flex gap-2">

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about your spending..."
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={handleAsk}
          className="bg-green-600 text-white px-4 rounded-lg hover:bg-green-700"
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default AIChat;