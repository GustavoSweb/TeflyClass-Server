import database from "../database/connection.js";

class Classroom {
  async findOne(filter) {
    if (!filter) throw new Error("Falta de parametros no findOne");
    const key = Object.keys(filter);
    try {
      const data = await database
        .select()
        .table("classroom")
        .where(`${key[0]}`, filter[key[0]]);

      return data[0];
    } catch (err) {
      throw err;
    }
  }
  async findById(id) {
    if (!id) throw new Error("Falta de parametros no findById");
    try {
      const data = await database.select().table("classroom").where({ id });
      return data[0];
    } catch (err) {
      throw err;
    }
  }
  async create({ num }) {
    try {
      if(!num) throw new Error('Falta de parametros no create')
    let sala = await database.insert({num}).into("classroom")
return sala
    } catch (err) {
      throw err;
    }
  }
  async delete(id) {
    try {
      const value = await database.where({ id }).delete().table("classroom");
      if (value == 0)
        throw new NotExistValue("A sala a ser deletada não existe");
    } catch (err) {
      throw err;
    }
  }
  async findAll() {
    try {
      const data = await database
        .select()
        .table("classroom");
      return data;
    } catch (err) {
      throw err
    }
  }
}

export default new Classroom();
