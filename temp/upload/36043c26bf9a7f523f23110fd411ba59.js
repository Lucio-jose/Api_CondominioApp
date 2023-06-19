import { Router } from 'express';
import multer from 'multer';
import GerarBoletinController from './app/controllers/GerarBoletinController';
import SigninController from './app/controllers/SignInController';
import AlterarSenhaController from './app/controllers/AlterarSenhaController';
import multerConfig from './config/multer';
import verifiacarSeUsuarioEstáLogadoMiddleware from './app/middleware/auth';
import verificarCoordenacaoMiddleware from './app/middleware/verificarSeCoordenacao';
import DownloadController from './app/controllers/DownloadController';
import ListagemDeBoletinBoletinsParaAdminController from './app/controllers/ListagemDeBoletinParaAdminController';
import ApagarUsuarioController from './app/controllers/ApagarUsuarioController';
import ApagarBoletinController from './app/controllers/ApagarBoletinController';
import AvatarController from './app/controllers/AvatarController';
import CadastroDeTurmaController from './app/controllers/CadastroDeTurmaController';
import CadastroDeCursoController from './app/controllers/CadastroDeCursoController';
import ListagemDeTurmaController from './app/controllers/ListagemDeTurmaController';
import ListagemDeCursoController from './app/controllers/ListagemDeCursoController';
import ListagemDeTurmaParaAdminController from './app/controllers/ListagemDeTurmaParaAdminController';
import ListagemDeUsuarioParaAdminController from './app/controllers/ListagemDeUsuarioParaAdminController';
import CadastroDeUsuarioController from './app/controllers/CadastroDeUsuarioController';
import ListagemDeFuncoesController from './app/controllers/ListagemDeFuncoesController';
import ListagemDeBoletinParaCoordenadorDeTurmaController from './app/controllers/ListagemDeBoletinParaCoordenadorDeTurmaController';
import ApagarTurmaController from './app/controllers/ApagarTurmaController';
import ApagarCursoController from './app/controllers/ApagarCursoController';
import ListagemDeBoletinParaCoordenadorDeCursoController from './app/controllers/ListagemDeBoletinParaCoordenadorDeCursoController ';
import verificarSeÉCoordenadorDeCurso from './app/middleware/verificarSeÉCoordenadorDeCurso';

const routes = new Router();

routes.get('/', async (req, res) => res.status(200).json({
  mensagem: 'bem-vindo a api de gerador de boletins',
  status: '200',
}));

routes.post('/signin', SigninController.criar);

routes.get('/download', DownloadController.download);
routes.get('/funcoes', ListagemDeFuncoesController.listarTodos);
routes.get('/cursos', ListagemDeCursoController.todos);
routes.get('/turmas', ListagemDeTurmaController.todos);
routes.use(verifiacarSeUsuarioEstáLogadoMiddleware);
const upload = multer(multerConfig);
routes.post('/avatar', upload.single('file'), AvatarController.store);

routes.post('/pauta', upload.single('file'), GerarBoletinController.gerar);
routes.post('/usuarios', verificarCoordenacaoMiddleware, CadastroDeUsuarioController.criar);
routes.get('/usuarios', verificarCoordenacaoMiddleware, ListagemDeUsuarioParaAdminController.listarTodos);
routes.post('/turmas', CadastroDeTurmaController.criar);
routes.post('/cursos', verificarCoordenacaoMiddleware, CadastroDeCursoController.criar);
routes.delete('/turmas/:id', verificarCoordenacaoMiddleware, ApagarTurmaController.apagar);
routes.delete('/cursos/:id', verificarCoordenacaoMiddleware, ApagarCursoController.apagar);

routes.get('/turmas/admin', verificarCoordenacaoMiddleware, ListagemDeTurmaParaAdminController.todos);

routes.patch('/senha/actualizar', AlterarSenhaController.alterar);
routes.get('/boletins/admin', verificarCoordenacaoMiddleware, ListagemDeBoletinBoletinsParaAdminController.todos);
routes.get('/boletins', ListagemDeBoletinParaCoordenadorDeTurmaController.todos);
routes.get('/boletins/coordenador/curso', verificarSeÉCoordenadorDeCurso, ListagemDeBoletinParaCoordenadorDeCursoController.todos);

routes.delete('/coordenadores/:id', verificarCoordenacaoMiddleware, ApagarUsuarioController.apagar);
routes.delete('/boletins/:id', ApagarBoletinController.apagar);

export default routes;
