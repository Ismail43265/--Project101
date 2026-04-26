const express = require("express");

const settlementService =require("../services/settlement.service");

module.exports.pay = async (req,res) => {
    try {
    const { groupId, to, amount, paymentMethod } = req.body;
    const from = req.user.id; // logged-in user

    const settlement = await settlementService.createSettlement({
      groupId,
      from,
      to,
      amount,
      paymentMethod
    });

    res.status(201).json(settlement);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}