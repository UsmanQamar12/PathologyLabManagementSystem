import React, { useState, useEffect } from "react";
import "./CSS/Newpatient.css";

const Newpatient = () => {
  const [selectedTestName, setSelectedTestName] = useState("");
  const [tests, setTests] = useState([]);
  const [patient, setPatient] = useState({
    name: "",
    phone: "",
    address: "",
    age: "",
    gender: "",
    date: "",
  });
  const [errors, setErrors] = useState({});
  const [testData, setTestData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tests");
        const data = await response.json();
        setTestData(data);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTestName) {
      const filtered = testData.filter((test) =>
        test.name.toLowerCase().startsWith(selectedTestName.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [selectedTestName, testData]);

  useEffect(() => {
    const total = tests.reduce((acc, curr) => acc + curr.price, 0).toFixed(2);
    setTotalAmount(total);
  }, [tests]);

  const handleTestNameChange = (e) => {
    setSelectedTestName(e.target.value);
  };

  const handleTestSelection = (testName) => {
    setSelectedTestName(testName);
    setFilteredData([]);
  };

  const addTestToBilling = () => {
    if (selectedTestName.trim() !== "") {
      const selectedTest = testData.find(
        (test) => test.name === selectedTestName
      );
      if (selectedTest) {
        // Check if the test is already in the list
        const isTestAlreadyAdded = tests.some(
          (test) => test.name === selectedTestName
        );
        if (!isTestAlreadyAdded) {
          setTests((prevTests) => [
            ...prevTests,
            { ...selectedTest, originalPrice: selectedTest.price, editedPrice: selectedTest.price },
          ]);
        } else {
          alert("This test is already added to the billing system.");
        }
      }
      setSelectedTestName("");
    }
  };

  const removeTest = (index) => {
    const updatedTests = [...tests];
    updatedTests.splice(index, 1);
    setTests(updatedTests);
  };

  const applyDiscount = (index) => {
    const updatedTests = [...tests];
    if (updatedTests[index]) {
      updatedTests[index].editedPrice = updatedTests[index].originalPrice * 0.9; // Apply 10% discount
      setTests(updatedTests);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handlePriceChange = (index, newPrice) => {
    const updatedTests = [...tests];
    updatedTests[index].editedPrice = parseFloat(newPrice);
    setTests(updatedTests);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!patient.name) newErrors.name = 'Name is required';
    if (!patient.phone) newErrors.phone = 'Phone is required';
    if (!patient.address) newErrors.address = 'Address is required';
    if (!patient.age) newErrors.age = 'Age is required';
    if (!patient.gender) newErrors.gender = 'Gender is required';
    if (!patient.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submittedData = { ...patient, tests, totalAmount: totalDiscountedAmount };
      console.log('Submitted Patient Data:', submittedData);
      try {
        const response = await fetch('http://localhost:5000/api/patients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submittedData),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Show the alert message
        alert("Patient form is submitted.");
        // Clear form data
        setPatient({
          name: '',
          phone: '',
          address: '',
          age: '',
          gender: '',
          date: '',
        });
        setTests([]);
        setErrors({});
        setSelectedTestName("");
        setFilteredData([]);
      } catch (error) {
        console.error('Error submitting patient data:', error);
      }
    }
  };

  const handleClear = () => {
    setPatient({
      name: '',
      phone: '',
      address: '',
      age: '',
      gender: '',
      date: '',
    });
    setTests([]);
    setErrors({});
    setTotalAmount(0);
    setSelectedTestName("");
    setFilteredData([]);
  };

  const totalAmountBeforeDiscount = tests.reduce((acc, curr) => acc + curr.originalPrice, 0).toFixed(2);
  const totalDiscountedAmount = tests.reduce((acc, curr) => acc + curr.editedPrice, 0).toFixed(2);

  return (
    <>
      <div>
        <div>
          <h2 className="heading">Pathology lab management System</h2>
        </div>
        <div className="mb-3 test-name">
          <label htmlFor="testName" className="form-label"></label>
          <input
            id="testName"
            className="form-control"
            value={selectedTestName}
            onChange={handleTestNameChange}
            placeholder="Enter Test Name..."
            list="testSuggestions"
          />
          <datalist id="testSuggestions">
            {filteredData.map((test, index) => (
              <option key={index} value={test.name} />
            ))}
          </datalist>
          <button
            type="button"
            className="btn btn-primary"
            onClick={addTestToBilling}
          >
            Add Test
          </button>
        </div>
      </div>
      {/* Billing Section */}
      <div className="billing-section">
        <div className="mt-5">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Test Name</th>
                <th scope="col">Original Price</th>
                <th scope="col">Edited Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test, index) => (
                <tr key={index}>
                  <td>{test.name}</td>
                  <td>{test.originalPrice.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      value={test.editedPrice}
                      onChange={(e) => handlePriceChange(index, e.target.value)}
                      step="0.01"
                    />
                  </td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-danger"
                        onClick={() => removeTest(index)}
                      >
                        Remove
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => applyDiscount(index)}
                      >
                        Discount
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td className="text-end"><b>Total:</b> {totalAmountBeforeDiscount}</td>
                <td className="text-end"><b>Total:</b> {totalDiscountedAmount}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Form */}
      <div className='Patient-Form'>
        <form onSubmit={handleSubmit}>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Name"
                    name="name"
                    value={patient.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <small className="text-danger">{errors.name}</small>}
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Your Phone"
                    name="phone"
                    value={patient.phone}
                    onChange={handleInputChange}
                  />
                  {errors.phone && <small className="text-danger">{errors.phone}</small>}
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Address"
                    name="address"
                    value={patient.address}
                    onChange={handleInputChange}
                  />
                  {errors.address && <small className="text-danger">{errors.address}</small>}
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Your Age"
                    name="age"
                    value={patient.age}
                    onChange={handleInputChange}
                  />
                  {errors.age && <small className="text-danger">{errors.age}</small>}
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <select className="form-control" id="inlineFormCustomSelect" name="gender" value={patient.gender} onChange={handleInputChange}>
                    <option value="">Select your Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && <small className="text-danger">{errors.gender}</small>}
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter Date"
                    name="date"
                    value={patient.date}
                    onChange={handleInputChange}
                  />
                  {errors.date && <small className="text-danger">{errors.date}</small>}
                </td>
              </tr>
              <tr>
                <td>
                  <p><strong>Total:</strong> {totalDiscountedAmount}</p>
                </td>
              </tr>
              <tr>
                <td className="submit-cell" colSpan="2">
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <button type="button" className="btn btn-primary" onClick={handleClear}>Clear</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
};

export default Newpatient;
