import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [phones, setPhones] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/phones");
        setPhones(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const handlePhoneSelect = (phone) => {
    setSelectedPhone(phone);
  };

  return (
    <div className="App">
      {loading && <div>Loading...</div>}
      {!loading && (
        <div className="phone-list">
          <h2>Phone List</h2>
          <ul>
            {phones.map((phone) => (
              <li key={phone.id} onClick={() => handlePhoneSelect(phone)}>
                {phone.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedPhone && (
        <div className="phone-details">
          <h2 className="details-heading">Phone Details</h2>
          <div className="detail-row">
            <strong className="detail-label">Name:</strong> {selectedPhone.name}
          </div>
          <div className="detail-row">
            <strong className="detail-label">Manufacturer:</strong>{" "}
            {selectedPhone.manufacturer}
          </div>
          <div className="detail-row">
            <strong className="detail-label">Description:</strong>{" "}
            {selectedPhone.description}
          </div>
          <div className="detail-row">
            <strong className="detail-label">Price:</strong> $
            {selectedPhone.price}
          </div>
          <div className="detail-row">
            <strong className="detail-label">Image:</strong>{" "}
            <img
              src={`/images/${selectedPhone.imageFileName}`}
              alt="Phone"
              className="phone-image"
            />
          </div>
          <div className="detail-row">
            <strong className="detail-label">Processor:</strong>{" "}
            {selectedPhone.processor}
          </div>
          <div className="detail-row">
            <strong className="detail-label">Screen:</strong>{" "}
            {selectedPhone.screen}
          </div>
          <div className="detail-row">
            <strong className="detail-label">RAM:</strong> {selectedPhone.ram}{" "}
            GB
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
