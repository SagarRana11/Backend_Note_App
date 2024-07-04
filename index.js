const express = require('express')
const app = express();
const cors = require('cors')
app.use(express.json())
app.use(cors())

let notes = [{
    id: 1,
    content: "HTML is easy",
    important: true
},
{
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
},
{
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
}
]



app.get('/', (request, response) => {
    response.send("hello people")
})
app.get('/api/notes', (request, response) => {
    response.json(notes)
})
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {

    const id = Number(request.params.id);

    const note = notes
    notes = notes.filter(note => note.id !== id);
    response.status(204).end();

});

const generateId = () => {
    const maxId = notes.length > 0 ?
        Math.max(...notes.map(n => Number(n.id))) : 0

    return String(maxId + 1)

}

app.post('/api/notes', (request, response) => {
    const body = request.body;

    if (!body.content) {
        return response.status(400).json({
            error: "content is missing"
        })
    }

    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId(),
    }

    notes = notes.concat(note)
    response.json(note)



})
const port = 3011;
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`)
})