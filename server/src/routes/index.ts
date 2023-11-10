import { Router, Request, Response } from "express";
import * as UserController from "../controllers/UserController";
import * as AdminController from "../controllers/AdminController";

const router = Router();

router.get('/ping', (req: Request, res: Response) => res.json({pong: 'ok'}))

router.post('/login', AdminController.login);

// router.use('/user', [ /* middleware */ ]);
 
router.get('/user', UserController.getAll);
router.get('/user/:id', UserController.get);
router.post('/user', UserController.create);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.del);

// router.use('/admin', [ /* middleware */ ]);

router.get('/admin/:id', AdminController.get);
router.post('/admin', AdminController.create);
router.put('/admin/:id', AdminController.update);
router.delete('/amdin/:id', AdminController.del);

export default router;