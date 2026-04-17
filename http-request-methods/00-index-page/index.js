import express from 'express';

const app = express();

const PORT = 5000;

app.use(express.json());

app.get('/api/hello-world', (req, res) => {
    // res.status(200).send('<h1>Hello</h1>');
    res.status(201).json({
        status: true,
        message: "Backend established",
        timestamp: new Date().toISOString(),
        data: {
            version: '1.0.0',
            author: 'Distributed system designer'
        }
    });
});

app.listen(PORT, () => {
    console.log(`Backend is running in http://localhost:${PORT}`);
});