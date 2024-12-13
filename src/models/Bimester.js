import database from "../database/connection.js";

class Bimester {
  async findOne(filter) {
    if (!filter) throw new Error("Falta de parametros no findOne");
    const key = Object.keys(filter);
    try {
      const data = await database
        .select()
        .table("bimester")
        .where(`${key[0]}`, filter[key[0]]);

      return data[0];
    } catch (err) {
      throw err;
    }
  }
  async findById(id) {
    if (!id) throw new Error("Falta de parametros no findById");
    try {
      const data = await database.select().table("bimester").where({ id });
      return data[0];
    } catch (err) {
      throw err;
    }
  }
  async create({ number, year }) {
    try {
      let sala = await database.insert({ number, year }).into("bimester");
      return sala;
    } catch (err) {
      throw err;
    }
  }
  async delete(id) {
    try {
      const value = await database.where({ id }).delete().table("bimester");
      if (value == 0)
        throw new NotExistValue("O bimestre a ser deletado não existe");
    } catch (err) {
      throw err;
    }
  }
  async findAll() {
    try {
      const data = await database.select().table("bimester");
      return data;
    } catch (err) {
      throw err;
    }
  }
}

export default new Bimester();
