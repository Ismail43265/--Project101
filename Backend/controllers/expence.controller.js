const express= require("express");
const expenceService= require("../services/expence.service");


module.exports.addExpence= async (req,res)=>{
    try{
        const expence = await expenceService.addExpence(req.body);
        res.status(201).json(expence);
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}


module.exports.getGroupExpence= async (req , res)=>{
    try{
        const {groupId}= req.params;

        const expenses= await expenceService.getGroupExpence(groupId);

        res.status(200).json(expenses);
    }
    catch(err){
        res.status(500).json({error: err,message});
    }
}

module.exports.getGroupBalance= async(req , res)=>{
    try{
        const { groupId } = req.params ;

        const balances = await expenceService.getGroupBalance( groupId );

        res.status(200).json(balances);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

module.exports.getGroupSummary = async (req , res)=>{
    try{
        const { groupId } = req.params;
        const userId = req.user.id;

        const summary = await expenceService.getGroupSummary(groupId, userId);

        res.status(200).json(summary);
    }
    catch(err){
        res.status(500).json({ error : err.message });
    }
}