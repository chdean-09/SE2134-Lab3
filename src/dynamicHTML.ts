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
    Age: ${age}<br>
    Sickness: ${sickness}<br>

    <button onclick="location.href = '/animal-clinic';">
      Go back
    </button>
  </body>
  </html>
  `
}