import PasswordToken from "../models/PasswordToken.js";
import Validation from "../utils/Validation.js";
import Activities from "../models/Activities.js";
import { ConflictData, NotExistValue, NotValid } from "../utils/Error.js";
import moment from 'moment'


class ActivitiesController {
  async Create(req, res) {
    try {
      var { title, description, delivery, shipping, bimester_id, matter_id } =
        req.body;
      new Validation({
        title,
        description,
        delivery,
        shipping,
        bimester_id,
        matter_id,
      }).Check();
      delivery = moment(delivery).format('YYYY-MM-DD HH:mm:ss');
      shipping = moment(shipping).format('YYYY-MM-DD HH:mm:ss');
      const activity_id = await Activities.create({
        title,
        description,
        delivery,
        shipping,
        bimester_id,
        matter_id,
      });
      return res.json({
        message: "Sucesso. Atividade cadastrada",
        activity: {
          id: activity_id,
          title,
          description,
          delivery,
          shipping,
          bimester_id,
          matter_id,
        },
      });
    } catch (err) {
      if (err.status) return res.status(err.status).json({ err: err.message });
      console.log(err)
      res.sendStatus(500);
    }
  }
  async Delete(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id)) throw new NotValid("Passe o id valido");
      await Activities.delete(id);
      res.json({ message: "Sucesso. Atividade deletada" });
    } catch (err) {
      if (err.status) return res.status(err.status).json({ err: err.message });
      res.sendStatus(500);
    }
  }
  async GetAll(req, res) {
    try {
      let data = await Activities.findAll();
      res.json(data);
    } catch (err) {
      res.sendStatus(500);
    }
  }
  async GetOne(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id)) throw new NotValid("Passe o id valido");
      let data = await Activities.findById(id);
      if (!data) throw new NotExistValue("Não existe esta atividade");
      res.json(data);
    } catch (err) {
      if (err.status) return res.status(err.status).json({ err: err.message });
      res.sendStatus(500);
    }
  }
}

export default new ActivitiesController();
