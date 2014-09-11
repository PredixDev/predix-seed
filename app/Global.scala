/*
 * Copyright (c) 2014 General Electric Company. All rights reserved.
 *
 * The copyright to the computer software herein is the property of
 * General Electric Company. The software may be used and/or copied only
 * with the written permission of General Electric Company or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 */

import play.api.Application
import play.api.mvc.RequestHeader
import play.api.mvc.Handler

import com.ge.dsv.BaseSettings

/**
 * The global settings. These extend the default visualization settings. Add your own logic here, but make sure to call super.
 */
object Global extends BaseSettings {
   override def onError(request: RequestHeader, throwable: Throwable) = {

      // Add your error handling here.

      super.onError(request, throwable)
   }

   override def onStart(app: Application) = {

      // Add your startup logic here.

      super.onStart(app)
   }

   override def onRouteRequest(request: RequestHeader): Option[Handler] = {

      // Add your interceptors here.

      super.onRouteRequest(request)
   }
}
