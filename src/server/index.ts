import * as express from 'express'
const app = express()
const { PORT = 9001 } = process.env;

app.get('/test', (req, res) => {
    res.send('test')
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
