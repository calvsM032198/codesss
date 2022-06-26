import React, { useState } from "react";

const UpdateData = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    tctNumber: "",
    address: "",
    violation: "",
    licenseNumber: "",
    vehicleType: "",
    violationPlace: "",
    enforcerAttending: "",
  });

  const updateForm = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="update--container">
      <form className="update--form">
        <table>
          <thead>
            <tr>
              <td>Update Records:</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                First Name:
                <input type="text" required onChange={updateForm} />
              </td>
              <td>
                Last Name:
                <input type="text" required onChange={updateForm} />
              </td>
            </tr>
            <tr>
              <td>
                TCT Number:
                <input type="Number" required onChange={updateForm} />
              </td>
              <td>
                Addresss:
                <input type="text" required onChange={updateForm} />
              </td>
            </tr>
            <tr>
              <td>
                Violationsss:
                <input type="text" onChange={updateForm} disabled />
              </td>
              <td>
                Lisence Number:
                <input type="Number" required onChange={updateForm} />
              </td>
            </tr>
            <tr>
              <td>
                Vehicle Type:
                <input type="text" required onChange={updateForm} />
              </td>
              <td>
                Violation Place:
                <input type="text" required onChange={updateForm} />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                Attending Officer:
                <input type="text" required onChange={updateForm} />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <input type="submit" required value="Save" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default UpdateData;
