const Notification =require("../models/Notification.model");

module.exports.getNotifications = async (req, res, next) => {
  try {

    const notification = await Notification.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(notification);
  } catch (err) {
    
    next(err);
  }
};

module.exports.markAsRead= async(req,res,next)=>{
    try{
        const {id}=req.params;

        await Notification.findByIdAndUpdate(id,{
            isRead: true
        });

        res.status(200).json({message: "Mark as read"});
    }
    catch(err){
        next(err);
    }
}