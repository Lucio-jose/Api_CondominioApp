/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
import Files from '../models/Files';

class FilesController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const Files = await Files.create({
      name,
      path,
    });
    return res.status(201).json(Files);
  }
}
export default new FilesController();
