package trippy.services;

import trippy.domain.entities.Image;
import trippy.util.images.ImageUploadRes;

//dont see any advantage of using service models at this point
//will stop using them for now
public interface ImageService {

    Image saveImage(ImageUploadRes uploadResponse);
}
