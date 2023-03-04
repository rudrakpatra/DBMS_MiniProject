let base = require("base-64");
let encode = base.encode;
let SERVER_URL = "http://localhost:3000";
let my_alert = console.log;
const login = async (username, password) => {
  let config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
    },
  };
  let response = await fetch(SERVER_URL + "/", config);
  let json = await response.json();
  console.log({ json });
  if (json.status && json.status == "error") {
    return { status: "error", reason: json.reason };
  }
  console.log("here");
  return {
    status: "ok",
    username: username,
    password: password,
    type: json.Type,
  };
};

// 1. Patient  registration/discharge
const registerPatient = async (apikey, name) => {
  my_alert("API call: registerPatient(" + name + ")");
  //server registers a new patient and returns the id
  return { status: "ok", id: 1 };
  return { status: "invalid apikey" };
};
//and doctor  appointment/testscheduling–information  about  new patients need to be registered, appointments based on availability and priority should be scheduled, doctor  should  be  notified  about  the  appointments  in  a  dashboard.
const scheduleAppointment = async (
  apikey,
  patientId,
  doctorId,
  datetime,
  priority,
  prescription
) => {
  my_alert(
    "API call: scheduleAppointment(" +
      patientId +
      "," +
      doctorId +
      "," +
      datetime +
      ", " +
      priority +
      ", " +
      prescription +
      ")"
  );
  //server
  return { status: "ok" };
  return { status: "not available" };
  return { status: "invalid apikey" };
};

const scheduleTest = async (apikey, patientId, datetime, testId) => {
  my_alert(
    "API call: scheduleTest(" + patientId + "," + datetime + ", " + testId + ")"
  );
  return { status: "ok" };
  return { status: "invalid apikey" };
};

//For  admitted  patients  a  room should be assigned based on available room capacity.
//For discharged patients information should be preserved but room occupancy should be updated.
//The workflow should also support scheduling tests and treatments prescribed by doctors.

const admitPatient = async (apikey, patientId) => {
  my_alert("API call: admitPatient(" + patientId + ")");
  //server admits an existing patient to a room and returns the room number
  return { status: "ok", room: 1 };
  return { status: "not available" };
  return { status: "invalid apikey" };
};

const dischargePatient = async (apikey, patientId) => {
  my_alert("API call: dischargePatient(" + patientId + ")");
  return { status: "ok" };
  return { status: "invalid apikey" };
};

//(bonus point: using a calendar to schedule)
//2. Patient  data  entry –All the  health  information  of a  patient  including  test  results  and  treatments administered should be recorded.

//(bonus point: supporting storage and display of images e.g., x-ray)

//3. Doctor dashboard –all the records of the patients treated by a doctor should be displayed to her as a  dashboard.

const getAppointments = async (username, password) => {
  my_alert("API call: getAppointments()");
  let config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
    },
  };
  let response = await fetch(SERVER_URL + "/users", config);
  let json = await response.json();
  return { status: "invalid apikey" };
};

// Doctor  may  also  query for  any patient  information.

const getAllPatients = async (apikey) => {
  my_alert("API call: getAllPatients()");
  return {
    status: "ok",
    patients: [
      {
        id: 1,
        name: "Amitabh Bachchan",
      },
      {
        id: 2,
        name: "David Beckham",
      },
      {
        id: 3,
        name: "Daniel Craig",
      },
      {
        id: 4,
        name: "Tom Cruise",
      },
      {
        id: 5,
        name: "Tom Hanks",
      },
      {
        id: 6,
        name: "Tom Hardy",
      },
      {
        id: 7,
        name: "Tom Holland",
      },
      {
        id: 8,
        name: "Tommy Lee Jones",
      },
      {
        id: 9,
        name: "Tommy Wiseau",
      },
      {
        id: 10,
        name: "Tommy Lee",
      },
    ],
  };
};
//Doctor  should  be  able  to  record drugs/treatments prescribed to a patient.

const getTreatments = async (apikey, patientId) => {
  my_alert("API call: getTreatments()");
  return [
    {
      id: 1,
      name: "end of all problems",
      drug: "heroine",
      dosage: "before dying",
    },
    {
      id: 2,
      name: "valentine's day",
      drug: "love",
      dosage: "take in little amounts",
    },
  ];
  return { status: "invalid apikey" };
};

const getTests = async (apikey, patientId) => {
  my_alert("API call: getTests()");
  return [
    {
      id: 1,
      name: "the test that fails all the time",
      description: "this test is a joke",
      result: "failed",
    },
    {
      id: 2,
      name: "the test that passes all the time",
      description: "this test is a joke",
      result: "passed",
      report: new Blob(["this is a report"], { type: "application/pdf" }),
    },
  ];
  return { status: "invalid apikey" };
};

//(bonus point: sending automated email reports to a doctor about the health information of patients treated by her on a weekly basis, high priority events may be emailed in an emergency manner)

//4. Database administration –should be able to add/delete new users
//(bonus point: implement data security policy with suitable access control)
const getUsers = async ({ username, password }) => {
  //wait for 1 second to simulate network latency
  console.log("API call: getUsers()");
  console.log(username, password);
  let config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
    },
  };
  let response = await fetch(SERVER_URL + "/users", config);
  let json = await response.json();
  console.log(json);
  return json;
};

const addUser = async (
  adminUsername,
  adminPassword,
  username,
  password,
  type
) => {
  my_alert(adminUsername, adminPassword, username, password, type);
  let config = {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(adminUsername + ":" + adminPassword),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      type: type,
    }),
  };
  console.log(config.body);
  let response = await fetch(SERVER_URL + "/users", config);
  let json = await response.json();
  return json;
};
const deleteUser = async (adminUsername, adminPassword, username) => {
  console.log("API call: deleteUser(" + username + ")");
  let config = {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(adminUsername + ":" + adminPassword),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  };
  let response = await fetch(SERVER_URL + "/users/delete", config);
  let json = await response.json();
  return { status: "ok" };
};

// login("Admin", "pass").then((user) => {
//   console.log({ user });
//   getUsers(user).then((users) => {
//       deleteUser("Admin", "pass", "ad").then((res) => {
//       console.log(res);
//     });
//   });
// });

// login("Admin", "pass").then((user) => {
//   console.log({ user });
//   getUsers(user).then((users) => {
//     addUser(user.username, user.password, "ad", "pass", "doctor").then(
//       (res) => {
//         console.log(res);
//       }
//     );
//   });
// });

// login("Prabitra", "pass").then((user) => {
//   console.log({ user });
//   getAppointments(user).then((users) => {
//     addUser(user.username, user.password, "ad", "pass", "doctor").then(
//       (res) => {
//         console.log(res);
//       }
//     );
//   });
// });
