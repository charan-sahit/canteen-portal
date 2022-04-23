import { useState, useEffect , useContext} from "react";
import {Context} from "./Store";


const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  //const [state, setState] = useContext(Context);

  useEffect(() => {
    setName("Dass TAs");
  }, []);

  return <div style={{ textAlign: "center" }}>Happy Coding <br/> {localStorage.getItem("email")}- {name}</div>;
};

export default Home;
