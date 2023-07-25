import { Router, Request, Response } from 'express';
import { get, put, update, remove } from '../controllers/controller'
import { getValidator, putValidator, updateValidator, removeValidator } from '../middlewares/validator';

const router = Router();

router.get('/health', function (req: Request, res: Response) {
    return res.status(200).send('success');
})
router.get('/get/:key', getValidator, get);
router.post('/put', putValidator, put);
router.post('/update', updateValidator, update);
router.post('/remove/:key', removeValidator, remove);

// router.get('/get/:key', get);
// router.post('/put', put);
// router.post('/update', update);
// router.delete('/remove/:key', remove);

export default router;