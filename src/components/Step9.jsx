import React, { useState } from "react";
import { Form, Button, Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";

export default function StepChallenges({ onNext, onBack }) {
  const challenges = [
    "Lack of authenticity (ojoro)",
    "Cost and logistics",
    "Stress and time",
  ];

  const [selected, setSelected] = useState([]);
  const [otherText, setOtherText] = useState("");

  const handleToggle = (value) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected.length === 0 && otherText.trim() === "") {
      alert("Please select at least one challenge or specify another.");
      return;
    }
    // Combine selected with otherText if needed
    const allAnswers = [...selected];
    if (otherText.trim()) allAnswers.push(`Other: ${otherText.trim()}`);

    console.log("Challenges selected:", allAnswers);
    onNext(); // or pass allAnswers
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

        <Col sm={12} className="mb-4">
          <p className="step-header">
            What are the biggest challenges you face when trying to source African cultural products?
          </p>

          {challenges.map((challenge, idx) => (
            <ButtonGroup key={idx} className="mb-2 me-2">
              <ToggleButton
                id={`challenge-${idx}`}
                type="checkbox"
                variant={selected.includes(challenge) ? "dark" : "outline-secondary"}
                checked={selected.includes(challenge)}
                value={challenge}
                onChange={() => handleToggle(challenge)}
              >
                {challenge}
              </ToggleButton>
            </ButtonGroup>
          ))}

          <Form.Group className="mt-3">
            <Form.Label>Other (please specify):</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your answer here"
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
            />
          </Form.Group>
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
