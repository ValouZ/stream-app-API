const { UnsupportedMediaType } = require("http-errors");

const users = [];

// User rejoint le chat
function userJoin(id, username, room, color) {
  const user = { id, username, room, color };

  users.push(user);;
  return user;
}

// Récuperer user courant
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// User quitte la room
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Recupérer la room des users
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
};
