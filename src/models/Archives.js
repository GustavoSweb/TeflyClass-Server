import { getStorage } from "firebase-admin/storage";
import { initializeApp, cert } from "firebase-admin/app";
import fs from 'fs'

import database from "../database/connection.js";

const firebaseConfig = JSON.parse(fs.readFileSync('./authFirebase.json'))

import {v4 as uuidv4} from 'uuid'
import { NotValid } from "../utils/Error.js";
initializeApp({
  credential: cert(firebaseConfig),
  storageBucket: "solar-galaxy-342621.appspot.com",
});

const storage = getStorage().bucket();
class Archives{
    async upload(file, type, idRelation) {
      const { originalname, buffer } = file;
      let types = ['activity', 'project', 'content']
      const result = types.find(value=> value == type)
      if(!result) throw new NotValid("Tipo invalido de atividade")
      try {
        const fileName = uuidv4() + "." + originalname.match(/\.([^.]+)$/)[1];
        const dest = `archivesTasks/${type}/${fileName}`;
        const fileStorage = storage.file(dest);
        const fileStream = fileStorage.createWriteStream();
        const url = `https://storage.googleapis.com/${storage.name}/${dest}`
        let data = {url:''}
        data[`${type}_id`] = idRelation
          
            const id = await database.insert(data).into(`archives_${type}`)
        fileStream.on("error", (err)=>{throw err});
        fileStream.on("finish",async () => {
          try{
            fileStorage.makePublic();
            let data = {url}
          
            await database.table(`archives_${type}`).select().where({id:id[0]}).update(data)
          }catch(err){
            throw err
          }
        });
        fileStream.end(buffer);
      } catch (err) {
        throw err
      }
    }
}
export default new Archives()