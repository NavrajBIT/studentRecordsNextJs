import React, { useState } from "react";
const Viewassignment = () => {
  return (
    <>
      <h2>hello </h2>
      <AssignmentData />
    </>
  );
};

const AssignmentData = () => {
  const [myAssignments, setMyAssignments] = useState([
    {
      file: "",
      subject: "maths",
      topic: "numbers",
      expiry: "32/34/34",
      grade: "A",
      id: 3,
      getDate: "23/34/45",
    },
  ]);
  if (myAssignments.length === 0) {
    return (
      <>
        <div className="noAss">No assignment due.</div>
      </>
    );
  }
  return (
    <>
      {myAssignments.map((assignment) => {
        return (
          <div
            className="searchResult"
            key={assignment.file + assignment.topic}
          >
            <div className="result">
              <div style={{ borderBottom: "1px solid white" }}>
                Subject: {assignment.subject}
              </div>
              <div style={{ borderBottom: "1px solid white" }}>
                Topic: {assignment.topic}
              </div>
              <div style={{ borderBottom: "1px solid white" }}>
                {/* Due date: {getDate(assignment.expiry)} */}
                Due date: {assignment.getDate}
              </div>
              <div style={{ borderBottom: "1px solid white" }}>
                Grade: {assignment.grade}
              </div>
            </div>
            <div className="updownbuttons">
              <button
                onClick={() => {
                  // let url = "http://ipfs.io/ipfs/" + assignment.file;
                  // window.open(url);
                  console.log("Clicked here");
                }}
              >
                Download assignment
              </button>
              <input
                type="file"
                id={"fileField" + assignment.id}
                style={{ display: "none" }}
                onChange={async (e) => {
                  setStatus("Uploading file...");
                  await fileHash(e.target.files[0])
                    .then(async (res) => {
                      await addAssignmentSolution(
                        assignment.id,
                        res,
                        user.userState.id
                      )
                        .then((res) => {
                          setStatus(
                            "Assignment on " +
                              assignment.topic +
                              " submitted successfully."
                          );
                        })
                        .catch((err) => {
                          setStatus("Error. Submit file again.");
                        });
                    })
                    .catch((err) => {
                      setStatus("Error. Submit file again.");
                    });
                }}
              />
              <button
                onClick={() => {
                  document.getElementById("fileField" + assignment.id).click();
                }}
              >
                Submit assignment
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Viewassignment;
