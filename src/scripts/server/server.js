const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const request = require('request')
dotenv.config();
const app = express()
const port = 8888

app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())
app.use(cors());
app.use(express.json())



const mongoose = require('mongoose');
const {MongoClient} = require('mongodb')
const uri = 'mongodb+srv://olek:zaqwsxcde@app.t3wuhzm.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri)
const usersCollection = client.db('wsb_app_database').collection('usersList')
const tasksCollection = client.db('wsb_app_database').collection('tasksList')

// register and login panel
let NEW_USER_TO_REGISTER
let EXISTING_USER
let USERS_LIST


// getting new user from register form
app.post('/users', async (req, res) => {
    console.log('it works' )
    res.send(req.body)
    NEW_USER_TO_REGISTER = req.body
    await checkIfUserExists(client, NEW_USER_TO_REGISTER)
    if (EXISTING_USER || NEW_USER_TO_REGISTER.login == '') return
    await registerNewUser(client, NEW_USER_TO_REGISTER)
})

// checking if user's login already exists in database
async function checkIfUserExists(client, newUser) {
    try {
        await client.connect()
        const result = await usersCollection.findOne({login: newUser.login})
        if (result == null) EXISTING_USER = false
        else {
            EXISTING_USER = true
            EXISTING_USER_LOGIN = result
        }
    } catch (e) {
        console.error(e)
    } 
}

// inserting new user to collection usersList
async function registerNewUser(client, newUser) {
    try {
        await client.connect()
        const result = await usersCollection.insertOne(newUser)
        console.log('New user registered')
        return result
    } catch (e) {
        console.error(e)
    } 
}


app.get('/users', (req, res) => {
})

app.get('/', async (req, res) => {
    res.send(USERS_LIST)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})



// adding new task to collection

app.post('/tasks', (req, res) => {
    console.log('adding new task')
    res.send(req.body)
    const newTask = req.body
    addNewTask(client, newTask)
})

async function addNewTask(client, newTask) {
    try {
        await client.connect()
        const result = tasksCollection.insertOne(newTask)
        return result
    } catch (e) {
        console.error(e)
    } 
}




async function getListOfUsers(client) {
    try {
        await client.connect()
        const result = await usersCollection.find({}).toArray()
        USERS_LIST = result
    } catch (e) {
        console.error(e)
    }
}

getListOfUsers(client)


