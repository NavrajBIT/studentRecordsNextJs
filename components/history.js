import React from "react";
import { getLatestBlock, getModifier } from "../api/contractCall";
import { useEffect, useState } from "react";
import Transactions from "./SmallerComponents/transactions";
import TransactionsByRollNumber from "./SmallerComponents/transactionsByRollNumber";

const History = () => {
  const resultsPerPage = 10;
  const [status, setStatus] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [rollNumber, setRollNumber] = useState(0);
  useEffect(() => {
    poppulateTxData();
  }, [rollNumber]);

  const poppulateTxData = () => {
    setStatus("Loading transactions...");
    getLatestBlock().then((res) => {
      let blockNumber = res;
      let transactions = [];
      for (
        let i = parseInt(blockNumber);
        i > parseInt(blockNumber) - resultsPerPage;
        i--
      ) {
        transactions.push(i);
      }
      setTransactions(transactions);
      setStatus("");
    });
  };
  return (
    <div className="myform">
      <div className="formelement">
        <label htmlFor="rollNumberField">Filter by student Roll Number: </label>
        <input
          type="number"
          placeholder="Enter Roll number"
          id="rollNumberField"
        />
      </div>
      <button
        onClick={() => {
          let myRollNumber = document.getElementById("rollNumberField").value;
          setIsFiltered(true);
          setRollNumber(myRollNumber);
        }}
      >
        Filter
      </button>
      <div className="status">{status}</div>
      {transactions.length > 0 && (
        <>
          {transactions.map((blockNumber) => {
            if (rollNumber === 0) {
              return (
                <Transactions blockNumber={blockNumber} key={blockNumber} />
              );
            } else {
              return (
                <TransactionsByRollNumber
                  blockNumber={blockNumber}
                  key={blockNumber}
                  rollNumber={rollNumber}
                />
              );
            }
          })}
        </>
      )}
    </div>
  );
};

export default History;
