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

    const dbName = 'wsb_app_database'
    const db = client.db(dbName)
    const usersCollection = db.collection('users_collection')
    const tasksCollection = db.collection('tasks_collection')
    const generatedId = db.collection('taskIdGenerator')
    const ObjectId = require('mongodb').ObjectId

    async function checkIfUserExists(client, newUser) {
        try {
            await client.connect()
            const result = await usersCollection.findOne({ login: newUser.login })
            if (result == null) return false
            else return true
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
            console.log(`New user registered: ${newUser.login}`)
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

    // async function getTasksLists(client) {
    //     try {
    //         await client.connect()
    //         const result = await taskListsCollection.find({}).toArray()
    //         return result
    //     } catch (e) {
    //         console.error(e)
    //     } finally {
    //         client.close()
    //     }
    // }

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
        const { _id } = TASK_TO_DELETE

        try {
            await tasksCollection.deleteOne({ "_id": ObjectId(_id) })
            const result = await tasksCollection.find({}).toArray()
            return result
        } catch (e) {
            console.error(e)
        } finally {
            console.log(`Task deleted: ${_id}`)
            await client.close()
        }
    }

    async function updateTaskStatus(client, UPDATED_TASK) {
        const { _id, title, description, status } = UPDATED_TASK

        try {
            await client.connect()
            await tasksCollection.updateOne({ "_id": ObjectId(_id) }, { $set: { title: title, description: description, status: status } })
            const result = await tasksCollection.find({}).toArray()
            return result
        } catch (e) {
            console.error(e)
        } finally {
            console.log(`Task updated: ${_id}`)
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
            const result = await generatedId.updateOne({}, { $set: { id: id } })
            return result
        } catch (e) {
            console.log(e)
        } finally {
            await client.close()
        }
    }

    async function findUserInDatabase(client, loginData) {
        const { login, password } = loginData
        try {
            await client.connect()
            const result = await usersCollection.findOne({ login: login, password: password })
            return result
        } catch (e) {
            console.error(e)
        } finally {
            await client.close()
        }
    }

    async function updateUser(client, data) {
        const { _id, password, settings: { taskDaysLeft } } = data
        try {
            await client.connect()
            const result = await usersCollection.updateOne({ "_id": ObjectId(_id) }, { $set: { password: password, settings: { taskDaysLeft: taskDaysLeft } } })
            return result
        } catch (e) {
            console.error(e)
        } finally {
            await client.close
        }
    }

    async function deleteUser(client, id) {
        try {
            await client.connect()
            const result = await usersCollection.deleteOne({ "_id": ObjectId(id) })
            return result
        } catch (e) {
            console.error(e)
        } finally {
            client.close()
        }
    }

    module.exports = MongoClient
    module.exports = {
        findUserInDatabase: findUserInDatabase,
        updateIdFromDatabase: updateIdFromDatabase,
        getIdFromDatabase: getIdFromDatabase,
        getListOfUsers: getListOfUsers,
        checkIfUserExists: checkIfUserExists,
        addNewTaskToDatabase: addNewTaskToDatabase,
        registerNewUser: registerNewUser,
        getListOfTasks: getListOfTasks,
        updateTaskStatus: updateTaskStatus,
        deleteTask: deleteTask,
        updateUser: updateUser,
        deleteUser: deleteUser
    }
} else {
    console.log('błąd')
}
