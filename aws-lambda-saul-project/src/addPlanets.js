'use strict';
const { v4 } = require('uuid')
const AWS = require('aws-sdk');
const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));

const addPlanets = async(event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient(); 
    const { token } = JSON.parse(event.body);

    let mensajes = "Se inserto correctamente";
    let statuss = 200;

if(token == 10052023){
    let request = "https://swapi.py4e.com/api/planets/?format=json";
    try {
        let createAt = new Date()
        // let id = v4()
        const response = await fetch(request);
        const data = await response.json();

        const newPlanets = [];
        let oldPlanets ;
        let PutRequest;
      for (const item of data.results) {
        oldPlanets = {
            "id": v4(),
            "nombre":item.name,
            "clima":item.climate,
            "diametro":item.diameter,
            "gravedad":item.gravity,
            "periodo_orbital":item.orbital_period,
            "poblacion":item.population,
            "periodo_rotacion":item.rotation_period,
            "superficie_agua":item.surface_water,
            "terreno":item.terrain,
            "url":item.url,
            "createAt":createAt
        }

        PutRequest = {
            Item : oldPlanets
        }
        
        newPlanets.push({PutRequest:PutRequest})
      }
const table = "planetsTable";
const params = {
  RequestItems: {
    [table]: [newPlanets]
  }
};
      const results = await dynamodb.batchGet(params).promise();
      console.log(JSON.stringify(results, null, 2));
    //   await dynamodb.put({TableName: 'planetsTable',Item:newPlanets}).promise()
    } catch (e) {
        console.log(e)
        mensajes = "Ocurrio un erro al guardar";
        statuss = 404;
    }
}else{
    mensajes = "Token incorrecto";
    statuss = 500;
}
    return {
        status: statuss,
        // body: JSON.stringify(newPlanets),
        body:{
            mensaje: mensajes
        }
    };
};

module.exports = {
    addPlanets,
}
