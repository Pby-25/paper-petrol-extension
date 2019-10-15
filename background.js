chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse)=>{
  console.log("a new message from...")
  console.log(sender)
  chrome.tabs.create({active: false}, (tab) =>{
    let completedRequest = request.reduce((resPromise, station)=>{
      return resPromise.then( (gasPrices) => {
        return new Promise((resolve)=>{
          let paperpetrolRequest = {};
          let paperpetrolUrl;
          if (station.link) {
            paperpetrolRequest.newLink = false;
            paperpetrolUrl = station.link;
          } else {
            const googlePlaceQuery = "https://www.google.com/maps/search/?api=1&query=1&query_place_id=";
            paperpetrolRequest.newLink = true;
            paperpetrolUrl = googlePlaceQuery + station.place_id;
          }
          chrome.tabs.update(tab.id, {url: paperpetrolUrl}, () =>{
            setTimeout( () => {
              chrome.tabs.executeScript(tab.id, {file: "paperpetrol.js"}, ()=>{
                chrome.tabs.sendMessage(tab.id, paperpetrolRequest, (response)=> {
                  if (response.success) {
                    delete response.success;
                    response.newLink = paperpetrolRequest.newLink;
                    response.place_id = station.place_id;
                    gasPrices.push(response);
                  }
                  resolve(gasPrices);
                })
              })
            }, 5000);
          })
      })
    })
    }, Promise.resolve([]));
    completedRequest.then((completedResponse)=>{
      chrome.tabs.remove(tab.id);
      sendResponse(completedResponse);
    })
  })
  return true;
})
