<h1 align="center">Subak Market</h1>

<div align="center">
  <img width="80%" src="https://github.com/thelight0804/subak/assets/69424845/3b099c1c-745a-44a3-a873-16319cf95cb5">
  <p align="center">中古品販売アプリで必要な機能を作ってみたサイドプロジェクトです。</p>
</div>
<br>

## 技術スタック
<table>
<thead>
  <tr>
    <th>Backend</th>
    <th>Frontend</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Java 11</td>
    <td>JavaScript</td>
  </tr>
  <tr>
    <td>Spring Boot 2.7.17</td>
    <td>React Native</td>
  </tr>
  <tr>
    <td>Spring Data JPA</td>
    <td>Axios</td>
  </tr>
  <tr>
    <td>Swagger</td>
    <td>Redux</td>
  </tr>
  <tr>
    <td>MariaDB</td>
    <td>React Navigation</td>
  </tr>
  <tr>
    <td>Cloudinary</td>
    <td>Async Storage</td>
  </tr>
  <tr>
    <td></td>
    <td>StyleSheet</td>
  </tr>
</tbody>
</table>
<br>

## アーキテクチャ
<div align="center">
  <img src="https://github.com/thelight0804/subak/assets/69424845/bdcd3d85-2ccc-46ff-8c42-a0cbf3b65064">
</div>
<br>

