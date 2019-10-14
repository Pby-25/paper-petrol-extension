chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log("The color is green.");
    });
  });

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse)=>{
  console.log("a new message from...")
  console.log(sender)
  console.log(request)

  console.log("reducing")
  request.reduce((resPromise, station)=>{
    return resPromise.then( (gasPrices) => {
      return new Promise((resolve)=>{
        gasPrices[station.place_id] = "hey!";
        setTimeout(function () {
          console.log(station);
          console.log(gasPrices);
          resolve(gasPrices);
      }, 1000)
    })
  })
  }, Promise.resolve({}));

// request.reduce( (p, station, i) => 
//     p.then(_ => new Promise(resolve =>
//         setTimeout(function () {
//             console.log(i);
//             console.log(station);
//             resolve();
//         }, 1000)
//     ))
// , Promise.resolve() );

})


const INTERVAL = 5000;
setTimeout(function(){
    chrome.tabs.create({active: false}, (tab) =>{
      chrome.tabs.update(tab.id, {url: "https://goo.gl/maps/BNtLNQc7AUzu4rkF8"}, () =>{
        setTimeout(function(){
          chrome.tabs.executeScript(tab.id, {file: "paperpetrol.js"}, ()=>{
            chrome.tabs.sendMessage(tab.id, {newLink: true}, (response)=> {
              console.log(response)
              
            })
          })
            // chrome.tabs.remove(tab.id);
        },5000);
      })
        
    }); 
},10);