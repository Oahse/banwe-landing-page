import React, { useState } from "react";
import { Form, Button, Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";

export default function Step5({ onNext, onBack }) {
  const options = [
    "Very connected",
    "Somewhat connected",
    "Not very connected",
    "Not connected at all",
  ];

  const [selected, setSelected] = useState(""); // Single selection

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) {
      alert("Please select your level of connection.");
      return;
    }
    onNext({how_connected:selected}); // or pass selected via onSubmit(selected)
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
          <h4 className="step-header">How connected are you to your African culture?</h4>

          {options.map((option, idx) => (
            <ButtonGroup key={idx} className="mb-2 me-2">
              <ToggleButton
                id={`toggle-${idx}`}
                type="radio"
                name="connectionLevel"
                value={option}
                checked={selected === option}
                variant={selected === option ? "dark" : "outline-secondary"}
                onChange={(e) => setSelected(e.currentTarget.value)}
              >
                {option}
              </ToggleButton>
            </ButtonGroup>
          ))}
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
