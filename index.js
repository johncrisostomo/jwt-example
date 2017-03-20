const express = require('express');
const bodyParser = require('body-parser');
const users = require('users');
const tokens = requires('tokens');

const app = express();
app.user(bodyParser.json());

const jwtAttributes = {
  SECRET: 'this_will_be_used_for_hashing_signature',
  ISSUER: 'John Crisostomo', 
  HEADER: 'x-jc-token', 
  EXPIRY: 30,
};

// AUTH MIDDLEWARE FOR /token ENDPOINT
const auth = function(req, res) {
  if (req.body) {
    const user = users.validateUser(req.body.name, req.body.password);
    if (user) {
      const expires = moment().add(EXPIRY, 'seconds')
        .valueOf();
      
      const payload = {
        exp: expires,
        iss: jwtAttributes.ISSUER,
        name: user.name,
        email: user.email, 
      };

      const token = jwt.encode(payload, jwtAttributes.SECRET);

      tokens.add(token, payload);

      res.json({ token });
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};


app.post('/token', auth, (req, res) => {
  res.send('token');
});

// VALIDATE MIDDLEWARE FOR /secretInfo
const validate = (req, res, next) {
  const token = req.headers[jwtAttributes.HEADER];

  if (!token) {
    res.statusMessage = 'Unauthorized: Token not found';
    res.sendStatus('401').end();
  } else {
    try {
      const decodedToken = jwt.decode(token, jwtAttributes.SECRET);
    } catch(e) {
      res.statusMessage = 'Unauthorized: Invalid token';
      res.sendStatus('401');
      return;
    }
    
    if (tokens.isValid(token)) {
      res.statusMessage = 'Unauthorized : Token is either invalid or expired';
      res.sendStatus('401');
      return
    }
    next(); 
  }
};

app.get('/secretInfo', validate, (req, res) => {
  res.send('The secret of life is 42.');
});

app.listen(8080);

console.log('JWT Example is now listening on :8080');
