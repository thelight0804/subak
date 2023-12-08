package subak.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import subak.backend.config.CloudinaryConfig;

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
                "secure", true));
    }

    public String uploadImage(MultipartFile imageFile) throws IOException {
        if (imageFile == null || imageFile.isEmpty()) {
            return null;
        }
        String originalFilename = imageFile.getOriginalFilename();
        String newFilename = UUID.randomUUID().toString() + originalFilename.substring(originalFilename.lastIndexOf("."));
        Map uploadResult = cloudinary.uploader().upload(imageFile.getBytes(), ObjectUtils.asMap("public_id", newFilename));
        return (String) uploadResult.get("url");
    }

    public void deleteFile(String publicId) throws IOException {
        Map result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }

    public String updateProfileImage(String oldImageUrl, MultipartFile newImageFile) throws IOException {
        if (newImageFile == null || newImageFile.isEmpty()) {
            if (oldImageUrl != null) {
                deleteImage(oldImageUrl);
            }
            return null;
        } else if (oldImageUrl == null) {
            return uploadImage(newImageFile);
        } else {
            String oldPublicId = oldImageUrl.substring(oldImageUrl.lastIndexOf('/') + 1, oldImageUrl.lastIndexOf('.'));
            deleteImage(oldImageUrl);
            return uploadImage(newImageFile);
        }
    }

    public String updateImage(String oldImageUrl, MultipartFile newImageFile) throws IOException {
        deleteImage(oldImageUrl);
        return uploadImage(newImageFile);
    }

    public void deleteImage(String imageUrl) throws IOException {
        String publicId = imageUrl.substring(imageUrl.lastIndexOf('/') + 1, imageUrl.lastIndexOf('.'));
        deleteFile(publicId);
    }
}