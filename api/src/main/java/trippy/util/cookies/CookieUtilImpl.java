package trippy.util.cookies;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

public class CookieUtilImpl implements CookieUtil {

    @Override
    public Cookie extractCookie(HttpServletRequest request, String cookieName) {
        return request.getCookies() == null
                ? null
                : Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals(cookieName))
                .findFirst()
                .orElse(null);
    }
}
