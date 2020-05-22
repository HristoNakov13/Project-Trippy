package trippy.util.validator;

import java.util.List;

public interface ValidatorUtil {

    <T> boolean isValid(T entity);

    <T> List<ValidationError> getErrors(T entity);
}