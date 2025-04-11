import express from 'express';
import { getUserData, userEnrolledCourses } from '../controllers/userController.js';
import { purchaseCourse } from '../controllers/userController.js';

const userRouter = express.Router()

userRouter.get('/data',  getUserData)
userRouter.get('/enrolled-courses', userEnrolledCourses)
userRouter.post('/purchase', purchaseCourse)

export default userRouter