const express= require("express");

// important imporsts from within
const groupService= require("../services/group.service");


module.exports.createGroup = async (req, res) => {
  try {
    console.log("BODY:", req.body);   // 🔥 debug
    console.log("FILE:", req.file);   // 🔥 debug

    const name = req.body.name;
    const description = req.body.description;

    let members = [];
    if (req.body.members) {
      members = JSON.parse(req.body.members);
    }

    const group = await groupService.createGroupService({
      name,
      members,
      userId: req.user.id,
      description,
    });

    res.status(201).json({
      success: true,
      data: group,
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


module.exports.getUserGroups= async (req, res)=>{
    try{
        const userId= req.user.id;

        const groups= await groupService.getUserGroupsService(userId);

        res.json({
            success: true,
            data: groups
        });
    }
    catch(err){
      console.error("FULL ERROR:", err);
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};


module.exports.getGroupDetail= async (req,res)=>{
   try{
    const userId= req.user.id;
    const groupId= req.params.id;

    const group = await groupService.getGroupDetailService(groupId, userId);

    res.json({
        success: true,
        data: group,
    });
   }
   catch(err){
        res.status(403).json({
            success: false,
            data: err.message,
        });
   }
}

module.exports.addMember = async (req, res) => {
  try {
    const userId = req.user.id;
    const groupId = req.params.id;
    const { userId: newUserId } = req.body;

    const group = await groupService.addMemberService(
      groupId,
      userId,
      newUserId
    );

    res.json({
      success: true,
      data: group,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: err.message,
    });
  }
};

module.exports.removeMember= async (req, res)=>{
    try{
        const userId= req.user.id;
        const groupId= req.params.id;
        const removeUserId= req.params.userId;

        const group = await groupService.removeMemberService(
            groupId,
            userId,
            removeUserId
        );

        res.json({
            success: true,
            data: group,
        });

    }
    catch(err){
        res.status(400).json({
        success: false,
        message: err.message,
        });
    }
}