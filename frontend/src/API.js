import { encode } from "base-64";
let SERVER_URL = "http://localhost:3000";
let my_alert = console.log;
export const login = async (username, password) => {
  let config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
    },
  };
  console.log("logging");
  let response = await fetch(SERVER_URL + "/", config);
  let json = await response.json();
  console.log("login:", { json });
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
export const registerPatient = async (username, password, name) => {
  my_alert("API call: registerPatient(" + name + ")");
  //server registers a new patient and returns the id
  let config = {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
    }),
  };
  let response = await fetch(SERVER_URL + "/register", config);
  let json = await response.json();
  return json;
};
//and doctor  appointment/testscheduling–information  about  new patients need to be registered, appointments based on availability and priority should be scheduled, doctor  should  be  notified  about  the  appointments  in  a  dashboard.
export const scheduleAppointment = async (
  username,
  password,
  patientId,
  date,
  priority
) => {
  my_alert("API call: scheduleAppointment()");
  //server
  let config = {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      patientId: patientId,
      date: date,
      priority: priority,
    }),
  };
  let response = await fetch(SERVER_URL + "/appointment/schedule", config);
  console.log("response recv");
  let json = await response.json();
  console.log(json);
  return json;
};

//For  admitted  patients  a  room should be assigned based on available room capacity.
//For discharged patients information should be preserved but room occupancy should be updated.
//The workflow should also support scheduling tests and treatments prescribed by doctors.

export const admitPatient = async (username, password, patientId, roomType) => {
  my_alert("API call: admitPatient(" + patientId + ")");
  //server admits an existing patient to a room and returns the room number
  let config = {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      patientId: patientId,
      type: roomType,
    }),
  };
  let response = await fetch(SERVER_URL + "/admit", config);
  let json = await response.json();
  return json;
};

export const dischargePatient = async (username, password, patientId) => {
  my_alert("API call: dischargePatient(" + patientId + ")");
  let config = {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      patientId: patientId,
    }),
  };
  let response = await fetch(SERVER_URL + "/discharge", config);
  let json = await response.json();
  return json;
};

//(bonus point: using a calendar to schedule)
//2. Patient  data  entry –All the  health  information  of a  patient  including  test  results  and  treatments administered should be recorded.

//(bonus point: supporting storage and display of images e.g., x-ray)

//3. Doctor dashboard –all the records of the patients treated by a doctor should be displayed to her as a  dashboard.

export const getAppointments = async (username, password) => {
  // get all pending appointments of a doctor
  my_alert("API call: getAppointments()");
  let config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
    },
  };
  let response = await fetch(SERVER_URL + "/doctor/appointments", config);
  let json = await response.json();
  return json;
};

// Doctor  may  also  query for  any patient  information.

export const getAllPatients = async ({ username, password }) => {
  my_alert("API call: getAllPatients()");
  let config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
    },
  };
  let response = await fetch(SERVER_URL + "/doctor/patients", config);
  let json = await response.json();
  console.log({ json });
  return json;
};

//(bonus point: sending automated email reports to a doctor about the health information of patients treated by her on a weekly basis, high priority events may be emailed in an emergency manner)

//4. Database administration –should be able to add/delete new users
//(bonus point: implement data security policy with suitable access control)
export const getUsers = async ({ username, password }) => {
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

export const addUser = async (adminUsername, adminPassword, username, password, name, type) => {
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
      name: name,
      type: type,
    }),
  };
  console.log(config.body);
  let response = await fetch(SERVER_URL + "/users", config);
  let json = await response.json();
  return json;
};

export const deleteUser = async (adminUsername, adminPassword, username) => {
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
  console.log({json});
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
//     addUser(user.username, user.password, "ad", "pass","Name", "doctor").then(
//       (res) => {
//         console.log(res);
//       }
//     );
//   });
// });

// login("Prabitra", "pass").then((user) => {
//   console.log({user});
//   getAllPatients(user).then((patients) => {
//     console.log({patients});
//   });
// });

// login("Rudrak", "pass").then((user) => {
//   console.log({ user });
//   registerPatient(user.username, user.password, "Saras").then((res) => {
//     console.log({res});
//   });
// });

// login("Rudrak", "pass").then((user) => {
//   console.log({ user });
//   let priority = 5;
//   let ID = 2;
//   let date = new Date().toJSON().slice(0, 10);
//   console.log({date});
//   scheduleAppointment(user.username, user.password, ID, date, priority).then(
//     (res) => {
//       console.log({ res });
//     }
//   );
// });

// login("Pabitra", "pass").then((user) => {
//   console.log({ user });
//   getAppointments(user.username, user.password).then(
//     (res) => {
//       console.log({ res });
//     }
//   );
// });

// login("Rudrak", "pass").then((user) => {
//   console.log({ user });
//   let patient = 2;
//   let type = 'Large';
//   admitPatient(user.username, user.password, patient, type).then((res) => {
//     console.log({ res });
//   });
// });

// login("Rudrak", "pass").then((user) => {
//   console.log({ user });
//   let patient = 2;
//   dischargePatient(user.username, user.password, patient).then((res) => {
//     console.log({ res });
//   });
// });

// tested: ok
// login("Akash", "pass").then((user) => {
//   console.log({ user });
//   let prescriptionId = 4;
//   let testName = "Blood_Test";
//   let date = new Date().toJSON().slice(0, 10);
//   let important = 1;
//   scheduleTest(
//     user.username,
//     user.password,
//     prescriptionId,
//     testName,
//     date,
//     important
//   ).then((res) => {
//     console.log({ res });
//   });
// });

export const scheduleTest = async (username, password, prescriptionId, testName, date, important) => {
  console.log("API call: scheduleTest()");
  console.log({username, password, prescriptionId, testName, date, important});
  let config = {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prescriptionId,
      testName,
      date,
      important,
    }),
  };
  // console.log("config", config);
  let response = await fetch(SERVER_URL + "/test/schedule", config);
  let json = await response.json();
  console.log({ json });
  return json;
};

