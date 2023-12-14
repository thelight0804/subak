//package subak.backend.service;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.mock.web.MockMultipartFile;
//import org.springframework.test.annotation.Rollback;
//import org.springframework.web.multipart.MultipartFile;
//import subak.backend.domain.Member;
//import subak.backend.domain.Post;
//import subak.backend.domain.enumType.PostStatus;
//import subak.backend.domain.enumType.ProductStatus;
//import subak.backend.repository.PostRepository;
//
//import javax.transaction.Transactional;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@Transactional
//@SpringBootTest
//public class PostServiceTest {
//
//    @Autowired
//    PostRepository postRepository;
//    @Autowired
//    PostService postService;
//
////    @Test
////    @Rollback
////    void 글생성() throws Exception {
////        // Given
////        Member member = createMember("test@test.com", "test", "1234", "010-1234-5678");
////        Post post = createPost(member);
////        Long postId = post.getId();
////
////        // Then
////        Post saveddpost = postRepository.findById(postId).orElse(null);
////        assertNotNull(saveddpost);
////        assertEquals(member, saveddpost.getMember());
////    }
////
////    @Test
////    @Rollback
////    void 글수정() throws Exception {
////        // Given
////        Member member = createMember("test@test.com", "test", "1234", "010-1234-5678");
////        Post post = createPost(member);
////        Long postId = post.getId();
////
////        // When
////        String newCategory = "newCategory";
////        String newPostTitle = "newPostTitle";
////        int newPrice = 2000;
////        String newPostImageName = "newPostImage.jpg";
////        byte[] newPostImageContent = "newPostImageContent".getBytes();
////
////        MultipartFile newPostImage = new MockMultipartFile(
////                newPostImageName,
////                newPostImageName,
////                "image/jpeg",
////                newPostImageContent
////        );
////
////        postService.updatePost(postId, newCategory, newPostTitle, newPrice, newPostImage);
////
////        // Then
////        Post findpost = postRepository.findById(postId).orElse(null);
////        assertNotNull(findpost);
////        assertEquals(newCategory, findpost.getCategory());
////        assertEquals(newPostTitle, findpost.getPostTitle());
////        assertEquals(newPrice, findpost.getPrice());
////        assertArrayEquals(newPostImageContent, findpost.getPostImage());
////    }
//
//    @Test
//    @Rollback
//    void 글삭제() throws Exception {
//        // Given
//        Member member = createMember("test@test.com", "test", "1234", "010-1234-5678");
//        Post post = createPost(member);
//        Long postId = post.getId();
//
//        // When
//        postService.deletePost(postId);
//
//        // Then
//        Post deletepost = postRepository.findById(postId).orElse(null);
//        assertNull(deletepost);
//    }
//
//    @Test
//    @Rollback
//    void 상품_상태수정() throws Exception{
//        // Given
//        Member member = createMember("test@test.com", "test", "1234", "010-1234-5678");
//        Post post = createPost(member);
//        Long postId = post.getId();
//        ProductStatus newProductStatus = ProductStatus.RESERVATION;
//
//        // When
//        postService.updateProductStatus(postId, newProductStatus);
//
//        // Then
//        Post updatedPost = postRepository.findById(postId).orElse(null);
//        assertNotNull(updatedPost);
//        assertEquals(newProductStatus, updatedPost.getProductStatus());
//    }
//
//    @Test
//    @Rollback
//    void 게시글_상태수정() throws Exception {
//        // Given
//        Member member = createMember("test@test.com", "test", "1234", "010-1234-5678");
//        Post post = createPost(member);
//        Long postId = post.getId();
//        PostStatus newPostStatus = PostStatus.HIDE;
//
//        // When
//        postService.updatePostStatus(postId, newPostStatus);
//
//        // Then
//        Post updatedPost = postRepository.findById(postId).orElse(null);
//        assertNotNull(updatedPost);
//        assertEquals(newPostStatus, updatedPost.getPostStatus());
//    }
//
//    private Member createMember(String email, String name, String password, String phone) {
//        Member member = new Member();
//        member.setEmail(email);
//        member.setName(name);
//        member.setPassword(password);
//        member.setPhone(phone);
//
//        return member;
//    }
//
////    private Post createPost(Member member) {
////        String category = "category";
////        String postTitle = "postTitle";
////        int price = 1000;
////        int views = 100;
////        String postImage = "postImage";
////
////        Post post = new Post();
////        post.setMember(member);
////        post.setCategory(category);
////        post.setPostTitle(postTitle);
////        post.setPrice(price);
////        post.setViews(views);
////        post.setPostImage(postImage);
////        post.setProductStatus(ProductStatus.SALE);
////        post.setPostStatus(PostStatus.BASIC);
////
////        return postRepository.save(post);
////    }
//}
