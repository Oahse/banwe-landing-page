import { useState } from "react";
import Header from "../components/Header";
import CoverVideo from "../assets/cover-video.mp4";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import AccessStep from "../components/AccessStep";
import FinalStep from "../components/FinalStep";

import { Row, Col, Container } from "react-bootstrap";

function LandingPage() {
  const steps = [Step1, Step2, Step3, FinalStep];

  const [step, setStep] = useState(0);
  const CurrentStep = steps[step];

  const [currentComponent, setCurrentComponent] = useState("Home"); // Track the current component

  const submitForm = () => {
    console.log("Form submitted");
    nextStep();
  };

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const onBack = () => {
    setCurrentComponent("Home"); // Go back to the previous component
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case "AccessStep":
        return <AccessStep onBack={onBack} setCurrentComponent={setCurrentComponent} />;
      case "FinalStep":
        return <FinalStep />;
      case "Home":
      default:
        return (
          <CurrentStep
            onNext={nextStep}
            onBack={prevStep}
            onSubmit={submitForm}
          />
        );
    }
  };

  return (
    <div>
      <div className="cover-video-wrapper">
        <video autoPlay loop muted className="cover-video">
          <source src={CoverVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay" />
        <div>
          {/* Pass setCurrentComponent to Header */}
          <Header setCurrentComponent={setCurrentComponent} />
          <Container>
            <Row>
              <Col className="form-wrapper">
                {/* Render the current component */}
                {renderComponent()}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;