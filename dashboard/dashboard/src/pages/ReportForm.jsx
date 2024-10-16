import React, { useState, useRef } from 'react';
import './CSS/ReportForm.css';

const ReportForm = () => {
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    testName: '',
    testId: '',
    sampleDate: '',
  });

  const [testResult, setTestResult] = useState({
    result: '',
    units: '',
    referenceRange: '',
  });

  const [errors, setErrors] = useState({});
  const reportIframeRef = useRef(null);

  const handlePatientInfoChange = (e) => {
    setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value });
  };

  const handleTestResultChange = (e) => {
    setTestResult({ ...testResult, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    const { name, testName, testId, sampleDate } = patientInfo;
    const { result, units, referenceRange } = testResult;

    if (!name) errors.name = 'Patient name is required';
    if (!testName) errors.testName = 'Test name is required';
    if (!testId) errors.testId = 'Test ID is required';
    if (!sampleDate) errors.sampleDate = 'Sample date is required';
    if (!result) errors.result = 'Result is required';
    if (!units) errors.units = 'Units are required';
    if (!referenceRange) errors.referenceRange = 'Reference range is required';

    return errors;
  };

  const handlePrint = () => {
    const errors = validateForm();
    setErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      const reportHTML = `
        <html>
          <head>
            <title>Report</title>
            <style>
              body {
                font-family: Arial, sans-serif;
              }
              table {
                border-collapse: collapse;
                width: 100%;
                margin-bottom: 40px;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f2f2f2;
              }
              .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                border-bottom: 2px solid #ddd;
                padding-bottom: 10px;
              }
              .header h1 {
                margin: 0;
                flex-grow: 1;
                text-align: center;
                font-size: 24px;
                font-weight: bold;
              }
              .header .software-name {
                flex-basis: 150px;
                text-align: left;
                font-size: 24px;
                font-weight: bold;
              }
              .header .spacer {
                flex-basis: 150px;
              }
              .footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 50px;
              }
              .signature {
                display: flex;
                justify-content: flex-end;
                align-items: center;
              }
              .signature div {
                text-align: center;
              }
              .signature-line {
                margin-top: 50px;
                border-top: 1px solid #000;
                width: 200px;
                text-align: center;
                margin-right: 20px;
              }
              .status {
                font-size: 18px;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="software-name">LabCloud</div>
              <h1>Patient Report</h1>
              <div class="spacer"></div>
            </div>
            <table>
              <tr>
                <th colspan="2">Patient Information</th>
              </tr>
              <tr>
                <td>Patient Name</td>
                <td>${patientInfo.name}</td>
              </tr>
              <tr>
                <td>Test Name</td>
                <td>${patientInfo.testName}</td>
              </tr>
              <tr>
                <td>Test ID</td>
                <td>${patientInfo.testId}</td>
              </tr>
              <tr>
                <td>Sample Date</td>
                <td>${patientInfo.sampleDate}</td>
              </tr>
              <tr>
                <th colspan="2">Test Results</th>
              </tr>
              <tr>
                <td>Result</td>
                <td>${testResult.result}</td>
              </tr>
              <tr>
                <td>Units</td>
                <td>${testResult.units}</td>
              </tr>
              <tr>
                <td>Reference Range</td>
                <td>${testResult.referenceRange}</td>
              </tr>
            </table>
            <div class="footer">
              <div class="status">Status: Final Report</div>
              <div class="signature">
                <div>
                  <div class="signature-line"></div>
                  <div>Pathologist's Signature</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;
  
      const reportWindow = window.open('', '_blank');
      reportWindow.document.open();
      reportWindow.document.write(reportHTML);
      reportWindow.document.close();
      reportWindow.print();
    }
  };
  
  

  return (
    <div>
      <form className='main-form'>
        <h2>Report</h2>
        <div className="mb-3">
          <label htmlFor="patientName" className="form-label">Patient Name:</label>
          <input
            type="text"
            id="patientName"
            className="form-control"
            placeholder="Enter patient name"
            name="name"
            value={patientInfo.name}
            onChange={handlePatientInfoChange}
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="testName" className="form-label">Test Name:</label>
          <input
            type="text"
            id="testName"
            className="form-control"
            placeholder="Enter test name"
            name="testName"
            value={patientInfo.testName}
            onChange={handlePatientInfoChange}
          />
          {errors.testName && <div className="error">{errors.testName}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="testId" className="form-label">Test ID:</label>
          <input
            type="text"
            id="testId"
            className="form-control"
            placeholder="Enter test ID"
            name="testId"
            value={patientInfo.testId}
            onChange={handlePatientInfoChange}
          />
          {errors.testId && <div className="error">{errors.testId}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="sampleDate" className="form-label">Sample Date:</label>
          <input
            type="date"
            id="sampleDate"
            className="form-control"
            name="sampleDate"
            value={patientInfo.sampleDate}
            onChange={handlePatientInfoChange}
          />
          {errors.sampleDate && <div className="error">{errors.sampleDate}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="result" className="form-label">Result:</label>
          <input
            type="text"
            id="result"
            className="form-control"
            placeholder="Enter result"
            name="result"
            value={testResult.result}
            onChange={handleTestResultChange}
          />
          {errors.result && <div className="error">{errors.result}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="units" className="form-label">Units:</label>
          <input
            type="text"
            id="units"
            className="form-control"
            placeholder="Enter units"
            name="units"
            value={testResult.units}
            onChange={handleTestResultChange}
          />
          {errors.units && <div className="error">{errors.units}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="referenceRange" className="form-label">Reference Range:</label>
          <input
            type="text"
            id="referenceRange"
            className="form-control"
            placeholder="Enter reference range"
            name="referenceRange"
            value={testResult.referenceRange}
            onChange={handleTestResultChange}
          />
          {errors.referenceRange && <div className="error">{errors.referenceRange}</div>}
        </div>
        <button type="button" className="btn btn-primary" onClick={handlePrint}>
          Print
        </button>
      </form>
      <iframe ref={reportIframeRef} style={{ display: 'none' }} />
    </div>
  );
};

export default ReportForm;
