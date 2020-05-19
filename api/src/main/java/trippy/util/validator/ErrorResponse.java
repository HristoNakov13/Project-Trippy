package trippy.util.validator;

import java.util.List;

public class ErrorResponse {

    private String title;
    private List<ValidationError> errors;

    public ErrorResponse(String title, List<ValidationError> errors) {
        this.title = title;
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

    public List<ValidationError> getErrors() {
        return errors;
    }

    public void setErrors(List<ValidationError> errors) {
        this.errors = errors;
    }
}
