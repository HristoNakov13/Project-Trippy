package trippy.domain.entities;

import trippy.domain.entities.enums.ImgCloudService;

import javax.persistence.*;

@Entity
@Table(name = "images")
public class Image extends BaseEntity {

    //id coming from the cloud storage
    private String publicId;

    //Date is kept as string because response from cloudinary comes in a weird format for example: 2020-05-22T10:53:13Z
    //not sure if its a good idea to parse it into LocalDate at this point
    private String createdAt;
    private ImgCloudService imgCloudService;

    public Image() {
    }

    @Column(name = "public_id")
    public String getPublicId() {
        return publicId;
    }

    public void setPublicId(String publicId) {
        this.publicId = publicId;
    }

    @Column(name = "created_at")
    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    @Column(name = "cloud_service")
    @Enumerated(EnumType.ORDINAL)
    public ImgCloudService getImgCloudService() {
        return imgCloudService;
    }

    public void setImgCloudService(ImgCloudService imgCloudService) {
        this.imgCloudService = imgCloudService;
    }
}
