import http, { IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs/promises';
import * as crypto from 'node:crypto';
import * as querystring from 'node:querystring';
import pool from './database';
import { success, updatePatient, updateSuccess, allPatientsInfo } from './dynamicHTML';

async function handleRequest(request: IncomingMessage, response: ServerResponse) {
  const url = request.url;
  const method = request.method;

  console.log('Debugging -- url is', url, 'while method is', method);

  if (url === '/animal-clinic') {
    // main menu / homepage
    try {
      const contents = await fs.readFile("./index.html", "utf-8");

      response
        .writeHead(200, { 'Content-Type': 'text/html' })
        .end(contents.toString());
    } catch (error) {
      response
      .writeHead(500, { 'Content-Type': 'text/plain' })
      .end('Having trouble reading the index. Error: ' + error);
    }
  } else if (url === '/new-patient') {
    // shows the forms for adding a patient
    try {
      const contents = await fs.readFile("./new-patient.html", "utf-8");

      response
        .writeHead(200, { 'Content-Type': 'text/html' })
        .end(contents.toString());
    } catch (error) {
      response
      .writeHead(500, { 'Content-Type': 'text/plain' })
      .end('Having trouble reading the html form. Error: ' + error);
    }
  } else if (url === '/success-page' && method === 'POST') {
    // successfully added a patient to the db
    const token = crypto.randomBytes(32).toString('base64url');
    
    let requestData = '';

    try {
      request
        .on('data', (chunk) => {
          requestData += chunk.toString();
        })
        .on('end', () => {
          const data = querystring.parse(requestData);
          const date = new Date();
          
          const query = `
            INSERT INTO patients
            (name, species, age, sickness, created_at, token)
            VALUES ($1, $2, $3, $4, NOW(), $5)
          `;
      
          const values = [
            data.name!,
            data.species!,
            Number(data.age)!,
            data.sickness!,
            token!
          ]

          pool.query(query, values);

          response
          .writeHead(200, { 'Content-Type': 'text/html' })
          .end(success(values, date));
        });
    } catch (error) {
      response
      .writeHead(500, { 'Content-Type': 'text/plain' })
      .end('Having trouble adding the patient to database. Error: ' + error);
    }
  } else if (url === '/update-patient' && method === 'POST') {
    // shows the dynamic html for updating patient info

    let tokenInput = '';

    try {
      request
        .on('data', (chunk) => {
          tokenInput += chunk.toString();
        })
        .on('end', async () => {
          const query = `
            SELECT * FROM patients
            WHERE token = $1
          `;

          const token = tokenInput.slice(6);

          const result = await pool.query(query, [token]);
          const patientInfo = result.rows[0];
          
          response
            .writeHead(200, { 'Content-Type': 'text/html' })
            .end(updatePatient(patientInfo));
        })
    } catch (error) {
      response
        .writeHead(500, { 'Content-Type': 'text/plain' })
        .end('Invalid Token. Stop snooping around o_o');
    };
  } else if (url === '/success-update' && method === 'POST') {
    // successfully updated user info
    let requestUpdate = '';

    try {
      request
        .on('data', (chunk) => {
          requestUpdate += chunk.toString();
        })
        .on('end', () => {
          const date = new Date();
          const updatedData = querystring.parse(requestUpdate);
          
          const query = `
            UPDATE patients
            SET name = $1, species = $2, age = $3, sickness = $4, updated_at = NOW()
            WHERE token = $5
          `;
      
          const values = [
            updatedData.name!,
            updatedData.species!,
            Number(updatedData.age)!,
            updatedData.sickness!,
            updatedData.token!
          ]

          pool.query(query, values);

          response
          .writeHead(200, { 'Content-Type': 'text/html' })
          .end(updateSuccess(date));
        });
    } catch (error) {
      response
      .writeHead(500, { 'Content-Type': 'text/plain' })
      .end('Having trouble updating patient info. Error: ' + error);
    }
  } else if (url === '/patients') {
    // displays all the patients info
    const query = `
      SELECT * FROM patients
      ORDER BY id ASC
    `;

    try {
      const result = await pool.query(query);
      const allPatients = result.rows;

      response
        .writeHead(200, { 'Content-Type': 'text/html' })
        .end(allPatientsInfo(allPatients));
    } catch (error) {
      response
        .writeHead(500, { 'Content-Type': 'text/plain' })
        .end('Cannot retrieve all the patient infos. Error: ' + error);
    }
  } else {
    response
      .writeHead(500, { 'Content-Type': 'text/html' })
      .end('The (unexpected) url is: ' + url + '. Maybe try double checking the url? <a href="/animal-clinic">Click here to redirect to homepage.</a>');
  }
}

const server = http.createServer(handleRequest);

server.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});