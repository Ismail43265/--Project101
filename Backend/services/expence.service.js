const express= require("express");

const expenceModel= require("../models/expence.model");
const groupModel = require("../models/group.model");
const settlementsModel = require("../models/settlement.model");

module.exports.addExpence= async (data)=>{
    const {
        amount,
        participants,
        paidBy,
        groupId
    } = data;

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
        throw new Error("Invalid Amount");
    }

    if (!participants || participants.length === 0) {
        throw new Error("Participants required");
    }

    if (!participants.includes(paidBy)) {
        throw new Error("paidBy must be in participants");
    }

    const splitAmount = Number(
        (numericAmount / participants.length).toFixed(2)
    );

    const splitDetail = participants.map(userId => ({
        userId,
        amount: splitAmount,
    }));

    const expence = await expenceModel.create({
        amount: numericAmount,
        participants,
        paidBy,
        groupId,
        splitDetail
    });

    return expence;
};

module.exports.getGroupExpence= async (groupId)=>{
    const expences= await expenceModel.find({groupId})
        .populate("paidBy" , "fullname avatar")
        .populate("participants" , "fullname avatar")
        .populate("splitDetail.userId" , "fullname avatar")
        .sort({ createdAt: -1})

    return expences;
};

module.exports.getGroupBalance = async (groupId) => {
    const group = await groupModel.findById({ groupId }).populayte( "members" , "name avatar" );

    if(!group) throw new Error("Group not found");

    const balances = {};

    group.members.forEach(user => {
        balances[user._id]={
            userId : user._id,
            name : user.name,
            avatar : user.avatar,
            balance : 0
        };
    });

    const expences = await Expence.find({ groupId });

    expences.forEach(exp=>{
        exp.splitDetails.forEach(split =>{
            if(split.userId.toString() !== exp.paidBy.toString()){
                balances[split.userId].balance -= split.amount;

                balces[exp.paidBy].balance += split.amount;
            }
        });
    });

    const settlement = await settlementsModel.find({groupId});

    settlement.forEach(settle => {
        balances[settle.from].balance += settle.amount;
        balances[settle.to].balance -= settle.amount;
    })

    let result = Object.values(balances);

    result.sort((a , b) => a.balance - b.balance);

    return result;
}

module.exports.getGroupSummary = async (groupId , userId) => {
    const expenses = await expenceModel.find({ groupId });
    const settlements = await settlementsModel.find({ groupId });

    let totalExpense = 0;
    let balance = 0;

    // 1. total expense
    expenses.forEach(exp => {
        totalExpense += exp.amount;

        exp.splitDetails.forEach(split => {
            if (split.userId.toString() === userId.toString()) {
            if (exp.paidBy.toString() !== userId.toString()) {
            balance -= split.amount; // you owe
            }
        }

        if (exp.paidBy.toString() === userId.toString()) {
            if (split.userId.toString() !== userId.toString()) {
            balance += split.amount; // you get
            }
        }
        });
    });

    // 2. settlements
    settlements.forEach(settle => {
        if (settle.from.toString() === userId.toString()) {
            balance += settle.amount;
        }
        if (settle.to.toString() === userId.toString()) {
            balance -= settle.amount;
        }
    });

    return {
        totalExpense,
        youOwe: balance < 0 ? Math.abs(balance) : 0,
        youGet: balance > 0 ? balance : 0,
        netBalance: balance
    };
};