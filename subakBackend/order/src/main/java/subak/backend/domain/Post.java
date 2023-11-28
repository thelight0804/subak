package subak.backend.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
public class Post {

    @Id @GeneratedValue
    @Column(name = "post_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String category;

    @Column(name = "post_title")
    private String postTitle; //글 제목

    private int price;

    @Column(name = "post_date_time")
    private LocalDateTime postDateTime; // 글 게시 시간

    private int views; // 조회수

    @Column(name = "post_image")
    private String postImage;

    @Enumerated(EnumType.STRING)
    private ProductStatus productStatus; // 상품 상태 [SALE, RESERVATION, COMPLETE]

    @Enumerated(EnumType.STRING)
    private PostStatus postStatus; // 게시글 상태 [BASIC, HIDE]

    @OneToMany(mappedBy = "member")
    private List<Heart> hearts = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Review> reviews = new ArrayList<>();

    public static Post createPost(Member member,
                                  String category,
                                  String postTitle,
                                  int price,
                                  int views,
                                  String postImage) {
        Post post = new Post();
        post.setMember(member);
        post.setCategory(category);
        post.setPostTitle(postTitle);
        post.setPrice(price);
        post.setPostDateTime(LocalDateTime.now());
        post.setViews(views);
        post.setPostImage(postImage);
        post.setProductStatus(ProductStatus.SALE);
        post.setPostStatus(PostStatus.BASIC);
        return post;
    }

    // 글 수정
    public void updatePostInfo(String category,
                               String postTitle,
                               int price,
                               String postImage) {
        this.category = category;
        this.postTitle = postTitle;
        this.price = price;
        this.postImage = postImage;
        this.postDateTime = LocalDateTime.now();
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
}
