import { Router, Request, Response } from "express";
import passport from "passport";

import { upload } from "../config/multer";

import * as UserController from "../controllers/UserController";
import * as AdminController from "../controllers/AdminController";
import * as RTokenController from "../controllers/RTokenController";
import * as PaymentController from "../controllers/PaymentController";
import * as SearchController from "../controllers/SearchController";

const passportAuth = passport.authenticate('jwt', {session: false, failWithError: true});

const router = Router();

router.get('/ping', (req: Request, res: Response) =>{ res.json({prong: true}) });

router.get('/refresh', RTokenController.refresh);

router.post('/admin/login', AdminController.login);
router.post('/admin/register', AdminController.create);

router.get('/admin/:id', passportAuth, AdminController.get);
router.put('/admin/:id', passportAuth, AdminController.update);
router.put('/admin/:id/newpic', passportAuth, upload.single('newPic'), AdminController.newProfilePic);
router.put('/admin/:id/removepic', passportAuth, AdminController.removeProfilePic);
router.delete('/admin/:id', passportAuth, AdminController.del);

router.get('/usertoday', passportAuth, UserController.getTodayList);
router.get('/userlate', passportAuth, UserController.getLateList);
router.get('/user/:id', passportAuth, UserController.get);
router.post('/user', passportAuth, UserController.create);
router.put('/user/:id', passportAuth, UserController.update);
router.put('/user/:id/newpic', passportAuth, upload.single('newPic'), UserController.newProfilePic);
router.put('/user/:id/removepic', passportAuth, UserController.removeProfilePic);
router.delete('/user/:id', passportAuth, UserController.del);

router.put('/payment/:id', passportAuth, PaymentController.updatePaymentStatus);
router.get('/search', passportAuth, SearchController.search);

export default router;