const groupModel = require("../models/group.model");
const settlementModel =require("../models/settlement.model");

module.exports.createSettlement = async ({ groupId, from, to, amount, paymentMethod })=>{
    // 1. basic validation
  if (from === to) {
    throw new Error("You cannot pay yourself");
  }

  if (amount <= 0) {
    throw new Error("Invalid amount");
  }

  // 2. group check
  const group = await groupModel.findById(groupId);

  if (!group) {
    throw new Error("Group not found");
  }

  // 3. check members
  if (
    !group.members.includes(from) ||
    !group.members.includes(to)
  ) {
    throw new Error("Users not in group");
  }

  // 4. create settlement
  const settlement = await settlementModel.create({
    groupId,
    from,
    to,
    amount,
    paymentMethod
  });

  return settlement;
}