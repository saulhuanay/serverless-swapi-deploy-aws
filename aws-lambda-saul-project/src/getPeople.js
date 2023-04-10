'use strict';
const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));

const getPeople = async(event) => {
    
  let valorfinal = '';
  let request = "https://swapi.py4e.com/api/people/?format=json";
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
                  <h1>API en Node.js con el framework Serverless People</h1>
                  <table border=1 class="w3-table-all w3-small">`;
                    html += `<tr>
                                <th colspan="2">Nombre</th>
                                <th colspan="2">Altura</th>
                                <th colspan="2">Masa</th>
                                <th colspan="2">Color Pelo</th>
                                <th colspan="2">Color Piel</th>
                                <th colspan="2">Color Ojos</th>
                                <th colspan="2">Anio Nacimiento</th>
                                <th colspan="2">Genero</th>
                                <th colspan="2">Mundo Natal</th>
                            </tr>`;
                            
                            var tr = "";
                            for (const item of valorfinal) {
                              tr += "<tr>";
                              tr += `<td colspan="2">${item.name}</td>`;
                              tr += `<td colspan="2">${item.height}</td>`;
                              tr += `<td colspan="2">${item.mass}</td>`;
                              tr += `<td colspan="2">${item.hair_color}</td>`;
                              tr += `<td colspan="2">${item.skin_color}</td>`;
                              tr += `<td colspan="2">${item.eye_color}</td>`;
                              tr += `<td colspan="2">${item.birth_year}</td>`;
                              tr += `<td colspan="2">${item.gender}</td>`;
                              tr += `<td colspan="2">${item.homeworld}</td>`;
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


module.exports = {
    getPeople,
}