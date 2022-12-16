import { useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";

const AUTH_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3Nfa2V5IjoiNjM5MTY1NTQxOTVhZDE0YmRjZDZmMGNlIiwicm9vbV9pZCI6IjYzOTE3NDEyYWVlNTQ2MjVkYTY1Mzg3ZiIsInVzZXJfaWQiOiIxMjM0Iiwicm9sZSI6Imhvc3QiLCJqdGkiOiJjOGZiOTNkMS1mZGYzLTQxYTYtOTQwZi03NDQ2ODQ2N2MxYmEiLCJ0eXBlIjoiYXBwIiwidmVyc2lvbiI6MiwiZXhwIjoxNjcxMjEwMzYwfQ.bfs5YWrQu30TZB5nBI-C62aBgNH-v8prpq4CX8lG21E";

function JoinForm() {
  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState({
    name: "",
    role: "",
  });

  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await hmsActions.join({
      userName: inputValues.name,
      authToken: AUTH_TOKEN,
    });
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
      <button className="btn-primary">Join</button>
    </form>
  );
}

export default JoinForm;
