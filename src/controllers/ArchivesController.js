import PasswordToken from "../models/PasswordToken.js";
import Validation from "../utils/Validation.js";
import { ConflictData, NotExistValue, NotValid } from "../utils/Error.js";
import Archives from "../models/Archives.js";

class ArchivesController {
  async Create(req, res) {
    try {
        const File = req.file
        const {type, idRelation} = req.body
        if(!File) throw new NotValid("Não foi passado o arquivo")
        console.log(type)
        new Validation({type}).Check()
        await Archives.upload(File, type, idRelation)
        res.json({message:"Upload feito com sucesso"})
    } catch (err) {
      if (err.status) return res.status(err.status).json({ err: err.message });
      res.sendStatus(500);
    }
  }

}
export default new ArchivesController();
