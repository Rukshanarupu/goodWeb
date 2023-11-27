const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors');
const port = process.env.PORT || 5000;
const multer = require('multer');

// middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wko3ipe.mongodb.net/?retryWrites=true&w=majority`;
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
    // await client.connect();
    const styleCollection = client.db("goodWebDb").collection("styles");
    const careerCollection = client.db("goodWebDb").collection("careers");
    const jobApplicationCollection = client.db("goodWebDb").collection("jobApplication");
    const serviceCollection = client.db("goodWebDb").collection("serviceData");
    const bannerCollection = client.db("goodWebDb").collection("slides");
    const countryCodeCollection = client.db("goodWebDb").collection("countryCode");
    
    
    // ......................style details......................
    app.get('/styles', async(req,res)=>{
      const result= await styleCollection.find().toArray()
      res.send(result)
      // console.log(result)
    })
    app.patch("/update-style/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const body = req.body;
        const styleInfo = await styleCollection.findOne(query);
        if (!styleInfo) {
          return res.status(404).json({ error: 'Information not found' });
        }
        const updateDoc = {
          $set: {
            logo_url: body.logo_url,
            color_code: body.color_code
          },
        };   
        const result = await styleCollection.updateOne(styleInfo, updateDoc);
        const updatedStyle = await styleCollection.findOne(query);
        // res.send(result);
        res.status(200).json({ message: 'Style updated successfully', style: updatedStyle });
      } 
      catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // app.post("/addBanner", async (req, res) => {
    //   const banner = req.body;
    //   console.log(banner);
    
    //   const result = await bannerCollection.insertOne(banner);
    //   res.send(result);
    // });
    app.get('/banners', async(req,res)=>{
      const result= await bannerCollection.find().toArray()
      res.send(result)
      // console.log(result)
    })

    // ......................carrier details......................
    app.post('/addAJob',async(req,res)=>{
      const data=req.body
      // console.log(data)
      const result=await careerCollection.insertOne(data)
      res.send(result)
    })
    app.get('/careers', async(req,res)=>{
      const result= await careerCollection.find().toArray()
      res.send(result)
    })
    app.get('/careers/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const options = {
          projection: { title: 1, about_title: 1, benefit: 1, deadline: 1, department: 1, employment_type: 1, experience: 1, instructions: 1, responsibility: 1, job_req: 1, salary_range: 1, vacancy: 1, education: 1},
        };
        const result = await careerCollection.findOne(query, options);
        res.send(result);
        // console.log(result);
      }
      catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    app.delete("/careers/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await careerCollection.deleteOne(query);
      res.send(result);
    });

    app.post('/appliedJobs',async(req,res)=>{
      const data=req.body
      // console.log(data)
      const result=await jobApplicationCollection.insertOne(data)
      res.send(result)
    })
    app.get('/appliedJobs',async(req,res)=>{
      const result= await jobApplicationCollection.find().toArray()
      res.send(result)
    })
    app.get('/countryCodeOptions',async(req,res)=>{
      const result= await countryCodeCollection.find().toArray()
      res.send(result)
      console.log(result)
    })

    // ......................Service details......................
    app.get('/services', async(req,res)=>{
      const result= await serviceCollection.find().toArray()
      res.send(result)
    })
    app.get('/services/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const options = {
          projection: { title: 1, text: 1, services: 1, _id: 1, id: 1 },
        };
        const result = await serviceCollection.findOne(query, options);
        res.send(result);
        // console.log(result);
      }
      catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
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