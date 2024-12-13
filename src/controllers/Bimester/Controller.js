import PasswordToken from "../../models/PasswordToken.js";
import Validation from "../../utils/Validation.js";
import Bimester from "../../models/Bimester.js";
import { ConflictData, NotExistValue, NotValid } from "../../utils/Error.js";

class BimesterController {
  async Create(req, res) {
    try {
      const { number, year } = req.body;
      new Validation({ number, year }).Check();
      const class_id = await Bimester.create({ number, year });
      return res.json({
        message: "Sucesso. Bimestre cadastrado",
        bimester: { id: class_id, number, year },
      });
    } catch (err) {
      if (err.status) return res.status(err.status).json({ err: err.message });
      res.sendStatus(500);
    }
  }
  async Delete(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id)) throw new NotValid("Passe o id valido");
      await Bimester.delete(id);
      res.json({ message: "Sucesso. Bimestre deletado" });
    } catch (err) {
      if (err.status) return res.status(err.status).json({ err: err.message });
      res.sendStatus(500);
    }
  }
  async GetAll(req, res) {
    try {
      let data = await Bimester.findAll();
      res.json(data);
    } catch (err) {
      res.sendStatus(500);
    }
  }
  async GetOne(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id)) throw new NotValid("Passe o id valido");
      let data = await Bimester.findById(id);
      if (!data) throw new NotExistValue("Não existe este bimestre");
      res.json(data);
    } catch (err) {
      if (err.status) return res.status(err.status).json({ err: err.message });
      res.sendStatus(500);
    }
  }
}

export default new BimesterController();
