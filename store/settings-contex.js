import { createContext, useState } from "react";

export const SettingsContext = createContext({
  key1: "",
  value1: "",
  key2: "",
  value2: "",
  key3: "",
  value3: "",
  setKey1: () => {},
  setValue1: () => {},
  setKey2: () => {},
  setValue2: () => {},
  setKey3: () => {},
  setValue3: () => {},
});


function SettingsContentProvider({ children }) {
    const [key1State, setKey1State] = useState();
    const [value1State, setValue1State] = useState();
    const [key2State, setKey2State] = useState(10);
    const [value2State, setValue2State] = useState();
    const [key3State, setKey3State] = useState();
    const [value3State, setValue3State] = useState();

    function setK1(key1p) {
        setKey1State(key1p);
    }
    
    function setV1(val1p) {
        setValue1State(val1p);
    }

    function setK2(key2p) {
        setKey2State(key2p);
    }

    function setV2(val2p) {
        setValue2State(val2p);
    }
    
    function setK3(key3p) {
        setKey3State(key3p);
    }

    function setV3(val3p) {
        setValue3State(val3p);
    }

    const valueObj = {
        key1: key1State,
        value1: value1State,
        key2: key2State,
        value2: value2State,
        key3: key3State,
        value3: value3State,
        setKey1: setK1,
        setValue1: setV1,
        setKey2: setK2,
        setValue2: setV2,
        setKey3: setK3,
        setValue3: setV3,
      };

    return <SettingsContext.Provider value={valueObj}>{children}</SettingsContext.Provider>;
  }
  
  export default SettingsContentProvider;