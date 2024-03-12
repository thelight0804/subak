<h1 align="center">수박마켓</h1>

<div align="center">
  <img width="80%" src="https://github.com/thelight0804/subak/assets/69424845/4ec71d02-afc5-4211-a25f-b8757c312908">
  <p align="center">당근마켓 서비스를 클론코딩한 수박마켓 프로젝트입니다.</p>
</div>
<br>

## 기술 스택
### Backend
- Java 11
- Spring Boot 2.7.17
- Spring Data JPA
- Swagger
- MariaDB
- Cloudinary
### Frontend
- JavaScript
- React Native
- Axios
- Redux
- React Navigation
- Async Storage
- StyleSheet
<br>

## API 명세서
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
        <td>회원가입</td>
        <td>POST</td>
        <td>/user</td>
        <td>회원</td>
    </tr>
    <tr>
        <td>로그인</td>
        <td>POST</td>
        <td>/user/sign-in</td>
        <td>회원</td>
    </tr>
    <tr>
        <td>회원 프로필 수정</td>
        <td>PUT</td>
        <td>/user/{userId}/profile</td>
        <td>회원</td>
    </tr>
    <tr>
        <td>회원 이메일 찾기</td>
        <td>POST</td>
        <td>/user/email</td>
        <td>회원</td>
    </tr>
    <tr>
        <td>회원 비밀번호 재설정</td>
        <td>POST</td>
        <td>/user/password</td>
        <td>회원</td>
    </tr>
    <tr>
        <td>회원 탈퇴</td>
        <td>PATCH</td>
        <td>/user/withdraw</td>
        <td>회원</td>
    </tr>
    <tr>
        <td>게시글 생성</td>
        <td>POST</td>
        <td>/post</td>
        <td>게시글</td>
    </tr>
    <tr>
        <td>게시글 수정</td>
        <td>GUT</td>
        <td>/post/{postId}</td>
        <td>게시글</td>
    </tr>
    <tr>
        <td>게시글 삭제</td>
        <td>DELETE</td>
        <td>/post/{postId}</td>
        <td>게시글</td>
    </tr>
    <tr>
        <td>전체 게시글 조회</td>
        <td>GET</td>
        <td>/posts</td>
        <td>게시글</td>
    </tr>
    <tr>
        <td>게시글 상세 페이지 조회</td>
        <td>GET</td>
        <td>/posts/{postId}</td>
        <td>게시글</td>
    </tr>
    <tr>
        <td>상품 상태 수정</td>
        <td>PATCH</td>
        <td>/post/{postId}/product-status</td>
        <td>게시글</td>
    </tr>
    <tr>
        <td>게시글 상태 수정</td>
        <td>PATCH</td>
        <td>/post/{postId}/status</td>
        <td>게시글</td>
    </tr>
    <tr>
        <td>게시글 좋아요, 취소</td>
        <td>POST</td>
        <td>/post/{postId}/hearts</td>
        <td>게시글</td>
    </tr>
    <tr>
        <td>끌어올리기</td>
        <td>PUT</td>
        <td>/post/{postId}/recent</td>
        <td>게시글</td>
    </tr>
    <tr>
        <td>판매중 게시글 조회</td>
        <td>GET</td>
        <td>/posts/selling</td>
        <td>게시글</td>
    </tr>
    <tr>
        <td>숨김 게시글 조회</td>
        <td>GET</td>
        <td>/posts/hide</td>
        <td>게시글</td>
    </tr>      
    <tr>
        <td>판매완료 게시글 조회</td>
        <td>GET</td>
        <td>/posts/completed</td>
        <td>게시글</td>
    </tr>
    <tr>
        <td>구매완료 게시글 조회</td>
        <td>GET</td>
        <td>/posts/purchased</td>
        <td>게시글</td>
    </tr>
    <tr>
        <td>관심 게시글 조회</td>
        <td>GET</td>
        <td>/posts/likedBy</td>
        <td>게시글</td>
    </tr>
    <tr>
        <td>게시글 검색</td>
        <td>GET</td>
        <td>/posts/search</td>
        <td>게시글</td>
    </tr>
    <tr>
        <td>카테고리별 게시글 검색</td>
        <td>GET</td>
        <td>/posts/category/{category}</td>
        <td>게시글</td>
    </tr>
    <tr>
        <td>판매중 게시글 개수 조회</td>
        <td>GET</td>
        <td>/posts/selling/count</td>
        <td>게시글</td>
    </tr>   
    <tr>
        <td>숨김 게시글 개수 조회</td>
        <td>GET</td>
        <td>/posts/hide/count</td>
        <td>게시글</td>
    </tr>    
    <tr>
        <td>판매완료 게시글 개수 조회</td>
        <td>GET</td>
        <td>/posts/completed/count</td>
        <td>게시글</td>
    </tr>    
    <tr>
        <td>판매하기</td>
        <td>POST</td>
        <td>/posts/{postId}/sell</td>
        <td>게시글</td>
    </tr>     
    <tr>
        <td>댓글 추가</td>
        <td>POST</td>
        <td>/post/{postId}/comments</td>
        <td>댓글</td>
    </tr>
    <tr>
        <td>댓글 수정</td>
        <td>PUT</td>
        <td>/post/{postId}/comments/{commentId}</td>
        <td>댓글</td>
    </tr>
    <tr>
        <td>댓글 삭제</td>
        <td>DELETE</td>
        <td>/post/{postId}/comments/{commentId}</td>
        <td>댓글</td>
    </tr>
    <tr>
        <td>후기 추가</td>
        <td>POST</td>
        <td>/review/{postId}</td>
        <td>후기</td>
    </tr>
    <tr>
        <td>후기 조회</td>
        <td>GET</td>
        <td>/review/{postId}</td>
        <td>후기</td>
    </tr>
    <tr>
        <td>구매자 후기 작성 여부 조회</td>
        <td>GET</td>
        <td>/reviews/{postId}/buyer-status</td>
        <td>후기</td>
    </tr>    
    <tr>
        <td>판매자 후기 작성 여부 조회</td>
        <td>GET</td>
        <td>/reviews/{postId}/seller-status</td>
        <td>후기</td>
    </tr> 
    </tbody>
</table>
<br>

## 아키텍처
<div align="center">
  <img src="https://github.com/thelight0804/subak/assets/69424845/bdcd3d85-2ccc-46ff-8c42-a0cbf3b65064">
</div>
<br>

## 팀원
<table>
    <thead>
    <tr>
        <th>박상현(FE)</th>
        <th>윤성민(BE)</th>
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


