import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
} from '../usecases/user.usecases.js';
import jwt from '../libs/jwt.js';

const routerUsers = express.Router();

//Get all Users
routerUsers.get('/', async (req, res) => {
  try {
    const usersFound = await getAllUsers();

    res.json({
      success: true,
      data: usersFound
    });

  } catch (error) {
    res
    .status(400)
    .json({
      success: false,
      message: error.message
    });
  }
});

//Get User by id
routerUsers.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userFound = await getUserById(id);

    res.json({
      success: true,
      data: userFound
    });

  } catch (error) {
    res
    .status(400)
    .json({
      success: false,
      message: error.message
    });
  }
});

//Create User
routerUsers.post('/signup', async (req, res) => {
  try {
    const { body } = req;
    const userCreated = await createUser( body );
    const token = jwt.sign({ id: userCreated._id });

    res.json({
      success: true,
      data: userCreated,
      token
    });

  } catch (error) {
    res
    .status(400)
    .json({
      success: false,
      message: error.message
    });
  }
});

//Update User by Id
routerUsers.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const userUpdated = await updateUserById(id, dataToUpdate);
    res.json({
      success: true,
      data: userUpdated
    });

  } catch (error) {
    res
    .status(400)
    .json({
      success: false,
      message: error.message
    });
  }
});

routerUsers.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userDeleted = await deleteUserById(id);

    if (!userDeleted) throw new Error('Id no econtrado');

    res.json({
      success: true,
      message: 'Cuenta eliminada existosamente'
    });

  } catch (error) {
    res
    .status(400)
    .json({
      success: false,
      message: error.message
    });
  }
});

export default routerUsers;