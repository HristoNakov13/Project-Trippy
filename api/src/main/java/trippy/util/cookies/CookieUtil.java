package trippy.util.cookies;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

public interface CookieUtil {

    /**
     * Extracts a {@link Cookie} by cookie name from the given {@link HttpServletRequest}.
     *
     * @param request {@link HttpServletRequest} the request from which the cookie is extracted.
     * @param cookieName {@code String} the name of the cookie to be extracted.
     * @return {@link Cookie} if the cookie is present. Otherwise returns {@code null}.
     */
    Cookie extractCookie(HttpServletRequest request, String cookieName);
}
