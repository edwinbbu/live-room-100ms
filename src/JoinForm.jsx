import { useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import { generateAuthToken } from "./service/authToken";

const ROLES = {
  HOST: "host",
  GUEST: "guest",
};

function JoinForm() {
  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState({
    name: "",
    role: ROLES.HOST,
  });

  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await generateAuthToken({ role: inputValues.role });
      console.log("authToken", data.token);
      await hmsActions.join({
        userName: inputValues.name,
        authToken: data.token,
      });
    } catch (err) {
      console.error("Failed to join room", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Join Room</h2>
      <div className="input-container">
        <input
          required
          value={inputValues.name}
          onChange={handleInputChange}
          id="name"
          type="text"
          name="name"
          placeholder="Your name"
        />
      </div>
      <div className="input-container">
        <select
          required
          value={inputValues.role}
          onChange={handleInputChange}
          id="role"
          type="text"
          name="role"
        >
          <option value="host">HOST</option>
          <option value="guest">GUEST</option>
        </select>
      </div>
      <button className="btn-primary">Join</button>
    </form>
  );
}

export default JoinForm;
