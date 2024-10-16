// import { Router } from 'express';
// import AppController from '../controllers/AppController';
// import UsersController from '../controllers/UsersController';
// import AuthController from '../controllers/AuthController';
// import FilesController from '../controllers/FilesController';

const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');

// const router = Router();

router.get('/status', AppController.getStatus);

router.get('/stats', AppController.getStats);

router.post('/users', UsersController.postNew);

// router.get('/connect', AuthController.getConnect);

// router.get('/disconnect', AuthController.getDisconnect);

// router.get('/users/me', UsersController.getMe);

// router.post('/files', FilesController.postUpload);

// router.get('/files/:id', FilesController.getShow);

// router.get('/files', FilesController.getIndex);

module.exports = router;