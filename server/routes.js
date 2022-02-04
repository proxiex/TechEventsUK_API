import { Router } from 'express';
import eventsController from './controller/events';
import categoryController from './controller/category';

const router = Router();

router.get('/events/', eventsController.getAllEvents);
router.get('/events/:id', eventsController.getEventById);
router.get('/categories', categoryController.getAllCategories);

router.post('/events/admin/', eventsController.createEvent);
router.put('/events/admin/:id', eventsController.updateEvent);
router.delete('/events/admin/:id', eventsController.deleteEvent);

router.post('/category/admin', categoryController.createCategory);


export default router;