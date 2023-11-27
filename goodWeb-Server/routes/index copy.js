const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
const multer = require('multer');
const path = require('path');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wko3ipe.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.emaoomz.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const jobApplicationCollection = client.db("goodWebDb").collection("jobApplication");

    // ......................carrier details......................

    app.get('/countryCodeOptions',async(req,res)=>{
      const result= await countryCodeCollection.find().toArray()
      res.send(result)
    })
    // app.post('/appliedJobs', upload.single('resume'), async (req, res) => {
    //   const resume = req.file ? req.file.path : null;
    //   const coverLetter = req.file ? req.file.path : null;
    //   const data = { ...req.body, resume, coverLetter};

    //   const result = await jobApplicationCollection.insertOne(data);
    //   res.send(result);
    // });
    app.post('/appliedJobs',async(req,res)=>{
      const data=req.body
      // console.log(data)
      const result=await jobApplicationCollection.insertOne(data)
      res.send(result)
    })
    app.get('/appliedJobs',async(req,res)=>{
      const result= await jobApplicationCollection.find().toArray()
      res.send(result)
      // console.log(result)
    })
  
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Good Web Solution is running')
})

app.listen(port, () => {
  console.log(`Good Web Solution is running on port ${port}`);
})