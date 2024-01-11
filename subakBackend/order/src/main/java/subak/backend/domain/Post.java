package subak.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.search.annotations.Analyze;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Index;
import org.hibernate.search.annotations.Store;
import org.springframework.stereotype.Indexed;
import subak.backend.domain.enumType.Category;
import subak.backend.domain.enumType.PostStatus;
import subak.backend.domain.enumType.ProductStatus;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.*;

@Entity
@Getter
@Setter
@Indexed
public class Post {

    @Id @GeneratedValue
    @Column(name = "post_id")
    private Long id;

    @JsonBackReference
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Enumerated(EnumType.STRING)
    private Category category; // 상품 카테고리

    @Column(name = "post_title")
    private String postTitle; //글 제목

    @Column(name = "post_content", columnDefinition = "TEXT")
    private String content; // 게시글 내용

    private int price;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @Column(name = "post_date_time")
    private LocalDateTime postDateTime; // 글 게시 시간

    private Long views = 0L; // 조회수

    @Enumerated(EnumType.STRING)
    private ProductStatus productStatus; // 상품 상태 [SALE, RESERVATION, COMPLETE]

    @Enumerated(EnumType.STRING)
    private PostStatus postStatus; // 게시글 상태 [BASIC, HIDE]

    @JsonManagedReference
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostImage> postImages = new ArrayList<>();

    @OneToMany(mappedBy = "post")
    private List<Heart> hearts = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    //@OrderBy("createdAt desc")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "post")
    private List<Review> reviews = new ArrayList<>();

    public static Post createPost(Member member,
                                  Category category,
                                  String postTitle,
                                  String content,
                                  int price,
                                  List<String> imagePaths) {
        Post post = new Post();
        post.setMember(member);
        post.setCategory(category);
        post.setPostTitle(postTitle);
        post.setContent(content);
        post.setPrice(price);
        post.setPostDateTime(LocalDateTime.now());
        post.setProductStatus(ProductStatus.SALE);
        post.setPostStatus(PostStatus.BASIC);

        if (imagePaths != null) {
            for (String path : imagePaths) {
                PostImage postImage = new PostImage();
                postImage.setPost(post);
                postImage.setImagePath(path);
                post.getPostImages().add(postImage);
            }
        }

        return post;
    }



    // 글 수정
    public void updatePostInfo(Category category, String postTitle, String content, int price, List<String> newImagePaths) {
        this.category = category;
        this.postTitle = postTitle;
        this.content = content;
        this.price = price;
        this.postDateTime = LocalDateTime.now();

        // 새 이미지 추가
        for (String newPath : newImagePaths) {
            boolean exists = false;
            for (PostImage existingImage : this.postImages) {
                if (existingImage.getImagePath().equals(newPath)) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                PostImage newImage = new PostImage();
                newImage.setPost(this);
                newImage.setImagePath(newPath);
                this.postImages.add(newImage);
            }
        }
    }

    //상품 상태 수정
    public void updateProductStatus(ProductStatus productStatus) {
        this.productStatus = productStatus;
        this.postDateTime = LocalDateTime.now();
    }

    //게시글 상태 수정
    public void updatePostStatus(PostStatus postStatus) {
        this.postStatus = postStatus;
        this.postDateTime = LocalDateTime.now();
    }

    //끌어올리기
    public void updatePostDateTimeAndPrice(int newPrice) {
        this.postDateTime = LocalDateTime.now();
        this.price = newPrice;
    }

    //조회수
    public void increaseViews() {
        this.views++;
    }
}
