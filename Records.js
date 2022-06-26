import React, { useEffect, useState } from "react";
import "./Records.css";
import axios from "axios";
import * as iconsMd from "react-icons/md";
import * as iconsAi from "react-icons/ai";

const Records = () => {
  const [data, setData] = useState([]);
  const [btnUpdateClicked, setBtnUpdateClicked] = useState(false);
  const [dataUpdate, setDataUpdated] = useState(false);
  const [dUpdate, setDupdate] = useState({
    _id: "",
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
  const updateForm = (e) => {
    setDupdate({
      ...dUpdate,
      [e.target.name]: e.target.value,
    });
  };
  const updatePayments = (e) => {
    setDupdate({
      ...dUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const UpdateData = (data) => {
    return (
      <div className="update--container">
        <form className="update--form" onSubmit={() => submitHandler(data._id)}>
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
                  <input
                    type="text"
                    required
                    value={data.firstName}
                    name={"firstName"}
                    onChange={updateForm}
                  />
                </td>
                <td>
                  Last Name:
                  <input
                    type="text"
                    required
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
                    type="Number"
                    required
                    name={"tctNumber"}
                    value={data.tctNumber}
                    onChange={updateForm}
                  />
                </td>
                <td>
                  Addresss:
                  <input
                    type="text"
                    required
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
                    type="text"
                    required
                    name={"violation"}
                    value={data.violation}
                    onChange={updatePayments}
                    disabled
                  />
                </td>
                <td>
                  Lisence Number:
                  <input
                    type="Number"
                    required
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
                    type="text"
                    required
                    name={"vehicleType"}
                    value={data.vehicleType}
                    onChange={updateForm}
                  />
                </td>
                <td>
                  Violation Place:
                  <input
                    type="text"
                    value={data.violationPlace}
                    required
                    name={"violationPlace"}
                    onChange={updateForm}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  Item Confiscated:
                  <input
                    type="text"
                    required
                    name={"itemConfiscated"}
                    value={data.itemConfiscated}
                    onChange={updateForm}
                  />
                </td>
                <td>
                  Attending Officer:
                  <input
                    type="text"
                    required
                    name={"enforcerAttending"}
                    value={data.enforcerAttending}
                    onChange={updateForm}
                  />
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

  const submitHandler = (id) => {
    setBtnUpdateClicked(!btnUpdateClicked);
    axios.put("/put/" + id, dUpdate);
    alert("data updated");
    setDataUpdated(() => !dataUpdate);
  };
  useEffect(() => {
    axios
      .get("/data")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
    return () => {
      setData([]);
    };
  }, [dataUpdate]);

  const handleDelete = (id) => {
    axios.delete("/delete/" + id);
    // alert("Item Deleted");
    setDataUpdated(() => !dataUpdate);
  };
  const handleUpdate = (
    id,
    fname,
    lname,
    tnum,
    add,
    vltn,
    lnum,
    vtype,
    vplc,
    item,
    officer
  ) => {
    setBtnUpdateClicked(!btnUpdateClicked);
    setDupdate({
      ...dUpdate,
      _id: id,
      firstName: fname,
      lastName: lname,
      tctNumber: tnum,
      address: add,
      violation: vltn,
      licenseNumber: lnum,
      vehicleType: vtype,
      violationPlace: vplc,
      itemConfiscated: item,
      enforcerAttending: officer,
    });
  };

  const renderData = () => {
    return data.map((data, index) => {
      return (
        <tr className="trcells" key={index}>
          <td>{data.paymentStatus}</td>
          <td>{data.paymentNeedToPay}</td>
          <td>{data.firstName}</td>
          <td>{data.lastName}</td>
          <td>{data.tctNumber}</td>
          <td>{data.address}</td>
          <td>{data.violation}</td>
          <td>{data.licenseNumber}</td>
          <td>{data.vehicleType}</td>
          <td>{data.violationPlace}</td>
          <td>{data.itemConfiscated}</td>
          <td>{data.enforcerAttending}</td>
          <td>{data.created_at}</td>
          <td className="btntable">
            <button
              className="btnDelete"
              onClick={() => handleDelete(data._id)}
            >
              {" "}
              Delete
              <iconsMd.MdDelete />
            </button>
            <button
              className="btnUpdate"
              onClick={() =>
                handleUpdate(
                  data._id,
                  data.firstName,
                  data.lastName,
                  data.tctNumber,
                  data.address,
                  data.violation,
                  data.licenseNumber,
                  data.vehicleType,
                  data.violationPlace,
                  data.itemConfiscated,
                  data.enforcerAttending
                )
              }
            >
              Update <iconsAi.AiOutlineEdit />
            </button>
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="records--container">
      {btnUpdateClicked ? UpdateData(dUpdate) : ""}
      <div
        className={!btnUpdateClicked ? "records--header" : "fetchrecordhide"}
      >
        <h2>
          <iconsMd.MdChromeReaderMode /> All Records{" "}
        </h2>
      </div>
      <div className={!btnUpdateClicked ? "fetchrecord" : "fetchrecordhide"}>
        <table className="tblrecords">
          <thead>
            <tr className="trfields">
              <td>Payment Status </td>
              <td>Payment</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>TCT Number</td>
              <td>Address</td>
              <td>Violations</td>
              <td>License Number</td>
              <td>Vehicle Type </td>
              <td>Violation Place</td>
              <td>Item Confiscated </td>
              <td>Attending Officer</td>
              <td>Date</td>
              <td>Del/Edit</td>
            </tr>
          </thead>
          <tbody>{renderData()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Records;
