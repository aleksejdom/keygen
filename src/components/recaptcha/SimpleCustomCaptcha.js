import React, { useState } from 'react';

const SimpleCustomCaptcha = () => {
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState('');

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaAnswer(num1 + num2);
    return `${num1} + ${num2}`;
  };

  const [captchaQuestion, setCaptchaQuestion] = useState(generateCaptcha());

  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = () => {
    if (parseInt(userAnswer) === captchaAnswer) {
      console.log('Form submitted successfully');
    } else {
      console.log('Incorrect captcha answer, please try again');
    }
  };

  const refreshCaptcha = () => {
    setCaptchaQuestion(generateCaptcha());
    setUserAnswer('');
  };

  return (
    <div>
      <h1>Bitte sagen Sie uns die Lösung:</h1>
      <div>
        <span>{captchaQuestion}</span>
        <button onClick={refreshCaptcha}>Refresh</button>
      </div>
      <input type="text" value={userAnswer} onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SimpleCustomCaptcha;