import { useState, useEffect } from "react";
import { useHMSActions } from "@100mslive/react-sdk";

const TOKEN_ENDPOINT =
  "https://prod-in2.100ms.live/hmsapi/betterworld.app.100ms.live/api/token";

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json();
}

function JoinForm() {
  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState({
    name: "",
    token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3Nfa2V5IjoiNjM5MTY1NTQxOTVhZDE0YmRjZDZmMGNlIiwicm9vbV9pZCI6IjYzOTE3NDEyYWVlNTQ2MjVkYTY1Mzg3ZiIsInVzZXJfaWQiOiIxMjM0Iiwicm9sZSI6Imhvc3QiLCJqdGkiOiJjOGZiOTNkMS1mZGYzLTQxYTYtOTQwZi03NDQ2ODQ2N2MxYmEiLCJ0eXBlIjoiYXBwIiwidmVyc2lvbiI6MiwiZXhwIjoxNjcxMjEwMzYwfQ.bfs5YWrQu30TZB5nBI-C62aBgNH-v8prpq4CX8lG21E",
  });

  const getAuthToken = async () => {
    const data = await postData(TOKEN_ENDPOINT, {
      room_id: "63917412aee54625da65387f",
      role: "host",
      user_id: "1234",
    });
    console.log(data);
  };

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
      authToken: inputValues.token,
    });
  };

  useEffect(() => {
    // getAuthToken();
  }, []);

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
        <input
          required
          value={inputValues.token}
          onChange={handleInputChange}
          id="token"
          type="text"
          name="token"
          placeholder="Auth token"
        />
      </div>
      <button className="btn-primary">Join</button>
    </form>
  );
}

export default JoinForm;
