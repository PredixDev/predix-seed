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

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static play.libs.Json.toJson;

import java.io.ByteArrayInputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import play.Logger;
import play.libs.F.Function0;
import play.libs.F.Promise;
import play.libs.Json;
import play.libs.ws.WSResponse;
import play.mvc.WebSocket;

import com.ge.dsv.api.service.IServiceInterceptor;
import com.ge.dsv.api.service.IServiceManager;
import com.ge.dsv.api.service.ServiceContext;

/**
 * This class fakes web services. It provides dummy data as if you were hitting a Predix K web service
 * 
 * @author 204054399
 */
public class FakeServiceManager
        implements IServiceManager
{
    @Override
    public Promise<WSResponse> fetchDataFromWebService(ServiceContext context)
    {
        final WSResponse responseMock = mock(WSResponse.class);

        String xml = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>" + "<note>" + "<to>Tove</to>"
                + "<from>Jani</from>" + "<heading>Reminder</heading>" + "<body>Don't forget me this weekend!</body>"
                + "</note>";

        String text = "Sample plain text response.";

        Map<String, String> data = new HashMap<String, String>();
        data.put("name", "Mike");
        data.put("isEnabled", "true");

        if ( containsCountQueryParameter(context) )
        {
            String count = context.getParameters().get("count")[0];
            data.put("count", count);
            text += count;
        }

        data.put("emptyHeader", context.getHeaders().containsKey("Empty-Header") ? "true" : "false");

        if ( context.getUrl().contains("error") )
        {
            data.put("error", "Web Service Error");
            when(responseMock.getHeader("Content-Type")).thenReturn("application/json");
            when(responseMock.asJson()).thenReturn(toJson(data)); //$NON-NLS-1$
            when(responseMock.getStatus()).thenReturn(play.mvc.Http.Status.BAD_REQUEST);
            when(responseMock.asByteArray()).thenReturn(Json.stringify(toJson(data)).getBytes());
            when(responseMock.getBodyAsStream()).thenReturn(
                    new ByteArrayInputStream(Json.stringify(toJson(data)).getBytes()));
        }
        else
        {

            if ( context.getUrl().contains("text/xml") )
            {
                when(responseMock.getHeader("Content-Type")).thenReturn("text/xml");
                when(responseMock.getBody()).thenReturn(xml);
                when(responseMock.getBodyAsStream()).thenReturn(new ByteArrayInputStream(xml.getBytes()));
            }
            else if ( context.getUrl().contains("application/xml") )
            {
                when(responseMock.getHeader("Content-Type")).thenReturn("application/xml");
                when(responseMock.getBody()).thenReturn(xml);
                when(responseMock.getBodyAsStream()).thenReturn(new ByteArrayInputStream(xml.getBytes()));
            }
            else if ( context.getUrl().contains("text/plain") )
            {
                when(responseMock.getHeader("Content-Type")).thenReturn("text/plain");
                when(responseMock.getBody()).thenReturn(text);
                when(responseMock.asByteArray()).thenReturn(text.getBytes());
                when(responseMock.getBodyAsStream()).thenReturn(new ByteArrayInputStream(text.toString().getBytes()));
            }
            else if ( context.getUrl().contains("invalid/content/type") )
            {
                when(responseMock.getHeader("Content-Type")).thenReturn("invalid/content/type");
                when(responseMock.getBody()).thenReturn(text);
                when(responseMock.getBodyAsStream()).thenReturn(new ByteArrayInputStream(text.getBytes()));
            }
            else if ( context.getUrl().contains("no/content/type") )
            {
                when(responseMock.getBody()).thenReturn(text);
                when(responseMock.getBodyAsStream()).thenReturn(new ByteArrayInputStream(text.getBytes()));
            }
            else
            {
                when(responseMock.getHeader("Content-Type")).thenReturn("application/json");
                when(responseMock.asJson()).thenReturn(toJson(data)); //$NON-NLS-1$
                when(responseMock.asByteArray()).thenReturn(Json.stringify(toJson(data)).getBytes());
                when(responseMock.getBodyAsStream()).thenReturn(
                        new ByteArrayInputStream(Json.stringify(toJson(data)).getBytes()));
            }

            when(responseMock.getStatus()).thenReturn(play.mvc.Http.Status.OK);
        }

        context.setResponse(responseMock);

        Promise<WSResponse> promiseOfString = Promise.promise(new Function0<WSResponse>()
        {
            @Override
            public WSResponse apply()
            {
                Logger.info("Returning fake response.");
                return responseMock;
            }
        });
        return promiseOfString;
    }

    @Override
    public String fetchDataFromCustomClass(String arg0, Map<String, String> arg1)
    {
        return null;
    }

    private boolean containsCountQueryParameter(ServiceContext context)
    {
        return context.getParameters() != null && context.getParameters().containsKey("count")
                && context.getParameters().get("count").length > 0;
    }

    @Override
    public List<IServiceInterceptor> getInterceptorList()
    {
        return null;
    }

    @Override
    public boolean registerInterceptor(IServiceInterceptor arg0)
    {
        return false;
    }

    @Override
    public boolean unregisterInterceptor(IServiceInterceptor arg0)
    {
        return false;
    }

    @Override
    public WebSocket<String> bindToWebSocket(ServiceContext webSocketContext)
    {
        throw new UnsupportedOperationException("Not implemented yet.");
    }
}
