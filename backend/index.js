const connectToMongo=require('./db')
const express=require('express')
const cors=require('cors')
connectToMongo()
const port=5000
const app=express()

app.get('/',(req,res)=>{
res.send('hello world')
})

app.use(cors())
app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/Notes'))

app.listen(port,()=>{
    console.log(`App is listening on port:${port}`)
})