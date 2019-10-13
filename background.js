chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log("The color is green.");
    });
  });

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse)=>{

})
const INTERVAL = 5000;
setTimeout(function(){
    chrome.tabs.create({url: "https://goo.gl/maps/BNtLNQc7AUzu4rkF8", active: false }, (tab) =>{
        setTimeout(function(){
          chrome.tabs.executeScript(tab.id, {file: "paperpetrol.js"}, ()=>{
            chrome.tabs.sendMessage(tab.id, {newLink: true}, (response)=> {
              console.log(response)
              
            })
          })
            // chrome.tabs.remove(tab.id);
        },INTERVAL);
    }); 
},INTERVAL);