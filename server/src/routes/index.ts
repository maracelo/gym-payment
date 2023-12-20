import { Router, Request, Response } from "express";
import passport from "passport";

import * as UserController from "../controllers/UserController";
import * as AdminController from "../controllers/AdminController";

const router = Router();

router.post('/admin/login', AdminController.login);
router.post('/admin/register', AdminController.create);

router.get('/admin/:id', passport.authenticate('jwt', {session: false}), AdminController.get);
router.put('/admin/:id', passport.authenticate('jwt', {session: false}), AdminController.update);
router.delete('/admin/:id', passport.authenticate('jwt', {session: false}), AdminController.del);

router.get('/users', passport.authenticate('jwt', {session: false}), UserController.getAll);
router.get('/user/:id', passport.authenticate('jwt', {session: false}), UserController.get);
router.post('/user', passport.authenticate('jwt', {session: false}), UserController.create);
router.put('/user/:id', passport.authenticate('jwt', {session: false}), UserController.update);
router.delete('/user/:id', passport.authenticate('jwt', {session: false}), UserController.del);

export default router;