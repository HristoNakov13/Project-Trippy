package trippy.util.validator;

import org.springframework.security.crypto.bcrypt.BCrypt;

import javax.validation.Validation;
import javax.validation.Validator;
import java.util.List;
import java.util.stream.Collectors;

public class ValidatorUtilImpl implements ValidatorUtil {

    private final Validator validator;

    public ValidatorUtilImpl() {
        this.validator = Validation.buildDefaultValidatorFactory().getValidator();
    }

    @Override
    public <T> boolean isValid(T entity) {
        return this.validator.validate(entity).isEmpty();
    }

    @Override
    public <T> List<ValidationError> getErrors(T entity) {
        return this.validator.validate(entity)
                .stream()
                .map(error -> {
                    ValidationError validationError = new ValidationError();
                    validationError.setProperty(error.getPropertyPath().toString());
                    validationError.setMessage(error.getMessage());

                    return validationError;
                })
                .collect(Collectors.toList());
    }

    @Override
    public boolean isMatchingPasswords(String formPassword, String userPassword) {
        return BCrypt.checkpw(formPassword, userPassword);
    }
}
