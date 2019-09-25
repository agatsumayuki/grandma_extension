let store = {
  isSmiling: false,
}

/**
 * フロントに当たるcontent_scripts.jsからのリクエストを処理する
 * @param {Object} msg - フロントでpayLoad={{method: String}, {query: String}, {params: String}}のような形で設定した引数が入る
 * @param {integer} sender - 送り元の情報。この拡張機能のIDや、リクエスト元のURL、tabの情報などが取れる
 * @param {function} sendResponse - 拡張機能ならではの関数。addLitener呼ばれた時に自動で追加される？これを実行して引数にフロントに返したい内容を入れる。
 */
chrome.runtime.onMessage.addListener( async function(msg, sender, sendResponse) {
  // console.log('msg', msg); // 送られたメッセージをキャッチ
  // console.log('sender', sender);
  // console.log('sendResponse', sendResponse);

  if (msg.query == 'smileAction') {
    await smileAction(msg);
  };

  console.log('store', store);
  // sendResponse(store.isSmiling); // sendResponseでmsgを送ったスクリプト側にレスを返せる
  chrome.tabs.sendMessage(sender.tab.id, store.isSmiling);

  return true;
});

/**
 * 笑顔アクションに関する挙動
 * @param {Object} msg - フロントでpayLoad={{method: String}, {query: String}, {params: String}}のような形で設定した引数が入る
 */
function smileAction(msg) {
  console.log('msg', msg);
  if (msg.method == 'get') {
    return store.isSmiling;
  } else if (msg.method == 'patch') {
    store.isSmiling = msg.params
    return store.isSmiling
  };
};
