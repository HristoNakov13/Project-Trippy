package trippy.util.images;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageUtil {

    ImageUploadRes uploadImage(MultipartFile multipartFile) throws IOException;
}
