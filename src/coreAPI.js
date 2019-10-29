/**
 * background.jsとの通信を行う
 * @param {Object} payLoad - リクエストするための引数
 */
function coreAPI(payLoad) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(payLoad, (response) => {
      console.log('response in Promise', response);
      resolve(response);
    });
  });
}