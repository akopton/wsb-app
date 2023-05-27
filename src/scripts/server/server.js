const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express()
const port = 8888

dotenv.config()
app.use(cors())
app.use(express.json())


const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_URL = process.env.DB_URL

if (DB_USERNAME && DB_PASSWORD && DB_URL) {
    const connectionString = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_URL}`

    const { MongoClient } = require('mongodb')
    const client = new MongoClient(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

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
        deleteTask,
        updateUser,
        deleteUser
    } = require('./DB/database.js');



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
        const GENERATED_ID = await getIdFromDatabase(client)
        res.send(GENERATED_ID)
    })

    app.post('/update-id', async (req, res) => {
        res.send()
        const UPDATED_ID = req.body
        await updateIdFromDatabase(client, UPDATED_ID)
    })

    app.post('/sign-in', async (req, res) => {
        const LOGIN_DATA = req.body
        const result = await findUserInDatabase(client, LOGIN_DATA)
        res.send(result)
    })

    app.post('/register', async (req, res) => {
        const NEW_USER_TO_REGISTER = req.body
        const EXISTING_USER = await checkIfUserExists(client, NEW_USER_TO_REGISTER)
        res.send(EXISTING_USER)
        if (EXISTING_USER) return
        await registerNewUser(client, NEW_USER_TO_REGISTER)
    })

    app.post('/update-user', async (req, res) => {
        const USER_DETAILS = req.body
        const result = await updateUser(client, USER_DETAILS)
        res.send(result)
    })

    app.post('/delete-user', async (req, res) => {
        const id = req.body
        const result = await deleteUser(client, id)
        res.send(result)
    })

} else {
    console.log('Missing environment variables');
}