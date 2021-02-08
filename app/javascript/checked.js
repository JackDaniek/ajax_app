function check() {
  // 関数の宣言
  const posts = document.querySelectorAll(".post");
  // .postと名前のついたセレクタを全て取得している
  posts.forEach(function (post) {
    // 配列（posts）から要素をそれぞれ取り出す。要素がクリックした際に動く処理の記述を定義
    if (post.getAttribute("data-load") != null) {
      // post要素から指定した要素から指定した属性がからではなかった時
      return null;
      // 処理を止める
    }
    
    post.setAttribute("data-load", "true");
    // post要素に対して属性を追加後、既存の値を変更している
    post.addEventListener("click", () => {
      // 要素がクリックされた時に行う処理の定義
      const postId = post.getAttribute("data-id");
      // メモ１つ分のidを取得している
      const XHR = new XMLHttpRequest();
      // 非同期通信をできるよう変数定義している
      XHR.open("GET", `/posts/${postId}`, true);
      // checkedアクションへのルーティングを設定している
      XHR.responseType = "json";
      // リクエストを送った際、返すレスポンスをjson形式で指定している
      XHR.send();
      // リクエストをできるようにしている
      XHR.onload = () => {
        // レスポンスが返ってきた時中の処理を呼び出す
        
        if (XHR.status != 200) {
          
          // 処理が成功しなかった場合
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // エラーが発生した場合エラーメッセージが表示されるようアラートを設定している
          return null;
          // ここでjavascriptの処理から抜け出す。32行以降の処理を行わないようにする          
        }
        
        const item = XHR.response.post;
        // レスポンスとして返ってきたメモのレコードデータを取得している
        if (item.checked === true){
          
          // 既読できた場合の処理を定義
          post.setAttribute("data-check", "true");
          // post要素に対して属性を追加後、既存の値を変更している
        } 
        else if (item.checked === false) {
          // 既読できなかった場合の処理を定義
          post.removeAttribute("data-check");
          // post要素から属性を削除
        }
      };
    });
  });
}
setInterval(check, 1000);
// 既読の動作が1秒ごとに行われるよう設定している