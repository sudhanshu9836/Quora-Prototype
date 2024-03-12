const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");
app.use(methodOverride('_method'));

let port = 8080;

app.set("view engine", "ejs");
app.set( "views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

let data = [
    {
        id: uuidv4(),
        username : "wanderer_nature",
        content: "Nature refreshes mood by offering tranquility and beauty. The sight of greenery, sound of birds, and fresh air relieve stress, enhance mood, and boost mental well-being. Being in nature reduces anxiety, increases happiness, and fosters a sense of connection with the world around us."
    },
    {
        id: uuidv4(),
        username : "iron-beast",
        content: "City life offers diverse opportunities, amenities, and conveniences not found in nature. Urban areas provide cultural events, job opportunities, advanced healthcare, and educational institutions. Moreover, cities foster connectivity, diversity, and technological advancements, enriching lives with dynamic experiences and opportunities for personal growth."
    },
    {
        id: uuidv4(),
        username : "bitto_kushwaha",
        content: "Nature provides solace and inspiration, offering a respite from the hustle and bustle of urban life. It nurtures creativity, encourages mindfulness, and promotes physical activity. Immersion in nature fosters appreciation for the environment, instills a sense of wonder, and reminds us of our interconnectedness with all living things."
    },
    {
        id: uuidv4(),
        username : "alex_marroon",
        content: "Nature refreshes mood through its soothing and rejuvenating qualities. The sight of greenery, the sound of flowing water, and the scent of fresh air calm the mind and body. Spending time in nature reduces stress, lowers blood pressure, and increases feelings of happiness and relaxation. Engaging with natural surroundings also encourages physical activity, promotes mindfulness, and fosters a sense of connection with the environment, leading to improved overall well-being."
    }
]

app.get("/", (req, res)=>{
    res.render("home.ejs");
})
app.get("/posts", (req, res)=>{
    res.render("main-page.ejs", {data});
})
app.get("/posts/new", (req, res)=>{
    res.render("add.ejs");
})
app.post("/posts", (req, res)=>{
    let {username, content} = req.body;
    if(content.trim() !== ''){
        let id = uuidv4();
        data.push({id, username, content});
    }
    res.redirect("/posts");
})

app.get("/posts/:id", (req, res)=>{
    let id = req.params.id;
    let post = data.find( (p)=> id===p.id);
    res.render( "show.ejs", {post} )
})

app.get( "/posts/:id/edit", (req, res)=>{
    let id = req.params.id;
    let post = data.find( (p)=> id===p.id);
    res.render("edit.ejs", {post});
})

app.patch("/posts/:id", (req, res)=>{
    let id = req.params.id;
    let newContent = req.body.content;
    let post = data.find( (p)=> id===p.id);
    post.content = newContent;
    res.redirect("/posts");
})
app.delete("/posts/:id",(req, res)=>{
    let id = req.params.id;
    data = data.filter( (p)=> id!==p.id);
    res.redirect("/posts")
})

app.listen( port, ()=>{
    console.log("App is listening on port");
})