const fs = require('fs');

const DATA_PATH = './database.json';


const saveDataToFile = (data) =>{
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(DATA_PATH, stringifyData)
}

const getUsersFromFile = () => {
    const jsonData = fs.readFileSync(DATA_PATH)
    return JSON.parse(jsonData).users  
      
}

module.exports = {
    saveDataToFile,
    getUsersFromFile
}