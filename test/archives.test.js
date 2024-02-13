import supertest from "supertest";
import app from "../src/app";

const request = supertest(app);

describe("Cadastro de atividades", () => {
  test("Deve cadastrar a atividade com sucesso", async () => {
    try {
      const res = await request.post("/archive?type=activity").attach('file', 'test/archives/Ola-Mundo.txt')
      expect(res.status).toEqual(200);
      expect(res.body.message).toEqual("Upload feito com sucesso");
    } catch (err) {
      throw err;
    }
  });
  test("Deve impedir o cadatro de uma atividade com valores vazios", async () => {
    try {
      const res = await request.post("/archive");
      expect(res.status).toEqual(400);
    } catch (err) {
      throw err;
    }
  });
});
