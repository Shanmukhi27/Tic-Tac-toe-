import React, { useState } from "react";
import "./App.css";
import Axios from "axios";



function App() {

  const [keys,setKeys]= useState({b00:"",b01:"",b02:"",b10:"",b11:"",b12:"",b20:"",b21:"",b22:""});
const [d,setD]=useState({x:0,y:0});
const [c,setC]=useState("")

function handleChange(event){
     const {name,value}=event.target;
     if(value=="O"){
     setKeys(prev=>{
      return{
        ...prev,
        [name]:value
      }
     });
    }
     setD({x:name[1],y:name[2]});
     
    

}

function handleSubmit(event){
  event.preventDefault();
  console.log(d);
  Axios.post("http://localhost:4500/play",{
    place:d,
    ply:keys,
    start:""
  }).then(res=>{
    //if length greater than 1 we get both message and matrix
     if(res.data.length>1){
     const trimmedData = res.data[0].trim();
     if (trimmedData === "Draw" || trimmedData === "Computer Won" || trimmedData === "User Won") {
        setC(trimmedData);
     const validJSONString = res.data[1].replace(/'/g, '"');

// Parse the JSON string to get the matrix
const C = JSON.parse(validJSONString);

console.log(C);
    setKeys({b00:C[0][0],b01:C[0][1],b02:C[0][2],b10:C[1][0],b11:C[1][1],b12:C[1][2],b20:C[2][0],b21:C[2][1],b22:C[2][2]});
      }
    }
     else{
     console.log(typeof(res.data[0]));
     const validJSONString = res.data[0].replace(/'/g, '"');

// Parse the JSON string to get the matrix
const C = JSON.parse(validJSONString);

console.log(C);
    setKeys({b00:C[0][0],b01:C[0][1],b02:C[0][2],b10:C[1][0],b11:C[1][1],b12:C[1][2],b20:C[2][0],b21:C[2][1],b22:C[2][2]});
     }
  })
}

function handleReplay(event){
  event.preventDefault();
  setKeys({b00:"",b01:"",b02:"",b10:"",b11:"",b12:"",b20:"",b21:"",b22:""});
  setC("");
}

function handleSelect(event){
  event.preventDefault();
  var start=document.getElementById("start").value;
  if(start=="Computer"){
  Axios.post("http://localhost:4500/play",{
    place:{x:-1,y:-1},
    ply:keys,
    start:start
  }).then(res=>{
     console.log(res.data[0]);
     console.log(typeof(res.data[0]));
      const validJSONString = res.data[0].replace(/'/g, '"');
 
 // Parse the JSON string to get the matrix
 const C = JSON.parse(validJSONString);
 
 console.log(C);
     setKeys({b00:C[0][0],b01:C[0][1],b02:C[0][2],b10:C[1][0],b11:C[1][1],b12:C[1][2],b20:C[2][0],b21:C[2][1],b22:C[2][2]});
  })
}
}
  return (<div >
    <h1>Tic-Tacto</h1>
    <button onClick={handleReplay} className="replay">Re-play</button>
    <div>
    <label for="start">Start with:</label>

<select  name="start" id="start">
 <option value="me">me</option>
 <option value="Computer">Computer</option>
</select>
   <button className="select" onClick={handleSelect}>select</button>
    </div>
   

   <div className="box">

     <div >
      <input onChange={e=>{handleChange(e);}} type="text" name="b00" value={keys.b00}></input>
      <input onChange={e=>{handleChange(e);}} type="text" name="b01" value={keys.b01}></input>
      <input onChange={e=>{handleChange(e);}} type="text" name="b02" value={keys.b02}></input>
     </div>
     <div>
      <input onChange={e=>{handleChange(e);}} type="text" name="b10" value={keys.b10}></input>
      <input onChange={e=>{handleChange(e);}} type="text" name="b11" value={keys.b11}></input>
      <input onChange={e=>{handleChange(e);}} type="text" name="b12" value={keys.b12}></input>
     </div>
     <div>
      <input onChange={e=>{handleChange(e);}} type="text" name="b20" value={keys.b20}></input>
      <input onChange={e=>{handleChange(e);}} type="text" name="b21" value={keys.b21}></input>
      <input onChange={e=>{handleChange(e);}} type="text" name="b22" value={keys.b22}></input>
     </div>
     <button onClick={handleSubmit} type="submit">play</button>
     <h1>{c}</h1>
     <p><b>Note:</b>Only "O" is accepted for user</p>
   </div>
   </div>
  );
  
}

export default App;
