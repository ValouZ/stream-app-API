const User = require("../models/User");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};

exports.createUser = async (req, res, next) => {
  if (req.body.username && req.body.password) {
    const cryptedPassword = await bcrypt.hash(req.body.password, 12);
    try {
      const newUser = await User.create({
        username : req.body.username,
        password : cryptedPassword,
        role : 'user'
      });
      res.json(newUser);
    } catch (error) {
      res.json(error);
    }
  } else {
    res.json("Error");
  }
};

exports.updateUser = async (req, res, next) => {
  res.json(
    await User.findByIdAndUpdate(req.params.id, req.body)
  );
};

exports.deleteUser =  async (req, res, next) => {
  res.json(
    await User.findByIdAndRemove(req.params.id)
  );
};

exports.getUser =  async (req, res, next) => {
  res.json(
    await User.findById(req.params.id)
  );
};

exports.login = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          //Token
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};