import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [statusCode, setStatusCode] = useState("");
  const [resp, setResp] = useState("");
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    let requestUrl =
      email === ""
        ? "https://gorest.co.in/public-api/users/1"
        : "https://gorest.co.in/public-api/users/" + email;
    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer 88d52bbcb1d08c8abc4749b31118796c1f44c633b20b9ba4c4bfb18e01d1b3f0",
      },
    };
    fetch(requestUrl, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        let requestStatus = jsonData.code;
        let httpResponse = JSON.stringify(jsonData);
        setStatusCode(requestStatus);
        setResp(httpResponse);
        console.log(requestStatus, httpResponse);
      });
  }, [showData]);

  const onChangeInput = (e) => {
    setEmail(e.target.value);
  };

  const onClickButton = () => {
    setShowData(!showData);
  };

  return (
    <div className="p-3 bg-container">
      <h1 className="heading mb-4">Delete method practice</h1>
      <p className="request-url-text">
        REQUEST URL :{" "}
        <span className="request-url">
          https://gorest.co.in/public-api/users
        </span>
      </p>
      <input
        id="userInput"
        placeholder="Enter id"
        className="user-input p-1"
        onChange={onChangeInput}
        value={email}
      />
      <br />
      <button
        id="sendDeleteRequestBtn"
        className="mt-3 mb-3 p-2 button"
        onClick={onClickButton}
      >
        Send Delete Request
      </button>
      <div className="request-status-container p-2 mt-4">
        <p className="para1">Request Status</p>
        <p id="requestStatus" className="request-status">
          {showData && statusCode}
        </p>
      </div>
      <div className="response-body-container p-2 mt-4">
        <p className="para1">Response Body</p>
        <p id="httpResponse" className="http-response">
          {showData && resp}
        </p>
      </div>
    </div>
  );
}

export default App;