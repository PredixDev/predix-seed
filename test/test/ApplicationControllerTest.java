/*
 * Copyright (c) 2014 General Electric Company. All rights reserved.
 *
 * The copyright to the computer software herein is the property of
 * General Electric Company. The software may be used and/or copied only
 * with the written permission of General Electric Company or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 */

package test;

import static org.fest.assertions.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static play.mvc.Http.Status.BAD_REQUEST;
import static play.mvc.Http.Status.OK;
import static play.test.Helpers.callAction;
import static play.test.Helpers.contentAsString;
import static play.test.Helpers.contentType;
import static play.test.Helpers.fakeRequest;
import static play.test.Helpers.status;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import play.libs.XML;
import play.mvc.Http.Context;
import play.mvc.Http.Request;
import play.mvc.Result;
import play.test.FakeApplication;
import play.test.FakeRequest;
import play.test.Helpers;

import com.ge.dsv.cache.SessionCache;
import com.ge.dsv.common.util.Language;
import com.ge.dsv.common.util.Util;

public class ApplicationControllerTest
{
    private static final String    FAKE_USER              = "fake-user";
    private static final String    TEXT_PLAIN             = "text/plain";
    private static final String    APPLICATION_XML        = "application/xml";
    private static final String    SERVICE_END_POINT      = "Service-End-Point";
    private static final String    TEXT_PLAIN_SERVICE_URL = "http://www.mock.com/api/temperature/text/plain";
    private static final String    XML_SERVICE_URL        = "http://www.mock.com/api/temperature/application/xml";
    private static final String    JSON_SERVICE_URL       = "http://www.mock.com/api/temperature/application/json";

    private static FakeApplication application;

    @BeforeClass
    public static void setUp()
    {

        application = new FakeApplication(new java.io.File("test/resources/fake-project"), //$NON-NLS-1$
                Helpers.class.getClassLoader(), new HashMap<String, String>(), new ArrayList<String>(), null);
        Helpers.start(application);

        loginFakeUser();
    }

    @AfterClass
    public static void tearDown()
    {
        Helpers.stop(application);
    }

    @Test
    public void whenGetThenTextPlainFromWebService()
    {
        FakeRequest request = fakeRequest().withHeader(SERVICE_END_POINT, TEXT_PLAIN_SERVICE_URL).withSession(
                Util.USERNAME, FAKE_USER);
        Result result = callAction(controllers.routes.ref.ApplicationController.getProxy(), request);

        assertValidPlainTextResult(result);
    }

    @Test
    public void whenPostThenTextPlainFromWebService()
    {
        FakeRequest request = fakeRequest().withHeader(SERVICE_END_POINT, TEXT_PLAIN_SERVICE_URL).withSession(
                Util.USERNAME, FAKE_USER);
        Result result = callAction(controllers.routes.ref.ApplicationController.postProxy(), request);

        assertValidPlainTextResult(result);
    }

    @Test
    public void whenPutThenTextPlainFromWebService()
    {
        FakeRequest request = fakeRequest().withHeader(SERVICE_END_POINT, TEXT_PLAIN_SERVICE_URL).withSession(
                Util.USERNAME, FAKE_USER);
        Result result = callAction(controllers.routes.ref.ApplicationController.putProxy(), request);

        assertValidPlainTextResult(result);
    }

    @Test
    public void whenDeleteThenTextPlainFromWebService()
    {
        FakeRequest request = fakeRequest().withHeader(SERVICE_END_POINT, TEXT_PLAIN_SERVICE_URL).withSession(
                Util.USERNAME, FAKE_USER);
        Result result = callAction(controllers.routes.ref.ApplicationController.putProxy(), request);

        assertValidPlainTextResult(result);
    }

    @Test
    public void whenGetThenXmlFromWebService()
    {
        FakeRequest request = fakeRequest().withHeader(SERVICE_END_POINT, XML_SERVICE_URL).withSession(Util.USERNAME,
                FAKE_USER);
        Result result = callAction(controllers.routes.ref.ApplicationController.getProxy(), request);

        assertValidXmlResult(result);
    }

