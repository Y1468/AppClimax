import axios from "axios";

//Chave=954563c03273dfd5e4caf83cdd531d03
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

let Api=axios.create({
    baseURL:'https://api.openweathermap.org/data/2.5'
})

export{Api}