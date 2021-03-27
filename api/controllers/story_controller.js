const Story = require('../models/story_model');
const User = require('../models/user_model');
const { getVideoDurationInSeconds } = require('get-video-duration')

exports.add_story = async(req, res)=>{
    const {userId} = req.body;
    let timeLength = 0;

    console.log(req.file);
    const fileLoca = "http://localhost:3100/"+req.file.path;
    getVideoDurationInSeconds(fileLoca).then(async(duration) => {
        timeLength = duration;  
        console.log(timeLength);    
        if (timeLength < 25){
            const newStory = new Story({
                story: await req.file.path,
                userId: userId
            });
            const saveStory = await newStory.save();
            User.findByIdAndUpdate(userId,{$push: {stories:saveStory._id}},{new: true, useFindAndModify: false}).exec()
            .then(doc=>{console.log(doc)})
            .catch(err=>{res.status(400).json({message:err})})
            
            res.status(201).json(saveStory);
        }
        else{
            res.status(401).json({"message":"Only videos less than 31 seconds are allowed"})
        }  
    }).catch(err=>{res.status(500).json({message:err})})
    
}

exports.delete_story = async(req, res)=>{
    try{
        const {userId, storyId}=req.body;
        const deleteStory = await Story.findByIdAndDelete(storyId);
        const user = await User.findById(userId);
        console.log(user);
        const userStories = [...user.stories];
        const updatedStories = [...userStories].filter(id=> id!==storyId);
        const updateNow = await User.findByIdAndUpdate(userId,{$set: {stories:updatedStories}})
        res.status(201).json({message:`Story @id :${storyId} deleted`});
        } catch(err){
            res.status(401).json({message:err})
        }

}

exports.show_story = async(req, res)=>{
    try{
        const storyId = req.params.id;
        const doc = await Story.findById(storyId)
        const views = doc.views;
        const setviews = await Story.findByIdAndUpdate(storyId,{$set:{views: views+1}});
        res.status(201).json({message: "http://localhost:3100"+doc.story, views: views+1});
        }
        catch(err){
            res.status(400).json({message: err || "Story has been removed"});
        }
}