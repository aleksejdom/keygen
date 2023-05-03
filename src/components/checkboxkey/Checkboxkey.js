import React, { useContext  } from 'react';
import Form from 'react-bootstrap/Form';  



function Checkboxkey(schluesselnummer) { 

  return ( 
    <td className="keys">
      <Form.Check
        type="checkbox" 
        label="Schlüssel für dieses Zylinder?"
        data-field={`key-${schluesselnummer.schluesselnummer}`}
        name={`key-${schluesselnummer.schluesselnummer}`}
      />
    </td>  
  );
}

export default Checkboxkey;