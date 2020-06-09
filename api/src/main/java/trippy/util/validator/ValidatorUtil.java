package trippy.util.validator;

import java.util.List;

public interface ValidatorUtil {

    <T> boolean isValid(T entity);

    <T> List<ValidationError> getErrors(T entity);

    /**
     * Checks whether passwords are equal.
     *
     * @param formPassword {@code String} plain text password.
     * @param userPassword {@code String} hashed password belonging to a user.
     * @return {@code boolean} result of comparison.
     */
    boolean isMatchingPasswords(String formPassword, String userPassword);
}