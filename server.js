// npm express
// npm nodemon

// 'start': "nodemon server.js"
// Variables
const { response } = require('express')
const express = require('express')
const app = express()
const PORT = 8500;
const mongoose = require('mongoose')
require('dotenv').config()
const TodoTask = require('./models/todotask')

// Set middleware
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.DB_CONNECTION,
  {useNewUrlParser: true},
  () => {console.log("Connected to DB!")}
)


// GET
app.get('/', async(request,response) => {
  try {
    response.render('index.ejs')
  } catch (error) {
    response.status(500).send({message: error.message})
  }
})
// GET !!!!!!!!!!!-- this is not working --!!!!!!!!!!!
// app.get('/', async(request,response) => {
//   try {
//     TodoTasks.find({}, (err,tasks) => {
//       response.render("index.ejs", {
//         todoTasks: tasks
//       })
//     })
//   }catch (error) {
//     response.status(500).send({message: error.message})
//   }
// })

// POST
app.post('/', async(req,res) => {
  const todoTask = new TodoTask (
    {
      title: req.body.title,
      content: req.body.content
    }
  )
  try {
    await todoTask.save()
      console.log(todoTask)
      res.redirect('/')
  } catch (err) {
    if (err) return res.status(500).send(err)
    res.redirect('/')
  }
})

app.listen(PORT, () => console.log(`Server is now running on port ${PORT} !`))