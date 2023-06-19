/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import * as yup from 'yup';
import Usuario from '../models/Usuario';

class AlterarSenhaController {
  async alterar(req, res) {
    const schema = yup.object().shape({
      senhaActual: yup.string().required(),
      novaSenha: yup.string().min(6).required(),
      confirmarNovaSenha: yup.string().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'dados incorrectos! ' });
    }

    const { senhaActual, novaSenha, confirmarNovaSenha } = req.body;
    const usuario = await Usuario.findOne({ where: { id: req.usuario_id } });

    const senhaActualVálida = (await usuario.checksenha(senhaActual));

    if (!senhaActualVálida) {
      return res.status(401).json({ error: 'Senha actual Errada!' });
    }
    const senhaNovaConfirmada = novaSenha === confirmarNovaSenha;

    if (!senhaNovaConfirmada) {
      return res.status(401).json({
        error: ' o campo nova senha e confirmar nova senha, devem ser iguais!',
      });
    }

    await usuario.update({
      senha: novaSenha,
    });

    return res.status(200).json({ mensagem: 'senha alterada com sucesso!' });
  }
}
export default new AlterarSenhaController();
