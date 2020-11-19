const users = [];

module.exports.addUser = ({ id, email, room }) => {
  email = email.trim().toLowerCase();
  room = room.trim().toLowerCase();
  const existingUser = users.find(
    (user) => user.room === room && user.email === email
  );

  if (!email || !room) return { error: 'Username and room are required.' };
  if (existingUser) return { error: 'Username is taken.' };
  const user = { id, email, room };
  users.push(user);
  return { user };
};

module.exports.removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

module.exports.getUser = (id) => users.find((user) => user.id === id);

module.exports.getUsersInRoom = (room) => users.filter((user) => user.room === room);

