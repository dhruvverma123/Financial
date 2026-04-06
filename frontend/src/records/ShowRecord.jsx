import { useState, useEffect } from "react";
import axios from "axios";
import Popup from "./Popup";
import { toast } from "react-toastify";
import { Context } from "../ContextApi";
import { useContext } from "react";

function ShowRecord() {
  let { userRole } = useContext(Context);
  const [records, setRecords] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  const handleShow = (id) => {
    if (userRole == "analyst") {
      return;
    }
    setId(id);
    setShow(true);
  };

  const handleHide = () => {
    setId("");
    setShow(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3002/record", { withCredentials: true })
      .then((res) => {
        setRecords(res.data.response);
      })
      .catch((err) => {
        toast.error("something went wrong");
      });
  }, []);

  return (
    <div className="container pt-5">
      <h2 className="text-center mb-4 mt-5">Records</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th scope="col">Amount</th>
            <th scope="col">Type</th>
            <th scope="col">category</th>
            <th scope="col">Description</th>
            <th scope="col">Day</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Updated_At</th>
          </tr>
        </thead>
        <tbody>
          {records.map((e, idx) => {
            let day = e.date.split(" ").slice(0, 1) + "day";
            let str1 = e.date.split(" ").slice(2, 3);
            let str2 = e.date.split(" ").slice(3, 4);
            let str3 = e.date.split(" ").slice(1, 2);
            let date = str1 + "-" + str2 + " " + "(" + str3 + ")";
            let time = e.date.split(" ").slice(4, 5);
            let updated_At1 = e.updated_At.split(" ").slice(0, 1);
            let updated_At2 = e.updated_At.split(" ").slice(1, 2);
            let updated_At3 = e.updated_At.split(" ").slice(2, 3);
            let updated_At4 = e.updated_At.split(" ").slice(3, 4);
            let updated_At5 = e.updated_At.split(" ").slice(4, 5);
            let updated_At =
              updated_At1 +
              ", " +
              updated_At2 +
              ", " +
              updated_At3 +
              "-" +
              updated_At4 +
              ", " +
              updated_At5;

            return (
              <tr
                key={idx}
                onMouseEnter={() => handleShow(e._id)}
                onMouseLeave={handleHide}
                className="parent"
              >
                <th>{idx + 1}</th>
                <td>₹{e.amount}</td>
                <td>{e.type}</td>
                <td>{e.category}</td>
                <td>{e.description}</td>
                <td>{day}</td>
                <td>{date}</td>
                <td>{time}</td>
                <td>
                  {e.updated_At == "No update" ? "No update" : updated_At}
                </td>
                {show && id === e._id && (
                  <Popup id={id} setRecords={setRecords} />
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ShowRecord;
