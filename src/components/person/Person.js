import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import './person.css';


export default function Person() {
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [topicError, setTopicError] = useState('');


  const validateName = (event) => {
    setNameValid(event.target.value.trim() !== '');
  };
  const validateEmptys = (event) => {
    if(event.target.value) {
      event.target.classList.remove('error');
    }
  }

  const validateEmail = (event) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailValid(emailRegex.test(event.target.value));
  };

  const validatePhone = (event) => {
    const phoneRegex = /^[0-9]{7,}$/;
    setPhoneValid(phoneRegex.test(event.target.value));
  };

  const validateTopic = () => {
    const topicField = document.querySelector('[data-field="topic"]');
    const selectedValue = topicField.value;
  
    if (selectedValue === 'anfrage' || selectedValue === 'bestellung') {
      topicField.classList.remove('error');
      setTopicError('');
      return true;
    } else {
      setTopicError('Bitte wählen Sie eine Option aus.');
      return false;
    }
  };

  return (
   
    <div className="person-data">
      <h6>Bitte geben Sie Ihre Kontaktdaten an:</h6>
      <FloatingLabel controlId="floatingInputName" label="Vor,- und Nachname" className="mb-3">
        <Form.Control
          size="sm"
          type="text" 
          className={`name ${nameValid ? '' : 'is-invalid'}`}
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          data-field="person_name"
          onBlur={validateName}
          onChange={validateEmptys}
          required
        />
        {!nameValid && <div className="invalid-feedback">Bitte geben Sie Ihren Vor- und Nachnamen ein.</div>}
      </FloatingLabel>

      <FloatingLabel controlId="floatingInputEmail" label="E-Mail-Adresse" className="mb-3">
        <Form.Control
          size="sm"
          type="email" 
          aria-label="email"
          aria-describedby="basic-addon2"
          data-field="person_email"
          className={`email ${emailValid ? '' : 'is-invalid'}`}
          onBlur={validateEmail}
          onChange={validateEmptys}
          required
        />
        {!emailValid && <div className="invalid-feedback">Bitte geben Sie eine gültige E-Mail-Adresse ein.</div>}
      </FloatingLabel>

      <FloatingLabel controlId="floatingInputTelephone" label="Telefonnummer" className="mb-3">
        <Form.Control
          size="sm"
          type="number" 
          aria-label="number"
          aria-describedby="basic-addon2"
          data-field="person_phone"
          className={`number ${phoneValid ? '' : 'is-invalid'}`}
          onBlur={validatePhone}
          onChange={validateEmptys}
          required
        />
        {!phoneValid && <div className="invalid-feedback">Bitte geben Sie eine gültige Telefonnummer ein.</div>}
      </FloatingLabel>

      <Form.Select onChange={validateTopic} aria-label="Default select example" data-field="topic" className={topicError ? 'error' : ''}>
        <option>Bestellung oder Anfrage?</option>
        <option value="anfrage">Anfrage</option>
        <option value="bestellung">Bestellung</option> 
      </Form.Select>
      {topicError && <div className="error-message">{topicError}</div>}


    </div>
  );
}