import Patients from './patientInterface';

// minor logic for update date
function updatedInfoLogic(updateDate: string | null) {
  if (updateDate === null) {
    return `Never`;
  } else {
    return updateDate;
  }
};

// succesfully added the info to the db
export function success(values: (string | number | string[])[], date: Date) {
  const [name, species, age, sickness, token] = values;

  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Success - Animal Clinic</title>
  </head>
  
  <body>
    Your animal has been successfully added. Thank you for choosing our services!<br>
    Save this unique token to be able to update patient info if necessary.<br>
    <span style="font-weight: bold;">
      Token: ${token}<br>
    </span>
    Time and Date Created: ${date}<br>
    <br>
    Patient Info Summary:<br>
    Name: ${name}<br>
    Species: ${species}<br>
    Age (In human years): ${age}<br>
    Sickness: ${sickness}<br>

    <button onclick="location.href = '/animal-clinic';">
      Go back
    </button>
  </body>
  </html>
  `
};

// dynamic html for update patient UI
export function updatePatient(patientInfo: Patients) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Info - Animal Clinic</title>
  </head>
  
  <body>
  <span style="font-weight: bold;">
    UPDATE PATIENT INFO
  </span><br><br>
    Token: ${patientInfo.token}<br>
    Created on: ${patientInfo.created_at}<br>
    Last Updated on: ${updatedInfoLogic(patientInfo.updated_at)}<br>
    <br>
    <form action="/success-update" method="POST" onsubmit="return validateForm()">
      Name: <input type="text" name="name" value="${patientInfo.name}"><br>
      Species: <input type="text" name="species" value="${patientInfo.species}"><br>
      Age (In human years): <input type="text" name="age" value="${patientInfo.age}"><br>
      Sickness: <input type="text" name="sickness" value="${patientInfo.sickness}"><br>
      <input type="hidden" name="token" value="${patientInfo.token}">
      <br>
      <button type="submit">Update</button>
      <button type="reset">Reset</button>
    </form><br>
    <button onclick="location.href = '/animal-clinic';">
      Go back
    </button>
    <script>
      function validateForm() {
        if (
          document.querySelector('input[name="name"]').value === "${patientInfo.name}" &&
          document.querySelector('input[name="species"]').value === "${patientInfo.species}" &&
          document.querySelector('input[name="age"]').value === "${patientInfo.age}" &&
          document.querySelector('input[name="sickness"]').value === "${patientInfo.sickness}"
        ) {
          alert("No changes detected, cannot update info.");
          return false;
        } else {
          return true;
        }
      }
    </script>
  </body>
  </html>
  `
};


// succesfully updated patient info
export function updateSuccess(date: Date) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Success - Animal Clinic</title>
  </head>
  
  <body>
    Your info has been successfully updated.<br>
    Time of update: ${date}<br>
    <br>
    <button onclick="location.href = '/animal-clinic';">
      Go back
    </button>
  </body>
  </html>
  `
};

// display all the patients info
export function allPatientsInfo(patients: Patients[]) {
  let number = 1;
  let html = `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All Patient Details</title>
  </head>
  
  <body>
  <span style="font-weight: bold;">PATIENT INFOS FROM THE DATABASE:</span><br>
  <br>
  `;

  patients.forEach((patient) => {html +=`
    ${number}. <span style="font-weight: bold;">${patient.name}</span> (Token: ${patient.token})<br>
    Species: ${patient.species}<br>
    Age: ${Number(patient.age)}<br>
    Sickness: ${patient.sickness}<br>
    Created on: ${patient.created_at}<br>
    Last updated on: ${updatedInfoLogic(patient.updated_at)}<br>
    <br>
    `
    number++;
  });

  html += `
  <button onclick="location.href = '/animal-clinic';">
    Go back
  </button>
  </body>
  </html>
  `;

  return html;
};