## API仕様書
<table>
    <thead>
    <tr>
        <th align="center">Name</th>
        <th align="center">Method</th>
        <th align="center">URL</th>
        <th align="center">Tag</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>新規登録</td>
        <td>POST</td>
        <td>/user</td>
        <td>ユーザー</td>
    </tr>
    <tr>
        <td>ログイン</td>
        <td>POST</td>
        <td>/user/sign-in</td>
        <td>ユーザー</td>
    </tr>
    <tr>
        <td>プロフィール変更</td>
        <td>PUT</td>
        <td>/user/{userId}/profile</td>
        <td>ユーザー</td>
    </tr>
    <tr>
        <td>メールアドレスを探す</td>
        <td>POST</td>
        <td>/user/email</td>
        <td>ユーザー</td>
    </tr>
    <tr>
        <td>パスワード変更</td>
        <td>POST</td>
        <td>/user/password</td>
        <td>ユーザー</td>
    </tr>
    <tr>
        <td>アカウント退会</td>
        <td>PATCH</td>
        <td>/user/withdraw</td>
        <td>ユーザー</td>
    </tr>
    <tr>
        <td>投稿</td>
        <td>POST</td>
        <td>/post</td>
        <td>ポスト</td>
    </tr>
    <tr>
        <td>ポスト変更</td>
        <td>GUT</td>
        <td>/post/{postId}</td>
        <td>ポスト</td>
    </tr>
    <tr>
        <td>ポスト削除</td>
        <td>DELETE</td>
        <td>/post/{postId}</td>
        <td>ポスト</td>
    </tr>
    <tr>
        <td>ポストリスト</td>
        <td>GET</td>
        <td>/posts</td>
        <td>ポスト</td>
    </tr>
    <tr>
        <td>ポストの詳細</td>
        <td>GET</td>
        <td>/posts/{postId}</td>
        <td>ポスト</td>
    </tr>
    <tr>
        <td>商品管理</td>
        <td>PATCH</td>
        <td>/post/{postId}/product-status</td>
        <td>ポスト</td>
    </tr>
    <tr>
        <td>ポスト管理</td>
        <td>PATCH</td>
        <td>/post/{postId}/status</td>
        <td>ポスト</td>
    </tr>
    <tr>
        <td>いいね！追加</td>
        <td>POST</td>
        <td>/post/{postId}/hearts</td>
        <td>ポスト</td>
    </tr>
    <tr>
        <td>引き上げ</td>
        <td>PUT</td>
        <td>/post/{postId}/recent</td>
        <td>ポスト</td>
    </tr>
    <tr>
        <td>商品リスト</td>
        <td>GET</td>
        <td>/posts/selling</td>
        <td>ポスト</td>
    </tr>
    <tr>
        <td>非公開リスト</td>
        <td>GET</td>
        <td>/posts/hide</td>
        <td>ポスト</td>
    </tr>      
    <tr>
        <td>販売済みリスト</td>
        <td>GET</td>
        <td>/posts/completed</td>
        <td>ポスト</td>
    </tr>
    <tr>
        <td>購入済みリスト</td>
        <td>GET</td>
        <td>/posts/purchased</td>
        <td>ポスト</td>
    </tr>
    <tr>
        <td>いいね！リスト</td>
        <td>GET</td>
        <td>/posts/likedBy</td>
        <td>ポスト</td>
    </tr>
    <tr>
        <td>商品の検索</td>
        <td>GET</td>
        <td>/posts/search</td>
        <td>ポスト</td>
    </tr>
    <tr>
        <td>カテゴリー商品の検索</td>
        <td>GET</td>
        <td>/posts/category/{category}</td>
        <td>ポスト</td>
    </tr>
    <tr>
        <td>商品の数</td>
        <td>GET</td>
        <td>/posts/selling/count</td>
        <td>ポスト</td>
    </tr>   
    <tr>
        <td>非公開の数</td>
        <td>GET</td>
        <td>/posts/hide/count</td>
        <td>ポスト</td>
    </tr>    
    <tr>
        <td>販売済みの数</td>
        <td>GET</td>
        <td>/posts/completed/count</td>
        <td>ポスト</td>
    </tr>    
    <tr>
        <td>販売する</td>
        <td>POST</td>
        <td>/posts/{postId}/sell</td>
        <td>ポスト</td>
    </tr>     
    <tr>
        <td>コメントを書く</td>
        <td>POST</td>
        <td>/post/{postId}/comments</td>
        <td>コメント</td>
    </tr>
    <tr>
        <td>コメント変更</td>
        <td>PUT</td>
        <td>/post/{postId}/comments/{commentId}</td>
        <td>コメント</td>
    </tr>
    <tr>
        <td>コメント削除</td>
        <td>DELETE</td>
        <td>/post/{postId}/comments/{commentId}</td>
        <td>コメント</td>
    </tr>
    <tr>
        <td>評価コメントを書く</td>
        <td>POST</td>
        <td>/review/{postId}</td>
        <td>評価コメント</td>
    </tr>
    <tr>
        <td>評価コメントの確認</td>
        <td>GET</td>
        <td>/review/{postId}</td>
        <td>評価コメント</td>
    </tr>
    <tr>
        <td>購入者の評価コメントの有無</td>
        <td>GET</td>
        <td>/reviews/{postId}/buyer-status</td>
        <td>評価コメント</td>
    </tr>    
    <tr>
        <td>販売者の評価コメントの有無</td>
        <td>GET</td>
        <td>/reviews/{postId}/seller-status</td>
        <td>評価コメント</td>
    </tr> 
    </tbody>
</table>
<br>

## 機能
### ポスト
<table>
<thead>
  <tr>
    <th><img src="https://github.com/thelight0804/subak/assets/69424845/3e08af05-1a72-4531-b80f-6dd7240b5f9b"></th>
    <th><img src="https://github.com/thelight0804/subak/assets/69424845/9329fc72-bf03-43c3-9752-932a55295ed8"></th>
    <th><img src="https://github.com/thelight0804/subak/assets/69424845/edb5d8f8-78fa-4203-b324-cf125e33bd55"></th>
    <th><img src="https://github.com/thelight0804/subak/assets/69424845/2fcb5e98-b450-4676-afb3-f35d19d5bf2a"></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td align="center">リスト</td>
    <td align="center">投稿</td>
    <td align="center">詳細</td>
    <td align="center">ポストメニュー</td>
  </tr>
