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


const uri = 'mongodb+srv://olek:zaqwsxcde@app.t3wuhzm.mongodb.net/?retryWrites=true&w=majority'
const {MongoClient} = require('mongodb')
const client = new MongoClient(uri)

const {
        getListOfTasks, 
        registerNewUser, 
        asignNewTaskToUser, 
        addNewTaskToDatabase, 
        getListOfUsers, 
        checkIfUserExists, 
        deleteAllTasks, 
        updateTaskStatus, 
        getIdFromDatabase, 
        updateIdFromDatabase,
        findUserInDatabase
    } = require('./DB/index.js')


// register and login panel

// getting new user from register form
app.post('/users', async (req, res) => {
    const NEW_USER_TO_REGISTER = req.body
    const EXISTING_USER = await checkIfUserExists(client, NEW_USER_TO_REGISTER)
    if (EXISTING_USER || NEW_USER_TO_REGISTER.login == '') return
    await registerNewUser(client, NEW_USER_TO_REGISTER)
    console.log('New user added' + NEW_USER_TO_REGISTER)
})

app.get('/users', async (req, res) => {
    const USERS_LIST = await getListOfUsers(client)
    res.send(USERS_LIST)
})

app.post('/tasks', async (req, res) => {
    console.log('adding new task')
    res.send(req.body)
    const NEW_TASK = req.body
    // await asignNewTaskToUser(client, NEW_TASK)
    await addNewTaskToDatabase(client, NEW_TASK)
})

app.post('/delete-all', (req, res) => {
    deleteAllTasks(client)
})

app.post('/update-task', async (req, res) => {
    res.send(req.body)
    const UPDATED_TASK = req.body
    await updateTaskStatus(client, UPDATED_TASK)
})


app.get('/get-tasks', async (req, res) => {
        const TASKS_LIST = await getListOfTasks(client)
        res.send(TASKS_LIST)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


app.get('/get-id', async (req, res) => {
    const generatedId = await getIdFromDatabase(client)
    res.send(generatedId)
})

app.post('/update-id', async (req, res) => {
    res.send(req.body)
    const updatedId = req.body
    await updateIdFromDatabase(client, updatedId)
})

app.post('/sign-in', async (req, res) => {
    const loginData = req.body
    const result = await findUserInDatabase(client, loginData)
    res.send(result)
})