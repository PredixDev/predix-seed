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

import java.io.File;
import java.lang.reflect.InvocationTargetException;

import play.Logger;
import play.mvc.Http;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;
import play.mvc.Result;
import play.mvc.Results;
import play.mvc.WebSocket;
import play.libs.F.Promise;
import play.mvc.Security;
import play.mvc.With;

import com.ge.dsv.session.SessionManager;
import com.ge.dsv.controllers.Secured;
import com.ge.dsv.controllers.BaseApplicationController;
import com.ge.dsv.controllers.DataController;

import views.html.app;

import com.ge.dsv.common.util.Util;

/**
 * Controllers are the connections between the view and model.
 * Use this controller or create your own to add view handlers and business-specific logic.
 */
//@With(SessionManager.class)
// these annotations enable authentication for the class
//@Security.Authenticated(Secured.class)
public class ApplicationController extends BaseApplicationController
{

    public static Result main(String any)
    {
        return ok(app.render());
    }

    /**
     * The index page of your application.
     *
     * @return the rendered index page of your application
     */
    public static Result index()
    {
        // Kicks off internationalization support for your application
        Util.processRequestGlobalize(request(), Http.Context.current(), response());

        return ok(app.render());
    }

    /**
     * This method allows widgets to point to an external service by routing the url through
     * the data service package (this is necessary due to the "Same Origin Policy").
     *
     * URL's passed to this this method in the JSON body['url'] will NOT be encoded.
     * URL's must be encoded before passed into this proxy (using <code>encodeURI()</code> for example).
     *
     * @return JSON data from web service
     */
    public static Promise<Result> getProxy()
    {
        return DataController.getProxy();
    }

    public static Promise<Result> postProxy()
    {
        return DataController.postProxy();
    }

    public static Promise<Result> putProxy()
    {
        return DataController.putProxy();
    }

    public static Promise<Result> deleteProxy()
    {
        return DataController.deleteProxy();
    }

    public static WebSocket<String> webSocket()
    {
        return DataController.webSocket();
    }

    /**
     * A sample controller for file upload (Content-type="multipart/form-data")
     * This controller is just a helper controller which accepts the file, uploads it at the root directory and
     * returns a success.
     * Use this file object to do any processing with the uploaded file.
     */
    public static Result upload()
    {
        // MultipartFormData body = request().body().asMultipartFormData();
        // FilePart uploadedFile = body.getFile("file");
        // if (uploadedFile != null) {
        // String fileName = uploadedFile.getFilename();
        // String contentType = uploadedFile.getContentType();
        // File file = uploadedFile.getFile();
        // // Move file to new location
        // file.renameTo(new File(play.Play.application().path().getAbsolutePath() + "/" + fileName));
        // return ok("File uploaded");
        // }
        // else
        // {
        // return badRequest("No file uploaded.");
        // }
        return Results.TODO;
    }
}
