import { Router, Request, Response } from "express";
import passport from "passport";

import * as UserController from "../controllers/UserController";
import * as AdminController from "../controllers/AdminController";
import * as RTokenController from "../controllers/RTokenController";
import * as PaymentController from "../controllers/PaymentController";
import * as SearchController from "../controllers/SearchController";

const router = Router();

router.get('/ping', (req: Request, res: Response) =>{ res.json({prong: true}) });

router.get('/refresh', RTokenController.accessToken);

router.post('/admin/login', AdminController.login);
router.post('/admin/register', AdminController.create);

router.get('/admin/:id', passport.authenticate('jwt', {session: false}), AdminController.get);
router.put('/admin/:id', passport.authenticate('jwt', {session: false}), AdminController.update);
router.delete('/admin/:id', passport.authenticate('jwt', {session: false}), AdminController.del);

router.get('/usertoday', passport.authenticate('jwt', {session: false}), UserController.getTodayList);
router.get('/userlate', passport.authenticate('jwt', {session: false}), UserController.getLateList);
router.get('/user/:id', passport.authenticate('jwt', {session: false}), UserController.get);
router.post('/user', passport.authenticate('jwt', {session: false}), UserController.create);
router.put('/user/:id', passport.authenticate('jwt', {session: false}), UserController.update);
router.delete('/user/:id', passport.authenticate('jwt', {session: false}), UserController.del);

router.put('/payment/:id', passport.authenticate('jwt', {session: false}), PaymentController.updatePaymentStatus);
router.get('/search', passport.authenticate('jwt', {session: false}), SearchController.search);

export default router;