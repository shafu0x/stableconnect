import React, { useState, useEffect } from "react";
import data from "./data.json";
import "./Payments.css";
import { fetchPayeeTaxInfo } from "./api/tax";

const Payments = () => {
  const [payments, setPayments] = useState(data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaxData = async () => {
      try {
        const updatedPayments = await Promise.all(
          payments.map(async (payment) => {
            const taxInfo = await fetchPayeeTaxInfo(payment.github_id);
            return {
              ...payment,
              taxSetup: taxInfo.can_pay || false,
            };
          })
        );
        setPayments(updatedPayments);
      } catch (error) {
        console.error("Error fetching tax data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaxData();
  }, []);

  if (loading) {
    return <div className="payments-container">Loading...</div>;
  }

  return (
    <div className="payments-container">
      <h2 className="payments-title">Payments</h2>
      <div className="payments-list">
        {payments.map((payment, index) => (
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
