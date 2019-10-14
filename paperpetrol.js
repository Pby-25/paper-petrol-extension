
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
  var response = {}
  let priceInfo = document.getElementsByClassName("section-gas-prices-price");
  response.success = priceInfo.length > 0;
  for (const info of priceInfo){
    const grade = info.querySelector(".section-gas-prices-label").textContent;
    const price = info.querySelector("span").textContent;
    response[grade] = price;
  }
  if (message.newLink){
    var shareTimer = setInterval(()=>{
      let shareBtn = document.querySelector("[data-value='Share']");
      if (shareBtn){
        clearInterval(shareTimer);
        shareBtn.click();
        var linkTimer = setInterval(() => {
          let link = document.querySelector(".section-copy-link-input");
          if (link){
            clearInterval(linkTimer);
            response.link = link.value;
            sendResponse(response);
          }
        }, 800);
      }
    }, 300);
  } else {
    sendResponse(response);
  }
  return true;
})
