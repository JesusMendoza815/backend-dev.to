import { Post } from '../models/post.model.js';



// Use cases = handlers

const createPost = async (postData) => {

   // const cellFound = await Cell.findOne()

   // if(cellFound) throw new Error("The cell already exist")

    //retornamos promesa
   return Post.create({...postData })
}

const getPosts = (filters = {}) => {
    return Post.find(filters)
}

const getPostById = (id) => {
    return Post.findById(id)
}

const updatePostById = (id, postData, options = {}) => {
    return Post.findByIdAndUpdate(id, postData, { new: true, ...options })
}

const deletePostById = (id) => {
    return Post.findByIdAndDelete(id)
}

const assignWriter = (_id, writer) => {
    return Post.findByIdAndUpdate( _id, writer).populate('users')     
}

const removeWriter =  (_id, writer) => {
    return Post.findByIdAndUpdate( _id, writer)
}

export {
    createPost,
    getPosts,
    getPostById,
    updatePostById,
    deletePostById,
    assignWriter,
    removeWriter
}