const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Test = require('./models/testModels');
const Patient = require('./models/patientModels');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://UsmanQamar:usman321@cluster0.0wujqrp.mongodb.net/pathology', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define routes for tests
app.get('/testname/:name', async (req, res) => {
  const testName = req.params.name;

  try {
    const test = await Test.findOne({ name: testName });
    if (!test) {
      return res.status(404).json({ error: `Test ${testName} not found` });
    }
    res.json(test);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/tests', async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new test
app.post('/api/tests', async (req, res) => {
  try {
    const { name, description, price, fasting, normalRange, abnormalRange, testType, result, value, enumerableValues } = req.body;
    const newTest = new Test({
      name,
      description,
      price,
      fasting,
      normalRange,
      abnormalRange,
      testType,
      result,
      value,
      enumerableValues,
    });
    await newTest.save();
    res.status(201).json({ message: 'Test added successfully', test: newTest });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
// Fetch test info by testId
app.get('/api/tests/:testId', async (req, res) => {
  try {
    const test = await Test.findOne({ testId: req.params.testId });
    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }
    res.json(test);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch test information' });
  }
});

// Define routes for patients
app.post('/api/patients', async (req, res) => {
  const { name, phone, address, age, gender, date, tests } = req.body;

  try {
    const newPatient = new Patient({ name, phone, address, age, gender, date, tests });
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find().populate('tests');
    res.json(patients);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('tests');
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/patients/:id', async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(updatedPatient);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/patients/:id', async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
