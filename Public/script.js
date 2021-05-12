
  var a = "apple";
  var b = "Ball"; 
  
  async function dataServer(){
    
  const data = { a, b}; 
  
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data) 
  }; 

  const response = await fetch('/api', options); 
  const json = await response.json();
  console.log(json); 
  
}; 

dataServer(); 

  


/*
function typeWriter() {
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
*/