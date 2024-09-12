// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const dbURI = 'mongodb+srv://nithin:Nithinisco22@cluster0.kdfcg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Mongoose Schema
const emailSchema = new mongoose.Schema({
  email: String,
});

const Email = mongoose.model('Email', emailSchema);

// API Routes

// Get all emails
app.get('/api/emails', async (req, res) => {
  try {
    const emails = await Email.find();
    res.json(emails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new email
app.post('/api/emails', async (req, res) => {
  const { email } = req.body;
  const newEmail = new Email({ email });

  try {
    const savedEmail = await newEmail.save();
    res.status(201).json(savedEmail);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an email
app.delete('/api/emails/:id', async (req, res) => {
  try {
    await Email.findByIdAndDelete(req.params.id);
    res.json({ message: 'Email deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an email
app.put('/api/emails/:id', async (req, res) => {
  const { email } = req.body;

  try {
    const updatedEmail = await Email.findByIdAndUpdate(
      req.params.id,
      { email },
      { new: true }
    );
    res.json(updatedEmail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
