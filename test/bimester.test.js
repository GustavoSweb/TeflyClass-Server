import supertest from "supertest";
import app from "../src/app";

const request = supertest(app);

const bimester = {
  number: 4,
  year: 2014,
};

describe("Cadastro de bimestre", () => {
  test("Deve criar o bimestre com sucesso", async () => {
    try {
      const res = await request.post("/bimester").send(bimester);
      expect(res.status).toEqual(200);
      expect(res.body.message).toEqual("Sucesso. Bimestre cadastrado");
      expect(res.body.bimester).toBeDefined();
      bimester.id = res.body.bimester.id;
    } catch (err) {
      throw err;
    }
  });
  test("Deve impedir o cadatro de um bimester com valores vazios", async () => {
    try {
      const res = await request.post("/bimester").send({ number: "" });
      expect(res.status).toEqual(400);
    } catch (err) {
      throw err;
    }
  });
});
test("Deve retornar os bimestres", async () => {
  try {
    const res = await request.get(`/bimester`);
    expect(res.status).toEqual(200);
  } catch (err) {
    throw err;
  }
});
test("Deve retornar o bimestre", async () => {
  try {
    const res = await request.get(`/bimester/${bimester.id}`);
    expect(res.status).toEqual(200);
  } catch (err) {
    throw err;
  }
});
test("Deve deletar o bimestre com sucesso", async () => {
  try {
    const res = await request.delete(`/bimester/${bimester.id}`);
    expect(res.status).toEqual(200);
  } catch (err) {
    throw err;
  }
});
