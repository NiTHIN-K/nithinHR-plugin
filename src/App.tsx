import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [formData, setFormData] = useState({ field1: '', field2: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the formData state
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);

    // Send the updated form data to the Chrome extension
    window.postMessage(
      {
        type: "FROM_PAGE",
        payload: { action: 'saveFormData', data: newFormData }
      },
      "*"
    );
  };

  const saveData = () => {
    window.postMessage(
      {
        type: "FROM_PAGE",
        payload: { action: 'saveFormData', data: formData }
      },
      "*"
    );
  };

  useEffect(() => {
    // Listen for messages from the content script
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "FROM_EXTENSION") {
        const { data } = event.data.payload;
        console.log("Received from extension:", data);
      }
    };

    window.addEventListener("message", handleMessage);

    // Request initial data
    window.postMessage(
      { type: "FROM_PAGE", payload: { action: 'getFormData' } },
      "*"
    );

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div>
      <h1>nithinHR Form Plugin</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>
            Field 1:
            <input
              type="text"
              name="field1"
              value={formData.field1}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Field 2:
            <input
              type="text"
              name="field2"
              value={formData.field2}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="button" onClick={saveData}>Save Data</button>
      </form>
    </div>
  );
};

export default App;