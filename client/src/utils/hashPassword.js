const bcrypt = require("bcrypt");

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, 5);
};
