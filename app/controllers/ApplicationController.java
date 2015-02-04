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
import play.mvc.Results;
import play.mvc.WebSocket;
import play.libs.F.Promise;
import play.api.mvc.Action;
import play.api.mvc.AnyContent;

import com.ge.dsv.controllers.BaseApplicationController;
import com.ge.dsv.controllers.DataController;

/**
 * Controllers are the connections between the view and model.
 * Use this controller or create your own to add view handlers and business-specific logic.
 */
public class ApplicationController extends BaseApplicationController
{

    /**
     * Catch-all controller to return the index page. This is to support HTML5 Mode routing
     *
     * @return the rendered index page of your application
     */
    public static Action<AnyContent> main(String anything)
    {
        return Assets.at("/public/", "index.html", false);
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
