#!/usr/bin/env python
#
#
#  Copyright (c) 2012 General Electric Company. All rights reserved.
#
#  The copyright to the computer software herein is the property of #  General Electric Company. The software may be used and/or copied only #  with the written permission of General Electric Company or in accordance #  with the terms and conditions stipulated in the agreement/contract #  under which the software has been supplied.
#

import sys, getopt
import subprocess
import os
import stat
import platform
from subprocess import call
from time import localtime
import zipimport
import zipfile
import shutil
import tarfile
import signal      
import re

fnull = open(os.devnull, 'w')
java_status=subprocess.call ("java -version", shell=True, stdout=fnull, stderr=fnull)
this_platform = platform.system()   
 
# Check java version
if java_status:
    print("Java not found in the path")
    sys.exit(1)
else:
    if this_platform == 'Linux' or this_platform == 'Darwin':
        javaversion = subprocess.check_output(["java -version"], shell=True, stderr=subprocess.STDOUT)
    else:
        javaversion = subprocess.check_output(["java", "-version"], shell=True, stderr=subprocess.STDOUT)
    print (javaversion)
    matchVersion1_7 = re.search(r'.*java version \"1.7.0_(\d+)\"', str(javaversion), re.M)

    if matchVersion1_7 and int(matchVersion1_7.group(1)) >= 15:
        print ("")
        print ("Verified you are running a supported Java version.")  
        print ("")
    else:    
        print("You have an unsupported version of Java in your path. Please use JDK 7 update 15 or above.\n\n")
        sys.exit(1)
        
        
classpath=""

dependencies = []
for file in os.listdir("lib"):
    if file.endswith(".jar"):
        dependencies.append(file)

#Add dependencies from /lib  to classpath
libFolder = "lib" + os.sep;
for jar in dependencies:
    classpath += libFolder + jar + os.pathsep

dependencies = []
if(os.path.isdir("lib-extension")):
	for file in os.listdir("lib-extension"):
		if file.endswith(".jar"):
			dependencies.append(file)

#Add dependencies from /lib-extension to classpath
libExtFolder = "lib-extension" + os.sep;
for jar in dependencies:
    classpath += libExtFolder + jar + os.pathsep

#remove last path separator ":"
classpath=classpath[:-1]
finalCmd = "java -cp \"" + classpath + "\" -Dlogger.file=conf/production-logger.xml -DapplyEvolutions.default=true -Dhttps.keyStore=conf/serviceKeystore.jks -Dhttps.keyStorePassword=password"

#Based on the environment , load the config file
environment = os.environ.get('APP_ENV');
if(environment=='DEV'):
    finalCmd += " -Dconfig.file=conf/dev.conf"

# Add https argument if set
for x in range(1, len(sys.argv)):
    if sys.argv[x] == "https=true":
        finalCmd += ' -Dhttps.port=9443'
    else:
        finalCmd += ' ' + sys.argv[x]

# Check if http.port is specified, if not, set default port to 8999
if "-Dhttp.port" not in finalCmd:
	finalCmd += ' -Dhttp.port=8999'

# Add the server jar
finalCmd += " play.core.server.NettyServer"


if len(sys.argv) < 2:
    print('Usage: python run-workbench.py  [-Dhttp.port=9002] [https=true]')
    print('No port was passed. So trying to bind default 8999 port')
    print ("")
	
print "Starting Predix Visualization"
print ("")

# Checking if RUNNING_PID file exists . If it exists then delete the file if os.path.exists("RUNNING_PID"):
if os.path.exists("RUNNING_PID"):
	os.remove("RUNNING_PID")

# Run Predix        
subprocess.call(finalCmd, shell=True)
