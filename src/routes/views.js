import { Router } from "express";


const router = Router();

//Para renderizar la plantilla se devuelve mediante el metodo render
router.get('/', (req, res) => {
    res.render('index', {})
})

export default router