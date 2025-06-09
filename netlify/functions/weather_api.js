const { log } = require("console");
const { json } = require("stream/consumers");

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const API_KEY = process.env.API_KEY;
exports.handler = async function(event, context) {
    const eventBody = JSON.parse(event.body);
    const location = eventBody.location;
    const apiResponse = await fetch(BASE_URL+location+"&appid="+API_KEY)
    .then(res=>res.json())
    .catch(error=>{
        return {
            statusCode: 404,
            body: JSON.stringify({
                message: error
            })
        }
    })
    // console.log("netlify func: ",apiResponse.Data);
    

    return {
        statusCode: 200,
        body: JSON.stringify({
            data: apiResponse
        })
    }
}