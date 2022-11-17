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
    await addNewTask(client, NEW_TASK)

    // try {
    //     const NEW_TASK = await addNewTask(client, req.body)
    //     return NEW_TASK
    // } catch (e) {
    //     console.log(e)
    // }

})

app.post('/delete-all', (req, res) => {
    deleteAllTasks(client)
})

 async function deleteAllTasks(client) {
    try {
        client.connect()
        const result = await tasksCollection.deleteMany({})
        return result
    } catch (e) {
        console.error(e)
    } finally {
        client.close()
     }
}


app.get('/get-tasks', async (req, res) => {
    try {
        const TASKS_LIST = await getListOfTasks(client)
        res.send(TASKS_LIST)
    } catch (e) {
        console.error(e)
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

async function checkIfUserExists(client, newUser) {
    try {
        await client.connect()
        const result = await usersCollection.findOne({login: newUser.login})
        if (result == null) return false
        else {
            return true
        }
    } catch (e) {
        console.error(e)
    } finally {
        client.close()
    }
}

async function getListOfUsers(client) {
    try {
        await client.connect()
        const result = await usersCollection.find({}).toArray()
        return result
    } catch (e) {
        console.error(e)
    } finally {
        client.close()
    }
}

async function registerNewUser(client, newUser) {
    try {
        await client.connect()
        const result = await usersCollection.insertOne(newUser)
        console.log('New user registered')
        return result
    } catch (e) {
        console.error(e)
    } finally {
        client.close()
    }
}

async function getListOfTasks(client) {
    try {
        await client.connect()
        const result = await tasksCollection.find({}).toArray()
        return result
    } catch (e) {
        console.error(e)
    } finally {
        // client.close()
    }
}

async function addNewTask(client, newTask) {
    try {
        await client.connect()
        const result = await tasksCollection.insertOne(newTask)
        console.log('task added')
        return result
    } catch (e) {
        console.error(e)
    } finally {
        client.close()
    }
}





