package trippy.web.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import trippy.domain.models.binding.auth.Credentials;
import trippy.domain.models.binding.auth.UserSignUpBindingModel;
import trippy.domain.models.binding.auth.availabilitycheck.EmailCheckBindingModel;
import trippy.domain.models.binding.auth.availabilitycheck.UsernameCheckBindingModel;
import trippy.domain.models.service.UserServiceModel;
import trippy.domain.models.view.UserLoggedViewModel;
import trippy.services.UserService;
import trippy.util.constants.UserAuthConstants;
import trippy.util.jwt.JwtUtil;
import trippy.util.validator.ErrorResponse;
import trippy.util.validator.ValidationError;
import trippy.util.validator.ValidatorUtil;

import javax.security.auth.login.CredentialNotFoundException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static trippy.util.constants.UserAuthConstants.*;
import static trippy.util.constants.UserValidationConstants.ERROR_RESPONSE_TITLE;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final ValidatorUtil validatorUtil;
    private final ModelMapper modelMapper;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthController(UserService userService, ValidatorUtil validatorUtil, ModelMapper modelMapper, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.validatorUtil = validatorUtil;
        this.modelMapper = modelMapper;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    @RequestMapping(method = RequestMethod.POST, path = "/availability-check/username")
    public ResponseEntity<Boolean> usernameCheckAvailability(@RequestBody UsernameCheckBindingModel usernameBindingModel) {
        if (usernameBindingModel.getUsername() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        boolean isTaken = this.userService.isTakenUsername(usernameBindingModel.getUsername());

        return ResponseEntity.ok(isTaken);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/availability-check/email")
    public ResponseEntity<Boolean> emailCheckAvailability(@RequestBody EmailCheckBindingModel emailBindingModel) {
        if (emailBindingModel.getEmail() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        boolean isTaken = this.userService.isTakenEmail(emailBindingModel.getEmail());

        return ResponseEntity.ok(isTaken);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/login")
    public ResponseEntity<?> login(@RequestBody Credentials credentials, HttpServletResponse res) {
        UserServiceModel user;
        try {
            user = this.userService.getUserByUsernameOrEmail(credentials.getUsernameEmail());
            this.authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), credentials.getPassword()));
        } catch (CredentialNotFoundException | AuthenticationException e) {
            List<ValidationError> errors = new ArrayList<>();
            ValidationError loginError = new ValidationError();
            loginError.setProperty("usernameEmail");
            loginError.setMessage(LOGIN_FAILED_MSG);
            errors.add(loginError);

            ErrorResponse errorResponse = new ErrorResponse(
                    UserAuthConstants.ERROR_RESPONSE_TITLE,
                    errors
            );

            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }

        UserDetails userDetails = this.userService.loadUserByUsername(user.getUsername());
        String token = jwtUtil.generateToken(userDetails);
        UserLoggedViewModel userLoggedViewModel = this.modelMapper.map(userDetails, UserLoggedViewModel.class);

        Cookie cookie = new Cookie("_AUTH", token);
        cookie.setPath("/");
        cookie.setHttpOnly(true);

        if(credentials.rememberMe()) {
            cookie.setMaxAge(COOKIE_EXPIRATION);
        }

        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.addCookie(cookie);

        return ResponseEntity.ok(userLoggedViewModel);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        Cookie jwtCookie = request.getCookies() == null
                ? null
                : Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("_AUTH"))
                .findFirst()
                .orElse(null);

        if (jwtCookie != null) {
            jwtCookie.setMaxAge(0);

            return new ResponseEntity<>(HttpStatus.OK);
        }

        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setTitle(INVALID_LOGOUT_REQUEST);

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<UserLoggedViewModel> authUser(HttpServletRequest request) {
        Cookie jwtCookie = request.getCookies() == null
                ? null
                : Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("_AUTH"))
                .findFirst()
                .orElse(null);

        UserDetails userDetails = jwtCookie == null
                ? null
                : this.userService.loadUserByUsername(jwtUtil.getUsernameFromToken(jwtCookie.getValue()));

        if (userDetails == null || !this.jwtUtil.validateToken(jwtCookie.getValue(), userDetails)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        return ResponseEntity.ok(this.modelMapper.map(userDetails, UserLoggedViewModel.class));
    }

    //this looks absolutely disgusting but at least it werks
    //TODO refactor down the road
    @RequestMapping(method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<?> signUp(@RequestBody UserSignUpBindingModel userBindingModel) {
        List<ValidationError> errors = this.validatorUtil.getErrors(userBindingModel);

        if (!errors.isEmpty()) {
            ErrorResponse errorResponse = new ErrorResponse(ERROR_RESPONSE_TITLE, errors);

            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        try {
            this.userService.signUp(this.modelMapper.map(userBindingModel, UserServiceModel.class));
            return ResponseEntity.ok(userBindingModel);

        } catch (IllegalArgumentException e) {
            ErrorResponse errorResponse = new ErrorResponse(
                    ERROR_RESPONSE_TITLE,
                    this.extractErrors(e.getMessage())
            );

            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    private List<ValidationError> extractErrors(String errorMessage) {
        String[] msgSplit = errorMessage.split("\\s+\\|\\s+");

        String[] properties = msgSplit[0]
                .replace("property: ", "")
                .split(",\\s+");

        String[] messages = msgSplit[1]
                .replace("message: ", "")
                .split(",\\s+");

        List<ValidationError> validationErrors = new ArrayList<>();

        for (int i = 0; i < properties.length; i++) {
            ValidationError error = new ValidationError();
            error.setProperty(properties[i]);
            error.setMessage(messages[i]);

            validationErrors.add(error);
        }

        return validationErrors;
    }
}
