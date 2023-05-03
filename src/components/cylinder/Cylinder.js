import React, { useContext, useState  } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import './cylinder.css';
import Checkboxkey from '../checkboxkey/Checkboxkey';
import CheckboxKeyContext from '../CheckboxKeyContext';
import { cylinderTypes } from './data';


function Cylinder({ nextKey, onRemove }) {
  const { checkboxKeyCount, increaseCheckboxKeyCount } = useContext(CheckboxKeyContext);

  const renderCheckboxkeys = () => {
    const elements = [];
    for (let i = 0; i < checkboxKeyCount; i++) {
      elements.push(<Checkboxkey key={i} schluesselnummer={i+1}/>);
    }
    return elements;
  };

  const [cylinderType, setCylinderType] = useState(cylinderTypes[0].value);

  const [validationMessageAussen, setValidationMessageAussen] = useState('');
  const [validationMessageInnen, setValidationMessageInnen] = useState('');

  const handleCylinderTypeChange = (event) => {
    setCylinderType(event.target.value);
  };

  const validateNumberAussen = (event) => {
    const number = parseInt(event.target.value, 10);

    if (number < 25 || number > 80 || event.target.value == '') {
      setValidationMessageAussen('Bitte geben Sie eine Zahl zwischen 25 und 80 ein.');
    } else {
      setValidationMessageAussen('');
    }

    if(event.target.value) {
      event.target.classList.remove('error');
    }
  };

  const validateNumberInnen = (event) => {
    const number = parseInt(event.target.value, 10);

    if (number < 25 || number > 80 || event.target.value == '') {
      setValidationMessageInnen('Bitte geben Sie eine Zahl zwischen 25 und 80 ein.');
    } else {
      setValidationMessageInnen('');
    }
    if(event.target.value) {
      event.target.classList.remove('error');
    }
  };

  const handleRemove = () => {
    onRemove(nextKey);
  };

  return (
    <tr id={`cylinder-${nextKey}`}> 
      
      <td>{nextKey}</td>

      <td>
        <Form.Control
          className="door-descr"
          defaultValue={`Tür-${nextKey}`}
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          data-field="order_title"
        />
      </td>

      <td>
        <Form.Select 
          aria-label="Default select example"
          value={cylinderType}
          onChange={handleCylinderTypeChange}
          data-field="zylinder_typ"
        >
          {cylinderTypes.map((type) => (
            <option key={type.value} value={type.label}>
              {type.label}
            </option>
          ))}
        </Form.Select>
      </td>
      
      <td className="min-max">
      {cylinderType !== "Vorhangschloss" && cylinderType !== "Briefkastenzylinder" && cylinderType !== "Außenzylinder" && (
        <span id="cyl-min">
          <FloatingLabel controlId="floatingInput" label="außen" className="mb-3">
            <Form.Control
              type="number" 
              className="aussen-number"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              data-field="zyl_laenge_aussen"
              onChange={validateNumberAussen}
            />
            {validationMessageAussen && <div className="validation-message">{validationMessageAussen}</div>}
          </FloatingLabel>
        </span>
        )}
        {cylinderType !== "Halbzylinder" && cylinderType !== "Vorhangschloss" && cylinderType !== "Briefkastenzylinder" && cylinderType !== "Außenzylinder" && (
          <span id="cyl-max">
            <FloatingLabel controlId="floatingInput2" label="innen" className="mb-3">
              <Form.Control
                type="number" 
                className="innen-number"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                data-field="zyl_laenge_innen"
                onChange={validateNumberInnen} 
              />
              {validationMessageInnen && <div className="validation-message">{validationMessageInnen}</div>}
            </FloatingLabel>
          </span>
        )}
      </td>
     

      <td>
        <Form.Control
          type="number"
          placeholder="1"
          defaultValue={1}
          className="cylinder-count"
          data-field="zylinder_anzahl"
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
        />
      </td>

       {renderCheckboxkeys()}

      <td className="option-buttons">
        <Button 
          variant="danger" 
          id="remove-cylinder"
          onClick={handleRemove}
        ><FontAwesomeIcon icon={faTrashCan} className='mr-2'/>Cylinder löschen</Button>
      </td>

    </tr>
  );
}

export default Cylinder;