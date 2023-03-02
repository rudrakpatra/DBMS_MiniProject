import React from "react";
import { getTests } from "../API";

function Tests(props) {
  let $tests = React.useState([]);
  React.useEffect(() => {
    getTests(props.patientId).then((tests) => {
      $tests[1](tests);
    });
  }, []);
  if (!props.patientId) return;
  return (
    <div
      className="fixed inset-0 grid place-content-center 
    bg-slate-300 text-gray-700 px-6
    "
      style={{ display: props.patientId ? "grid" : "none" }}
    >
      <h1 className="ml-4">Tests of patient {props.patientId}</h1>
      <span className="grid place-content-center gap-3 p-4 bg-slate-100  rounded-md shadow-xl mx-auto relative">
        <div className="grid grid-cols-6 gap-3 mb-2 mt-4">
          <h3 className="cell col-span-2">Name</h3>
          <h3 className="cell col-span-2">Description</h3>
          <h3 className="cell col-span-1">Result</h3>
          <h3 className="cell col-span-1">Report</h3>
        </div>
        <div className="flex flex-col gap-3 whitespace-nowrap mb-8">
          {$tests[0].map((test) => (
            <div className="grid grid-cols-6 gap-3" key={test.id}>
              <div className="cell col-span-2">{test.name}</div>
              <div className="cell col-span-2">{test.description}</div>
              <div className="cell col-span-1">{test.result}</div>
              {test.report ? (
                <button
                  onClick={() => {
                    var fileURL = URL.createObjectURL(test.report);
                    window.open(fileURL);
                    //revoke it after 5 seconds
                    setTimeout(() => URL.revokeObjectURL(fileURL), 5000);
                  }}
                  className="orange col-span-1"
                >
                  open
                </button>
              ) : (
                <div className="cell col-span-1"> not available</div>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            props.onClose();
          }}
          className="red w-fit place-self-end"
        >
          close
        </button>
      </span>
    </div>
  );
}

export default Tests;
