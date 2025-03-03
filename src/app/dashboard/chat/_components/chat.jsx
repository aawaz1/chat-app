"use client";
import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";

const Chat = () => {
  const [users, setUsers] = useState([]); // List of users
  const [selectedUser, setSelectedUser] = useState(null); // Selected user for chat
  const [messages, setMessages] = useState({}); // Chat messages for each user
  const [newMessage, setNewMessage] = useState(""); // New message input
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false); // Toggle chat interface on mobile

  // Fetch users from DummyJSON
  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
        // Initialize empty messages for each user
        const initialMessages = {};
        data.users.forEach((user) => {
          initialMessages[user.id] = [];
        });
        setMessages(initialMessages);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    // Add the new message to the selected user's chat
    const updatedMessages = {
      ...messages,
      [selectedUser.id]: [
        ...messages[selectedUser.id],
        { id: messages[selectedUser.id].length + 1, text: newMessage, sender: "You" },
      ],
    };

    setMessages(updatedMessages);
    setNewMessage(""); // Clear the input field
  };

  // Handle user selection (for mobile)
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsMobileChatOpen(true); // Open chat interface on mobile
  };

  // Handle back button click (for mobile)
  const handleBackClick = () => {
    setIsMobileChatOpen(false); // Return to user list on mobile
  };

  return (
    <div className="flex flex-col md:flex-row h-full bg-white p-2 rounded-md">
      {/* Left Side: User List (Visible on mobile when chat is closed, always visible on desktop) */}
      <div
        className={`w-full md:w-1/4 bg-white rounded-l-md border-r border-gray-200 ${
          isMobileChatOpen ? "hidden" : "block"
        } md:block`}
      >
        <h2 className="p-2 text-xl rounded-t-md font-bold bg-blue-950 text-white">
          Users
        </h2>
        <ul>
          {users.slice(0, 9).map((user) => (
            <li
              key={user.id}
              className={`p-4 cursor-pointer hover:bg-gray-100 ${
                selectedUser?.id === user.id ? "bg-blue-100" : ""
              }`}
              onClick={() => handleUserClick(user)}
            >
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>
      </div>

    {/* Right Side: Conversation */}
<div className={`flex-1 h-[620px] flex flex-col ${isMobileChatOpen ? "block" : "hidden"} md:block`}>
  {selectedUser ? (
    <>
      {/* Chat Header */}
      <div className="p-2 bg-blue-950 text-white flex items-center">
        <button className="md:hidden text-white mr-2 p-1" onClick={handleBackClick}>
          <IoArrowBack className="text-xl" />
        </button>
        <h2 className="text-xl font-semibold">
          {selectedUser.firstName} {selectedUser.lastName}
        </h2>
      </div>

      {/* Chat Messages (scrollable) */}
      <div className="flex-1 p-2 overflow-y-auto">
        {messages[selectedUser.id].map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${message.sender === "You" ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                message.sender === "You"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Message Input */}
      <div className="p-2 border-t border-gray-200 bg-white sticky bottom-0">
        <div className="flex">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="bg-blue-500 cursor-pointer text-white px-4 rounded-r-md hover:bg-blue-600 transition-colors"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </>
  ) : (
    <div className="flex items-center justify-center h-full text-gray-500">
      Select a user to start chatting
    </div>
  )}
</div>

    </div>
  );
};

export default Chat;