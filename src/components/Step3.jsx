import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { getNames } from "country-list";

export default function Step3({ onNext, onBack }) {
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const countries = getNames(); // List of all countries

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOrigin) {
      onNext({origin_country:selectedOrigin});
    } else {
      alert("Please select your country of origin.");
    }
  };
  

  return (
    <Form onSubmit={handleSubmit} className="text-center">
      <Row>
        <Col sm={12} className="text-start mb-3">
          <Button
            type="button"
            onClick={onBack}
            className="rounded-5"
            variant="outline-light"
          >
            <i className="bi bi-arrow-90deg-left"></i>
          </Button>
        </Col>

        <Col sm={12} className="mb-3">
          <h4 className="step-header">What is your Country of Origin (Nationality)?</h4>

          <Form.Select
            value={selectedOrigin}
            onChange={(e) => setSelectedOrigin(e.target.value)}
            required
          >
            <option value="">-- Select your country of origin --</option>
            {countries.map((country, i) => (
              <option key={i} value={country}>
                {country}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col sm={12}>
          <Button
            as="input"
            type="submit"
            value="Continue"
            className="tf-btn radius-3 btn-fill animate-hover-btn justify-content-center"
          />
        </Col>
      </Row>
    </Form>
  );
}
