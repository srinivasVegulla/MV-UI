/*------------------------------------------------------------------------------
 *******************************************************************************
 * COPYRIGHT Ericsson 2016
 *
 * The copyright to the computer program(s) herein is the property of
 * Ericsson Inc. The programs may be used and/or copied only with written
 * permission from Ericsson Inc. or in accordance with the terms and
 * conditions stipulated in the agreement/contract under which the
 * program(s) have been supplied.
 *******************************************************************************
 *----------------------------------------------------------------------------*/

package com.ericsson.ecb.ui;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.security.crypto.codec.Base64;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

@Component
public class CustomPreZuulFilter extends ZuulFilter {

  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  private static final String APPLICATION_NAME = "ECB-MetraVIew";
  @Override
  public Object run() {
    try {
      final RequestContext ctx = RequestContext.getCurrentContext();
      final HttpServletRequest req = ctx.getRequest();
      final String uri = req.getRequestURI();
      byte[] encoded;
      if (uri.startsWith("/oauth")) {
        logger.info("in zuul pre filter " + uri);
        encoded = Base64.encode("clientapp:123456".getBytes("UTF-8"));
        ctx.addZuulRequestHeader("Authorization", "Basic " + new String(encoded));
        logger.info("pre filter");
        logger.info(req.getHeader("Authorization"));
        final String refreshToken = extractRefreshToken(req);
        if (refreshToken != null) {
          final Map<String, String[]> param = new HashMap<String, String[]>();
          param.put("refresh_token", new String[] { refreshToken });
          param.put("grant_type", new String[] { "refresh_token" });
        }
      } else if (uri.startsWith("/api")) {
        logger.debug("in zuul pre filter " + uri);
        String authHeader = req.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader != null) {
          ctx.addZuulRequestHeader(HttpHeaders.AUTHORIZATION, authHeader);
        }
        ctx.addZuulRequestHeader("ApplicationName", APPLICATION_NAME);
      }
      
    } catch (final UnsupportedEncodingException e) {
      logger.error("Error occured in pre filter", e);
    }
    return null;
  }

  private String extractRefreshToken(HttpServletRequest req) {
    final Cookie[] cookies = req.getCookies();
    if (cookies != null) {
      for (int i = 0; i < cookies.length; i++) {
        if (cookies[i].getName().equalsIgnoreCase("refreshToken")) {
          return cookies[i].getValue();
        }
      }
    }
    return null;
  }

  @Override
  public boolean shouldFilter() {
    return true;
  }

  @Override
  public int filterOrder() {
    return -2;
  }

  @Override
  public String filterType() {
    return "pre";
  }
}