import supertest from "supertest";
import app from "../src/app";

const request = supertest(app);

const project = {
  title: "PROJETO DE HISTORIA",
  description: "Lorem ipsum dolormattis nunc.",
  delivery: new Date(),
  shipping: new Date(),
  bimester_id: 1,
  matter_id: 1,
  min_members: 2,
  max_members: 4,
};

describe("Cadastro de atividades", () => {
  test("Deve cadastrar o projeto com sucesso", async () => {
    try {
      const res = await request.post("/project").send(project);
      expect(res.status).toEqual(200);
      expect(res.body.message).toEqual("Sucesso. Projeto cadastrado");
      expect(res.body.project).toBeDefined();
      project.id = res.body.project.id;
    } catch (err) {
      throw err;
    }
  });
  test("Deve impedir o cadatro de um projeto com valores vazios", async () => {
    try {
      let projectTest = project;
      projectTest.title = "";
      const res = await request.post("/project").send(projectTest);
      expect(res.status).toEqual(400);
    } catch (err) {
      throw err;
    }
  });
});
test("Deve retornar os projetos", async () => {
  try {
    const res = await request.get(`/project`);
    expect(res.status).toEqual(200);
  } catch (err) {
    throw err;
  }
});
test("Deve retornar o projeto especificado", async () => {
  try {
    const res = await request.get(`/project/${project.id}`);
    expect(res.status).toEqual(200);
  } catch (err) {
    throw err;
  }
});
test("Deve atualizar o projeto com sucesso", async () => {
  try {
    const res = await request
      .put(`/project/${project.id}`)
      .send({ title: "Atividade de geografia" });
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Sucesso. Projeto atualizado!");
  } catch (err) {
    throw err;
  }
});
test("Deve marcar o projeto como finalizado", async ()=>{
  try{
    const res = await request.patch(`/project/${project.id}/finished`)
    expect(res.status).toEqual(200)
  }catch(err){
    throw err
  }
})
test("Deve desmarcar o projeto", async ()=>{
  try{
    const res = await request.patch(`/project/${project.id}/deselect`)
    expect(res.status).toEqual(200)
  }catch(err){
    throw err
  }
})
test("Deve deletar o projeto com sucesso", async () => {
  try {
    const res = await request.delete(`/project/${project.id}`);
    expect(res.status).toEqual(200);
  } catch (err) {
    throw err;
  }
});
