"use client";
import React, { useState, useEffect } from "react";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { RiMessageLine } from "react-icons/ri";

const Chat = () => {
  const [users, setUsers] = useState([]); // List of users
  const [selectedUser, setSelectedUser] = useState(null); // Selected user for chat
  const [messages, setMessages] = useState({}); // Chat messages for each user
  const [newMessage, setNewMessage] = useState(""); // New message input
  const [showUserList, setShowUserList] = useState(true); // Toggle user list on mobile

  // Fetch users from DummyJSON
  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
        const initialMessages = {};
        data.users.forEach((user) => {
          initialMessages[user.id] = [];
        });
        setMessages(initialMessages);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const updatedMessages = {
      ...messages,
      [selectedUser.id]: [
        ...messages[selectedUser.id],
        { id: messages[selectedUser.id].length + 1, text: newMessage, sender: "You" },
      ],
    };

    setMessages(updatedMessages);
    setNewMessage("");
  };  

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] bg-white p-1 rounded-md">
      <div className={`w-full md:w-1/4 bg-white rounded-l-md border-r border-gray-200 ${showUserList ? "block" : "hidden"} md:block`}>
        <h2 className="p-2 text-xl rounded-t-md font-bold bg-blue-950 text-white">
          Users
        </h2>
        <ul className="space-y-1 p-0.5 max-h-[200px] md:max-h-full overflow-y-auto">
          {users.slice(0, 9).map((user) => (
            <li
              key={user.id}
              className={`p-4 rounded-md text-black cursor-pointer hover:bg-gray-100 ${selectedUser?.id === user.id ? "bg-blue-100" : ""}`}
              onClick={() => {
                setSelectedUser(user);
                setShowUserList(false);
              }}
            >
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>
      </div>

      <div  className="flex-1 h-full flex flex-col relative">
        {selectedUser ? (
          <>
            <div className="p-2 rounded-t-md bg-blue-950 text-white flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {selectedUser.firstName} {selectedUser.lastName}
              </h2>
              <button className="md:hidden text-white" onClick={() => setShowUserList(true)}>
                Back
              </button>
            </div>

            <div className="flex-1 p-2 mb-10 overflow-y-auto">
              {messages[selectedUser.id] && messages[selectedUser.id].length > 0 ? (
                messages[selectedUser.id].map((message) => (
                  <div key={message.id} className={`mb-2 ${message.sender === "You" ? "text-right" : "text-left"}`}>
                    <div className={`inline-block p-3 rounded-lg ${message.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                      {message.text}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center flex flex-col justify-center items-center bg-gray-200 text-gray-500 h-full">
                  <RiMessageLine className="text-4xl"/>
                  <p>No Messages</p>
                </div>
              )}
            </div>

            <div className="p-2 border-t w-full md:w-3/4 bg-white fixed bottom-0 md:left-92 left-0 right-0">
              <div className="flex">
                <input
                  type="text"
                  className="flex-1 p-2 border placeholder:text-gray-900 text-gray-900 border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
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