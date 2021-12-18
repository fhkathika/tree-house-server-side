const express=require('express')
const app=express()
const port=process.env.PORT || 5000
require('dotenv').config()
const objectId=require('mongodb').ObjectId
const {MongoClient}=require('mongodb')
const cors=require('cors')

//middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.he9di.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('uri....',uri)
async function run(){
    try{
        await client.connect()
        console.log('database connected')
        const database=client.db('plants_db')
        const userCollection=database.collection('user')
        const plantCollection=database.collection('allplant')
        const orderPlantCollection=database.collection('orderplant')

        //GET API (show all plants in home page from database)
        app.get('/showPlants',async(req,res)=>{
            const items=req.body
            const result=await plantCollection.find(items).toArray()
            res.json(result)
        
        })
        //POST API (Add plants in database)
        app.post('/addPlants',async(req,res)=>{
                const plants=req.body
                const result=await plantCollection.insertOne(plants)
                res.json(result)
                console.log(result)
        })
         //POST API (Add plants in database)
         app.post('/orderConfirm',async(req,res)=>{
            const orderplants=req.body
            const result=await orderPlantCollection.insertOne(orderplants)
            res.json(result)
            console.log(result)
    })
    //GET API (show customer orders which they have ordered)
app.get('/allorders',async(req,res)=>{
    const allorder=req.body
    const result=await orderPlantCollection.find(allorder).toArray()
    res.json(result)
    console.log(result)
})

    }
finally{
    // await client.close()
}
}
run().catch(console.dir)

app.get('/',(req,res)=>{
    res.send('plat shop application')

})
app.listen(port,()=>{
    console.log('listing to port with',port)
})