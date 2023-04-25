import express from 'express';
import { assignComment, removeComment, removeUser, assignUser, createPost, getPosts, getPostById, updatePostById, deletePostById } from '../usecases/post.usecase.js';
import { CustomError } from '../libs/errorCustom.js'


const router = express.Router()

//router.use(isAuth)

router.get('/', async (request, response) => {

    try {

        const { title, content, date, user, comments } = request.query
    
        let filters = {}
    
        if(title) filters = {...filters, title}
    
        if(content) filters = {...filters, content}

        if(date) filters = {...filters, date}

        if(user) filters = {...filters, user}

        if(comments) filters = {...filters, comments}
    
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

router.get('/:id', async (request, response) => {
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

router.post('/', async (request, response) => {
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
            message: 'Error at create post',
            extraInfo: error.message
        })
    
    }
})

router.patch('/:id', async (request, response) => {
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

router.delete('/:id', async (request, response) => {
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

router.patch('/assignUser/:_id', async (request, response) => {
    try {
        
        const  {_id} = request.params
        const { user } = request.body
       
        const postUpdated= await assignUser( _id,
          {
            $push: { user: user },
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
            message: 'Error at assign user',
            extraInfo: error.message
        })
    
    }
})

router.patch('/removeUser/:_id', async (request, response) => {
    try {
        
        const  {_id} = request.params
        const { user } = request.body
       
        const postUpdated= await removeUser( _id,
          {
            $pull: { user: user },
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
            message: 'Error at remove user',
            extraInfo: error.message
        })
    
    }
})

router.patch('/assignComment/:_id', async (request, response) => {
    try {
        
        const  {_id} = request.params
        const { comments } = request.body
       
        const postUpdated= await assignComment( _id,
          {
            $push: { comments: comments },
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
            message: 'Error at assign comment',
            extraInfo: error.message
        })
    
    }
})

router.patch('/removeComment/:_id', async (request, response) => {
    try {
        
        const  {_id} = request.params
        const { comment } = request.body
       
        const postUpdated= await removeComment( _id,
          {
            $pull: { comments: comment },
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
            message: 'Error at delete comment',
            extraInfo: error.message
        })
    
    }
})

export default router