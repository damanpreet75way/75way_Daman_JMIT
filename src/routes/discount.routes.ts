import {Router} from 'express'
import { UserRolesEnum } from '../constants'
import { createDiscount } from '../controllers/discount.controller';
import { verifyJWT,verifyPermission } from '../middlewares/auth.middleware';
const router  = Router();


router.post('/',verifyJWT,verifyPermission([UserRolesEnum.ADMIN]),createDiscount)
export default router