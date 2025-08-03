import React, { useState } from "react";
import { Form, Button, Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";

export default function Step6({ onNext, onBack }) {
  const frequencyOptions = [
    "Weekly",
    "Monthly",
    "Occasionally",
    "Rarely",
    "Daily",
  ];

  const [selected, setSelected] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(); // Or send selected value up if needed
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
          <small> Optional </small>
          <h2 className="step-header">
            If yes, How often do you try to source such products?
          </h2>
          
          {frequencyOptions.map((option, idx) => (
            <ButtonGroup key={idx} className="mb-2 me-2">
              <ToggleButton
                id={`toggle-${idx}`}
                type="radio"
                name="frequency"
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
