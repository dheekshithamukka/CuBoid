const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const Post =  mongoose.model("Post")
const User = mongoose.model("User")
var async = require("async");

router.get('/user/:id',requireLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
         Post.find({postedBy:req.params.id})
         .populate("postedBy","_id name")
         .exec((err,posts)=>{
             if(err){
                 return res.status(422).json({error:err})
             }
             res.json({user,posts})
         })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})


// router.put('/follow',requireLogin,(req,res)=>{
//     User.findByIdAndUpdate(req.body.followId,{
//         $push:{followers:req.user._id}
//     },{
//         new:true
//     },(err,result)=>{
//         if(err){
//             return res.status(422).json({error:err})
//         }
//       User.findByIdAndUpdate(req.user._id,{
//           $push:{following:req.body.followId}
          
//       },{new:true}).select("-password").then(result=>{
//           res.json(result)
//       }).catch(err=>{
//           return res.status(422).json({error:err})
//       })

//     }
//     )
// })
// router.put('/unfollow',requireLogin,(req,res)=>{
//     User.findByIdAndUpdate(req.body.unfollowId,{
//         $pull:{followers:req.user._id}
//     },{
//         new:true
//     },(err,result)=>{
//         if(err){
//             return res.status(422).json({error:err})
//         }
//       User.findByIdAndUpdate(req.user._id,{
//           $pull:{following:req.body.unfollowId}
          
//       },{new:true}).select("-password").then(result=>{
//           res.json(result)
//       }).catch(err=>{
//           return res.status(422).json({error:err})
//       })

//     }
//     )
// })


router.put('/updatepic',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{logo:req.body.logo}},{new:true},
        (err,result)=>{
         if(err){
             return res.status(422).json({error:"pic cannot post"})
         }
         res.json(result)
    })
})

router.put('/edit-profile',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id, {$set: {interests: req.body.interests}}, {new: true},
        (err,result) => {
            if(err){
                console.log(err)
                return res.status(422).json({error: "not updated"})
            }
            res.json(result)
        }
        )
})


router.get('/mydetails',requireLogin,(req,res) => {
    User.find({_id: req.user._id})
    .then(mydetails => {
        res.json(mydetails)
        // console.log(mydetails)
    })
    .catch(err => {
        console.log(err)
    })
})


router.post('/search-users',(req,res)=>{
    let userPattern = new RegExp("^"+req.body.query)
    var q = {$or:[{fname:{$regex:userPattern}},{lname:{$regex:userPattern}}, {username:{$regex:userPattern}}]}
    User.find(q)
    .select("_id fname lname username")
    .then(user=>{
        res.json({user})
    }).catch(err=>{
        console.log(err)
    })

})


router.get('/handle-requests',requireLogin,(req,res) => {
    User.find({_id: req.user._id})
    // .populate("request","username userId")
    .then(result => {
        res.json(result[0].request)
        console.log(result[0].request)
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/friendslist',requireLogin,(req,res) => {
    User.find({_id: req.user._id})
    // .populate("request","username userId")
    .then(result => {
        res.json(result[0].friendsList)
        console.log(result[0].friendsList)
    })
    .catch(err => {
        console.log(err)
    })
})





router.post('/search', requireLogin, (req,res) => {
    var searchfriend = req.body.receiverName
    async.parallel([
        function(callback) {
        if(req.body.receiverName) {
        User.update({
        "username": req.body.receiverName,
        "request.userId": {$ne: req.user._id},
        "friendsList.friendId": {$ne: req.user._id}
        },
        {
        $push: {request: {
        userId: req.user._id,
        username: req.user.username
        }},
        $inc: {totalRequest: 1}
        },(err, count) => {
        console.log(err);
        callback(err, count);
        })
        }
        },
        function(callback) {
        if(req.body.receiverName){
        User.update({
        "username": req.user.username,
        "sentRequest.username": {$ne: req.body.receiverName}
        },
        {
        $push: {sentRequest: {
        username: req.body.receiverName
        }}
        },(err, count) => {
        callback(err, count);
        })
        }
        }],
        (err, results)=>{
        res.redirect("/search");
        });



        async.parallel([
            // this function is updated for the receiver of the friend request when it is accepted
            function(callback) {
            if (req.body.senderId) {
            User.update({
            '_id': req.user._id,
            'friendsList.friendId': {$ne:req.body.senderId}
            },{
            $push: {friendsList: {
            friendId: req.body.senderId,
            friendName: req.body.senderName
            }},
            $pull: {request: {
            userId: req.body.senderId,
            username: req.body.senderName
            }},
            $inc: {totalRequest: -1}
            }, (err, count)=> {
            callback(err, count);
            });
            }
            },
            // this function is updated for the sender of the friend request when it is accepted by the receiver
            function(callback) {
            if (req.body.senderId) {
            User.update({
            '_id': req.body.senderId,
            'friendsList.friendId': {$ne:req.user._id}
            },{
            $push: {friendsList: {
            friendId: req.user._id,
            friendName: req.user.username
            }},
            $pull: {sentRequest: {
            username: req.user.username
            }}
            }, (err, count)=> {
            callback(err, count);
            });
            }
            },
            function(callback) {
            if (req.body.user_Id) {
            User.update({
            '_id': req.user._id,
            'request.userId': {$eq: req.body.user_Id}
            },{
            $pull: {request: {
            userId: req.body.user_Id
            }},
            $inc: {totalRequest: -1}
            }, (err, count)=> {
            callback(err, count);
            });
            }
            },
            function(callback) {
            if (req.body.user_Id) {
            User.update({
            '_id': req.body.user_Id,
            'sentRequest.username': {$eq: req.user.username}
            },{
            $pull: {sentRequest: {
            username: req.user.username
            }}
            }, (err, count)=> {
            callback(err, count);
            });
            }
            }
            ],(err, results)=> {
            res.redirect('/search');
            });
    
})

module.exports = router
