const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const crypto = require("crypto");
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

app.use(cors());
app.use(express.json());

// mongoose.connect("mongodb://localhost:27017/secureChat",{
mongoose.connect("mongodb://user_42z5psufy:p42z5psufy@ocdb.app:5050/db_42z5psufy", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const AES_KEY = "12345678901234567890123456789012";
const AES_IV = "1234567890123456";

function encryptAES(text) {
	const cipher = crypto.createCipheriv("aes-256-cbc", AES_KEY, AES_IV);
	let encrypted = cipher.update(text, "utf-8", "hex");
	encrypted += cipher.final("hex");
	return encrypted;
}

function decryptAES(encryptedText) {
	const decipher = crypto.createDecipheriv("aes-256-cbc", AES_KEY, AES_IV);
	let decrypted = decipher.update(encryptedText, "hex", "utf-8");
	decrypted += decipher.final("utf-8");
	return decrypted;
}

io.on("connection", (socket) => {
	console.log("User connected:", socket.id);

	socket.on("sendMessage", async ({ sender, message }) => {
		const encryptedMessage = encryptAES(message);
		const newMessage = new Message({ sender, message: encryptedMessage });
		await newMessage.save();
		io.emit("receiveMessage", { sender, message: message });
	});

	socket.on("disconnect", () => {
		console.log("User disconnected:", socket.id);
	});
});

app.get("/messages", async (req, res) => {
	const messages = await Message.find();
	res.json(
		messages.map((msg) => ({
			sender: msg.sender,
			message: decryptAES(msg.message),
		}))
	);
});

server.listen(5000, () => console.log("Server running on port 5000"));