</tbody>
</table>

### ポスト履歴
<table>
<thead>
  <tr>
    <th><img src="https://github.com/thelight0804/subak/assets/69424845/baa3c638-487d-4156-9e82-940486e24fea" width="80%"></th>
    <th><img src="https://github.com/thelight0804/subak/assets/69424845/8048122b-322c-47fc-897a-bb7e159334b4" width="80%"></th>
    <th><img src="https://github.com/thelight0804/subak/assets/69424845/289aba62-94b9-4e44-b5c3-94405beec121" width="80%"></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td align="center">販売履歴</td>
    <td align="center">購入履歴</td>
    <td align="center">いいね！履歴</td>
  </tr>
</tbody>
</table>

### コメント
<table>
<thead>
  <tr>
    <th><img src="https://github.com/thelight0804/subak/assets/69424845/ed5f5984-1a17-420e-b419-05eee77b7b15" width="50%"></th>
    <th><img src="https://github.com/thelight0804/subak/assets/69424845/4e97c5a4-b8ad-41d8-a9a7-9353986cfc7d" width="50%"></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td align="center">書く</td>
    <td align="center">変更</td>
  </tr>
</tbody>
</table>

### ユーザー管理
<table>
<thead>
  <tr>
    <th><img src="https://github.com/thelight0804/subak/assets/69424845/9e3e05a0-27dd-4861-a918-d2ebe3a9c8be"></th>
    <th><img src="https://github.com/thelight0804/subak/assets/69424845/a99a5744-fa0d-4d1e-ab47-129af0324fbd"></th>
    <th><img src="https://github.com/thelight0804/subak/assets/69424845/96f88919-1b40-4779-ad39-47ea806eb6ae"></th>
    <th><img src="https://github.com/thelight0804/subak/assets/69424845/d0a6c267-439d-4f59-a635-03c27cd0b8db"></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td align="center">新規登録</td>
    <td align="center">ログイン</td>
    <td align="center">メールアドレス及びパスワード変更</td>
    <td align="center">プロフィール変更</td>
  </tr>
</tbody>
</table>

### 販売及び購入
<table>
<thead>
  <tr>
    <th><img src="https://github.com/thelight0804/subak/assets/69424845/8ea2f965-cf0f-42b7-9adc-304e78007715" width="80%"></th>
    <th><img src="https://github.com/thelight0804/subak/assets/69424845/48a439a0-fe3d-410d-94df-adb332012864" width="80%"></th>
    <th><img src="https://github.com/thelight0804/subak/assets/69424845/6fae0e9c-64d8-4f1a-966e-41ec3f6af8a6" width="80%"></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td align="center">出品</td>
    <td align="center">評価コメントを書く</td>
    <td align="center">評価コメントの確認</td>
  </tr>
</tbody>
</table>
<br>


## 팀원
<table>
    <thead>
    <tr>
        <th>박상현 パク サンヒョン (FE)</th>
        <th>윤성민 ユン ソンミン (BE)</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td align="center">
          <img src="https://github.com/thelight0804/subak/assets/69424845/d496ac68-8229-4428-b5a5-7771acecc782" width="100px">
        </td>
        <td align="center">
          <img src="https://github.com/thelight0804/subak/assets/69424845/6a2dc105-21b4-42a8-8ad8-b78e4ce13729" width="100px">
        </td>
    </tr>
    <tr>
        <td align="center">
          <a href="https://github.com/thelight0804" target="GitHub">
          <img src="https://img.shields.io/badge/thelight0804-000000?style=flat-square&logo=GitHub&logoColor=white"/>
        </td>
        <td align="center">
          <a href="https://github.com/s-minii" target="GitHub">
          <img src="https://img.shields.io/badge/s%E2%80%90minii-000000?style=flat-square&logo=GitHub&logoColor=white"/>
        </td>
        </td>
    </tr>
    </tbody>
</table>


