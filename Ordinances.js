import React, { useState, useEffect } from "react";
import axios from "axios";
const Ordinances = () => {
  const [ordinances, setOrdinances] = useState([]);
  const [itemDelete, setItemDelete] = useState(false);
  const [renderForm, setRenderForm] = useState(false);
  const [ordinanceUpdate, setOrdinanceUpdate] = useState({
    _id: "",
    violationId: "",
    violationName: "",
    violationPrice: "",
  });
  const handleEventUpdate = (e) => {
    setOrdinanceUpdate({ ...ordinanceUpdate, [e.target.name]: e.target.value });
    console.log(ordinanceUpdate);
  };

  useEffect(async () => {
    try {
      const result = await axios.get("/ordinances");
      setOrdinances(result.data);
    } catch (error) {
      console.log(error);
    }
  }, [itemDelete]);
  const handleDelete = async (id) => {
    try {
      const result = await axios.delete("/ordinanceDelete/" + id);
      alert(`status ${result.status} || ${result.data.message}`);
      console.log(result.data);
      setItemDelete(() => !itemDelete);
    } catch (error) {
      alert(error);
    }
  };
  const renderAllOrdinances = (data) => {
    return data.map((data, index) => {
      return (
        <tr key={index}>
          <td>{data.violationId}</td>
          <td>{data.violationName}</td>
          <td>{data.violationPrice}</td>
          <td>{data.created_at}</td>
          <td className="crud--btn">
            <button onClick={() => handleDelete(data._id)}>Delete</button>
            <button
              className="crud--btn"
              onClick={() =>
                hanldeUpdate(
                  data._id,
                  data.violationId,
                  data.violationName,
                  data.violationPrice
                )
              }
            >
              Update
            </button>
          </td>
        </tr>
      );
    });
  };
  const hanldeUpdate = (_mainId, id, name, price) => {
    setRenderForm(() => !renderForm);
    setOrdinanceUpdate({
      _id: _mainId,
      violationId: id,
      violationName: name,
      violationPrice: price,
    });
  };
  const hanldeSubmit = async (id) => {
    try {
      const result = await axios.patch(
        "/ordinancePatch/" + id,
        ordinanceUpdate
      );
      if (result.status == 200) {
        alert(result.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };
  const renderUpdateForm = (_id, id, name, price) => {
    return (
      <form onSubmit={() => hanldeSubmit(_id)}>
        <label>
          Violation Id:
          <input
            type="text"
            value={id}
            name={"violationId"}
            disabled
            onChange={handleEventUpdate}
          />
        </label>
        <label>
          Violation Name:
          <input
            type="text"
            value={name}
            name={"violationName"}
            onChange={handleEventUpdate}
          />
        </label>
        <label>
          Violation Price:
          <input
            type="text"
            value={price}
            name={"violationPrice"}
            onChange={handleEventUpdate}
          />
        </label>
        <input type="submit" value={"Save"} />
      </form>
    );
  };
  return (
    <>
      <div
        className={
          !renderForm ? "allOrdinance--container" : "container--inactive"
        }
      >
        <div className="header--container">
          <h3> ALL ORDINANCES</h3>
        </div>
        <div className="tbl--ordinances--container">
          <table className="tbl--ordinances">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Date</th>
                <th>Edit/Del</th>
              </tr>
            </thead>
            <tbody>{renderAllOrdinances(ordinances)}</tbody>
          </table>
        </div>
      </div>
      <div
        className={renderForm ? "updateform--container" : "container--inactive"}
      >
        {renderForm
          ? renderUpdateForm(
              ordinanceUpdate._id,
              ordinanceUpdate.violationId,
              ordinanceUpdate.violationName,
              ordinanceUpdate.violationPrice
            )
          : null}
      </div>
    </>
  );
};

export default Ordinances;
