import { createContext } from 'react';

const CheckboxKeyContext = createContext({
  checkboxKeyCount: 1, 
  increaseCheckboxKeyCount: () => {},
});

export default CheckboxKeyContext;