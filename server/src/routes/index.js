import express from 'express';
import { indexPage, profilePage, addProfile } from '../controllers';
import { modifyProfile, performAsyncAction } from '../middleware';
const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/profile', profilePage);
indexRouter.post('/profile', modifyProfile, performAsyncAction, addProfile);

export default indexRouter;