import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function RecordManage() {
  const [details, setDetails] = useState({
    amount: "",
    category: "",
    description: "",
  });
  const [type, setType] = useState("--select the Type--");

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3002/record",
        {
          amount: details.amount,
          type: type,
          category: details.category,
          description: details.description,
        },
        { withCredentials: true },
      )
      .then((res) => {
        setDetails({
          amount: "",
          category: "",
          description: "",
        });
        setType("--select the Type--");
        toast.success(res.data.response);
      })
      .catch((err) => {
        toast.error("something went wrong");
      });
  };

  return (
    <div className="m-5 p-5">
      <div className="container bg-finace rounded-4 px-5">
        <form
          className="row p-4"
          onSubmit={(e) => handleSubmit(e)}
          method="POST"
        >
          <h3>Create a Record</h3>

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

          <span>
            <button className="btn btn-primary" type="submit">
              Create the record
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}

export default RecordManage;
