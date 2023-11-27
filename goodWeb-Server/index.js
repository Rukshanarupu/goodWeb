const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000 //4000;
const multer = require('multer');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});
const upload = multer({ storage: storage });
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
    const achievementCollection = client.db("goodWebDb").collection("achievements");
    const portfolioCollection = client.db("goodWebDb").collection("portfolios");
    const successCollection = client.db("goodWebDb").collection("success");
    const contactCollection = client.db("goodWebDb").collection("contacts");
    const userCollection = client.db("goodWebDb").collection("users");
    
    
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

    // ......................Banner details......................
    app.post("/addBanner", async (req, res) => {
      const banner = req.body;
      // console.log(banner);
      const result = await bannerCollection.insertOne(banner);
      // res.send(result);
    });
    app.get('/banners', async(req,res)=>{
      const result= await bannerCollection.find().toArray()
      res.send(result)
      // console.log(result)
    })
    app.delete("/deletedBanner/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bannerCollection.deleteOne(query);
      res.send(result);
    });

    // ......................Awards details......................
    // app.post("/addAchievement", async (req, res) => {
    //   const achievement = req.body;
    //   // console.log(achievement);
    //   const result = await achievementCollection.insertOne(banner);
    //   res.send(result);
    // });
    app.get('/achievements', async(req,res)=>{
      const result= await achievementCollection.find().toArray()
      res.send(result)
      // console.log(result)
    })
    app.patch("/updateAchievements/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const body = req.body;
        const achieveInfo = await achievementCollection.findOne(query);
        if (!achieveInfo) {
          return res.status(404).json({ error: 'Information not found' });
        }
        const updateDoc = {
          $set: { icon: body.icon, title: body.title, count: body.count },
        };   
        const result = await achievementCollection.updateOne(achieveInfo, updateDoc);
        const updatedInfo = await achievementCollection.findOne(query);
        // res.send(result);
        res.status(200).json({ message: 'Information updated successfully', style: updatedInfo });
      } 
      catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // ......................carrier details......................
    app.post('/postAJob',async(req,res)=>{
      const data=req.body
      const result=await careerCollection.insertOne(data)
      res.send(result)
      // console.log(data)
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
          projection: { title: 1, about_position: 1, benefit: 1, deadline: 1, department: 1, employment_type: 1, workplace_type: 1, experience: 1, instructions: 1, responsibility: 1, job_req: 1, salary: 1, vacancy: 1, education: 1},
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
    app.delete("/deletedCareer/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await careerCollection.deleteOne(query);
      res.send(result);
    });
    app.patch("/updateCareer/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const body = req.body;
        const careerInfo = await careerCollection.findOne(query);
        if (!careerInfo) {
          return res.status(404).json({ error: 'Information not found' });
        }
        const updateDoc = {
          $set: { title: body.title, about_position:body.about_position, department:body.department, responsibility:body.responsibility, job_req:body.job_req, employment_type:body.employment_type, workplace_type:body.workplace_type, deadline:body.deadline, vacancy: body.vacancy, salary: body.salary, experience: body.experience, instructions: body.instructions, education: body.education, benefit: body.benefit },
        };   
        const result = await careerCollection.updateOne(careerInfo, updateDoc);
        const updatedInfo = await careerCollection.findOne(query);
        // res.send(result);
        res.status(200).json({ message: 'Information updated successfully', style: updatedInfo });
      } 
      catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.get('/countryCodeOptions',async(req,res)=>{
      const result= await countryCodeCollection.find().toArray()
      res.send(result)
    })
    app.post('/appliedJobs', upload.single('resume'), async(req,res)=>{
      const data=req.body
      // console.log(data)
      const result=await jobApplicationCollection.insertOne(data)
      res.send(result)
      // console.log(data)
    })
    app.get('/appliedJobs', async(req,res)=>{
      const result= await jobApplicationCollection.find().toArray()
      res.send(result)
      // console.log(result)
    })
    app.delete("/deleteAppliedJob/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobApplicationCollection.deleteOne(query);
      res.send(result);
    });

    // ......................Service details......................
    app.post('/addService', async(req,res)=>{
      const data=req.body
      // console.log(data)
      const result=await serviceCollection.insertOne(data)
      res.send(result)
      // console.log(data)
    })
    app.delete("/deleteService/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await serviceCollection.deleteOne(query);
      res.send(result);
    });
    app.get('/services', async(req,res)=>{
      const result= await serviceCollection.find().toArray()
      res.send(result)
    })
    app.get('/service/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const options = {
          projection: { service_title: 1, service_text: 1, services_offered: 1, _id: 1, id: 1 },
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
    app.patch("/updateService/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const body = req.body;
        const serviceInfo = await serviceCollection.findOne(query);
        if (!serviceInfo) {
          return res.status(404).json({ error: 'Information not found' });
        }
        const updateDoc = {
          $set: { id: body.id, service_icon: body.service_icon, service_title: body.service_title, service_text: body.service_text, services_offered: body.services_offered,  service_offered_title: body.service_offered_title,  service_offered_des: body.service_offered_des},
        };   
        const result = await serviceCollection.updateOne(serviceInfo, updateDoc);
        const updatedInfo = await serviceCollection.findOne(query);
        // res.send(result);
        res.status(200).json({ message: 'Information updated successfully', style: updatedInfo });
      } 
      catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    

    // ......................portfolio details......................
    app.get('/portfolio', async(req,res)=>{
      const result= await portfolioCollection.find().toArray()
      res.send(result)
      // console.log(result);
    })
    app.get('/portfolio/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const options = {
          projection: { portfolio_name: 1, portfolio_category: 1, portfolio_type: 1, portfolio_img: 1 },
        };
        const result = await portfolioCollection.findOne(query, options);
        res.send(result);
        console.log(result);
      }
      catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    app.post('/addPortfolio', async(req,res)=>{
      const data=req.body
      const result=await portfolioCollection.insertOne(data)
      res.send(result)
      // console.log(result)
    })
    app.delete("/deletedPortfolio/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await portfolioCollection.deleteOne(query);
      res.send(result);
    });
    app.patch("/updatePortfolio/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const body = req.body;
        const portfolio = await portfolioCollection.findOne(query);
        if (!portfolio) {
          return res.status(404).json({ error: 'Information not found' });
        }
        const updateDoc = {
          $set: {  
            portfolio_name: body.portfolio_name, 
            portfolio_category: body.portfolio_category, 
            portfolio_type: body.portfolio_type,  
            portfolio_img: body.portfolio_img
          },
        };   
        const result = await portfolioCollection.updateOne(portfolio, updateDoc);
        const updatedInfo = await portfolioCollection.findOne(query);
        // res.send(result);
        res.status(200).json({ message: 'Information updated successfully', style: updatedInfo });
      } 
      catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });


    // ......................success Video details......................
    app.post('/postSuccessVideo', async(req,res)=>{
      const data=req.body
      const result=await successCollection.insertOne(data)
      res.send(result)
      // console.log(result)
    })
    app.get('/successVideos', async(req,res)=>{
      const result= await successCollection.find().toArray()
      res.send(result)
      // console.log(result);
    })
    app.delete("/deletedSuccessVideo/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await successCollection.deleteOne(query);
      res.send(result);
    });


    // ......................Contact details......................
    app.post('/addContact', async(req,res)=>{
      const data=req.body
      const result=await contactCollection.insertOne(data)
      res.send(result)
      // console.log(result)
    })
    app.get('/contacts', async(req,res)=>{
      const result= await contactCollection.find().toArray()
      res.send(result)
      // console.log(result);
    })
    app.delete("/deletedContact/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await contactCollection.deleteOne(query);
      res.send(result);
    });


    app.get('/users/admin/:email', async (req, res) => {
      const adminEmail='info.uniquecoit@gmail.com'
      const email = req.params.adminEmail;
      if (req.decoded.email !== email) {
        res.send({ admin: false })
      }
      const query = { email: email }
      const user = await userCollection.findOne(query);
      const result = { admin: user?.role === 'admin' }
      // console.log(result)
      res.send(result);
    })

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