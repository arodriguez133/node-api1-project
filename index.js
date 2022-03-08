const server = require('./api/server');

const PORT = 9000;

// START YOUR SERVER HERE
server.listen(PORT, (req,res) => {
    console.log(`Server listening on port: ${PORT}`)
});


