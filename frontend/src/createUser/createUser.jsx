import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function CreateUser() {
  const [details, setDetails] = useState({ name: "", password: "", email: "" });
  const [role, setRole] = useState("--select the role--");
  const [status, setStatus] = useState("--select the status--");

  const handleDetails = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3002/user",
        {
          name: details.name,
          password: details.password,
          email: details.email,
          role: role,
          status: status,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        setDetails({ name: "", password: "", email: "" });
        setRole("--select the role--");
        setStatus("--select the status--");
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
          <h3>Create a User</h3>
          <span className="p-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              placeholder="enter name here..."
              id="name"
              className="form-control "
              value={details.name}
              name="name"
              onChange={(e) => handleDetails(e)}
            />
          </span>

          <span className="p-3">
            <label htmlFor="pass" className="form-label">
              Password
            </label>
            <input
              type="password"
              placeholder="enter password here..."
              id="pass"
              className="form-control"
              value={details.password}
              name="password"
              onChange={(e) => handleDetails(e)}
            />
          </span>

          <span>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              placeholder="enter email here..."
              id="email"
              className="form-control"
              value={details.email}
              name="email"
              onChange={(e) => handleDetails(e)}
            />
          </span>

          <span className="p-3 col-6">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              name="role"
              id="role"
              className="form-control"
              onChange={(e) => setRole(e.target.value)}
              value={role}
            >
              <option disabled selected>
                --select the role--
              </option>
              <option value="viewer">viewer</option>
              <option value="analyst">analyst</option>
              <option value="admin">admin</option>
            </select>
          </span>

          <span className="p-3 col-6">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              name="status"
              id="status"
              className="form-control"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option disabled selected>
                --select the status--
              </option>
              <option value="active">active</option>
              <option value="inActive">inActive</option>
            </select>
          </span>

          <span>
            <button className="btn btn-primary" type="submit">
              Create
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
