const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
	sender: String,
	message: String, // Encrypted
});

module.exports = mongoose.model("Message", MessageSchema);
