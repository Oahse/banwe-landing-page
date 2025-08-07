import React, { useState } from "react";
import { Form, Button, Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";

export default function Step3({ onNext, onBack }) {
  const ageGroups = [
    "Under 18",
    "18_24",
    "25_34",
    "35_44",
    "45_54",
    "55_above",
  ];
  const [selected, setSelected] = useState(""); // Single value

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) {
      alert("Please select your age group.");
      return;
    }
    onNext({age_group:selected}); // or pass selected with onSubmit(selected)
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
          <h4 className="step-header">Select your Age Group</h4>

          {ageGroups.map((group, idx) => (
            <ButtonGroup key={idx} className="mb-2 me-2">
              <ToggleButton
                id={`toggle-${idx}`}
                type="radio"
                variant={selected === group ? "dark" : "outline-secondary"}
                name="ageGroup"
                value={group}
                checked={selected === group}
                onChange={(e) => setSelected(e.currentTarget.value)}
              >
                {group}
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
