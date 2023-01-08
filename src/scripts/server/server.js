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
        addNewTaskToDatabase, 
        getListOfUsers, 
        checkIfUserExists, 
        updateTaskStatus, 
        getIdFromDatabase, 
        updateIdFromDatabase,
        findUserInDatabase,
        deleteTask
    } = require('./DB/index.js')



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


app.get('/users', async (req, res) => {
    const USERS_LIST = await getListOfUsers(client)
    res.send(USERS_LIST)
})

app.post('/tasks', async (req, res) => {
    console.log('adding new task')
    const NEW_TASK = req.body
    const NEW_TASKS_LIST = await addNewTaskToDatabase(client, NEW_TASK)
    res.send(NEW_TASKS_LIST)
})

app.post('/update-task', async (req, res) => {
    const UPDATED_TASK = req.body
    const UPDATED_TASKS_LIST = await updateTaskStatus(client, UPDATED_TASK)
    res.send(UPDATED_TASKS_LIST)
})

app.post('/delete-task', async (req, res) => {
    const TASK_TO_DELETE = req.body
    const UPDATED_TASKS_LIST = await deleteTask(client, TASK_TO_DELETE)
    res.send(UPDATED_TASKS_LIST)
})

app.get('/get-tasks', async (req, res) => {
        const TASKS_LIST = await getListOfTasks(client)
        res.send(TASKS_LIST)
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

app.post('/register', async (req, res) => {
    const NEW_USER_TO_REGISTER = req.body
    const EXISTING_USER = await checkIfUserExists(client, NEW_USER_TO_REGISTER)
    res.send(EXISTING_USER)
    if (EXISTING_USER) return
    await registerNewUser(client, NEW_USER_TO_REGISTER)
})

