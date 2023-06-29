const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 4040;

mongoose.connect('mongodb://localhost/srijandb',{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Database Connected');
}).catch((err) =>{
    console.log('Failed to connect database');
});

const userSchema = new mongoose.Schema({
    name : String,
    age : Number,
    email : String
});

const User = mongoose.model('user', userSchema);

async function fetchdata(){
    try {
        const resp = await axios.get('https://dummyjson.com/docs/users');
        const users = resp.data;
    } catch (error) {
        console.log("erorr");
    }
}

app.get('/api/users', async(req, res) =>{
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({error : "something went wrong"})
        
    }
})

app.get('/api/users/search', async(req, res) =>{
    const searchquery = req.query.searchquery
    try {
        const users = await User.find({name : searchquery});
        res.json(users);
    } catch (error) {
        res.status(500).json({error : "something went wrong!! Failed to search"});
    }
})

fetchdata();

app.listen(PORT,()=>{
    console.log(`Servr is runing on port ${PORT}`);
})
