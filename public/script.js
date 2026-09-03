const socket = io();

const joinScreen = document.getElementById("joinScreen");
const chatScreen = document.getElementById("chatScreen");

const joinForm = document.getElementById("joinForm");
const usernameInput = document.getElementById("username");
const roomSelect = document.getElementById("room");

const currentRoom = document.getElementById("currentRoom");
const messages = document.getElementById("messages");
const userList = document.getElementById("userList");
const typingIndicator = document.getElementById("typingIndicator");

const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const leaveBtn = document.getElementById("leaveBtn");

let username = "";
let room = "";
let typingTimer;

joinForm.addEventListener("submit", (event) => {
  event.preventDefault();

  username = usernameInput.value.trim();
  room = roomSelect.value;

  if (!username) return;

  socket.emit("joinRoom", {
    username,
    room
  });

  currentRoom.textContent = `Room: ${room}`;

  joinScreen.classList.add("hidden");
  chatScreen.classList.remove("hidden");

  messageInput.focus();
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = messageInput.value.trim();

  if (!message) return;

  socket.emit("chatMessage", message);
  socket.emit("stopTyping");

  messageInput.value = "";
  messageInput.focus();
});

messageInput.addEventListener("input", () => {
  if (!messageInput.value.trim()) {
    socket.emit("stopTyping");
    return;
  }

  socket.emit("typing");

  clearTimeout(typingTimer);

  typingTimer = setTimeout(() => {
    socket.emit("stopTyping");
  }, 800);
});

socket.on("chatMessage", (message) => {
  const div = document.createElement("div");

  div.className = "message";

  div.innerHTML = `
    <strong>${escapeHtml(message.username)}</strong>
    <span>${escapeHtml(message.text)}</span>
    <br>
    <small>${escapeHtml(message.time)}</small>
  `;

  messages.appendChild(div);
  scrollMessages();
});

socket.on("systemMessage", (message) => {
  const div = document.createElement("div");

  div.className = "system-message";
  div.textContent = message.text;

  messages.appendChild(div);
  scrollMessages();
});

socket.on("userList", (users) => {
  userList.innerHTML = "";

  users.forEach((user) => {
    const li = document.createElement("li");

    li.textContent = `🟢 ${user}`;

    userList.appendChild(li);
  });
});

socket.on("typing", (data) => {
  typingIndicator.textContent = `${data.username} is typing...`;
});

socket.on("stopTyping", () => {
  typingIndicator.textContent = "";
});

leaveBtn.addEventListener("click", () => {
  window.location.reload();
});

function scrollMessages() {
  messages.scrollTop = messages.scrollHeight;
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}