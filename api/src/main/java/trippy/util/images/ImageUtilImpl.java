package trippy.util.images;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;
import trippy.domain.entities.enums.ImgCloudService;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class ImageUtilImpl implements ImageUtil {

    private final Cloudinary cloudinary;
    private final Map<ImgCloudService, String> cloudUrls;

    //api key and api secret are set through environment variable: CLOUDINARY_URL
    public ImageUtilImpl() {
        this.cloudinary = new Cloudinary();
        this.cloudUrls = new HashMap<>();

        init();
    }

    @Override
    public ImageUploadRes uploadImage(MultipartFile multipartFile) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(multipartFile.getBytes(), ObjectUtils.emptyMap());

        ImageUploadRes res = new ImageUploadRes();
        res.setPublicId((String) uploadResult.get("public_id"));
        res.setUploadDate((String) uploadResult.get("created_at"));
        res.setImgCloudService(ImgCloudService.CLOUDINARY);

        return res;
    }

    @Override
    public String getImageSrc(ImgCloudService imgCloudService, String imagePublicId) {
        return String.format(this.cloudUrls.get(imgCloudService), imagePublicId);
    }

    /**
     * Fills the map with all integrated cloud image storages and their corresponding unique url.
     * Key - The image storage.
     * Value - The url storage url.
     * %s - placement of the publicId of an image
     */
    private void init() {
        this.cloudUrls.put(ImgCloudService.CLOUDINARY, "https://res.cloudinary.com/dkvaa70lt/image/upload/%s");
    }
}
