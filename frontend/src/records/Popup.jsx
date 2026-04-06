import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../ContextApi";
import { useContext } from "react";

function Popup({ id, setRecords }) {
  let { userRole } = useContext(Context);
  const [updateForm, setUpdateForm] = useState(false);
  const handleUpdate = () => {
    setUpdateForm(!updateForm);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3002/record/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.response);
        setRecords((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((err) => {
        toast.error("something went wrong");
      });
  };

  return (
    <span className="popup">
      <span>
        <button className="btn btn-success" onClick={handleUpdate}>
          update
        </button>
        <button className="btn btn-danger mt-1" onClick={handleDelete}>
          delete
        </button>
      </span>
      {updateForm && (
        <UpdateForm
          id={id}
          handleUpdate={handleUpdate}
          setRecords={setRecords}
        />
      )}
    </span>
  );
}

export default Popup;

function UpdateForm({ id, handleUpdate, setRecords }) {
  const [details, setDetails] = useState({
    amount: "",
    category: "",
    description: "",
  });
  const [type, setType] = useState("--select the Type--");

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3002/record/${id}`, { withCredentials: true })
      .then((res) => {
        setDetails(res.data.response);
        setType(res.data.response.type);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3002/record/${id}`,
        {
          amount: details.amount,
          type: type,
          category: details.category,
          description: details.description,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        setDetails({
          amount: "",
          category: "",
          description: "",
        });
        setType("--select the Type--");
        toast.success(res.data.response);
        setRecords((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, ...res.data.updatedRecord } : item,
          ),
        );
        handleUpdate();
      })
      .catch((err) => {
        toast.error("something went wrong");
      });
  };

  return (
    <div>
      <div className="container bg-finace rounded-4 px-5 put">
        <form
          className="row p-4"
          onSubmit={(e) => handleSubmit(e)}
          method="POST"
        >
          <h3>Update the Record</h3>
          <span className="p-3 col-6">
            <label htmlFor="Amount" className="form-label">
              Amount
            </label>
            <input
              type="number"
              placeholder="enter amount here..."
              id="Amount"
              className="form-control "
              name="amount"
              value={details.amount}
              onChange={(e) => handleChange(e)}
            />
          </span>

          <span className="p-3 col-6">
            <label htmlFor="Type" className="form-label">
              Type
            </label>
            <select
              value={type}
              id="Type"
              className="form-control"
              onChange={(e) => setType(e.target.value)}
            >
              <option disabled selected>
                --select the Type--
              </option>
              <option value="income">income</option>
              <option value="expense">expense</option>
            </select>
          </span>

          <span className="p-3">
            <label htmlFor="category" className="form-label">
              category
            </label>
            <input
              type="text"
              placeholder="enter category here..."
              id="category"
              className="form-control"
              name="category"
              value={details.category}
              onChange={(e) => handleChange(e)}
            />
          </span>

          <span className="p-3">
            <label htmlFor="description" className="form-label">
              description
            </label>
            <textarea
              id="description"
              placeholder="enter description here..."
              className="form-control"
              name="description"
              rows={3}
              value={details.description}
              onChange={(e) => handleChange(e)}
            ></textarea>
          </span>

          <span className="col-3">
            <button
              className="btn btn-primary"
              type="submit"
              style={{ width: "150px" }}
            >
              Create the record
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}
//navbar
