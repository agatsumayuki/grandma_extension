// chromeの拡張機能用APIを使用しないと取得できない
const nomalFaceImgUrl = chrome.runtime.getURL('images/grandma_icon_48.png'); 
const smileFaceImgUrl = chrome.runtime.getURL('images/grandma_icon_48_smile.png');

// APIへのリクエスト準備
let smileActionGetPayLoad = {
  method: 'get',
  query: 'smileAction',
  params: null,
};

let smileActionPostPayLoad = {
  method: 'patch',
  query: 'smileAction',
  params: true,
};


/**
 * おばあちゃんの画像を配置する
 * @param {integer} wx - 右からの位置
 * @param {integer} wy - 下からの位置
 */
function deploy(wx, wy) {
  // 配置準備
  const grandma = document.createElement('img');
  grandma.src = nomalFaceImgUrl;

  // スタイル定義
  grandma.id = 'grandma';
  grandma.style.position = 'fixed';
  grandma.style.right = wx;
  grandma.style.bottom = wy;
  grandma.style.zIndex = 9999; // 一番上に表示するために適当な値

  // onclickした時に実行するもの
  grandma.onclick = move;

  // 配置する
  const objBody = document.getElementsByTagName('body').item(0);
  objBody.appendChild(grandma)
};

/**
 * おばあちゃんの画像を変化させる
 */
async function move() {
  let response = await coreAPI(smileActionGetPayLoad);
  console.log('response after await', response);

  if (response == true) {
    console.log('response in the lights', response);
    document.getElementById('grandma').src = nomalFaceImgUrl;
    smileActionPostPayLoad.params = false;
    coreAPI(smileActionPostPayLoad);
  }
  
  document.getElementById('grandma').src = smileFaceImgUrl;
  coreAPI(smileActionPostPayLoad);
};

async function coreAPI(payLoad) {

  // async function kickAPI(payLoad) {
  //   await chrome.runtime.sendMessage(payLoad, function(response) {
  //     console.log('response in kickAPI', response);
  //     return response
  //   })
  // };

  // const result = await chrome.runtime.sendMessage(payLoad, function() {
  //   console.log('response in chrome.runtime.sendMessage', response);
  //   return response
  // });

  await chrome.runtime.sendMessage(payLoad);

  const result = await chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('response in chrome.runtime.onMessage', message);
    return message;
  });

  console.log('result in the final', result);

  return result;

  // new Promise((resolve, reject) => {
  //   console.log('payLoad', payLoad);
  //   resolve(kickAPI(payLoad));
  // })
  // .then((response)=>{
  //   console.log('response in then', response);
  //   return response
  // })

  // const result = Promise.resolve().then(
  //   kickAPI(payLoad)
  // );

  // console.log('result in final', result);

  // return result;
};



deploy(0, 0);
