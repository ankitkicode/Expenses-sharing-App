const mongoose = require('mongoose')
const dbPath = process.env.DB_PATH

const dbConnection = async () => {
    try {
        await mongoose.connect(dbPath)
        console.log('Connected to database')
    } catch (error) {
        console.log('Error connecting to database')
    }
}

module.exports = dbConnection;