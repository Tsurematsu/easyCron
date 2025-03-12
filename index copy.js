import dotenv from 'dotenv';
import express, { json } from 'express';
import Lib from './Lib.js';
dotenv.config();
const { USERNAME, PASSWORD } = process.env;
const app = express();
const port = 3000;
app.use(json());
const authMiddleware = (req, res, next) => {
    const { usuario, contrasena } = req.body;
    if (usuario === USERNAME && contrasena === PASSWORD) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};
app.post('/create', authMiddleware, async (req, res) => {
    // Lógica para crear un recurso
    const result = await Lib.create(req.body.time, req.body.name);
    res.json({ result, message: 'Recurso creado' });
});

app.put('/update', authMiddleware, async (req, res) => {
    // Lógica para actualizar un recurso
    const result = await Lib.update(req.body.time, req.body.index);
    res.json({ result, message: 'Recurso actualizado' });
});

app.delete('/delete', authMiddleware, async (req, res) => {
    // Lógica para eliminar un recurso
    try {
        const result = await Lib.delete(req.body.index);
        res.json({ result, message: 'Recurso eliminado' });
    } catch (error) {
        res.json({ message: 'No se pudo eliminar el recurso' });
    }
});

app.delete('/delete_id', authMiddleware, async (req, res) => {
    // Lógica para eliminar un recurso
    try {
        const result = await Lib.delete_id(req.body.id);
        res.json({ result, message: 'Recurso eliminado' });
    } catch (error) {
        res.json({ message: 'No se pudo eliminar el recurso' });
    }
});

app.post('/list', authMiddleware, async (req, res) => {
    // Lógica para listar recursos
    const result = await Lib.list();
    res.json({ result, message: 'Recursos listados' });
});

app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
});