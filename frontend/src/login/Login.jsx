import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../ContextApi";
import { useContext } from "react";

function Login() {
  let { setUserRole, setIsLoggedIn } = useContext(Context);

  const [details, setDetails] = useState({ email: "", password: "" });

  const handleDetails = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3002/user-login",
        {
          email: details.email,
          password: details.password,
        },
        { withCredentials: true },
      )
      .then((res) => {
        setDetails({ email: "", password: "" });
        toast.success(res.data.response);
        setUserRole(res.data.user.role);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        toast.error("something went wrong");
      });
  };

  return (
    <div className="m-5 p-5">
      <div className="container  bg-finace rounded-4 px-5">
        <form
          className="row p-4"
          onSubmit={(e) => handleSubmit(e)}
          method="POST"
        >
          <h3 className="mb-3">Login Here</h3>
          <span className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="enter email here..."
              className="form-control"
              value={details.email}
              onChange={(e) => handleDetails(e)}
            />
          </span>
          <span className="mb-4">
            <label htmlFor="pass" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="pass"
              name="password"
              placeholder="enter password here..."
              className="form-control"
              value={details.password}
              onChange={(e) => handleDetails(e)}
            />
          </span>
          <span>
            <button className="btn btn-primary">Login</button>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
