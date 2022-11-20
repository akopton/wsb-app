const mongoose = require('mongoose');
const {MongoClient} = require('mongodb')
const uri = 'mongodb+srv://olek:zaqwsxcde@app.t3wuhzm.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri)
const usersCollection = client.db('wsb_app_database').collection('usersList')
const tasksCollection = client.db('wsb_app_database').collection('tasksList')
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
        console.log('New user registered')
        return result
    } catch (e) {
        console.error(e)
    } finally {
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
        const result = await tasksCollection.insertOne(newTask)
        console.log('task added')
        return result
    } catch (e) {
        console.error(e)
    } finally {
        // await client.close()
    }
}


async function updateTaskStatus(client, UPDATED_TASK) {
    const {status} = UPDATED_TASK
    const {title} = UPDATED_TASK
    const {id} = UPDATED_TASK
    try {
        await client.connect()
        if (status == 'delete') {
            const result = await tasksCollection.deleteOne({"_id": ObjectId(id)})
            console.log(`Deleting task: ${title}`)
            return result
        }
        const result = await tasksCollection.updateOne({"_id": ObjectId(id)}, {$set:{status:status}})
        console.log(`Updating task ${id}`)
        return result
    } catch (e) {
        console.error(e)
    } finally {
        // await client.close()
    }
}


module.exports = MongoClient
module.exports = {
    getListOfUsers: getListOfUsers, 
    checkIfUserExists: checkIfUserExists,
    deleteAllTasks:deleteAllTasks,
    addNewTaskToDatabase:addNewTaskToDatabase,
    // asignNewTaskToUser:asignNewTaskToUser,
    registerNewUser:registerNewUser,
    getListOfTasks:getListOfTasks,
    updateTaskStatus:updateTaskStatus
}