    @Test
    public void whenPostThenXmlFromWebService()
    {
        FakeRequest request = fakeRequest().withHeader(SERVICE_END_POINT, XML_SERVICE_URL).withSession(Util.USERNAME,
                FAKE_USER);
        Result result = callAction(controllers.routes.ref.ApplicationController.postProxy(), request);

        assertValidXmlResult(result);
    }

    @Test
    public void whenPutThenXmlFromWebService()
    {
        FakeRequest request = fakeRequest().withHeader(SERVICE_END_POINT, XML_SERVICE_URL).withSession(Util.USERNAME,
                FAKE_USER);
        Result result = callAction(controllers.routes.ref.ApplicationController.putProxy(), request);

        assertValidXmlResult(result);
    }

    @Test
    public void whenDeleteThenXmlFromWebService()
    {
        FakeRequest request = fakeRequest().withHeader(SERVICE_END_POINT, XML_SERVICE_URL).withSession(Util.USERNAME,
                FAKE_USER);
        Result result = callAction(controllers.routes.ref.ApplicationController.deleteProxy(), request);

        assertValidXmlResult(result);
    }

    @Test
    public void whenGetThenApplicationJsonFromWebService()
    {
        FakeRequest request = fakeRequest().withHeader(SERVICE_END_POINT, JSON_SERVICE_URL).withSession(Util.USERNAME,
                FAKE_USER);
        Result result = callAction(controllers.routes.ref.ApplicationController.getProxy(), request);

        assertVaildJsonResult(result);
    }

    @Test
    public void whenPostThenApplicationJsonFromWebService()
    {
        FakeRequest request = fakeRequest().withHeader(SERVICE_END_POINT, JSON_SERVICE_URL).withSession(Util.USERNAME,
                FAKE_USER);
        Result result = callAction(controllers.routes.ref.ApplicationController.postProxy(), request);

        assertVaildJsonResult(result);
    }

    @Test
    public void whenPutThenApplicationJsonFromWebService()
    {
        FakeRequest request = fakeRequest().withHeader(SERVICE_END_POINT, JSON_SERVICE_URL).withSession(Util.USERNAME,
                FAKE_USER);
        Result result = callAction(controllers.routes.ref.ApplicationController.putProxy(), request);

        assertVaildJsonResult(result);
    }

    @Test
    public void whenDeleteThenApplicationJsonFromWebService()
    {
        FakeRequest request = fakeRequest().withHeader(SERVICE_END_POINT, JSON_SERVICE_URL).withSession(Util.USERNAME,
                FAKE_USER);
        Result result = callAction(controllers.routes.ref.ApplicationController.deleteProxy(), request);

        assertVaildJsonResult(result);
    }

    @Test
    public void shouldGetBadRequestWithMisingServiceEndPointHeader()
    {
        Result result = callAction(controllers.routes.ref.ApplicationController.getProxy(),
                fakeRequest().withSession(Util.USERNAME, FAKE_USER));

        assertThat(status(result)).isEqualTo(BAD_REQUEST);
        assertThat(contentAsString(result)).isEqualTo("Missing header \"Service-End-Point\"");
    }

    private void assertVaildJsonResult(Result result)
    {
        assertThat(contentType(result)).isEqualTo("application/json");
        assertThat(contentAsString(result)).contains("Mike");
    }

    private void assertValidPlainTextResult(Result result)
    {
        assertThat(status(result)).isEqualTo(OK);
        assertThat(contentAsString(result)).contains("Sample plain text response.");
        assertThat(contentType(result)).isEqualTo(TEXT_PLAIN);
    }

    private void assertValidXmlResult(Result result)
    {
        String resultAsString = contentAsString(result);
        assertThat(status(result)).isEqualTo(OK);
        assertThat(resultAsString).contains("ISO-8859-1");
        assertThat(resultAsString).contains("Jani");
        assertThat(contentType(result)).isEqualTo(APPLICATION_XML);
    }

    /**
     * Simulates user login by placing a fake user in the session
     */
    private static void loginFakeUser()
    {
        Request req = mock(Request.class);
        Map<String, String> fakeSession = new HashMap<String, String>();
        fakeSession.put(Util.USERNAME, FAKE_USER);
        Context.current.set(new Context(null, null, req, fakeSession, new HashMap<String, String>(),
                new HashMap<String, Object>()));
        SessionCache.set(Language.message("Application.name"), "not-null", 10000);

    }

}
