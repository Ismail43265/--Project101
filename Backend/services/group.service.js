
//imports from within
const groupModel= require("../models/group.model");



module.exports.createGroupService= async({name, members, userId})=>{
    if(!name){
        throw new Error("Group name is required");
    }

    let uniqueMembers= [...new Set(members || [])];

    if(!uniqueMembers.includes(userId)){
        uniqueMembers.push(userId);
    }

    const memberData= uniqueMembers.map((id)=>({
        user :id,
        role : id.toString() == userId.toString() ? "admin" : "member"
    }));

    const group = await groupModel.create({
        name,
        admin: userId,
        members: memberData,
    });

    return group;
}

module.exports.getUserGroupsService= async (userId)=>{
    const group= await groupModel.find({
        "members.user": userId,
    })
    .populate("members.user", "name avatar")
    .sort({updatedAt: -1});

    return group;
}

module.exports.getGroupDetailService= async (groupId, userId)=>{
    const group= await groupModel.findById(groupId)
    .populate("members.user", "name avatar email");

    if(!group) throw new Error("Group not found");

    const isMember = group.members.some(
        (m)=> m.user._id.toString()===userId
    );

    if(!isMember) throw new Error("Acces denied");
    return group;
}

module.exports.addMemberService= async (groupId,userId,newUserId)=>{
    const group= await groupModel.findById(groupId);

    if(!group) throw new Error("Group not found");

    if(group.admin.toString() !== userId){
        throw new Error("only admin can add members");
    }

    const exists= group.members.some(
        (m)=> m.user.toString() === newUserId
    );

    if(exists){
        throw new Error("User is already a member");
    }

    group.members.push({
        user: newUserId,
        role: "member",
    });

    group.lastActivity= new Date();

    await group.save();
    return group;
};


module.exports.removeMemberService= async (groupId,userId,removeUserId)=>{
   const group= await groupModel.findById(groupId);

    if(!group) throw new Error("Group not found");

    if(group.admin.toString() !== userId){
        throw new Error("only admin can add members");
    }

    const exists= group.members.some(
        (m)=> m.user.toString() === removeUserId
    );

    if(!exists){
        throw new Error("User is not in group");
    }

    if (group.admin.toString() === removeUserId) {
        throw new Error("Admin cannot be removed");
    }

    group.members= group.members.filter(
        (m)=>m.user.toString() !== removeUserId
    );

    group.lastActivity= new Date();

    await group.save();
    return group;
}