import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./App.css"; // Import the CSS file

const socket = io("http://localhost:5000");

function App() {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [username, setUsername] = useState("");

	useEffect(() => {
		axios.get("http://localhost:5000/messages").then((response) => {
			setMessages(response.data);
		});

		socket.on("receiveMessage", (data) => {
			setMessages((prev) => [...prev, { sender: data.sender, message: data.message }]);
		});

		return () => {
			socket.off("receiveMessage");
		};
	}, []);

	const sendMessage = () => {
		if (newMessage.trim() && username.trim()) {
			socket.emit("sendMessage", { sender: username, message: newMessage });
			setNewMessage("");
		}
	};

	return (
		<div className="chat-container">
			<h2>🔒 Secure Chat App</h2>

			<input
				type="text"
				placeholder="Enter your name"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				className="username-input"
			/>

			<div className="chat-box">
				{messages.map((msg, index) => (
					<div key={index} className="message">
						<b>{msg.sender}:</b> {msg.message}
					</div>
				))}
			</div>

			<div className="input-container">
				<input
					type="text"
					placeholder="Type a message..."
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					className="message-input"
				/>
				<button onClick={sendMessage} className="send-button">
					Send
				</button>
			</div>
		</div>
	);
}

export default App;
