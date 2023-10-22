import Patients from './patientInterface';

export function success(values: (string | number | string[])[]) {
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
    Save this unique token for your visit to be able to update info if necessary.<br>
    <br>
    Token: ${token}<br>
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
}

export function updatePatient(patientInfo: Patients) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Success - Animal Clinic</title>
  </head>
  
  <body>
    <form action="/success-page" method="POST">
      Name: <input type="text" name="name" value="${patientInfo.name}"><br>
      Species: <input type="text" name="species" value="${patientInfo.species}"><br>
      Age (In human years): <input type="text" name="age" value="${patientInfo.age}"><br>
      Sickness: <input type="text" name="sickness" value="${patientInfo.sickness}"><br>
      <br>
      <button type="submit">Update</button>
      <button type="reset">Reset</button>
    </form> <br>
    <button onclick="location.href = '/animal-clinic';">
      Go back
    </button>
  </body>
  </html>
  `
}