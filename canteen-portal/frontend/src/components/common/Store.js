import React,{useState} from "react";

const initialState = {
    email: "haha",
    password: ""
};

export const Context = React.createContext(initialState);

const Store = ({children}) => {
    const  [state, setState] = useState(initialState);

    return (
        <Context.Provider value={{state, setState}}>
            {children}
        </Context.Provider>
    );
    };
    export default Store;

