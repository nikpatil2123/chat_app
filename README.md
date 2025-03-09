# 🔒 Secure Chat Application  

A real-time **end-to-end encrypted chat app** built using **React, Node.js, WebSockets, and MongoDB**. This project ensures secure messaging with **AES-256 encryption**, where messages are **encrypted before storing** in the database and **decrypted only on the client side**.  

---

## 📌 Features  
✅ **Real-time Messaging** using WebSockets  
✅ **AES-256 Encryption** for secure message storage  
✅ **Decryption on the frontend** to protect user privacy  
✅ **MongoDB for message storage** (stores only encrypted messages)  
✅ **Express.js & Socket.io** for efficient communication  
✅ **Simple and Clean UI with React.js**  

---

## 🛠️ Tech Stack  
**Frontend:**  
- React.js  
- Socket.io-client  
- CryptoJS (for AES decryption)  

**Backend:**  
- Node.js  
- Express.js  
- Socket.io  
- MongoDB (for storing encrypted messages)  
- Crypto (for AES encryption)  

---

## 🚀 How It Works  
1️⃣ **User sends a message** → Message is **encrypted using AES-256** before being sent.  
2️⃣ **Message is stored in MongoDB** → Only the **encrypted version** is stored.  
3️⃣ **Receiver gets the encrypted message** via WebSockets.  
4️⃣ **Message is decrypted on the frontend** using the **AES-256 key**.  
5️⃣ **Chat remains secure** as plaintext messages are **never stored** or sent over the network.  

---

## 📦 Installation & Setup  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/nikpatil2123/chat_app.git
cd secure-chat-app
```
### **2️⃣ Install Backend Dependencies**
```sh
cd backend
npm install
```
### **3️⃣ Start the Backend Server**
```sh
npm start
```
### **4️⃣ Install Frontend Dependencies**
```
cd ../frontend
npm install
```
### **5️⃣ Start the Frontend**
```
npm run dev
```
## 📷 Screenshots
![file_2025-03-09_10 49 22](https://github.com/user-attachments/assets/93a976d1-60e7-4c99-890d-b3350ee3fdd1)



