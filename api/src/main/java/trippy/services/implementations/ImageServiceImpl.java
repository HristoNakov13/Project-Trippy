package trippy.services.implementations;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import trippy.domain.entities.Image;
import trippy.repositories.ImageRepository;
import trippy.services.ImageService;
import trippy.util.images.ImageUploadRes;

@Service
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;
    private final ModelMapper modelMapper;

    public ImageServiceImpl(ImageRepository imageRepository, ModelMapper modelMapper) {
        this.imageRepository = imageRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Image saveImage(ImageUploadRes uploadResponse) {
        return this.imageRepository.saveAndFlush(
                this.modelMapper.map(uploadResponse, Image.class)
        );
    }
}
