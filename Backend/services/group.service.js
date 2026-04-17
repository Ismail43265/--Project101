const express = require("express");


//imports from within
const groupModel= require("../models/group.model");



export const createGroupService= async({name, members, userId})=>{
    if(!name){
        throw new Error("Group name is required");
    }

    let uniqueMembers= [...new Set(members || [])];

    if(!uniqueMembers.includes(userId)){
        uniqueMembers.push(userId);
    }

    const memberData= uniqueMembers.map((id)=>({
        user :id,
        role : id == userId ? "admin" : "member"
    }));

    const group = await groupModel.create({
        name,
        admin: userId,
        members: memberData,
    });

    return group;
}