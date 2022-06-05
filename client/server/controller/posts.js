import { application } from "express";
import User from "../modules/UserSchema.js";


export const createUser = async(req,res)=>{
    const data = req.body;
    console.log(req.body);
    const newUser = new User(data);
    newUser.save()
    .then(result =>{
        res.send({"data":data});
        res.status(201).send("Failed");
        console.log("Create Succeedd");
    })
    .catch(err =>{
        console.log(err.message);
        res.status(404).send("Failed");
    });
}

export const addItem = async(req,res)=>{
    try{
        const data = req.body;
        const user = await User.findById(data.id);
        user.itemList.push(data.item);
        user.save();
        res.status(200).send(user);
    }
    catch{
        res.status(404).send({error:"user dont found"})
    }
}
