# Real-Time Chat Application

A real-time multi-room chat application built using Node.js, Express.js, Socket.io, HTML5, CSS3, and JavaScript.

Users can join chat rooms, send messages in real time, see online users, and receive typing indicators without refreshing the page.

## Features

- Real-time messaging using Socket.io
- Multiple chat rooms
- Username and room join flow
- Online users list
- Typing indicator
- Join and leave notifications
- Messages broadcast only within the selected room
- Graceful handling of user disconnections
- Responsive chat interface

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- Socket.io

## Project Structure

```text
real-time-chat/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## Installation

### Clone the repository:

git clone YOUR_GITHUB_REPOSITORY_URL

### Move into the project directory:

cd real-time-chat

### Install dependencies:

npm install

## Run the Application

### Start the server:

npm start

### For development with Nodemon:

npm run dev

### The application will normally be available at:

http://localhost:3000


## How It Works
1) Enter a username.
2) Select or enter a chat room.
3) Join the room.
4) Send messages to other users in the same room.
5) Messages are delivered instantly using Socket.io.
6) The online users list updates when users join or leave.
7) The typing indicator shows when another user is typing.
8) Users are removed from the online list when they disconnect.


## Socket.io Room Handling
Each conversation is separated into a Socket.io room.

### When a user joins:

socket.join(room);

### Messages are sent only to users inside the selected room:

io.to(room).emit("chat message", message);

### This prevents messages from being delivered to users in other rooms.

Real-Time Events

### The application uses Socket.io events such as:

joinRoom
chatMessage
typing
stopTyping
disconnect

### These events allow the client and server to synchronize chat activity in real time.

## Testing
To test the application:

- Start the server.
- Open the application in two or more browser tabs.
- Enter different usernames.
- Join the same room.
- Send messages between the tabs.
- Verify that messages appear instantly.
- Join another room in a separate tab.
- Verify that messages from one room do not appear in another.
- Test the typing indicator.
- Close a tab and verify that the user leaves the online list.


## Learning Outcomes
Through this project, I practiced:

- WebSocket-based communication
- Socket.io room management
- Real-time client-server communication
- Event-driven backend development
- Express.js server configuration
- Managing connected users
- Handling user disconnections
- Frontend and backend integration


## Future Improvements
Possible improvements include:

- User authentication
- Persistent message history
- Private messaging
- Message timestamps
- Emoji support
- File and image sharing
- Read receipts
- Database integration
- Message search
- Dark/light theme
- Project Status

# 👨‍💻 Author
Abhinav Upadhyay 
Web Development Internship Veda Technology

# 📄 License
This project was created for educational and internship purposes.