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
        />
      </div>
      <div className="transactions">
        <div className="header">
          <div className="heading1">S.No.</div>
          <div className="heading1">Modification</div>
          <div className="heading1">Done by</div>
          <div className="heading1">Student Name</div>
          <div className="heading1">Roll No.</div>
          <div className="heading1">Date</div>
          <div className="heading1">Time</div>
        </div>
      </div>
      <Transactions resultNumber={currentPage * 10 + 1} />
      <Transactions resultNumber={currentPage * 10 + 2} />
      <Transactions resultNumber={currentPage * 10 + 3} />
      <Transactions resultNumber={currentPage * 10 + 4} />
      <Transactions resultNumber={currentPage * 10 + 5} />
      <Transactions resultNumber={currentPage * 10 + 6} />
      <Transactions resultNumber={currentPage * 10 + 7} />
      <Transactions resultNumber={currentPage * 10 + 8} />
      <Transactions resultNumber={currentPage * 10 + 9} />
      <Transactions resultNumber={currentPage * 10 + 10} />
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
