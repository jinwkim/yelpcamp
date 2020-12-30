const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

// mongoose.connect('mongodb://localhost:27017/yelp-camp', {
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology:true
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error"));
// db.once("open", () => {
//     console.log("DB connected");
// });

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
        useNewUrlParser: true, 
        useCreateIndex:true, 
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("mongodb connection open");
    })
    .catch(err => {
        console.log("mongodb connection error");
        console.log(err);
    });

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    
    for (let i = 0; i < 50; i++) {
        const randint = Math.floor(Math.random() * 1000);

        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[randint].city}, ${cities[randint].state}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'this is a description text',
            price: randint        
        });
        await camp.save();
    }
}

// seedDB returns a promise since async
seedDB().then(() => {
    console.log("closing connection to mongodb");
    mongoose.connection.close();
});