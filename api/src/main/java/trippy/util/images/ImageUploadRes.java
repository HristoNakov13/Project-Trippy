package trippy.util.images;

import trippy.domain.entities.enums.ImgCloudService;

public class ImageUploadRes {

    private String publicId;

    //Date is kept as string because response from cloudinary comes in a weird format for example: 2020-05-22T10:53:13Z
    //not sure if its a good idea to parse it into LocalDate at this point
    private String uploadDate;
    private ImgCloudService imgCloudService;

    public String getPublicId() {
        return publicId;
    }

    public void setPublicId(String publicId) {
        this.publicId = publicId;
    }

    public String getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(String uploadDate) {
        this.uploadDate = uploadDate;
    }

    public ImgCloudService getImgCloudService() {
        return imgCloudService;
    }

    public void setImgCloudService(ImgCloudService imgCloudService) {
        this.imgCloudService = imgCloudService;
    }
}