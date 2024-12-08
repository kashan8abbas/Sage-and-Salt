const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const menuItem = require('./Routes/menuRoutes');
const path = require('path');

const cors = require('cors'); // Require cors

const app = express(); // Initialize app

app.use(cors()); // Use cors middleware
app.use(bodyParser.json());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://kashan_abbas:assignment312345@mernapp.1grlr.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

    
      
      app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes

const authRoutes = require('./Routes/Auth');
const orderRoutes = require('./Routes/OrderRoute');
const reservationRoutes = require('./Routes/ReservationRoute');
const feedbackRoutes = require('./Routes/FeedbackRoute');
const profileRoutes = require('./Routes/ProfileRoute');
const contactRoutes = require('./Routes/ContactRoute'); 
const locationRoutes = require("./Routes/LocationRoute");


app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api', profileRoutes);
app.use('/api', contactRoutes);
app.use('/api/menu', menuItem);
app.use("/api", locationRoutes);



// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
