import supertest from "supertest";
import app from "../src/app";


const request = supertest(app);

const activity = {
  title: "ATIVIDADE DE HISTORIA",
  description:"Lorem ipsum dolormattis nunc.",
  delivery: new Date(),
  shipping: new Date(),
  bimester_id: 1,
  matter_id: 1,
  classrooms:[3]
};

describe("Cadastro de atividades", () => {
  test("Deve cadastrar a atividade com sucesso", async () => {
    try {
      const res = await request.post("/activity").send(activity);
      expect(res.status).toEqual(200);
      expect(res.body.message).toEqual("Sucesso. Atividade cadastrada");
      expect(res.body.activity).toBeDefined();
      activity.id = res.body.activity.id;
    } catch (err) {
      throw err;
    }
  });
  test("Deve impedir o cadatro de uma atividade com valores vazios", async () => {
    try {
      let activityTest = activity
      activityTest.title = '' 
      const res = await request.post("/activity").send(activityTest);
      expect(res.status).toEqual(400);
    } catch (err) {
      throw err;
    }
  });
});
test("Deve retornar as atividades", async () => {
  try {
    const res = await request.get(`/activity`);
    expect(res.status).toEqual(200);
  } catch (err) {
    throw err;
  }
});
test("Deve retornar a atividade especificada", async () => {
  try {
    const res = await request.get(`/activity/${activity.id}`);
    expect(res.status).toEqual(200);
  } catch (err) {
    throw err;
  }
});
test("Deve atualizar a atividade com sucesso", async ()=>{
  try{
    const res = await request.put(`/activity/${activity.id}`).send({title:"Atividade de geografia"})
    expect(res.status).toEqual(200)
    expect(res.body.message).toEqual("Sucesso. Atividade atualizada!")
  }catch(err){
    throw err
  }
})
test("Deve marcar a atividade como finalizada", async ()=>{
  try{
    const res = await request.patch(`/activity/${activity.id}/finished`)
    expect(res.status).toEqual(200)
  }catch(err){
    throw err
  }
})
test("Deve desmarcar a atividade", async ()=>{
  try{
    const res = await request.patch(`/activity/${activity.id}/deselect`)
    expect(res.status).toEqual(200)
  }catch(err){
    throw err
  }
})
test("Deve deletar a atividade com sucesso", async () => {
  try {
    const res = await request.delete(`/activity/${activity.id}`);
    expect(res.status).toEqual(200);
  } catch (err) {
    throw err;
  }
});
