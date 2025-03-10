import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./App.css";

const socket = io("https://chat-app-20q9.onrender.com");

function App() {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [username, setUsername] = useState("");
	const chatBoxRef = useRef(null);

	useEffect(() => {
		axios.get("https://chat-app-20q9.onrender.com").then((response) => {
			setMessages(response.data);
		});

		socket.on("receiveMessage", (data) => {
			setMessages((prev) => [...prev, {
				sender: data.sender,
				message: data.message,
				timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
			}]);
		});

		return () => {
			socket.off("receiveMessage");
		};
	}, []);

	// Auto-scroll to bottom when new messages arrive
	useEffect(() => {
		if (chatBoxRef.current) {
			chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
		}
	}, [messages]);

	const sendMessage = () => {
		if (newMessage.trim() && username.trim()) {
			socket.emit("sendMessage", {
				sender: username,
				message: newMessage,
				timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
			});
			setNewMessage("");
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			sendMessage();
		}
	};

	// Store username in localStorage
	useEffect(() => {
		const storedUsername = localStorage.getItem('chatUsername');
		if (storedUsername) {
			setUsername(storedUsername);
		}
	}, []);

	const handleUsernameChange = (e) => {
		const newUsername = e.target.value;
		setUsername(newUsername);
		localStorage.setItem('chatUsername', newUsername);
	};

	return (
		<div className="chat-container">
			<h2>WhatsApp Chat</h2>

			<input
				type="text"
				placeholder="Enter your name"
				value={username}
				onChange={handleUsernameChange}
				className="username-input"
			/>

			<div className="chat-box" ref={chatBoxRef}>
				{messages.map((msg, index) => (
					<div
						key={index}
						className="message"
						style={{
							alignSelf: msg.sender === username ? 'flex-end' : 'flex-start',
							backgroundColor: msg.sender === username ? '#dcf8c6' : 'white',
							borderTopRightRadius: msg.sender === username ? 0 : '7.5px',
							borderTopLeftRadius: msg.sender === username ? '7.5px' : 0,
						}}
					>
						<b>{msg.sender}</b>
						{msg.message}
						<span className="message-time">{msg.timestamp || "12:00 PM"}</span>
					</div>
				))}
			</div>

			<div className="input-container">
				<input
					type="text"
					placeholder="Type a message"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					onKeyPress={handleKeyPress}
					className="message-input"
				/>
				<button onClick={sendMessage} className="send-button">
				</button>
			</div>
		</div>
	);
}

export default App;