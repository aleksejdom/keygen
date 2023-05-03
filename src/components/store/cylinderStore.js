import React, { createContext, useReducer } from 'react';

const initialState = {
  cylinders: [],
  nextKey: 1,
  schluesselnummer: 1,
  checkboxKeyCount: 1,
};

const CylinderContext = createContext(initialState);

const cylinderReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CYLINDER': {
      const nextKey = state.nextKey + 1;
      const cylinders = [
        ...state.cylinders,
        { id: state.nextKey, ...action.payload },
      ];
      return { ...state, cylinders, nextKey };
    }
    case 'REMOVE_CYLINDER': {
      const cylinders = state.cylinders.filter(
        (cylinder) => cylinder.id !== action.payload
      );
      return { ...state, cylinders };
    }
    case 'UPDATE_CYLINDER': {
      const cylinders = state.cylinders.map((cylinder) =>
        cylinder.id === action.payload.id ? action.payload : cylinder
      );
      return { ...state, cylinders };
    }
    case 'ADD_KEY': {
      return {
        ...state,
        schluesselnummer: state.schluesselnummer + 1,
        checkboxKeyCount: state.checkboxKeyCount + 1,
      };
    }
    case 'REMOVE_KEY': {
      const schluesselnummer = Math.max(0, state.schluesselnummer - 1);
      const checkboxKeyCount = Math.max(0, state.checkboxKeyCount - 1);
      return { ...state, schluesselnummer, checkboxKeyCount };
    }
    default:
      return state;
  }
};

const CylinderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cylinderReducer, initialState);

  return (
    <CylinderContext.Provider value={{ state, dispatch }}>
      {children}
    </CylinderContext.Provider>
  );
};

export { CylinderContext, CylinderProvider };