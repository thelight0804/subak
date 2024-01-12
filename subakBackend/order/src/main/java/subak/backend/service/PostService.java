package subak.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import subak.backend.domain.Heart;
import subak.backend.domain.Member;
import subak.backend.domain.Post;
import subak.backend.domain.PostImage;
import subak.backend.domain.enumType.Category;
import subak.backend.domain.enumType.PostStatus;
import subak.backend.domain.enumType.ProductStatus;
import subak.backend.dto.request.post.CreatePostRequest;
import subak.backend.dto.request.post.UpdatePostRequest;
import subak.backend.dto.response.comment.CommentResponse;
import subak.backend.dto.response.post.PostResponse;
import subak.backend.dto.response.post.PostDetailResponse;
import subak.backend.exception.PostException;
import subak.backend.repository.HeartRepository;
import subak.backend.repository.PostRepository;

import javax.persistence.EntityManager;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Slf4j
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final FileUploadService fileUploadService;
    private final HeartRepository heartRepository;
    private final EntityManager entityManager;
    private RedisTemplate<String, Object> redisTemplate;



    /**
     * 메인페이지 글 보기 ('숨김' 게시글 제외)
     */
    public List<PostResponse> getMainPosts(int offset, int limit) {
        List<Post> posts = entityManager.createQuery(
                "SELECT p FROM Post p WHERE p.postStatus != 'HIDE' ORDER BY p.postDateTime DESC", Post.class)
                .setFirstResult(offset) // 시작 지점
                .setMaxResults(limit) // 최대 개수
                .getResultList();
        return posts.stream()
                .map(this::convertToPostResponse)
                .collect(Collectors.toList());
    }

    /**
     * 게시글 키워드 검색
     */
    public List<PostResponse> searchPosts(String keyword, int offset, int limit) {

        List<Post> posts = entityManager.createQuery(
                "SELECT p FROM Post p WHERE (p.postTitle LIKE :keyword OR p.content LIKE :keyword) AND p.postStatus != 'HIDE' ORDER BY p.postDateTime DESC", Post.class)
                .setParameter("keyword", "%" + keyword + "%")
                .setFirstResult(offset)
                .setMaxResults(limit)
                .getResultList();

        return posts.stream()
                .map(this::convertToPostResponse)
                .collect(Collectors.toList());
    }


    /**
     * 게시글 카테고리별 검색
     */
    public List<PostResponse> searchPostsByCategory(Category category, int offset, int limit) {
        List<Post> posts = entityManager.createQuery(
                        "SELECT p FROM Post p WHERE p.category = :category AND p.postStatus != 'HIDE' ORDER BY p.postDateTime DESC", Post.class)
                .setParameter("category", category)
                .setFirstResult(offset)
                .setMaxResults(limit)
                .getResultList();

        return posts.stream()
                .map(this::convertToPostResponse)
                .collect(Collectors.toList());
    }


    /**
     * 글 상세보기
     */
    public PostDetailResponse getPostDetail(Long postId, Member authenticatedMember) {
        Post post = getPostById(postId);

        // 인기 게시글일 경우에만 Redis에서 조회수를 증가시키고 가져오기
        if (isPopularPost(post)) {
            increaseAndSetViews(post);
        } else {
            // 인기 게시글이 아닌 경우에는 바로 DB에 조회수 증가
            post.setViews(post.getViews() + 1);
            postRepository.save(post); // DB에 조회수 증가 반영
        }

        return convertToPostDetailResponse(post, authenticatedMember);
    }


    /**
     * '판매 완료' 게시글 조회
     */
    public List<PostResponse> getCompletePosts(int offset, int limit, Long memberId) {
        List<Post> posts = entityManager.createQuery(
                "SELECT p FROM Post p WHERE p.member.id = :memberId AND p.productStatus = 'COMPLETE' ORDER BY p.postDateTime DESC", Post.class)
                .setParameter("memberId", memberId)
                .setFirstResult(offset)
                .setMaxResults(limit)
                .getResultList();
        return posts.stream()
                .map(this::convertToPostResponse)
                .collect(Collectors.toList());
    }

    /**
     * '숨김' 게시글 조회
     */
    public List<PostResponse> getHidePosts(int offset, int limit, Long memberId) {
        List<Post> posts = entityManager.createQuery(
                "SELECT p FROM Post p WHERE p.member.id = :memberId AND p.postStatus = 'HIDE' ORDER BY p.postDateTime DESC", Post.class)
                .setParameter("memberId", memberId)
                .setFirstResult(offset)
                .setMaxResults(limit)
                .getResultList();
        return posts.stream()
                .map(this::convertToPostResponse)
                .collect(Collectors.toList());
    }



    /**
     * '즐겨찾기' (좋아요 누른) 게시글 조회
     */
    public List<PostResponse> getLikedPosts(int offset, int limit, Long memberId) {
        List<Post> posts = entityManager.createQuery(
                "SELECT p FROM Post p JOIN p.hearts h WHERE h.member.id = :memberId ORDER BY p.postDateTime DESC", Post.class)
                .setParameter("memberId", memberId)
                .setFirstResult(offset)
                .setMaxResults(limit)
                .getResultList();
        return posts.stream()
                .map(this::convertToPostResponse)
                .collect(Collectors.toList());
    }


    /**
     * 끌어올리기
     */
    public void recentPost(Long postId, int newPrice){
        Post post = getPostById(postId);
        post.updatePostDateTimeAndPrice(newPrice);
        postRepository.save(post);
    }


    /**
     * 좋아요 추가, 취소
     */
    public void addOrRemoveHeart(Long postId, Member member) {
        Post post = getPostById(postId);
        Heart alreadyHeart = null;
        // 이미 좋아요를 눌렀는지 확인
        for (Heart heart : post.getHearts()) {
            if (heart.getMember().equals(member)) {
                alreadyHeart = heart;
                break;
            }
        }
        if (alreadyHeart != null) {
            // 이미 좋아요를 눌렀다면 좋아요 취소
            heartRepository.delete(alreadyHeart);
        } else {
            // 아직 좋아요를 누르지 않았다면 좋아요 추가
            Heart heart = new Heart(member, post);
            heartRepository.save(heart);
        }
    }

    /**
     * 글 생성
     */
    public void createPost(CreatePostRequest createPostRequest, Member member, List<MultipartFile> images) throws IOException {

        // 이미지 파일이 없으면, imagePath에 저장하지 않는다.
        List<String> imagePaths = null;
        if (images != null && !images.isEmpty()) {
            imagePaths = new ArrayList<>();
            for (MultipartFile image : images) {
                String imagePath = fileUploadService.uploadImage(image);
                if (imagePath != null) {
                    imagePaths.add(imagePath);
                }
            }
        }

        Post post = Post.createPost(
                member,
                createPostRequest.getCategory(),
                createPostRequest.getPostTitle(),
                createPostRequest.getContent(),
                createPostRequest.getPrice(),
                imagePaths
        );
        postRepository.save(post);
    }

    /**
     * 글 수정
     */
    public void updatePost(Long postId, UpdatePostRequest updatePostRequest, List<MultipartFile> postImages) throws IOException {
        Post post = getPostById(postId);
        
        List<String> imagePaths = new ArrayList<>();
        if (postImages != null && !postImages.isEmpty()) {
            for (MultipartFile image : postImages) {
                String imagePath = fileUploadService.uploadImage(image);
                if (imagePath != null) {
                    imagePaths.add(imagePath);
                }
            }
        }

        post.updatePostInfo(
                updatePostRequest.getCategory(),
                updatePostRequest.getPostTitle(),
                updatePostRequest.getContent(),
                updatePostRequest.getPrice(),
                imagePaths);

        // 기존 이미지 삭제
        List<PostImage> oldPostImages = new ArrayList<>(post.getPostImages());
        for (PostImage oldPostImage : oldPostImages) {
            if (!imagePaths.contains(oldPostImage.getImagePath())) {
                fileUploadService.deleteImage(oldPostImage.getImagePath());
                post.getPostImages().remove(oldPostImage);
            }
        }

        postRepository.save(post);
    }

    /**
     * 상품 상태 수정 [SALE, RESERVATION, COMPLETE]
     */
    public void updateProductStatus(Long postId, ProductStatus productStatus) {
        Post post = getPostById(postId);

        post.updateProductStatus(productStatus);
        postRepository.save(post);
    }

    /**
     * 게시글 상태 수정 [BASIC, HIDE]
     */
    public void updatePostStatus(Long postId, PostStatus postStatus) {
        Post post = getPostById(postId);

        post.updatePostStatus(postStatus);
        postRepository.save(post);
    }


    /**
     * 글 삭제
     */
    public void deletePost(Long postId) {
        Post post = getPostById(postId);

        // 게시글에 연결된 이미지 삭제
        for (PostImage postImage : post.getPostImages()) {
            try {
                fileUploadService.deleteImage(postImage.getImagePath());
            } catch (IOException e) {
                throw new RuntimeException("Failed to delete image: " + postImage.getImagePath(), e);
            }
        }

        postRepository.deleteById(postId);
    }

    // 메인페이지
    private PostResponse convertToPostResponse(Post post){
        PostResponse response = new PostResponse();

        response.setId(post.getId());
        response.setMemberName(post.getMember().getName());
        response.setProfileImage(post.getMember().getProfileImage());
        response.setPostTitle(post.getPostTitle());
        response.setFirstImage(post.getPostImages().isEmpty() ? null : post.getPostImages().get(0).getImagePath());
        response.setPrice(post.getPrice());
        response.setContent(post.getContent());
        response.setPostDateTime(post.getPostDateTime());
        response.setAddress(post.getMember().getAddress());
        response.setHeartCount(post.getHearts().size());
        response.setCommentCount(post.getComments().size());
        return response;
    }


    // 상세페이지
    private PostDetailResponse convertToPostDetailResponse(Post post, Member member) {
        PostDetailResponse response = new PostDetailResponse();
        response.setId(post.getId());
        response.setPostTitle(post.getPostTitle());
        response.setContent(post.getContent());
        response.setMemberName(post.getMember().getName());
        response.setProfileImage(post.getMember().getProfileImage());
        response.setPostImages(post.getPostImages().stream().map(PostImage::getImagePath).collect(Collectors.toList()));
        response.setPrice(post.getPrice());
        response.setPostDateTime(post.getPostDateTime());
        response.setAddress(post.getMember().getAddress());
        response.setHeartCount(post.getHearts().size());
        response.setCategory(post.getCategory());
        response.setProductStatus(post.getProductStatus());
        response.setCommentCount(post.getComments().size());
        response.setViews(post.getViews());
        response.setTemp(post.getMember().getTemp());
        response.setComments(post.getComments().stream()
                .map(comment -> new CommentResponse(
                        comment.getId(),
                        comment.getMember().getName(),
                        comment.getContent(),
                        comment.getCmDateTime(),
                        comment.getMember().getProfileImage()))
                .collect(Collectors.toList()));

        response.setLiked(isPostLikedByMember(post, member));

        return response;
    }

    // 좋아요 검사 로직
    private boolean isPostLikedByMember(Post post, Member member) {
        for (Heart heart : post.getHearts()) {
            if (heart.getMember().equals(member)) {
                return true;
            }
        }
        return false;
    }

    // 게시물이 존재하지 않는 경우 예외처리
    public Post getPostById(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new PostException.PostNotFoundException("존재하지 않는 게시글입니다."));
    }

    // 인기 게시글 판단 : 좋아요 5개 이상, 조회수 10 이상
    private boolean isPopularPost(Post post) {
        int likes = post.getHearts().size();
        return likes >= 5 && post.getViews() >= 100;
    }

    // 조회수 증가
    private void increaseAndSetViews(Post post) {
        String viewsKey = "post:" + post.getId() + ":views";
        Long views = (Long) redisTemplate.opsForValue().get(viewsKey);

        // Redis에 데이터가 없을 경우 DB에서 조회수 가져오기
        if (views == null) {
            views = post.getViews();
        }

        // 조회수 증가
        views++;
        redisTemplate.opsForValue().set(viewsKey, views);

        post.setViews(views);
    }



}
