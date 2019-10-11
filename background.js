chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log("The color is green.");
    });
  });

chrome.browserAction.onClicked.addListener( (tab)=>{
    console.log("okay wow")
})

const INTERVAL = 5000;
setTimeout(function(){
    chrome.tabs.create({url: "https://maps.google.com", active: false }, tab =>{
        setTimeout(function(){
          chrome.tabs.executeScript(tab.id, {code:"console.log('qwe')"})
            // chrome.tabs.remove(tab.id);
        },INTERVAL);
    }); 
},INTERVAL);