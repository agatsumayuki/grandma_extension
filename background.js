// 変数をまとめておく
let store = {
  isSmiling: false,
  tabData: {
    title: '',
    url: ''
  },
  isHardComment: false,
}

// タブが読み込まれた時に実行する
chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    console.log(tab.url); // → 更新されたURL
    console.log(info.status); //→ loading,complete

    store.tabData.title = tab.title;
    store.tabData.url = tab.url;

    chrome.system.memory.getInfo((info) => {
      console.log('memoryInfo', info);
    });
    chrome.system.storage.getInfo((info) => {
      console.log('storageInfo', info);
    });
});

/**
 * フロントに当たるcontent_scripts.jsからのリクエストを処理する
 * @param {Object} msg - フロントでpayLoad={{method: String}, {query: String}, {params: String}}のような形で設定した引数が入る
 * @param {integer} sender - 送り元の情報。この拡張機能のIDや、リクエスト元のURL、tabの情報などが取れる
 * @param {function} sendResponse - 拡張機能ならではの関数。addLitener呼ばれた時に自動で追加される？これを実行して引数にフロントに返したい内容を入れる。
 */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  let response = '';

  if (msg.query == 'smileAction') {
    response = smileAction(msg);
  } else if (msg.query == 'tabAction') {
    response = tabAction(msg);
  } else if (msg.query == 'commentAction') {
    response = commentAction(msg);
  };

  sendResponse(response); // sendResponseでmsgを送ったスクリプト側にレスを返せる

  return true;
});

/**
 * 笑顔アクションに関する挙動
 * @param {Object} msg - フロントでpayLoad={{method: String}, {query: String}, {params: String}}のような形で設定した引数が入る
 */
function smileAction(msg) {
  if (msg.method == 'get') {
    return store.isSmiling;
  } else if (msg.method == 'patch') {
    store.isSmiling = msg.params
    return store.isSmiling
  };
}

/**
 * Tabアクションに関する挙動
 * @param {Object} msg - フロントでpayLoad={{method: String}, {query: String}, {params: String}}のような形で設定した引数が入る
 */
function tabAction(msg) {
  if (msg.method == 'get') {
    return store.tabData;
  }
}

/**
 * Commentアクションに関する挙動
 * @param {Object} msg - フロントでpayLoad={{method: String}, {query: String}, {params: String}}のような形で設定した引数が入る
 */
function commentAction(msg) {
  if (msg.method == 'get') {
    return store.isHardComment;
  } else if (msg.method == 'patch') {
    store.isHardComment = msg.params
    return store.isHardComment
  };
}
