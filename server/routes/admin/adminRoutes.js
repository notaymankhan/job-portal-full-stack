import express from 'express';
import {createCompany, postJob,getCompanyId} from '../../controllers/admin/adminController.js';
import { validateApiKey } from '../../middleware/apiKeyMiddleware.js';
const router = express.Router();


router.use(validateApiKey);

router.get('/getcompanyId', getCompanyId);
router.post('/post-job', postJob);
router.post('/create-company', createCompany); // Assuming createCompany is also handled by postJob for simplicity

export default router
