/*
 * Copyright (c) 2013 General Electric Company. All rights reserved.
 *
 * The copyright to the computer software herein is the property of
 * General Electric Company. The software may be used and/or copied only
 * with the written permission of General Electric Company or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 */

package controllers;

import play.mvc.Result;
import play.libs.F.Promise;

import com.ge.dsv.controllers.BaseAuthenticationController;

/**
 * Authentication class to authenticate the packaged application
 */
public class Authentication extends BaseAuthenticationController
{


    /**
     * Log out the user. This will clear the Remember Me cookie as well as the session.
     * @return Result
     */
    public static Promise<Result> logout()
    {
        return BaseAuthenticationController.logout();
    }

    /**
     * Validate the user's credentials. If the Remember Me option is selected,
     * then a cookie will be set with a duration (specified in app.conf).
     *
     * @param applicationName - name of the application
     * @return Result - JSON response with success status message.
     */
    public static Promise<Result> authenticate(String applicationName)
    {
        return BaseAuthenticationController.authenticate(applicationName);
    }

}
