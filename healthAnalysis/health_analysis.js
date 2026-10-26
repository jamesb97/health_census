const addPatient = () => {
  const name = document.getElementById("name").value;
  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value;
  const condition = document.getElementById("condition").value;
  const patient = { name, gender, age, condition };
  if (name && gender && age && condition) {
    return patient;
  } else {
    alert("Please fill all the fields");
  }
};

const addPatientToDatabase = (patient) => {
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  patients.push(patient);
  localStorage.setItem("patients", JSON.stringify(patients));
};

const getPatientsFromDatabase = () => {
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  return patients;
};

const displayPatients = () => {
  const patients = getPatientsFromDatabase();
  const patientsContainer = document.getElementById("patients");
  patientsContainer.innerHTML = "";
  patients.forEach((patient) => {
    const patientDiv = document.createElement("div");
    patientDiv.innerHTML = `
    <h3>${patient.name}</h3>
    <p>Gender: ${patient.gender}</p>
    <p>Age: ${patient.age}</p>
    <p>Condition: ${patient.condition}</p>
    `;
    patientsContainer.appendChild(patientDiv);
  });
};

const addPatientButton = document.getElementById("addPatient");
addPatientButton.addEventListener("click", () => {
  const patient = addPatient();
  addPatientToDatabase(patient);
  displayPatients();
});

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("male").checked = false;
  document.querySelector("input[name='gender'][value='Female']").checked =
    false;
  document.getElementById("age").value = "";
  document.getElementById("condition").value = "";
}

function displayReport() {
  const patients = getPatientsFromDatabase();
  const reportContainer = document.getElementById("report");
  reportContainer.innerHTML = "";
  patients.forEach((patient) => {
    const reportDiv = document.createElement("div");
    reportDiv.innerHTML = `
    <h3>${patient.name}</h3>
    <p>Gender: ${patient.gender}</p>
    <p>Age: ${patient.age}</p>
    <p>Condition: ${patient.condition}</p>
    `;
    reportContainer.appendChild(reportDiv);
  });
}

const generateReport = () => {
  const numPatients = patients.length;
  const conditionsCount = {
    Diabetes: 0,
    Thyroid: 0,
    "High Blood Pressure": 0,
  };
  const genderConditionsCount = {
    Male: {
      Diabetes: 0,
      Thyroid: 0,
      "High Blood Pressure": 0,
    },
    Female: {
      Diabetes: 0,
      Thyroid: 0,
      "High Blood Pressure": 0,
    },
  };

  for (const patient of patients) {
    conditionsCount[patient.condition]++;
    genderConditionsCount[patient.gender][patient.condition]++;
  }

  report.innerHTML = `Number of patients: ${numPatients}<br><br>`;
  report.innerHTML += `Conditions Breakdown:<br>`;
  for (const condition in conditionsCount) {
    report.innerHTML += `${condition}: ${conditionsCount[condition]}<br>`;
  }

  report.innerHTML += `<br>Gender-Based Conditions:<br>`;
  for (const gender in genderConditionsCount) {
    report.innerHTML += `${gender}:<br>`;
    for (const condition in genderConditionsCount[gender]) {
      report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
    }
  }
};

const searchCondition = () => {
  const input = document.getElementById("conditionInput").value.toLowerCase();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  fetch("health_analysis.json")
    .then((response) => response.json())
    .then((data) => {
      const condition = data.conditions.find(
        (item) => item.name.toLowerCase() === input,
      );

      if (condition) {
        const symptoms = condition.symptoms.join(", ");
        const prevention = condition.prevention.join(", ");
        const treatment = condition.treatment;

        resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
        resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

        resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
        resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
        resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
      } else {
        resultDiv.innerHTML = "Condition not found.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      resultDiv.innerHTML = "An error occurred while fetching data.";
    });
};
const btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", searchCondition);

const btnGenerateReport = document.getElementById("btnGenerateReport");
btnGenerateReport.addEventListener("click", generateReport);

const btnDisplayReport = document.getElementById("btnDisplayReport");
btnDisplayReport.addEventListener("click", displayReport);

const btnResetForm = document.getElementById("btnResetForm");
btnResetForm.addEventListener("click", resetForm);
