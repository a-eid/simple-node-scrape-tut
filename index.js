const express = require('express')
const fs = require('fs')
const R = require('request')
const cheerio = require('cheerio')

const app = express()

app.get('/scrape', (req, res) => {
  let url = req.query.url
  if (!req.query.url)
    return res.end('provide a url')

  R(url, (err, response, html) => {
    if (err) return res.end(`Error: ${err}`)
    let $ = cheerio.load(html)
    res.json({
      year: $('#titleYear a', '.title_wrapper').text(),
      title: $('h1', '.title_wrapper').text(),
      rating: $('[itemprop=ratingValue]', '.ratingValue').text()
    })
  })
})


app.listen(3000, () => {
  console.log("server already started")
})