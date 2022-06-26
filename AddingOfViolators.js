import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddingOfViolators.css";
const element = document.querySelector("#post-request-set-headers .article-id");
const AddingOfViolators = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    tctNumber: "",
    address: "",
    violation: "",
    licenseNumber: "",
    vehicleType: "",
    violationPlace: "",
    itemConfiscated: "",
    enforcerAttending: "",
    paymentNeedToPay: "",
  });
  const [ordinances, setordinances] = useState([]);
  const [formcomplete, setformcomplete] = useState(false);
  const [vPrice, setVprice] = useState([
    {
      result: "",
    },
  ]);
  const getOrdinances = async () => {
    const result = await axios.get("ordinances");
    setordinances(result.data);
  };
  useEffect(() => {
    try {
      getOrdinances();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateForm = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
      paymentNeedToPay: handlerViolations(data.violation),
    });
    setformcomplete(true);
  };
  const handlerViolations = (input) => {
    if (ordinances.length == 0) {
      alert("Array Ordinance is Empty");
    } else {
      setVprice({
        result: ordinances.find((data) => data.violationId == input),
      });
      if (!vPrice.result == "") {
        console.log(vPrice.result.violationPrice);
        return vPrice.result.violationPrice;
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/newItem", data)
      .then((response) => (element.innerHTML = response.data.id))
      .catch((error) => {
        element.parentElement.innerHTML = `Error: ${error.message}`;
        console.error("There was an error!", error);
      });
    alert("Item Added");
    clearForm();
  };

  const clearForm = () => {
    document.getElementById("myForm").reset();
    setData({
      firstName: "",
      lastName: "",
      tctNumber: "",
      address: "",
      violation: "",
      licenseNumber: "",
      vehicleType: "",
      violationPlace: "",
      itemConfiscated: "",
      paymentNeedToPay: "",
      enforcerAttending: "",
    });
  };

  return (
    <div className="add--container">
      <div className="input--container">
        <form className="form" onSubmit={handleSubmit} id="myForm">
          <table className="tbl--violator">
            <thead>
              <tr>
                <td>Adding Records</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  First Name:
                  <input
                    required
                    type="text"
                    name={"firstName"}
                    value={data.firstName}
                    placeholder={"First Name"}
                    onChange={updateForm}
                  />
                </td>
                <td>
                  Last Name:
                  <input
                    required
                    type="text"
                    name={"lastName"}
                    value={data.lastName}
                    onChange={updateForm}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  TCT Number:
                  <input
                    required
                    type="number"
                    name={"tctNumber"}
                    value={data.tctNumber}
                    onChange={updateForm}
                  />
                </td>
                <td>
                  Address:
                  <input
                    required
                    type="text"
                    name={"address"}
                    value={data.address}
                    onChange={updateForm}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  Violation:
                  <input
                    required
                    type="text"
                    name={"violation"}
                    value={data.violation}
                    onChange={updateForm}
                  />
                </td>

                <td>
                  License Number:
                  <input
                    required
                    type="number"
                    name={"licenseNumber"}
                    value={data.licenseNumber}
                    onChange={updateForm}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  Vehicle Type:
                  <input
                    required
                    type="text"
                    name={"vehicleType"}
                    value={data.vehicleType}
                    onChange={updateForm}
                  />
                </td>

                <td>
                  Violation Place:
                  <input
                    required
                    type="text"
                    name={"violationPlace"}
                    value={data.violationPlace}
                    onChange={updateForm}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  Item Confiscated:{" "}
                  <input
                    required
                    type="text"
                    name={"itemConfiscated"}
                    value={data.itemConfiscated}
                    onChange={updateForm}
                  />
                </td>
                <td>
                  Attending Enforcer:
                  <input
                    required
                    type="text"
                    name={"enforcerAttending"}
                    value={data.enforcerAttending}
                    onChange={updateForm}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input
                    type="submit"
                    className={formcomplete ? "" : "hidebtn"}
                    name={"btnAdd"}
                    value="Save"
                    disabled={formcomplete ? false : true}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default AddingOfViolators;
// firstName: String,
// lastName: String,
// tctNumber: Number,
// address: String,
// violation: String,
// licenseNumber: Number,
// vehicleType: String,
// violationPlace: String,
// enforcerAttending: String
