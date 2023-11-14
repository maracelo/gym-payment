import { Router, Request, Response } from "express";
import * as UserController from "../controllers/UserController";
import * as AdminController from "../controllers/AdminController";

const router = Router();

router.get('/ping', (req: Request, res: Response) => res.json({pong: 'ok'}));

// TODO middleware to test if is admin is logged
router.post('/login', AdminController.login);
router.post('/register', AdminController.create);

// router.use('/admin', [ /* middleware */ ]);

router.get('/admin/:id', AdminController.get);
router.put('/admin/:id', AdminController.update);
router.delete('/amdin/:id', AdminController.del);

// router.use('/user', [ /* middleware */ ]);

router.get('/users', UserController.getAll);
router.get('/user/:id', UserController.get);
router.post('/user', UserController.create);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.del);

export default router;