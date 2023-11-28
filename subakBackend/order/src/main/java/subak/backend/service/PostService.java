package subak.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import subak.backend.domain.Member;
import subak.backend.domain.Post;
import subak.backend.domain.enumType.PostStatus;
import subak.backend.domain.enumType.ProductStatus;
import subak.backend.repository.PostRepository;


@Service
@Slf4j
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;


    /**
     * 메인페이지 글 보기
     */


    /**
     * 글 상세보기
     */



    /**
     * 글 생성
     */
    public Long createPost(Member member,
                           String category,
                           String postTitle,
                           int price,
                           int views,
                           String postImage) {
        Post post = Post.createPost(member, category, postTitle, price, views, postImage);
        postRepository.save(post);
        return post.getId();
    }

    /**
     * 글 수정
     */
    public void updatePost(Long postId,
                           String category,
                           String postTitle,
                           int price,
                           String postImage) {

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));

        post.updatePostInfo(category, postTitle, price, postImage);
    }

    /**
     * 상품 상태 수정 [SALE, RESERVATION, COMPLETE]
     */
    public void updateProductStatus(Long postId, ProductStatus productStatus) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));

        post.updateProductStatus(productStatus);
    }

    /**
     * 게시글 상태 수정 [BASIC, HIDE]
     */
    public void updatePostStatus(Long postId, PostStatus postStatus) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));

        post.updatePostStatus(postStatus);
    }


    /**
     * 글 삭제
     */
    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }



}
