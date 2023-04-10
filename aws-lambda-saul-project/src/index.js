'use strict';
const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));
module.exports.handler = async (event) => {

  let valorfinal = '';
  let request = "https://swapi.py4e.com/api/planets/?format=json";
  try {
    const response = await fetch(request);
    const data = await response.json();
    // for (const item of data.results) {
    //   console.log(item.name)
    // }

    valorfinal = data.results;
  } catch (e) {
      console.log(e)
  }

  var html = `<!DOCTYPE html>
                  <html>
                  <head>
                  <title> SERVER LESS SAUL </title>
                  </head>
                  <body>
                  <h1>API en Node.js con el framework Serverless Planets</h1>
                  <table border=1 class="w3-table-all w3-small">`;
                    html += `<tr>
                                <th colspan="2">Clima</th>
                                <th colspan="2">Nombre</th>
                                <th colspan="2">Fecha Creacion</th>
                                <th colspan="2">Diametro</th>
                                <th colspan="2">Fecha Actulizado</th>
                                <th colspan="2">Gravedad</th>
                                <th colspan="2">Periodo Orbital</th>
                                <th colspan="2">Poblacion</th>
                                <th colspan="2">Periodo Rotacion</th>
                                <th colspan="2">Superficie del Agua</th>
                                <th colspan="2">Terreno</th>
                                <th colspan="2">url</th>
                            </tr>`;
                            
                            var tr = "";
                            for (const item of valorfinal) {
                              tr += "<tr>";
                              tr += `<td colspan="2">${item.climate}</td>`;
                              tr += `<td colspan="2">${item.name}</td>`;
                              tr += `<td colspan="2">${item.create}</td>`;
                              tr += `<td colspan="2">${item.diameter}</td>`;
                              tr += `<td colspan="2">${item.edited}</td>`;
                              tr += `<td colspan="2">${item.gravity}</td>`;
                              tr += `<td colspan="2">${item.orbital_period}</td>`;
                              tr += `<td colspan="2">${item.population}</td>`;
                              tr += `<td colspan="2">${item.rotation_period}</td>`;
                              tr += `<td colspan="2">${item.surface_water}</td>`;
                              tr += `<td colspan="2">${item.terrain}</td>`;
                              tr += `<td colspan="2">${item.url}</td>`;
                              tr += "</tr>"
                            }
                            
                    html += tr + `</table></body></html>`
    return {
      statusCode: 200,
      body: html,
      headers: {
        "Content-Type": "text/html",
      },
    };
};
