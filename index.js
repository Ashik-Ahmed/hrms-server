const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;


const app = express();

// use middleware 
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.igytg6t.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();

        const userCollection = client.db('itbl-hrms').collection('users');
        const leaveCollection = client.db('itbl-hrms').collection('leave');

        // add a new user 
        app.post('/add-user', async (req, res) => {
            const newUser = req.body;
            const email = newUser.email;
            const existedUser = await userCollection.find({ email }).toArray();
            if (existedUser.length > 0) {
                res.send({ message: 'user already registered' })
            }
            else {
                const result = await userCollection.insertOne(newUser);
                res.send(result);
            }
        })

        // get all users 
        app.get('/users', async (req, res) => {
            const query = {};
            const users = await userCollection.find(query).toArray();
            res.send(users);
        })

        //get specific user by id
        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const user = await userCollection.findOne(query);
            res.send(user);
        })

        //delete a user from db
        app.delete('/delete-user/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
        })

        //login 
        app.post('/login', async (req, res) => {
            const user = req.body;
            const userExisted = await userCollection.find(user).toArray();
            if (userExisted.length > 0) {
                res.send(userExisted)
            }
            else {
                res.send({ message: 'User Not found' });
            }
        })


        // add new leave application to db 
        app.post('/leave-apply', async (req, res) => {
            const application = req.body;
            const result = await leaveCollection.insertOne(application);
            res.send(result);
        })

        // get all leaves
        app.get('/manage-leaves', async (req, res) => {
            const query = {};
            const leaves = await leaveCollection.find(query).toArray();
            res.send(leaves);
        })


    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('ITBL HRMS Server is running')
});

app.listen(port, () => {
    console.log('Server is running on console')
});