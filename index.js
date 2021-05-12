const puppeteer = require('puppeteer'); 
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer'); 
const express = require('express'); 
const app = express(); 
app.listen(3000, ()=>{}); 

app.use(express.static('public')); //sending public directory
app.use(express.json());  //parsing the information

//routing the informatoin from client
app.post('/api', (request, response)=>{
  console.log(request.body); 
  response.json({
    status: "success"
  }); 
}); 





const url = "https://fp.trafikverket.se/boka/#/search/ereeeearIthtA/5/12/0/0"

async function checkDate() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector("#examination-type-select");
    await page.select("#examination-type-select", "12");  
   
    await page.waitForSelector("#vehicle-select"); 
    await page.select("#vehicle-select", "4"); 
    
    await page.waitForSelector("#id-control-searchText-1-1"); 
    await page.type("#id-control-searchText-1-1", "Borås"); 
    await page.keyboard.press('Enter'); 

   
    await page.waitForSelector(".panel .col-xs-6"); 
    //if above code doesnt work maullay set timout await page.waitForTimeout(3000); 
 
    const date = await page.evaluate(()=> document.querySelector(".panel .col-xs-6").innerText);  
    const month = date.slice(5, 7); 

    if(month <= 8){
      console.log(month + "ALERT there is something "); 
      sendEmail(); 
    } else if (month == 9) {
      console.log("Its the september, IGNORE IT"); 
    } else {
      console.log("Nothing mate")
    }

    await browser.close(); 
    }

  async function startTracking(){
    //const page = await configureBrowser(); 
    
    let job = new CronJob("0 * * * *", function(){checkDate();}, null, true, null, null, true ); 
    job.start();  
    
  }

  async function sendEmail(month){
    var transporter = nodemailer.createTransport({
      service: 'hotmail', 
      auth: {
        user: 'test1010asdf@outlook.com',
        pass: 'testissue1'}

    });

    let textToSend = month + " Hey its time to check it check it"; 

    let info = await transporter.sendMail({
      from: 'test1010asdf@outlook.com',
      to: "girieunbeatable@gmail.com",
      subject: month + "Hey check it ", 
      text: textToSend

    });

    console.log("Messege is sent", info.messageId); 
  }

//startTracking(); 



