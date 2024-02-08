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
      console.error(err);
      return undefined;
    }
  }
  async findById(id) {
    if (!id) throw new Error("Falta de parametros no findById");
    try {
      const data = await database.select().table("classroom").where({ id });
      return data[0];
    } catch (err) {
      console.error(err);
      return {};
    }
  }
}

export default new Classroom();
