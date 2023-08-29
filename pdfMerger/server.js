const express = require('express');
const app = express();
const path = require('path');
const script = require('./templates/script');
const bodyparser = require("body-parser")

const multer  = require('multer');
const {mergepdfs} = require('./merge');

const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static('public'))
app.use(bodyparser.urlencoded({extended: false}));
const port = 3000;

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, "templates/index.html"));
   
   
    // res.send("jai mata dii");
    
})
app.post('/submit', (req, res) => {
    
    // const textareaData2 = req.body.page2;
    
    
    

    // For this example, I'm sending back the data. You can process/store it as needed.
    res.send(`Received: ${textareaData}`);
});
app.post('/merge', upload.array('pdfs', 2 ), async (req, res, next)=> {
    // req.file is the `avatar` file
    
    const n1 = req.body.n1;
    const n2 = req.body.n2;
    console.log(n1);
    console.log(n2);
    
    let d = await mergepdfs(path.join(__dirname, req.files[0].path),n1,path.join(__dirname, req.files[1].path),n2);
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
    // req.body will hold the text fields, if there were any
})


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})