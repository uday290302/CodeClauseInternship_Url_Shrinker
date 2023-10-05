const express = require('express')
const  dotenv = require('dotenv')
const path = require('path')

const mongoose = require('mongoose')
const shortUrl = require('./models/shortUrl')
const app = express()
dotenv.config(path.join(__dirname,'.env'))

const PORT = process.env.PORT 



const url ='mongodb://0.0.0.0:27017/urlshortner';

// mongoose.set('strictQuery', true)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true}
,).then(()=> console.log("Connected Succesfully"))
.catch((err)=>{console.error(err);});


//mongodb://localhost:27017/urlshortner'
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const shortUrls = await shortUrl.find()
  res.render('index', { shortUrls: shortUrls })
})

app.post('/shortUrls', async (req, res) => {
  await shortUrl.create({ full: req.body.fullUrl })

  res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl1 = await shortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl1 == null) return res.sendStatus(404)

  shortUrl1.save()

  res.redirect(shortUrl1.full)
})

app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`)
})
