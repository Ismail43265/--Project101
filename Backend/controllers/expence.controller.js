const express= require("express");
const expenceService= require("../services/expence.service");
const groupModel = require("../models/group.model");



module.exports.addExpence= async (req,res)=>{
   try {

        const { groupId, participants, amount } = req.body;

        const group = await groupModel.findById(groupId);

        if (!group) {
            return res.status(404).json({
                message: "Group Not exist"
            });
        }

        // ✅ group member ids
        const groupMemberIds = group.members.map(
            (m) => m.user.toString()
        );

        // ✅ validate participants
        const isValid = participants.every(
            (userId) => groupMemberIds.includes(userId)
        );

        if (!isValid) {
            return res.status(400).json({
                message: "given participants not on group"
            });
        }

        const participantsWithPayer = [
            ...new Set([
                ...participants,
                req.user.id
            ])
        ];

        // ✅ backend decides paidBy
        const expenseData = {
            amount,
            participants: participantsWithPayer,
            groupId,
            paidBy: req.user.id
        };

        const expence =
            await expenceService.addExpence(expenseData);

        res.status(201).json(expence);

    } catch (err) {

        console.log("========= ERROR =========");

    console.log(err.message);

    console.log(err);
        res.status(500).json({
            error: err.message
        });
    }
};


module.exports.getGroupExpence= async (req , res)=>{
    try{
        const {groupId}= req.params;

        const expenses= await expenceService.getGroupExpence(groupId);
        

        res.status(200).json({
            success: true,
            data: expenses,
            currentUserId: req.user._id
        });
    }
    catch(err){
        res.status(500).json({error: err.message});
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