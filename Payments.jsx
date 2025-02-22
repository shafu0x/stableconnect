import React from "react";
import data from "./data.json";
import "./Payments.css";

const Payments = () => {
  return (
    <div className="payments-container">
      <h2 className="payments-title">Payments</h2>
      <div className="payments-list">
        {data.map((payment, index) => (
          <div key={index} className="payment-item">
            <span>{payment.name}</span>
            <span>${payment.amount}</span>
            <span className={payment.taxSetup ? "status-good" : "status-bad"}>
              {payment.taxSetup ? "Complete" : "Missing"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;
