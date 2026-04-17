import express from 'express';
const PORT = 5000;
const app = express();

app.use(express.json());

const technicians = [
    {id: 1, name: "Alice", skill: 'plumber', hourlyRate: 50},
    {id: 2, name: "Bob", skill: 'HVAC', hourlyRate: 40},
    {id: 3, name: "Peter", skill: 'Electrician', hourlyRate: 60}
]

app.get('/technicians', (req, res) => {
    res.status(200).json({
        success: true,
        count: technicians.length,
        data: technicians
    });
});

app.get('/technicians/:id', (req, res) => {
    const tech = technicians.find(t => t.id === parseInt(req.params.id));

    if(!tech){
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    res.status(201).json({
        success: true,
        data: tech
    });
});

app.listen(PORT, () => { console.log(`Server is running in http://localhost:${PORT}`)});