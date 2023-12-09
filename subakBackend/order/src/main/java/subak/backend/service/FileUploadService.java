package subak.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import subak.backend.config.CloudinaryConfig;
import subak.backend.domain.Member;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
public class FileUploadService {

    private final Cloudinary cloudinary;

    public FileUploadService(CloudinaryConfig config) {
        cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", config.getCloudName(),
                "api_key", config.getApiKey(),
                "api_secret", config.getApiSecret(),
                "secure", true)); // 생성된 모든 URL이 HTTPS를 사용
    }

    public String uploadImage(MultipartFile imageFile) throws IOException {
        String originalFilename = imageFile.getOriginalFilename();
        String newFilename = UUID.randomUUID().toString() + originalFilename.substring(originalFilename.lastIndexOf("."));
        Map uploadResult = cloudinary.uploader().upload(imageFile.getBytes(), ObjectUtils.asMap("public_id", newFilename));
        return (String) uploadResult.get("url");
    }

    public void deleteFile(String publicId) throws IOException {
        Map result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        // 여기서 result를 확인하여 삭제 작업의 성공 여부를 검사할 수 있다.
    }

    /**
     * Cloudinary에서 이미지를 관리하기 위해, 고유 식별자인 PulbicId를 추출한다.
     * 이미지 형식은 https://res.cloudinary.com/{cloud_name}/image/upload/{publicId}.{extension}으로,
     * publicId를 추출하려면 URL에서 마지막 '/' 문자와 '.' 문자 사이의 문자열을 추출하면 된다.
     */
    public String updateProfileImage(String oldImageUrl, MultipartFile newImageFile) throws IOException {
        if (newImageFile == null || newImageFile.isEmpty()) {
            // 새로운 이미지 파일이 없는 경우, 기존 이미지를 삭제
            if (oldImageUrl != null) {
                String oldPublicId = oldImageUrl.substring(oldImageUrl.lastIndexOf('/') + 1, oldImageUrl.lastIndexOf('.'));
                deleteFile(oldPublicId);
            }
            // 이미지가 없음을 나타내는 값 또는 null을 반환
            return null;
        } else if (oldImageUrl == null) {
            // 새로운 이미지 파일이 있고, 기존 이미지가 없는 경우
            return uploadImage(newImageFile);
        } else {
            // 새로운 이미지 파일이 있고, 기존 이미지도 있는 경우
            String oldPublicId = oldImageUrl.substring(oldImageUrl.lastIndexOf('/') + 1, oldImageUrl.lastIndexOf('.'));
            return updateImage(oldPublicId, newImageFile);
        }
    }



    public String updateImage(String oldPublicId, MultipartFile newImageFile) throws IOException {
        // 기존의 파일 삭제
        deleteFile(oldPublicId);

        // 새로운 파일 업로드
        return uploadImage(newImageFile);
    }

    public void deleteImage(String publicId) throws IOException {
        deleteFile(publicId);
    }
}