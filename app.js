const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

app.get('/', (req, res) => {
    res.render('index', { posts });
});

app.post('/create', (req, res) => {
    const { title, author, content } = req.body;
    const newPost = {
        id: posts.length + 1,
        title,
        author,
        content,
        date: new Date().toLocaleDateString(),
    };
    posts.push(newPost);
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render('edit', { post });
});

app.post('/edit/:id', (req, res) => {
    const { title, author, content } = req.body;
    const postIndex = posts.findIndex(p => p.id == req.params.id);
    if (postIndex !== -1) {
        posts[postIndex] = {
            id: posts[postIndex].id,
            title,
            author,
            content,
            date: posts[postIndex].date, // preserve original date
        };
    }
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    posts = posts.filter(post => post.id != req.params.id);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