// console.log("end of script");

//tested: ok
// login("Akash", "pass").then((user) => {
//   console.log({ user });
//   let prescriptionId = 4;
//   let treatmentName = "Paracetamol";
//   let dosage = "one tablet after lunch and dinner";
//   let date = new Date().toJSON().slice(0, 10);
//   let important = 1;
//   treatment(
//     user.username,
//     user.password,
//     prescriptionId,
//     treatmentName,
//     dosage,
//     date
//   ).then((res) => {
//     console.log({ res });
//   });
// });

// export const treatment = async (
//   username,
//   password,
//   prescriptionId,
//   treatmentName,
//   dosage,
//   date
// ) => {
//   console.log("API call: scheduleTest()");
//   console.log({
//     username,
//     password,
//     prescriptionId,
//     treatmentName,
//     dosage,
//     date
//   });
//   let config = {
//     method: "POST",
//     headers: {
//       Authorization: "Basic " + encode(username + ":" + password),
//       "Access-Control-Allow-Origin": "*",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       prescriptionId,
//       treatmentName,
//       dosage,
//       date,
//     }),
//   };
//   // console.log("config", config);
//   let response = await fetch(SERVER_URL + "/treatment", config);
//   let json = await response.json();
//   console.log({ json });
//   return json;
// };
// console.log("end of script");

//tested: ok
// login("Akash", "pass").then((user) => {
//   console.log({ user });
//   appointmentId = 5;
//   prescription(
//     user.username,
//     user.password,
//     appointmentId
//   ).then((res) => {
//     console.log({ res });
//   });
// });
// export const prescription = async (
//   username,
//   password,
//   appointmentId
// ) => {
//   console.log("API call: scheduleTest()");
//   console.log({
//     username,
//     password,
//     appointmentId
//   });
//   let config = {
//     method: "POST",
//     headers: {
//       Authorization: "Basic " + encode(username + ":" + password),
//       "Access-Control-Allow-Origin": "*",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       appointmentId,
//     }),
//   };
//   // console.log("config", config);
//   let response = await fetch(SERVER_URL + "/prescription", config);
//   let json = await response.json();
//   console.log({ json });
//   return json;
// };
// console.log("end of script");

//Doctor  should  be  able  to  record drugs/treatments prescribed to a patient.
// login("Pabitra", "pass").then((user) => {
//   console.log({ user });
//   let patientId = 2;
//   getTreatment(
//     user.username,
//     user.password,
//     patientId
//   ).then((res) => {
//     console.log({ res });
//   });
// });
export const getTreatments = async (username, password, patientId) => {
  console.log("API call: scheduleTest()");
  console.log({username, password, patientId});
  let config = {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      patientId,
    }),
  };
  // console.log("config", config);
  let response = await fetch(SERVER_URL + "/getTreatment", config);
  let json = await response.json();
  console.log({ json });
  return json;
};
// console.log("end of script");

//Doctor  should  be  able  to  record tests prescribed to a patient.
// login("Pabitra", "pass").then((user) => {
//   console.log({ user });
//   let patientId = 2;
//   getTest(
//     user.username,
//     user.password,
//     patientId
//   ).then((res) => {
//     console.log({ res });
//   });
// });

export const getTests = async (username, password, patientId) => {
  console.log("API call: scheduleTest()");
  console.log({ username, password, patientId });
  let config = {
    method: "POST",
    headers: {
      Authorization: "Basic " + encode(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      patientId,
    }),
  };
  // console.log("config", config);
  let response = await fetch(SERVER_URL + "/getTest", config);
  let json = await response.json();
  console.log({ json });
  return json;
};

// console.log("end of script");
