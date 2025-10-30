const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 4000;

// middleware
app.use(cors())
app.use(express.json())

// mongoDB connect url
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@simple-crud-server.1orocpb.mongodb.net/${process.env.DB_NAME}?appName=simple-crud-server`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// main mongodb setup
async function run() {
    try {
        await client.connect();
        await client.db('admin').command({ping: 1});
        console.log('MongoDB connect successful');
    } catch (error) {
        console.log(error);
    }


    const taskDB = client.db(process.env.DB_NAME);
    const tasksCollection = taskDB.collection('allTasks')

    app.post('/tasks', async (req, res) => {
        console.log('After post', req.body);
        const newTask = req.body
        newTask.status = 'pending'
        console.log(newTask);

        const result = await tasksCollection.insertOne(newTask)

        res.send(result)
    })
    app.patch('/tasks', async (req, res) => {
        console.log('After post', req.body);
        const newTask = req.body
        const id = newTask.id
        const query = {_id: new ObjectId(id)}
        const update = {$set:{title: newTask.title, description: newTask.description, deadline: newTask.deadline}}
        console.log(newTask);

        const result = await tasksCollection.updateOne(query, update)

        res.send(result)
    })

    app.delete('/task/:id', async (req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}

        const result = await tasksCollection.deleteOne(query)

        res.send(result)

    })
    app.patch('/task/:id', async (req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const update = {$set:{status: 'complete'}}
        const result = await tasksCollection.updateOne(query, update)

        res.send(result)

    })

    app.get('/task-flow/pending', async (req, res) => {
        const query = {status: 'pending'}
        const cursor = tasksCollection.find(query)
        const result = await cursor.toArray()
        res.send(result)
    })

    app.get('/task-flow/complete', async (req, res) => {
        const query = {status: 'complete'}
        const cursor = tasksCollection.find(query)
        const result = await cursor.toArray()
        res.send(result)
    })

}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('This task server')
})


app.listen(port, () => {
    console.log('task management server is running on port:', port);
})