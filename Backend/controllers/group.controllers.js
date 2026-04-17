const express= require("express");

// important imporsts from within
const groupService= require("../services/group.service");


export const createGroup = async (req,res)=>{
    try{
        const userId=req.user.id;
        const {name, members}=req.body;

        const group= await groupService.createGroupService({
            name,
            members,
            userId,
        });

        res.status(201).json({
            success: true,
            data: group
        });
    }
    catch(err){
        res.json(400).json({
            success: false,
            message: err.message,
        });
    }
}


export const getUserGroups= async (req, res)=>{
    try{
        const userId= req.user.id;

        const groups= await groupService.getUserGroupsService(userId);

        res.json({
            success: true,
            data: groups
        });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};