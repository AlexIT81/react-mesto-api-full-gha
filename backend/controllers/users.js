const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  CREATED_OK_CODE,
  SECRET_KEY,
} = require('../utils/constants');

const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      res.status(CREATED_OK_CODE).send({ data: newUser });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует!'));
      } else { next(err); }
    });
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findOne({ _id: userId })
    .then((data) => {
      if (data === null) {
        throw new NotFoundError(`Пользователь по указанному id:${userId} не найден.`);
      } else { res.send({ message: data }); }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Пользователь по указанному id:${userId} не найден.`));
      } else { next(err); }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const owner = req.user._id;
  const { name, about } = req.body;
  User.findOneAndUpdate(
    { _id: owner },
    { $set: { name, about } },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError({ message: 'Переданы некорректные данные при обновлении профиля.' }));
      } else if (err.name === 'CastError') {
        next(new NotFoundError({ message: `Пользователь по указанному id:${owner} не найден.` }));
      } else { next(err); }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const owner = req.user._id;
  const { avatar } = req.body;
  User.findOneAndUpdate(
    { _id: owner },
    { $set: { avatar } },
    { new: true, runValidators: true },
  )
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError({ message: 'Переданы некорректные данные при обновлении аватара.' }));
      } else if (err.name === 'CastError') {
        next(new NotFoundError({ message: `Пользователь с указанным id:${owner} не найден.` }));
      } else { next(err); }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY,
        { expiresIn: '7d' },
      );
      res.send({ token, message: 'Авторизация успешна!' });
      // res.cookie('authorization', token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
      //    .send({ message: 'Авторизация успешна!' });
    })
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден!');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный id пользователя!'));
      } else { next(err); }
    });
};
