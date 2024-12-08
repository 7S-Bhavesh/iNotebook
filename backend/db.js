const mongoose=require('mongoose')
const mongoURI="mongodb://localhost:27017/inotebook"

const connectToMongo = async () => {
 
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoURI) 
        console.log('Mongo connected')
}
    
module.exports=connectToMongo;