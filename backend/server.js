const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const cron= require('node-cron');
const sendEmail = require('./middleware/mailer');
const Task = require('./models/Task');
const cors = require('cors');
require('dotenv').config();

// Passport configuration
require('./config/passport');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

// Middlewaregi
app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );//imp
  app.use(bodyParser.json());
  
  app.use(express.urlencoded({extended : false})) 
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, 
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
app.get('/', (req, res) => {
    res.send('Welcome to the Task Manager API');
}); 

cron.schedule('0 * * * *', async () => {
    try {
        // Find tasks that are due within the next 24 hours and are not completed
        const upcomingTasks = await Task.find({
            deadline: {
                $gte: new Date(), // greater than or equal to now
                $lte: new Date(Date.now() + 24 * 60 * 60 * 1000) // less than or equal to 24 hours from now
            },
            status: { $ne: 'Completed' } // Assuming a task isn't completed
        }).populate('userId'); // Populate the user info from User model

        upcomingTasks.forEach(task => {
            sendEmail(
                task.userId.email, // Assuming user has an email field
                'Task Deadline Approaching',
                `Your task "${task.title}" is due soon. Please complete it by the deadline.`,
                `<h3>Your task "${task.title}" is due soon.</h3><p>Please complete it by the deadline.</p>`
            );
        });
    } catch (error) {
        console.error('Error sending deadline emails:', error);
    }
});



const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB', err));
