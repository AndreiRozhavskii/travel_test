import { Router } from 'express';
import {
  getApplications,
  addApplication,
  downloadTranslations,
  deployTranslations,
  _addTranslationKey,
} from '../controllers/controllers.js';

const router = Router();

router.get('/applications', getApplications);
router.post('/applications', addApplication);
router.get('/applications/translations/:appName/', downloadTranslations);
router.post('/applications/deploy/:appName', deployTranslations);
router.post('/applications/keys/:appName', _addTranslationKey);

export default router;
