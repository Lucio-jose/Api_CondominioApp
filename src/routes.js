import { Router } from 'express';
import multer from 'multer';
import SigninController from './app/controllers/SignInController';
import multerConfig from './config/multer';

const routes = new Router();

routes.get('/', async (req, res) => res.status(200).json({
  mensagem: 'bem-vindo a api de gerador de boletins',
  status: '200',
}));

routes.post('/signin', SigninController.criar);

const upload = multer(multerConfig);



export default routes;
