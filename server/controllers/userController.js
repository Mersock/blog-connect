const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getUsers = async (req, res) => {
    const user = await User.find().select('_id name email createdAt updatedAt')
    res.json(user);
};

exports.getAuthUser = (req, res) => {
    if (!req.isAuthUser) {
        res.status(403).json({
            'errors': {
                'status_code': 403,
                'message': 'unauthenticated'
            }
        });
        return res.redirect('/signin');
    }
    res.json(req.user);
};

exports.getUserById = async (req, res, next, id) => {
    const user = await User.findOne({_id: id});

    req.profile = user;

    const profileId = mongoose.Types.ObjectId(req.profile._id);
    //check user sign in
    if (profileId.equals(req.user._id)) {
        req.isAuthUser = true;
        return next();
    }
    next();
};

exports.getUserProfile = (req, res) => {
    if (!req.profile) {
        return res.status(404).json({
            'errors': {
                'status_code': 404,
                'message': 'Not Found'
            }
        })
    }
    res.json(req.profile);
};

exports.getUserFeed = async (req, res) => {
    const {following, _id} = req.profile;

    following.push(_id);
    const users = await User.find({_id: {$nin: following}})
                            .select('_id name avatar');
    res.json(users);
};

exports.uploadAvatar = () => {
};

exports.resizeAvatar = () => {
};

exports.updateUser = () => {
};

exports.deleteUser = async (req, res) => {
    const {userId} = await req.params;
    if (!req.isAuthUser) {
        return res.status(400).json({
            'errors': {
                'status_code': 400,
                'message': 'unauthorized'
            }
        })
    }
    const deletedUser = await User.findOneAndDelete({_id: userId});
    res.json(deletedUser);

};

exports.addFollowing = async (req, res, next) => {
    const {followId} = req.body;

    await User.findOneAndUpdate(
        {_id: req.user._id},
        {$push: {following: followId}}
    );
    next();
};

exports.addFollower = async (req, res) => {
    const {followId} = req.body;

    const user = await User.findOneAndUpdate(
        {_id: followId},
        {$push: {followers: req.user._id}},
        {new: true}
    );
    res.json(user);
};

exports.deleteFollowing = async (req, res, next) => {
    const {followId} = req.body;

    await User.findOneAndUpdate(
        {_id: req.user._id},
        {$pull: {following: followId}}
    );
    next();
};

exports.deleteFollower = async (req, res) => {
    const {followId} = req.body;

    const user = await User.findOneAndUpdate(
        {_id: followId},
        {$pull: {followers: req.user._id}},
        {new: true}
    );
    res.json(user);
};
