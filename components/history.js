import React from "react";

import { useEffect, useState } from "react";
import Transactions from "./SmallerComponents/transactions";

const History = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rollNumber, setRollNumber] = useState(0);

  return (
    <div className="myform">
      <div className="formelement">
        <label htmlFor="rollNumberField">Filter by student Roll Number: </label>
        <input
          type="number"
          placeholder="Enter Roll number"
          id="rollNumberField"
          onChange={(e) => {
            setRollNumber(parseInt(e.target.value));
          }}
        />
      </div>
      <div style={{ height: "100px" }}></div>
      <div className="transactions">
        <div className="header">
          <div className="heading1">Block</div>
          <div className="heading1">Modification</div>
          <div className="heading1">Done by</div>
          <div className="heading1">Student Name</div>
          <div className="heading1">Roll No.</div>
          <div className="heading1">Date</div>
          <div className="heading1">Time</div>
        </div>
      </div>
      <Transactions
        resultNumber={currentPage * 20 + 1}
        rollNumber={rollNumber}
      />
      <Transactions
        resultNumber={currentPage * 20 + 2}
        rollNumber={rollNumber}
      />
      <Transactions
        resultNumber={currentPage * 20 + 3}
        rollNumber={rollNumber}
      />
      <Transactions
        resultNumber={currentPage * 20 + 4}
        rollNumber={rollNumber}
      />
      <Transactions
        resultNumber={currentPage * 20 + 5}
        rollNumber={rollNumber}
      />
      <Transactions
        resultNumber={currentPage * 20 + 6}
        rollNumber={rollNumber}
      />
      <Transactions
        resultNumber={currentPage * 20 + 7}
        rollNumber={rollNumber}
      />
      <Transactions
        resultNumber={currentPage * 20 + 8}
        rollNumber={rollNumber}
      />
      <Transactions
        resultNumber={currentPage * 20 + 9}
        rollNumber={rollNumber}
      />
      <Transactions
        resultNumber={currentPage * 20 + 10}
        rollNumber={rollNumber}
      />
      <Transactions
        resultNumber={currentPage * 20 + 11}
        rollNumber={rollNumber}
      />
      <Transactions
        resultNumber={currentPage * 20 + 12}
        rollNumber={rollNumber}
      />
      <Transactions
        resultNumber={currentPage * 20 + 13}
        rollNumber={rollNumber}
      />
      <Transactions
        resultNumber={currentPage * 20 + 14}
        rollNumber={rollNumber}
      />
      <Transactions
        resultNumber={currentPage * 20 + 15}
        rollNumber={rollNumber}
      />
      <Transactions
        resultNumber={currentPage * 20 + 16}
        rollNumber={rollNumber}
      />
      <Transactions
        resultNumber={currentPage * 20 + 17}
        rollNumber={rollNumber}
      />
      <Transactions
        resultNumber={currentPage * 20 + 18}
        rollNumber={rollNumber}
      />
      <Transactions
        resultNumber={currentPage * 20 + 19}
        rollNumber={rollNumber}
      />
      <Transactions
        resultNumber={currentPage * 20 + 20}
        rollNumber={rollNumber}
      />
      <div>
        <div className="pageToggle">
          {currentPage > 0 ? (
            <button
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            >
              {"<"} Previous
            </button>
          ) : (
            <div></div>
          )}
          <button
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          >
            Next {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;
