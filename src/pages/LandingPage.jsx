import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

import Header from "../components/Header";
import CoverVideo from "../assets/cover-video.mp4";

import Intro from "../components/Intro";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Step4 from "../components/Step4";
import Step5 from "../components/Step5";
import Step6 from "../components/Step6";
import Step7 from "../components/Step7";
import Step8 from "../components/Step8";
import Step9 from "../components/Step9";

import AccessStep from "../components/AccessStep";
import FinalStep from "../components/FinalStep";

function LandingPage() {
  const steps = [Intro, Step1, Step2, Step3, Step4, Step5,Step6, Step7,Step8, Step9, FinalStep];
  const [step, setStep] = useState(0);
  const [currentComponent, setCurrentComponent] = useState("Home");

  const location = useLocation();
  const navigate = useNavigate();

  const CurrentStep = steps[step] || FinalStep;

  // Check for special routing into AccessStep
  useEffect(() => {
    if (location.state?.showAccessStep) {
      setCurrentComponent("AccessStep");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // Navigation Handlers
  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
    if (step === steps.length - 1){
      setStep(0);
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const submitForm = () => {
    console.log("Form submitted");
    nextStep();
  };

  const onBack = () => {
    setCurrentComponent("Home");
  };

  // Conditional Rendering
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
    <div className="cover-video-wrapper">
      <video autoPlay loop muted className="cover-video">
        <source src={CoverVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay" />

      <Header setCurrentComponent={setCurrentComponent} />

      <Container>
        <Row>
          <Col className="form-wrapper">{renderComponent()}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;
