function memo () {
  // 関数の宣言

  const submit = document.getElementById("submit");
  // 投稿ボタンに該当するHTMLの要素を取得し変数に代入している
  submit.addEventListener("click", (e) => {
    // submitボタンがclickされた時に実行される処理を処理を定義している
    const formData = new FormData(document.getElementById("form"));
    // フォームに入力されたものも含めたHTMLを要素ごと取得して変数に代入している

    const XHR = new XMLHttpRequest();
    // 非同期通信を可能にするオブジェクトを作り、変数に代入する
    XHR.open("POST", "/posts", true);
    // クリエイトアクションへのリクエストを指定する
    XHR.responseType = "json";
    // リクエストを送った際、返すレスポンスをjson形式で指定している
    XHR.send(formData);
    // メモ投稿フォームに入力された投稿フォームに入力された情報を送信している

    XHR.onload = () => {
      // 非同期通信のレスポンスを受信成功した時に中の処理を呼び出す

      if (XHR.status != 200) {
        // 処理が成功しなかった場合
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        // エラーが発生した場合エラーメッセージが表示されるようアラートを設定している
        return null;
        // ここでjavascriptの処理から抜け出す。27行以降の処理を行わないようにする
      }

      const item = XHR.response.post;
      // レスポンスとして返ってきたメモのレコードデータを取得している
      const list = document.getElementById("list");
      // HTMLを描画したい親要素の中からlist要素を取得している
      const formText = document.getElementById("content");
      // HTMLを描画したい親要素の中からcontent要素を取得している
      const HTML =
      // メモとして描画する部分のHTMLを定義している
      `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;

      list.insertAdjacentHTML("afterend", HTML);
      // list要素の直後にメモとして定義したHTMLを挿入している
      formText.value = ""
      // 入力フォームに表示されている値をからにしている
    };

    e.preventDefault();
    // submitボタンのCLICKイベントを止めている
  });
}
window.addEventListener("load", memo);
// ページを読み込んだらmemoという関数を実行する