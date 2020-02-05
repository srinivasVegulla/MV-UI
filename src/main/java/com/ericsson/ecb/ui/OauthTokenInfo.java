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

import java.io.Serializable;
import java.util.Objects;

/*
 * Java bean for access token and refresh token.
 */

public class OauthTokenInfo implements Serializable {
    private static final long serialVersionUID = 1L;

    public static final String SESSION_ATTR_NAME = "USER-OAUTH-TOKEN-INFO";

    private final String accessToken;
    private final String refreshToken;

    public OauthTokenInfo(
            String accessToken,
            String refreshToken) {
        this.accessToken = Objects.requireNonNull(accessToken);
        this.refreshToken = refreshToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    @Override
    public String toString() {
        return "OauthTokenInfo{" + "accessToken=" + accessToken + ", refreshToken=" + refreshToken + '}';
    }
}
