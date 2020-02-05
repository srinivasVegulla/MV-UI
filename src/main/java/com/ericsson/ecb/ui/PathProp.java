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

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/*
 * FOr providing the required backend host URI and DOTNET Rest URI for
 * the rest controllers in UI applications.
 */

@Component
@ConfigurationProperties("metraview.ui.path")
public class PathProp {
    private String domainLink;
    private String apiPath;
    private String xFrameHeader;

    public String getDomainLink() {
        return domainLink;
    }

    public void setDomainLink(String domainLink) {
        this.domainLink = domainLink;
    }

    public String getApiPath() {
        return apiPath;
    }

    public void setApiPath(String apiPath) {
        this.apiPath = apiPath;
    }

	public String getxFrameHeader() {
		return xFrameHeader;
	}

	public void setxFrameHeader(String xFrameHeader) {
		this.xFrameHeader = xFrameHeader;
	}
}
