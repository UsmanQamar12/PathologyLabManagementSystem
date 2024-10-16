import React, { useState } from 'react';
import './CSS/Addtest.css';

const Addtest = () => {
  const [testName, setTestName] = useState('');
  const [description, setDescription] = useState('');
  const [testPrice, setTestPrice] = useState('');
  const [fasting, setFasting] = useState('');
  const [testType, setTestType] = useState('');
  const [normalRange, setNormalRange] = useState('');
  const [abnormalRange, setAbnormalRange] = useState('');
  const [enumerableValues, setEnumerableValues] = useState([]);
  const [enumerableInput, setEnumerableInput] = useState('');
  const [result, setResult] = useState('');

  const handleTestTypeChange = (e) => {
    setTestType(e.target.value);
    if (e.target.value !== '3') {
      setEnumerableValues([]); // Clear enumerable values if not Enumerable type
    }
  };

  const handleAddValue = () => {
    if (enumerableInput.trim() !== '') {
      setEnumerableValues([...enumerableValues, enumerableInput.trim()]);
      setEnumerableInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    let formData = {
      name: testName,
      price: testPrice,
      fasting: fasting,
      testType: testType,
    };
  
    if (testType === '1') {
      formData.result = result;
    } else if (testType === '2') {
      formData.description = description;
    } else if (testType === '3') {
      formData.enumerableValues = enumerableValues.join(', '); // Convert array to string
    } else if (testType === '4') {
      formData.normalRange = normalRange;
      formData.abnormalRange = abnormalRange;
    }
  
    // Debugging log
    console.log('Submitting formData:', formData);
  
    // Send form data to the backend API for storing in the database
    fetch('http://localhost:5000/api/tests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        alert('Test submitted successfully!');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the test.');
      });
  
    // Reset form fields after submission
    setTestName('');
    setDescription('');
    setTestPrice('');
    setFasting('');
    setTestType('');
    setNormalRange('');
    setAbnormalRange('');
    setEnumerableValues([]);
    setEnumerableInput('');
    setResult('');
  };
  
  
  const renderTestFields = () => {
    switch (testType) {
      case '1':
        return (
          <div className="mb-3">
            <label htmlFor="result" className="form-label">Result:</label>
            <select className="form-select" id="result" name="result" value={result} onChange={(e) => setResult(e.target.value)}>
              <option value="">Select Result</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
            </select>
          </div>
        );
      case '2':
        return (
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea className="form-control" id="description" name="description" rows="3" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
        );
      case '3':
        return renderEnumerableInputs();
      case '4':
        return (
          <>
            <div className="mb-3">
              <label htmlFor="normalRange" className="form-label">Normal Range:</label>
              <input type="text" className="form-control" id="normalRange" name="normalRange" placeholder="Enter Normal Range" value={normalRange} onChange={(e) => setNormalRange(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="abnormalRange" className="form-label">Abnormal Range:</label>
              <input type="text" className="form-control" id="abnormalRange" name="abnormalRange" placeholder="Enter Abnormal Range" value={abnormalRange} onChange={(e) => setAbnormalRange(e.target.value)} />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const renderEnumerableInputs = () => (
    <>
      {enumerableValues.map((value, index) => (
        <div key={index} className="mb-3 enumerable">
          <label htmlFor={`enumerableValue${index}`} className="form-label">Value {index + 1}:</label>
          <input type="text" className="form-control" id={`enumerableValue${index}`} value={value} readOnly />
        </div>
      ))}
      <div className="mb-3 input-group">
        <input type="text" className="form-control" value={enumerableInput} onChange={(e) => setEnumerableInput(e.target.value)} />
        <button type="button" className="btn btn-primary" onClick={handleAddValue}>Add</button>
      </div>
    </>
  );

  return (
    <div className="form-body">
      <div className="login-form">
        <h2 className="text-center mb-1">Add Test</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="testName" className="form-label">Test Name:</label>
            <input type="text" className="form-control" id="testName" name="testName" placeholder="Enter Test Name" value={testName} onChange={(e) => setTestName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="testPrice" className="form-label">Test Price:</label>
            <input type="text" className="form-control" id="testPrice" name="testPrice" placeholder="Enter Test Price" value={testPrice} onChange={(e) => setTestPrice(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="fasting" className="form-label">Fasting:</label>
            <input type="text" className="form-control" id="fasting" name="fasting" placeholder="Enter Fasting Instructions" value={fasting} onChange={(e) => setFasting(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="testType" className="form-label">Result Type:</label>
            <select className="form-select" id="testType" name="testType" value={testType} onChange={handleTestTypeChange}>
              <option disabled value="">Select Result Type</option>
              <option value="1">Positive/Negative</option>
              <option value="2">Descriptive</option>
              <option value="3">Enumerable</option>
              <option value="4">Quantitative</option>
            </select>
          </div>
          {renderTestFields()}
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Addtest;
