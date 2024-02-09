import supertest from "supertest";
import app from "../src/app";
import User from "../src/models/Classroom";

const request = supertest(app)

const classroom = {
    num:45
}

describe('Cadastro de sala', ()=>{
    test('Deve criar a sala com sucesso', async ()=>{
        try{
            const res = await request.post('/classroom').send(classroom)
            expect(res.status).toEqual(200)
            expect(res.body.message).toEqual('Sucesso. Sala cadastrada')
            expect(res.body.classroom).toBeDefined()
            classroom.id = res.body.classroom.id
        }catch(err){
            throw err
        }
        
    })
    test('Deve impedir o cadatro de uma sala com valores vazios', async ()=>{
        try{
            const res = await request.post('/classroom').send({num:''})
            expect(res.status).toEqual(400)
        }catch(err){
            throw err
        }
        
    })
})
test('Deve deletar a sala com sucesso', async ()=>{
    try{
        const res = (await request.delete(`/classroom/${classroom.id}`))
        expect(res.status).toEqual(200)
    }catch(err){
        throw err
    }
})
test('Deve retornar as salas de aula', async ()=>{
    try{
        const res = (await request.get(`/classroom`))
        console.log(res.body)
        expect(res.status).toEqual(200)
    }catch(err){
        throw err
    }
})