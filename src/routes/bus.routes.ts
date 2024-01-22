import {Router} from 'express'
import { addBus,bookSeat ,getBus} from '../controllers/bus.controller';
import { verifyJWT,verifyPermission } from '../middlewares/auth.middleware';
import { UserRolesEnum } from '../constants';
const router  = Router();
router.get('/:busNumber',getBus)
router.post('/',verifyJWT,verifyPermission([UserRolesEnum.ADMIN]),addBus);
router.post('/book',bookSeat)
export default router