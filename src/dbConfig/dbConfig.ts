import mongoose from "mongoose";
// import MONGO_URL from ""

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        connection.on('connected',  () => {
            console.log('MondoDB is connected'); 
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error : ' + err)
            console.log(err.message)
            process.exit()
        })
        
    } catch (error) {
        console.log('Something went wrong in connecting to DB');
        console.log(error);      
    }
}

