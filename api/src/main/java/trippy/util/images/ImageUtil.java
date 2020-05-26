package trippy.util.images;

import org.springframework.web.multipart.MultipartFile;
import trippy.domain.entities.enums.ImgCloudService;

import java.io.IOException;

public interface ImageUtil {

    /**
     * Uploads the given image to a image cloud storage.
     *
     * @param multipartFile the image to be uploaded.
     * @return {@link ImageUploadRes} contains all the needed information about the uploaded image.
     * @throws IOException
     */
    ImageUploadRes uploadImage(MultipartFile multipartFile) throws IOException;

    /**
     * Gets the url of a image cloud storage.
     *
     * @param imgCloudService the identifier of the desired cloud storage.
     * @param imagePublicId Unique identifier of the image in the storage.
     * @return {@code String} the unique url of the given cloud storage.
     */
    String getImageSrc(ImgCloudService imgCloudService, String imagePublicId);
}
