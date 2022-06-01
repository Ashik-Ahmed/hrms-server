const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;


const app = express();

// use middleware 
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://itbl:Itbl2018@cluster0.igytg6t.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

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