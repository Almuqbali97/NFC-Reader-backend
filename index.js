const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');  // Use uuid to generate unique IDs

const app = express();
const port = 5000;

const allowedOrigins = ['https://astonishing-dolphin-daa5ea.netlify.app', 'http://localhost:5173'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); app.use(express.json());

// Mock Data
let employees = [
    { id: '1', name: 'John Doe', image: 'https://via.placeholder.com/150', uniqueID: '123456' },
    { id: '2', name: 'Jane Smith', image: 'https://via.placeholder.com/150', uniqueID: '654321' }
];

let companies = [
    { id: '1', name: 'Company A', benefits: '10% off on all services' },
    { id: '2', name: 'Company B', benefits: '20% off on selected items' }
];

// API Endpoints

// Get all employees
app.get('/', (req, res) => {
    res.json("hello From Api");
});
app.get('/api/employees', (req, res) => {
    res.json(employees);
});

// Get employee by unique ID (NFC scan simulation)
app.get('/api/employee/:uniqueID', (req, res) => {
    const { uniqueID } = req.params;
    const employee = employees.find(emp => emp.uniqueID === uniqueID);
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
});

// Add a new employee
app.post('/api/employee', (req, res) => {
    const { name, image } = req.body;
    const newEmployee = {
        id: uuidv4(), // Generate a unique ID
        name,
        image,
        uniqueID: uuidv4().slice(0, 6) // Generate a 6-character uniqueID
    };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

// Get all companies
app.get('/api/companies', (req, res) => {
    res.json(companies);
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
