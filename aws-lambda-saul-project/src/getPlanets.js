const AWS = require('aws-sdk');

const getPlanets = async (event) => {

    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const result = await dynamodb.scan({
            TableName: 'planetsTable'
        }).promise()

        const planets = result.Items

        return {
            status: 200,
            body: { planets }
        }

    } catch (error) {
        console.log(error);
    }


}

module.exports = {
    getPlanets,
}