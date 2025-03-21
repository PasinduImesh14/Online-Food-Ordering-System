const{app} = require(".");

const PORT = 5454

app.listen(PORT,async()=>{
    console.log("Server is running on port ",PORT);
})