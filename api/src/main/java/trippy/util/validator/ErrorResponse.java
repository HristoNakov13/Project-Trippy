package trippy.util.validator;

import java.util.List;

public class ErrorResponse {

    private String title;
    private String type;
    private List<ValidationError> errors;

    public ErrorResponse(String title, String type, List<ValidationError> errors) {
        this.title = title;
        this.type = type;
        this.errors = errors;
    }

    public ErrorResponse() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<ValidationError> getErrors() {
        return errors;
    }

    public void setErrors(List<ValidationError> errors) {
        this.errors = errors;
    }
}
