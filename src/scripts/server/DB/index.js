const mongoose = require('mongoose');
const {MongoClient} = require('mongodb')
const uri = 'mongodb+srv://olek:zaqwsxcde@app.t3wuhzm.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri)
const usersCollection = client.db('wsb_app_database').collection('usersList')
const tasksCollection = client.db('wsb_app_database').collection('tasksList')
const generatedId = client.db('wsb_app_database').collection('taskIdGenerator')
const ObjectId = require('mongodb').ObjectId

async function deleteAllTasks(client) {
    try {
        client.connect()
        const result = await tasksCollection.deleteMany({})
        return result
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
     }
}

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
        await client.close()
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
        await client.close()
    }
}

async function registerNewUser(client, newUser) {
    try {
        await client.connect()
        const result = await usersCollection.insertOne(newUser)
        return result
    } catch (e) {
        console.error(e)
    } finally {
        console.log('New user registered')
        await client.close()
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
        await client.close()
    }
}

async function addNewTaskToDatabase(client, newTask) {
    try {
        await client.connect()
        await tasksCollection.insertOne(newTask)
        const result = await tasksCollection.find({}).toArray()
        return result
    } catch (e) {
        console.error(e)
    } finally {
        console.log('new task added')
        await client.close()
    }
}

async function deleteTask(client, TASK_TO_DELETE) {
    const {_id} = TASK_TO_DELETE

    try {
        await tasksCollection.deleteOne({"_id": ObjectId(_id)})
        console.log(`Deleting task: ${_id}`)
        const result = await tasksCollection.find({}).toArray()
        return result
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

async function updateTaskStatus(client, UPDATED_TASK) {
    const {_id, title, description, status} = UPDATED_TASK

    try {
        await client.connect()
        await tasksCollection.updateOne({"_id": ObjectId(_id)}, {$set:{title: title, description:description, status:status}})
        console.log(`Updating task ${_id}`)
        const result = await tasksCollection.find({}).toArray()
        return result
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

async function getIdFromDatabase(client) {
    try {
        await client.connect()
        const result = await generatedId.findOne({})
        return result
    } catch (e) {
        console.log(e)
    } finally {
        await client.close()
    }
}

async function updateIdFromDatabase(client, updatedId) {
    const id = updatedId.updatedId
    try {
        await client.connect()
        const result = await generatedId.updateOne({}, {$set:{id:id}})
        return result
    } catch (e) {
        console.log(e)
    } finally {
        await client.close()
    }
}

async function findUserInDatabase(client, loginData) {
    const {login, password} = loginData
    try {
        await client.connect()
        const result = await usersCollection.findOne({login:login, password:password})
        return result
    } catch (e) {
        console.error(e)        
    } finally {
        await client.close()
    }
}


module.exports = MongoClient
module.exports = {
    findUserInDatabase: findUserInDatabase,
    updateIdFromDatabase: updateIdFromDatabase,
    getIdFromDatabase: getIdFromDatabase,
    getListOfUsers: getListOfUsers, 
    checkIfUserExists: checkIfUserExists,
    deleteAllTasks: deleteAllTasks,
    addNewTaskToDatabase: addNewTaskToDatabase,
    registerNewUser: registerNewUser,
    getListOfTasks: getListOfTasks,
    updateTaskStatus: updateTaskStatus,
    deleteTask: deleteTask
}