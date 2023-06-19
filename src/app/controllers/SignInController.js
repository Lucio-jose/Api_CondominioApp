/* eslint-disable no-dupe-keys */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable curly */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import User from '../models/User';
import UserType from '../models/UserType';
import authConfig from '../../config/auth';
import Files from '../models/Files';

class SignInController {
  async criar(req, res) {
    const schema = yup.object().shape({
      email: yup.string().required(),
      password: yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'dados incorrectos!' });
    }
    const { email, password } = req.body;
    const User_email = await User.findOne({
      where: { email },
    });

    const User = await User.findOne({
      where: { email },
      attributes: ['id', 'nome', 'email', 'avatar_id'],
      include: [{
        model: Files,
        attributes: ['id', 'url', 'name', 'path'],
        as: 'Files',
      },
      {
        model: UserType,
        attributes: ['id', 'url', 'name', 'path'],
        as: 'Files',
      },]
    });

    if (!User) {
      return res.status(401).json({ error: 'algo deu errado! tente novamente!  ' });
    }

    if (!(await User_email.checkpassword(password))) {
      return res.status(401).json({ error: 'password ou login incorrecto!' });
    }

    const {
      id, nome, cursos,
      turmas,
      funcao,
    } = User;

    return res.json({
      User,
      token: jwt.sign(
        {
          id,
          email,
          nome,
          cursos,
          turmas,
          funcao,
        },
        authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        },
      ),
    });
  }
}

export default new SignInController();
