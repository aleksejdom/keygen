import React, { useState, useEffect, useMemo } from 'react';
import './cylinders.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faTrashCan, faKey, faLock } from '@fortawesome/free-solid-svg-icons';
  
import Cylinder from '../cylinder/Cylinder';
import Keys from '../keys/Keys';
import CheckboxKeyContext from '../CheckboxKeyContext';
import Person from '../person/Person';
import logo from './SD_Logo.png';
import SimpleCustomCaptcha from '../recaptcha/SimpleCustomCaptcha';

function Cylinders() {
  const [cylinders, setCylinders] = useState([]);
  const [nextKey, setNextKey] = useState(1);
  const [schluesselnummer, setSchluesselnummer] = useState(1);
  const [checkboxKeyCount, setCheckboxKeyCount] = useState(1);
  const [visibility, setVisibility] = useState(true); 

  useEffect(() => {
    const newCylinders = [
      <Cylinder
        key={nextKey}
        nextKey={nextKey}
        onRemove={handleRemoveCylinder} 
      />,
    ];
    setCylinders(newCylinders);
    setNextKey(nextKey + 1);
  }, []);

  const checkVisibility = () => {
    setVisibility(false);
  }
  const handleAddCylinder = () => {
    const newCylinders = [
      ...cylinders,
      <Cylinder
        key={nextKey}
        nextKey={nextKey}
        onRemove={handleRemoveCylinder} 
      />,
    ];
    setCylinders(newCylinders);
    setNextKey(nextKey + 1);
  };

  const handleRemoveCylinder = (cylinderId) => {
    setCylinders((prevCylinders) =>
      prevCylinders.filter((cylinder) => cylinder.key !== cylinderId.toString())
    );
  };

  const handleAddKeys = () => {
    setSchluesselnummer(schluesselnummer + 1);
    setCheckboxKeyCount(checkboxKeyCount + 1); 
  };
  
  const handleRemoveKeys = () => {
    if (schluesselnummer > 0 && checkboxKeyCount > 0) {
      setSchluesselnummer(schluesselnummer - 1);
      setCheckboxKeyCount(checkboxKeyCount - 1); 
    } else {
      console.log('Die Anzahl der Schlüssel kann nicht unter 0 gehen.');
    }
  };
   

  const sendResponse = () => {
    const currentDate = new Date().toISOString();
    const personInfo = {};
    Array.from(document.querySelectorAll('.person-data [data-field]')).forEach(input => {
      const field = input.getAttribute('data-field');
      personInfo[field] = input.value;
    });
     
    const extractKeyData = () => {
      const keyData = {};

      for (let i = 1; i <= schluesselnummer; i++) {
        const keyCountField = `key_count-${i}`;
        /* const keyNameField = `key_name-${i}`; */
        const keyCountElement = document.querySelector(`[data-field="key_count"][name="key-${i}"]`);
        /* const keyNameElement = document.querySelector(`[data-field="key_name"][name="key-${i}"]`); */

        if (keyCountElement) {
          keyData[keyCountField] = keyCountElement.value;
          /* keyData[keyNameField] = keyNameElement.value; */
        }
      }

      return keyData;
    };

    const cylindersData = cylinders.map((cylinder, index) => {  
      const cylinderElement = document.getElementById(`cylinder-${index + 1}`); 
      if (!cylinderElement) return null; 
      const cylinderData = {}; 

      Array.from(cylinderElement.querySelectorAll('[data-field]')).forEach(input => {
        const field = input.getAttribute('data-field');
        if (input.type === 'checkbox') {
          cylinderData[field] = input.checked;
        } else {
          cylinderData[field] = input.value;
        }
      });
  
      // Extrahieren Sie die Checkbox-Felder aus der Checkboxkey-Komponente
      for (let i = 1; i <= checkboxKeyCount; i++) {
        const checkboxKeyField = `checkboxKey-${i}`;
        const checkboxKeyElement = cylinderElement.querySelector(`[data-field="${checkboxKeyField}"]`);
  
        if (checkboxKeyElement) {
          cylinderData[checkboxKeyField] = checkboxKeyElement.checked;
        }
      } 
 
      return cylinderData;
    }).filter(cylinder => cylinder !== null);
   
    const keyData = extractKeyData();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cylinders: cylindersData, 
        person: personInfo, 
        keys: keyData, 
        date: currentDate
      }),
    };
  
    fetch('https://formspree.io/f/xnqywvny', requestOptions)
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));
  };
 
  const validateFields = () => {
    const requiredFields = document.querySelectorAll('[data-field]');
    let allFieldsValid = true;
  
    requiredFields.forEach((field) => {
      if (!field.value || field.value == 'Bestellung oder Anfrage?') {
        field.classList.add('error');
        allFieldsValid = false;
      } else {
        field.classList.remove('error');
      }
    });
  
    if (allFieldsValid && requiredFields.length > 7) {
      sendResponse();
      checkVisibility();
    } else {
      console.error('Bitte füllen Sie alle erforderlichen Felder aus.');
    }
  };

    
  const value = useMemo(() => ({ checkboxKeyCount, increaseCheckboxKeyCount: handleAddKeys }), [checkboxKeyCount]);

  return (
    <CheckboxKeyContext.Provider value={value}>
      <div className="cylinders-block">
        <div className='header-app'>
          <h1 className="headline">{visibility ? 'Schließanlagen Konfigurator' : 'Vielen Dank, Anfrage wurde verschickt!'}</h1>
          <div className='company'>
            <a href="https://schluessel.discount/" target='_blank'><img src={logo} alt="Schluesseldiscount"/></a>
          </div>
        </div>
        {visibility && 
        <Person />
        }
        {visibility && 
        <Table striped bordered hover responsive>
          <thead>
            <tr className="table-header">
              <th>Pos</th>
              <th>Türbezeichnung</th>
              <th>Zylindertyp</th>
              <th>Zylinderlänge in mm</th>
              <th>Stück</th> 
              {[...Array(schluesselnummer)].map((_, index) => (
                <th className="schluessel" key={`schluessel-${index + 1}`}>
                  <Keys key={index + 1} schluesselnummer={index + 1} />
                </th>
              ))}
              <th>Options</th>
            </tr>
          </thead>
          <tbody>{cylinders}</tbody>
          <tfoot>
            <tr>
              <td colSpan={5 + schluesselnummer}>
                <div className="options">
                  <div className='opt-1'>

                  <Button
                    variant="primary"
                    id="add-cylinder"
                    onClick={handleAddCylinder}
                    ><FontAwesomeIcon icon={faLock} className='mr-2'/>
                    Cylinder hinzufügen
                  </Button>
                  <Button
                    variant="secondary"
                    id="add-key"
                    onClick={handleAddKeys}
                    ><FontAwesomeIcon icon={faKey} className='mr-2'/>
                    Schlüssel hinzufügen
                  </Button>
                  <Button
                    variant="danger"
                    id="remove-key"
                    onClick={handleRemoveKeys}
                    ><FontAwesomeIcon icon={faTrashCan} className='mr-2'/>
                    Schlüssel löschen
                  </Button> 
                  
                  </div>
                  <div className='opt-2'>

                  <Button
                    variant="success"
                    id="send-response"
                    onClick={validateFields}
                    ><FontAwesomeIcon icon={faGear} className="mr-2"/>
                    Konfiguration Absenden
                  </Button>
                    {visibility && (
                     <SimpleCustomCaptcha />
                    )}
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </Table>
        }
      </div> 
    </CheckboxKeyContext.Provider>
  );
}

export default Cylinders;