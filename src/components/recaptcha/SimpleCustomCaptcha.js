import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import './SimpleCustomCaptcha.css';

function SimpleCustomCaptcha({ setCaptchaAnswer, isValid }) {
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [inputStyle, setInputStyle] = useState({});

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const number1 = Math.floor(Math.random() * 10);
    const number2 = Math.floor(Math.random() * 10);
    const newCaptchaQuestion = `${number1} + ${number2}`;
    setCaptchaQuestion(newCaptchaQuestion);
    setCorrectAnswer(number1 + number2);
  }

  const onAnswerChange = (event) => {
    const answer = event.target.value;
    if (parseInt(answer) === correctAnswer) {
      setInputStyle({});
      event.target.classList.remove('error')
      setCaptchaAnswer(answer);
      isValid(true);
    }  
    else {
      setInputStyle({ border: '2px solid red' });
      isValid(false);
    }
  }

  return (
    <Form.Group className="mb-3 simple-custom-captcha" controlId="captchaSimple">
        <Form.Label>{captchaQuestion}</Form.Label>
        <Form.Control type="number" placeholder="Geben Sie Ihre Antwort ein"
        onChange={onAnswerChange} style={inputStyle} /> 
      </Form.Group>

  );
}

export default SimpleCustomCaptcha;