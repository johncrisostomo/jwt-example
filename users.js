const users = [
  { _id: 1, name: "john", email: "john@crisostomo.com", password: "john12345" },
  { _id: 2, name: "crisostomo", email: "crisostomo@john.com", password: "crisostomo12345" },
];

function validateUser(username, password) {
  const user = users.find((user) => {
    return user.name === username && user.password === password;
  });

  return user;
}

module.exports = { validateUser };
