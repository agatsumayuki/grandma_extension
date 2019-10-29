// APIへのリクエスト準備
const payLoads = {
  smileActionGetPayLoad: {
    method: 'get',
    query: 'smileAction',
    params: null,
  },
  smileActionPostPayLoad: {
    method: 'patch',
    query: 'smileAction',
    params: true, // デフォルトはtrueであとで変える
  },
  tabActionGetPayLoad: {
    method: 'get',
    query: 'tabAction',
    params: null,
  }
};
