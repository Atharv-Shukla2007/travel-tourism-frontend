import { useState, useRef, useEffect } from "react";
import { useBooking } from "@/context/BookingContext.jsx";
import { Send } from "lucide-react";

const ChatBox = ({ bookingId, senderRole }) => {
  const { getBookingMessages, sendMessage } = useBooking();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const messages = getBookingMessages(bookingId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(bookingId, senderRole, input.trim());
    setInput("");
  };

  return (
    <div className="rounded-2xl bg-secondary/50 overflow-hidden">
      <div className="h-[300px] overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">No messages yet. Start the conversation.</p>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === senderRole ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] px-4 py-2.5 text-sm ${
              msg.sender === senderRole ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-none" : "bg-background text-foreground rounded-2xl rounded-tl-none card-shadow"
            }`}>{msg.message}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 border-t border-border/50">
        <div className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..." className="flex-1 px-4 py-2.5 rounded-xl bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none card-shadow" />
          <button onClick={handleSend} className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
