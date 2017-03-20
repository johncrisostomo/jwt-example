const tokens = [];

module.exports = {
  add: function(token, payload) {
    tokens[token] = payload;
  },

  isValid: function(token) {
    if (tokens[token] === undefined) {
      return false; 
    }

    if (tokens[token].exp <= new Date()) {
      const index = tokens.indexOf(token);
      tokens.splice(index, 1);
      return false;
    } else {
      return true;
    }
  }
}
