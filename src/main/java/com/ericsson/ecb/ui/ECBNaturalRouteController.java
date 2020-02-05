/*------------------------------------------------------------------------------
 ******************************************************************************
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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.common.base.Strings;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class ECBNaturalRouteController {
	
	@Autowired
	  private PathProp pathProp;
  // Match everything without a suffix (so not a static resource).
	@RequestMapping(value = "/{path:[^\\.]*}")
	public String redirect(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
		if (!Strings.isNullOrEmpty(pathProp.getxFrameHeader())) {
			response.setHeader("X-Frame-Options", pathProp.getxFrameHeader());
		}
		return "forward:/";
	}
}
