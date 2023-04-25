import express from 'express';
import { removeWriter, assignWriter, createPost, getPosts, getPostById, updatePostById, deletePostById } from '../usecases/post.usecase.js';
import { CustomError } from '../libs/errorCustom.js'
import { isAuth } from '../middlewares/auth.middleware.js';

const router = express.Router()

//router.use(isAuth)

router.get('/', isAuth, async (request, response) => {

    try {

        const { title, content, date, writer } = request.query
    
        let filters = {}
    
        if(title) filters = {...filters, title}
    
        if(content) filters = {...filters, content}

        if(date) filters = {...filters, date}

        if(writer) filters = {...filters, writer}
    
        const postsFound = await getPosts(filters)

        if(!postsFound)
        throw new CustomError("Posts not found", 404)

        response.json({
            success: true,
            data: {
                posts: postsFound
            }
        })


    } catch (error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: 'Error at getting all posts'
        })
        //customerror en libs
    }

})

router.get('/:id', isAuth, async (request, response) => {
    try {
        
        const { id } = request.params

        const postFound = await getPostById(id);

        response.json({
            success: true,
            data: {
                posts: postFound
            }
        })

    } catch (error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: 'Error at get post by id'
        })
    
    }
})

router.post('/', isAuth, async (request, response) => {
    try {
        
        const newPost = request.body

        const postCreated = await createPost(newPost);

        response.json({
            success: true,
            data: {
                cells: postCreated
            }
        })

    } catch (error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: 'Error at create cell',
            extraInfo: error.message
        })
    
    }
})

router.patch('/:id', isAuth, async (request, response) => {
    try {
        
        const { id } = request.params
        const newPostData = request.body
        const postUpdated= await updatePostById(id, newPostData);

        response.json({
            success: true,
            data: {
                posts: postUpdated
            }
        })

    } catch (error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: 'Error at update post',
            extraInfo: error.message
        })
    
    }
})

router.delete('/:id', isAuth, async (request, response) => {
    try {
        
        const { id } = request.params

        const postDeleted= await deletePostById(id);

        response.json({
            success: true,
            data: {
                posts: postDeleted
            }
        })

    } catch (error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: 'Error at delete post',
            extraInfo: error.message
        })
    
    }
})

router.put('/assignWritter/:_id', isAuth, async (request, response) => {
    try {
        
        const  {_id} = request.params
        const { writer } = request.body
       
        const postUpdated= await assignWriter( _id,
          {
            $push: { writer: writer },
          }
        );
       // response.send(`${cellUpdated.name} updated`);

        response.json({
            success: true,
            data: {
                posts: postUpdated
            }
        })

    } catch (error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: 'Error at update post',
            extraInfo: error.message
        })
    
    }
})

router.put('/removeWritter/:_id', isAuth, async (request, response) => {
    try {
        
        const  {_id} = request.params
        const { writer } = request.body
       
        const postUpdated= await removeWriter( _id,
          {
            $pull: { writer: writer },
          }
        );
       // response.send(`${cellUpdated.name} updated`);

        response.json({
            success: true,
            data: {
                posts: postUpdated
            }
        })

    } catch (error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: 'Error at update post',
            extraInfo: error.message
        })
    
    }
})

export default router