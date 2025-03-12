import express, { json } from 'express';

const app = express();
const port = 3000;

app.use(json());

const authMiddleware = (req, res, next) => {
    const { usuario, contrasena } = req.body;
    if (usuario === 'adminTemporal' && contrasena === 'passwordTemporal') {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

app.post('/create', authMiddleware, (req, res) => {
    // Lógica para crear un recurso
    res.send('Recurso creado');
});

app.put('/update', authMiddleware, (req, res) => {
    // Lógica para actualizar un recurso
    res.send('Recurso actualizado');
});

app.delete('/delete', authMiddleware, (req, res) => {
    // Lógica para eliminar un recurso
    res.send('Recurso eliminado');
});

app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
});