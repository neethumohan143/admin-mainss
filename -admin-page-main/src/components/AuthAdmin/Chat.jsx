import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Send } from "lucide-react";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch users list
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/user/users-list");
        setUsers(response.data);
      } catch (error) {
        setError("Failed to load users");
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch chat history when a user is selected
  useEffect(() => {
    if (selectedUser) {
      const fetchChatHistory = async () => {
        try {
          const response = await axiosInstance.get(
            `/chat/getchat/${selectedUser._id}`
          );
          setMessages(response.data);
        } catch (error) {
          setError("Failed to load chat history");
          console.error(error);
        }
      };

      fetchChatHistory();

      // Set interval to fetch new messages every 5 seconds
      const interval = setInterval(fetchChatHistory, 1000);

      // Cleanup interval when component unmounts or selectedUser changes
      return () => clearInterval(interval);
    }
  }, [selectedUser]);

  // Scroll to the bottom when a new message is added
  useEffect(() => {
    if (messages.length > 0) {
      const chatContainer = document.getElementById("chat-box");
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  // Handle sending a new message
  const sendMessage = async () => {
    if (newMessage.trim() && selectedUser) {
      try {
        const response = await axiosInstance.post("/chat/send", {
          userId: selectedUser._id,
          message: newMessage,
          sender: "admin",
        });

        setMessages((prevMessages) => [...prevMessages, response.data]);
        setNewMessage("");
      } catch (error) {
        setError("Failed to send message");
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center py-8 bg-orange-50">
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      <div className="bg-white shadow-xl rounded-lg w-full max-w-6xl mx-auto flex flex-col lg:flex-row overflow-hidden">
        {/* User List */}
        <div className="w-full lg:w-1/3 p-6 bg-orange-100 rounded-t-lg lg:rounded-l-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center text-orange-700">
            Users
          </h2>
          <ul className="overflow-y-auto h-72">
            {users.map((user) => (
              <li
                key={user._id}
                className={`p-3 mb-3 cursor-pointer rounded-lg transition duration-300 ease-in-out text-center transform hover:scale-105 ${
                  selectedUser && selectedUser._id === user._id
                    ? "bg-orange-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <img
                  src={user.image}
                  alt="User profile"
                  className="rounded-full h-12 w-12 inline-block mr-3"
                />
                <span className="font-medium">{user.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Box */}
        <div className="w-full lg:w-2/3 p-6 bg-white rounded-t-lg lg:rounded-r-lg shadow-md sm:ml-4 flex flex-col">
          <h2 className="text-2xl font-semibold mb-6 text-center text-orange-700">
            {selectedUser
              ? `Chat with ${selectedUser.name}`
              : "Select a user to chat"}
          </h2>
          {selectedUser && (
            <>
              <div
                id="chat-box"
                className="bg-gray-100 p-6 h-80 lg:h-[28rem] overflow-y-auto mb-4 rounded-lg shadow-inner"
              >
                {/* Messages List */}
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-3 ${
                      msg.sender === "admin" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg transition duration-300 ${
                        msg.sender === "admin"
                          ? "bg-orange-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      <span className="font-semibold">{msg.sender}: </span>
                      <span>{msg.message}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input and Send Message */}
              <div className="flex flex-col sm:flex-row">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 p-3 rounded-lg mb-3 sm:mb-0 sm:mr-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg w-full sm:w-auto transition duration-300 hover:bg-orange-700 flex items-center justify-center"
                  onClick={sendMessage}
                >
                  <Send className="mr-2" /> Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
