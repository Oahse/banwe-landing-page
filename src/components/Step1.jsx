import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function Step1({ onNext }) {
  const [index, setIndex] = useState(0);
  const words = ["Quality", "Organic", "Natural",];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length); // Loop through words
    }, 2000); // 4 seconds pause + 1 second transition

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [words.length]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
      className="text-center"
    >
      <h1 className="step-header">
        Home to 
        <span className="vertical-text-wrapper mx-2">
          <span
            className="vertical-text"
            style={{
              transform: `translateY(-${index * 1.22}em)`,
              transition: "transform 1s ease-in-out", // Smooth transition
            }}
          >
            {words.map((word, i) => (
              <div key={i} className="word">
                {word}
              </div>
            ))}
          </span>
        </span>
       African Products
      </h1>

      <p>The biggest platform for international trade of handpicked, Purely Organic African Products.</p>
      <div className="text-center" >
      <Form.Control
        type="email"
        size="md"
        placeholder="Input your Email"
        required
        className="mb-3"
        // style={{width: "506px"}}
      />
      </div>
      
      <Button as="input" type="submit" value="Start here" />
    </Form>
  );
}
