import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 800
    },
    user: [{
        type: Schema.Types.ObjectId, 
        ref: "users", 
        required: true  
    }] 
,
})

const Comment = mongoose.model('comments', commentSchema)

export { Comment }