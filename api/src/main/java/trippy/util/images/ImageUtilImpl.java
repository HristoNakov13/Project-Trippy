package trippy.util.images;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;
import trippy.domain.entities.enums.ImgCloudService;

import java.io.IOException;
import java.util.Map;

public class ImageUtilImpl implements ImageUtil {

    private final Cloudinary cloudinary;

    //api key and api secret are set through environment variable: CLOUDINARY_URL
    public ImageUtilImpl() {
        this.cloudinary = new Cloudinary();
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
}
