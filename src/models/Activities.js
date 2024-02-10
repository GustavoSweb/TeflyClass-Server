import database from "../database/connection.js";

class Activities {
  async findOne(filter) {
    if (!filter) throw new Error("Falta de parametros no findOne");
    const key = Object.keys(filter);
    try {
      const data = await database
        .select()
        .table("activities")
        .where(`${key[0]}`, filter[key[0]]);

      return data[0];
    } catch (err) {
      throw err;
    }
  }
  async findById(id) {
    if (!id) throw new Error("Falta de parametros no findById");
    try {
      const data = await database.select().table("activities").where({ id });
      return data[0];
    } catch (err) {
      throw err;
    }
  }
  async create({
    title,
    description,
    delivery,
    shipping,
    bimester_id,
    matter_id,
  }) {
    try {
      let sala = await database
        .insert({
          title,
          description,
          delivery,
          shipping,
          bimester_id,
          matter_id,
        })
        .into("activities");
      return sala;
    } catch (err) {
      throw err;
    }
  }
  async delete(id) {
    try {
      const value = await database.where({ id }).delete().table("activities");
      if (value == 0)
        throw new NotExistValue("A sala a ser deletada não existe");
    } catch (err) {
      throw err;
    }
  }
  async findAll({ finished, matters,user_id }) {
    try {
      let query = database
      .select(["activities.*", "matter.name as name_matter"])
      .table("matter")
      .innerJoin("activities", "activities.matter_id", "matter.id");

    if (matters) {
      query = query.whereIn("matter_id", matters);
    }

    if (finished = 'true' && user_id) {
      query = query
        .innerJoin("activity_status", "activities.id", "activity_status.activity_id")
        .where({"activity_status.user_id": user_id, "activity_status.status":1})
    }

    return await query;
    } catch (err) {
      throw err;
    }
  }
}

export default new Activities();
