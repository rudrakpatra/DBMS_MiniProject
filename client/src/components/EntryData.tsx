import React, { useEffect, useState } from "react";
import { addPrescription } from "../API";
import { getUser } from "../log";

function EntryData(props: any) {
  let [tests, setTests] = useState([]);
  let [treatments, setTreatments] = useState([]);
  //get the user who is logged in
  let [user, setUser] = React.useState<any>(null);
  useEffect(() => {
    getUser().then((user: any) => setUser(user));
  }, []);
  let { appID, open, onClose, appDate } = props;
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);
  return (
    <div
      className="fixed inset-0 grid place-content-center  gap-2
    bg-slate-300 text-gray-700 px-6 overflow-y-auto
    "
      style={{ display: open ? "grid" : "none" }}
    >
      <h2 className="text-left ml-2">Add Tests' Details</h2>
      <form
        className="grid grid-cols-2 place-content-center items-start"
        style={{ height: "340px" }}
        onSubmit={async (e) => {
          e.preventDefault();
          let data = new FormData(e.target as HTMLFormElement);
          let name = data.get("name");
          let result = data.get("result");
          let date = data.get("date");
          let important = data.get("important");
          let file = data.get("file") as File;

          let image = data.get("image") as File;

          console.log(image);

          //load the file
          console.log(file);
          if (file as File) {
            let reader = new FileReader();
            //prep the json data on load
            reader.onload = function (event: any) {
              const arrayBuf = event.target.result as ArrayBuffer;
              console.log(event.target.result);
              let buffer = new Uint8Array(arrayBuf).buffer;
              let binary = [...new Uint8Array(buffer)]
                .map((x) => x.toString(16).padStart(2, "0"))
                .join("");

              // to open the uploaded file

              // const binaryData = new Uint8Array(
              //         (binary as any).match(/[\da-f]{2}/gi).map(function (h: any) {
              //           return parseInt(h, 16);
              //         })
              //   ).buffer;
              // // hex string to array buffer

              // const b = new Blob([binaryData], { type: "application/pdf" });
              // const url = URL.createObjectURL(b);
              // window.open(url, "_blank");

              if (image as File) {
                let reader = new FileReader();
                reader.onload = function (event: any) {
                  const arrayBuf = event.target.result as ArrayBuffer;
                  console.log(event.target.result);
                  let binaryimg = [...new Uint8Array(arrayBuf)]
                    .map((x) => x.toString(16).padStart(2, "0"))
                    .join("");
                  let test = {
                    name,
                    result,
                    date,
                    important: important ? "1" : "0",
                    reportName: file.name,
                    reportBody: binary,
                    imageName: image.name,
                    imageBody: binaryimg,
                  };
                  setTests(tests.slice().concat(test as any));
                  console.log("onSubmit: with report", test);
                };
                reader.readAsArrayBuffer(image);
              } else {
                let test = {
                  name,
                  result,
                  date,
                  important: important ? "1" : "0",
                  reportName: file.name,
                  reportBody: binary,
                  imageName: image.name,
                  imageBody: null,
                };
                setTests(tests.slice().concat(test as any));
                console.log("onSubmit: with report", test);
              }
            };
            reader.readAsArrayBuffer(file);
          } else if (image as File) {
            let reader = new FileReader();
            reader.onload = function (event: any) {
              const arrayBuf = event.target.result as ArrayBuffer;
              console.log(event.target.result);
              let binaryimg = [...new Uint8Array(arrayBuf)]
                .map((x) => x.toString(16).padStart(2, "0"))
                .join("");
              let test = {
                name,
                result,
                date,
                important: important ? "1" : "0",
                reportName: file.name,
                reportBody: null,
                imageName: image.name,
                imageBody: binaryimg,
              };
              setTests(tests.slice().concat(test as any));
              console.log("onSubmit: with report", test);
            };
            reader.readAsArrayBuffer(image);
          } else {
            let test = {
              name,
              result,
              date,
              important: important ? "1" : "0",
              reportName: file.name,
              reportBody: null,
              imageName: image.name,
              imageBody: null,
            };
            setTests(tests.slice().concat(test as any));
            console.log("onSubmit: without report", test);
          }
          //remove the values from the form
          (e.target as HTMLFormElement).reset();
        }}
      >
        <span
          className="
          flex flex-col gap-3 p-4 bg-slate-100 rounded-md rounded-tr-none rounded-br-none shadow-xl
           border-r-4 border-blue-300"
        >
          <input
            className="h-10"
            type="text"
            placeholder="name"
            name="name"
            autoComplete="off"
            required
          />

          <label className=" flex items-center gap-2 h-10">
            <input
              className="h-5"
              type="checkbox"
              placeholder="important"
              name="important"
              autoComplete="off"
            />
            important
          </label>
          <input
            className="h-10"
            min={appDate}
            max={new Date().toISOString().split("T")[0]}
            type="date"
            placeholder="date"
            name="date"
            autoComplete="off"
            required
          />
          <span className="text-gray-900 mt-2 text-left flex gap-2 items-center h-10">
            <span>Result</span>
            <select className="flex-1" name="result">
              <option value="positive">positive</option>
              <option value="negative">negative</option>
            </select>
          </span>
          <div className="flex gap-3 items-center h-10 text-gray-900">
            <div>Upload Report:</div>
            <input name="file" type="file" accept=".pdf" />
            <div>Upload Image:</div>
            <input name="image" type="file" accept="image/*" />
          </div>
          <button className="blue">Add Test</button>
        </span>
        <span
          className="
          flex flex-col gap-3 bg-slate-100 rounded-md shadow-xl h-full overflow-hidden
          rounded-tl-none rounded-bl-none "
        >
          {tests.length == 0 ? (
            <div className="h-full grid place-content-center">
              No tests added
            </div>
          ) : (
            <ul className="h-full overflow-y-scroll my-scroll p-2 m-2 text-left flex flex-col gap-3 ">
              {tests.map((test: any, i) => (
                <li className="flex gap-3" key={i}>
                  <span
                    className="p-2 bg-slate-200 rounded-sm  flex-grow flex-shrink w-0 outline outline-2 outline-slate-300 cursor-default overflow-hidden overflow-ellipsis"
                    title={`name:${test.name}\nresult:${
                      test.result
                    }\nimportant:${test.important}\ndate:${test.date}\nfile:${
                      test.reportName ? test.reportName : "none"
                    }`}
                  >
                    {test.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setTests(tests.filter((t: any, j) => i != j));
                    }}
                    className="red"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </span>
      </form>
      <h2 className="text-left mt-6 ml-2">Add Treatments' Details</h2>
      <form
        className="grid grid-cols-2 place-content-center items-start"
        style={{ height: "228px" }}
        onSubmit={async (e) => {
          e.preventDefault();
          let data = new FormData(e.target as HTMLFormElement);
          let name = data.get("name");
          let dosage = data.get("dosage");
          let date = data.get("date");
          let treatment = { name, dosage, date };
          setTreatments(treatments.slice().concat(treatment as any));

          (e.target as HTMLFormElement).reset();
        }}
      >
        <span
          className="
          flex flex-col gap-3 p-4 bg-slate-100 rounded-md rounded-tr-none rounded-br-none shadow-xl
           border-r-4 border-orange-300"
        >
          <input
            className="h-10"
            type="text"
            placeholder="name"
            name="name"
            autoComplete="off"
            required
          />
          <input
            className="h-10"
            type="text"
            placeholder="dosage"
            name="dosage"
            autoComplete="off"
            required
          />
          <input
            className="h-10"
            min={appDate}
            type="date"
            placeholder="date"
            name="date"
            autoComplete="off"
            required
          />
          <button className="orange">Add Treatment</button>
        </span>
        <span
          className="
          flex flex-col gap-3 bg-slate-100 rounded-md shadow-xl h-full overflow-hidden
          rounded-tl-none rounded-bl-none "
        >
          {treatments.length == 0 ? (
            <div className="h-full grid place-content-center">
              No treatments added
            </div>
          ) : (
            <ul className="h-full overflow-y-scroll my-scroll p-2 m-2 text-left flex flex-col gap-2 ">
              {treatments.map((treatment: any, i) => (
                <li className="flex gap-3" key={i}>
                  <span
                    className="p-2 bg-slate-200 rounded-sm flex-1 outline outline-2 outline-slate-300 cursor-default "
                    title={`name:${treatment.name}\ndosage:${treatment.dosage}\ndate:${treatment.date}`}
                  >
                    {treatment.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setTreatments(treatments.filter((t: any, j) => i != j));
                    }}
                    className="red"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </span>
      </form>
      <div className="flex justify-end mt-8 mr-2">
        <span
          onClick={() => {
            onClose();
          }}
          className="underline h-10 leading-10 mx-4 cursor-pointer"
        >
          cancel
        </span>
        <button
          onClick={async () => {
            let t = setTimeout(() => {
              alert("server is not responding");
              onClose();
            }, 3000);
            console.log({
              appID,
              username: user.username,
              password: user.password,
              tests,
              treatments,
            });
            let s = await addPrescription({
              appID: appID,
              username: user.username,
              password: user.password,
              tests: tests,
              treatments: treatments,
            });
            //revoke the time out
            clearTimeout(t);
            if (s.status == "ok") onClose();
          }}
          className="orange w-20"
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default EntryData;
