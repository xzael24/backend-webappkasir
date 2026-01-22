import express from 'express';
import {
    getUas1,
    getUas2,
    getUas3,
    getUas4,
    getUas5,
    getUas6,
    getUas7,
    getUas8,
    getUas9,
    getUas10
} from '../controllers/uasController.js';

const router = express.Router();

router.get('/1', getUas1);
router.get('/2', getUas2);
router.get('/3', getUas3);
router.get('/4', getUas4);
router.get('/5', getUas5);
router.get('/6', getUas6);
router.get('/7', getUas7);
router.get('/8', getUas8);
router.get('/9', getUas9);
router.get('/10', getUas10);

export default router;
