import React, { useState, useEffect } from 'react';

function SimpleCustomCaptcha({ setCaptchaAnswer }) {
  const [captchaQuestion, setCaptchaQuestion] = useState('');

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const number1 = Math.floor(Math.random() * 10);
    const number2 = Math.floor(Math.random() * 10);
    const newCaptchaQuestion = `${number1} + ${number2}`;
    setCaptchaQuestion(newCaptchaQuestion);
  }

  const onAnswerChange = (event) => {
    const answer = event.target.value;
    setCaptchaAnswer(answer);
  }

  return (
    <div className="simple-custom-captcha">
      <div className="captcha-question">
        {captchaQuestion}
      </div>
      <input
        type="text"
        className="captcha-answer"
        placeholder="Geben Sie Ihre Antwort ein"
        onChange={onAnswerChange}
      />
    </div>
  );
}

export default SimpleCustomCaptcha;