const express=require("express");
const cors=require("cors");
const bodyparser=require("body-parser");

const { spawn } = require('child_process'); 
const app=express();
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());



app.post("/play",(req,res)=>{
     place=req.body.place;
     p=req.body.ply;
     console.log(place);
     console.log(req.body.start);
     ply=[[p.b00,p.b01,p.b02],[p.b10,p.b11,p.b12],[p.b20,p.b21,p.b22]]
     console.log(ply);
     var childPython;
     if(req.body.start==""){
childPython = spawn('python', ['tictacto.py', place.x,place.y,JSON.stringify(ply),0]); // Passed arguments correctly
     }if(req.body.start.trim()=="Computer"){
         childPython = spawn('python', ['tictacto.py', -1,-1,JSON.stringify(ply),1]);
     }
const printStatementsArray = [];

childPython.stdout.on('data', (data) => {
    const receivedData = data.toString();
        const printStatements = receivedData.split('\n');

        for (const statement of printStatements) {
            const trimmedStatement = statement.trim();
            if (trimmedStatement !== '') {
                console.log(`stdout: ${trimmedStatement}`);
                printStatementsArray.push(trimmedStatement);
            }
        }
      res.send(printStatementsArray);
});



childPython.stderr.on('data', (data) => {
    console.error(`stderr:${data}`); 
});

childPython.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});


})



app.listen(4500,(req,res)=>{
    console.log("server is running on port 4500");
})