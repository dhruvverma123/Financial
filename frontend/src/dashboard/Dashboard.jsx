import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

function Dashboard() {
  let [record, setRecord] = useState([]);
  let [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/record", { withCredentials: true })
      .then((res) => {
        setRecord(res.data.response);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3002/recent-activities", { withCredentials: true })
      .then((res) => {
        setRecentActivities(res.data.response);
      })
      .catch();
  }, []);

  let totalIncome = record.reduce((total, e) => {
    if (e.type == "income") {
      return total + parseInt(e.amount);
    }
    return total;
  }, 0);

  let totalExpense = record.reduce((total, e) => {
    if (e.type == "expense") {
      return total + parseInt(e.amount);
    }
    return total;
  }, 0);

  let netBalance = totalIncome + -totalExpense;

  let categoryTotals = record.reduce((acc, e) => {
    let existing = acc.find((item) => item.category === e.category);

    if (existing) {
      existing.amount += parseInt(e.amount);
    } else {
      acc.push({
        category: e.category,
        amount: parseInt(e.amount),
      });
    }

    return acc;
  }, []);

  let months = record.reduce((acc, e) => {
    let date = new Date(e.date);
    let month = date.toLocaleString("default", { month: "short" });

    let existing = acc.find((item) => item.month === month);

    if (existing) {
      if (e.type === "income") {
        existing.income += parseInt(e.amount);
      } else {
        existing.expense += parseInt(e.amount);
      }
    } else {
      acc.push({
        month: month,
        income: e.type === "income" ? parseInt(e.amount) : 0,
        expense: e.type === "expense" ? parseInt(e.amount) : 0,
      });
    }

    return acc;
  }, []);

  return (
    <div
      style={{
        paddingTop: "100px",
        backgroundColor: "#eaf5ff",
        minHeight: "100vh",
        paddingLeft: "200px",
        zIndex: "-1",
        paddingBottom: "100px",
      }}
    >
      <h3>Welcome to Dashboard</h3>

      {/* Cards Row */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "80%",
          marginTop: "20px",
        }}
      >
        <div className="card">
          <h6>Total Income</h6>
          <h3>₹{totalIncome}</h3>
        </div>

        <div className="card">
          <h6>Total Expense</h6>
          <h3>₹{totalExpense}</h3>
        </div>

        <div className="card">
          <h6>Net Balance</h6>
          <h3>₹{netBalance}</h3>
        </div>

        <div className="card">
          <h6>Total Transactions</h6>
          <h3>{record.length}</h3>
        </div>
      </div>
      <div>
        <h3 style={{ marginTop: "40px", marginBottom: "20px" }}>
          Recent Activities - (last 2 days record)
        </h3>
        <table
          className="table"
          style={{
            width: "80%",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((e, idx) => {
              let date = e.date.split(" ").slice(2, 3);
              let year = e.date.split(" ").slice(3, 4);
              return (
                <tr>
                  <th>{idx + 1}</th>
                  <td>{e.amount}</td>
                  <td>{e.type}</td>
                  <td>{e.category}</td>
                  <td>{date + "-" + year}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row border" style={{ width: "80%" }}>
        <div className="col-6">
          {/* Category Table */}
          <h3 style={{ marginTop: "40px", marginBottom: "20px" }}>
            Category wise totals
          </h3>

          <table
            style={{
              background: "white",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              width: "90%",
            }}
          >
            <thead style={{ background: "#dbeafe", textAlign: "center" }}>
              <tr>
                <th style={{ padding: "10px" }}>Category</th>
                <th style={{ padding: "10px" }}>Total Amount</th>
              </tr>
            </thead>

            <tbody>
              {categoryTotals.map((e, idx) => (
                <tr key={idx} style={{ textAlign: "center" }}>
                  <td style={{ padding: "10px" }}>{e.category}</td>
                  <td style={{ padding: "10px" }}>₹{e.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-6">
          {/* monthly trend */}
          <h3 style={{ marginTop: "40px", marginBottom: "20px" }}>
            Monthly trends
          </h3>
          <BarChart width={500} height={300} data={months}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#4CAF50" />
            <Bar dataKey="expense" fill="#f44336" />
          </BarChart>
          ;
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
