import React from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


function Keys({ schluesselnummer }) {
  return (
    <>
      <p>{`Schlüssel-${schluesselnummer}`}</p>
      <FloatingLabel controlId="floatingInputBezeichnung" label="Schl.Bezeich." className="key-data mb-3">
        <Form.Control
          className="key-name"
          aria-label="Small"
          placeholder="Bezeichnung"
          defaultValue={`Schlüssel-${schluesselnummer}`}
          aria-describedby="inputGroup-sizing-sm"
          data-field="key_name"
          name={`key-${schluesselnummer}`}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInputAnzahl" label="Anzahl" className="key-data mb-3">
          <Form.Control
            type="number"
            placeholder="1"
            defaultValue={1}
            className="key-number"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            name={`key-${schluesselnummer}`}
            data-field="key_count"
          />
        </FloatingLabel> 
    </>
  );
}

export default Keys;