import express from 'express';
import controller from '../controllers/games';
const router = express.Router();

router.post('/games', controller.getGames);

export = router;