// <import model
import model from '../../models';
// import model>

// <import packages
import mongoose from 'mongoose';
// import packages>

/**
 * @description check user access for do action on a post
 * @param userId 
 * @param postId 
 * @returns true or false for validation
 */
export default async function userAccessValidator(userId: string, postId: mongoose.Types.ObjectId) {
    
    /**
     * @description get all user's post
     */
    const userPosts = await model.post.find({creatorId : userId}).populate('creatorId');

    let isValid : boolean = false;

    if (userPosts.length !== 0) {
        
        const v = userPosts.some(post =>  post._id.equals(new mongoose.Types.ObjectId(postId))) // query in user's post for finding a post by given id

        isValid = v;

    };

    return isValid;

};
