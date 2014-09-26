#!/usr/bin/env python
#
# 
#  Copyright (c) 2012-2014 General Electric Company. All rights reserved.
# 
#  The copyright to the computer software herein is the property of
#  General Electric Company. The software may be used and/or copied only
#  with the written permission of General Electric Company or in accordance
#  with the terms and conditions stipulated in the agreement/contract
#  under which the software has been supplied.
#
#  Author : Amol Gaikwad
#

import argparse
import sys, getopt
import subprocess
import os, stat
import platform
from subprocess import call
from time import localtime
import zipimport
import zipfile
import shutil
import tarfile
import signal
import fnmatch
from zipfile import ZipFile as zip
from distutils import dir_util

# Constants
RUN_APP = 'runapp.py'
RUN_WORKBENCH = 'run-workbench.py'
						
def function_zip(inputDirectory, zipName):
    zip = zipfile.ZipFile(zipName, 'w')
    for root, dirs, files in os.walk(inputDirectory):
        for file in files:
            zip.write(os.path.join(root, file))
    zip.close()

        

def function_unzip(zipName):
        zip = zipfile.ZipFile(zipName)
        zip.extractall()
        zip.close()

        
        
def function_requested_exit():
        print ("Terminating the packager as per your request.")
        sys.exit();

  
  
def function_check_play_exists():    
    global play_command
    print ("Checking existance of Play (Activator) framework...")
    # First see if Play intalled with Predix is available. The installer will insert the path here.
    play_command = "activator"
    fnull = open(os.devnull, 'w')
    retcode=subprocess.call (play_command + " help", shell=True, stdout=fnull, stderr=fnull)
    fnull.close()
    if retcode:
        print("ERROR: activator command not found. Please install Play (Activator) framework.")
        os._exit(1)     



def function_input_http_port():
    if not args.http_port:
        httpport = str(raw_input("Enter the HTTP port number (between 0-65535): "))
    else:
        httpport = str(args.http_port)
    if not httpport.isdigit() or int(httpport)<0 or int(httpport)>65535:
        print("Http port must be a number and less than 65535")
        os._exit(1)
    else:
        return httpport
                
                
def function_input_https_port(httpport):   
            if not args.https_port and args.https_port != "EMPTY":
                httpsport = str(raw_input("Enter the HTTPS port number (between 0-65535). If you do not want to run the application on HTTPS then press ENTER to skip it: "))
            else:
                httpsport = str(args.https_port)                
            if httpsport and httpsport != "EMPTY":
                if not httpsport.isdigit() or int(httpsport)<0 or int(httpsport)>65535 or httpport == httpsport:
                    print("Https port must be a number and less than 65535. It must be different than http port.")
                    os._exit(1)
            else:
                httpsport="EMPTY"
            return httpsport         

          
def function_input_sslcert(httpsport):
            if httpsport != "EMPTY":
                if not args.ssl_cert:
                    sslcert = str(raw_input("Enter the SSL cert key-store name. [default: serviceKeystore.jks]: "))
                else:
                    sslcert = args.ssl_cert
                if sslcert:
                    if not os.path.isfile("./conf/"+sslcert):
                        print("Copy SSL cert key-store "+sslcert+" to conf folder.")
                        os._exit(1)
                else:
                    sslcert="serviceKeystore.jks"
            else:
                sslcert="serviceKeystore.jks"
            return sslcert

                
                
def function_input_sslpassword(httpsport, sslcert):
            if httpsport != "EMPTY" and sslcert != "EMPTY" and sslcert != "serviceKeystore.jks":
                if not args.ssl_passwd:
                    sslpassword = str(raw_input("Enter the SSL cert key-store password. [default: password]: "))
                else:
                    sslpassword = args.ssl_passwd
                if sslpassword:
                    print("WARNING!!! Please make sure keystore password and private key password are same.")
                else:
                    sslpassword="password"
                function_validate_cert_with_password(sslcert, sslpassword)    
            else:
                sslpassword="password"
            return sslpassword


            
def function_validate_cert_with_password(sslcert, sslpassword):
            print ("Validating provided password with the keystore...")
            try:
                command = "keytool -list -v -keystore conf"+os.sep+sslcert+" -storepass "+sslpassword
                cmd_output = subprocess.check_output(command,stderr=subprocess.STDOUT, shell=True)
            except Exception as e:
                print("Provided password is not able to open the key-store. Please specify correct password!")
                os._exit(1)
                
                
def function_play_dist():        
        print ("Play framework is installed!")
        
        print ("Play  (activator) dist started...")
        # rename application config so that it is unique amongst all other application.conf
        shutil.copy2(os.path.join("conf", "application.conf"), os.path.join("conf", "prod.conf"))        
        try:
        	subprocess.check_output(play_command + " dist", shell=True, stderr=subprocess.STDOUT)
        except Exception as e:
        	print e.output
        	os._exit(1)
        os.remove(os.path.join("conf", "prod.conf"))
        print ("Play (activator) dist completed successfully!")
        
        
        
def function_copy_files_to_play_dist(applicationName):
        shutil.copy2(os.path.join("..", "..", "tools", "packager", RUN_APP), applicationName)
        shutil.copy2(os.path.join("..", "..", "tools", "packager", "stopapp.py"), applicationName)
        # Make sure the scripts are writeable
        if this_platform == 'Linux' or this_platform == 'Darwin':
            st = os.stat(os.path.join(applicationName, RUN_APP))
            os.chmod(os.path.join(applicationName, RUN_APP), st.st_mode | stat.S_IWRITE)
            os.chmod(os.path.join(applicationName,"stopapp.py"), st.st_mode | stat.S_IWRITE) 
        else:  
            os.chmod(os.path.join(applicationName, RUN_APP), stat.S_IWUSR)
            os.chmod(os.path.join(applicationName,"stopapp.py"), stat.S_IWUSR)        
            
        
def function_change_run_app(applicationName, httpport, httpsport, sslcert, sslpassword):
    run_app_file=os.path.join(applicationName, RUN_APP)
    print ("Changing " + RUN_APP + " for http\https port and ssl certificate...")   
    
    if httpsport != "EMPTY":
        with open(run_app_file,'r') as f:
            newlines = []
            for line in f.readlines():
                line=line.replace('-Dhttps.keyStore=conf/serviceKeystore.jks', '-Dhttp.port='+httpport+' -Dhttps.port='+httpsport+' -Dhttps.keyStore=conf/'+sslcert)
                line=line.replace('-Dhttps.keyStorePassword=password', '-Dhttps.keyStorePassword='+sslpassword)
                newlines.append(line)
        with open(run_app_file, 'w') as f:
            for line in newlines:
                f.write(line)
        #Changing ports
        with open(run_app_file,'r') as f:
            newlines = []
            for line in f.readlines():
                line=line.replace('No port was passed. So trying to bind default 8999 port', 'No port was passed. So trying to bind http:'+httpport+' port and https:'+httpsport+'..')
                newlines.append(line)
        with open(run_app_file, 'w') as f:
            for line in newlines:
                f.write(line)
    else:
        with open(run_app_file,'r') as f:
            newlines = []
            for line in f.readlines():
                line=line.replace('-Dhttps.keyStore=conf/serviceKeystore.jks', '-Dhttp.port='+httpport+' -Dhttps.keyStore=conf/serviceKeystore.jks')
                newlines.append(line)
        with open(run_app_file, 'w') as f:
            for line in newlines:
                f.write(line)
        #Changing ports
        with open(run_app_file,'r') as f:
            newlines = []
            for line in f.readlines():
                line=line.replace('No port was passed. So trying to bind default 8999 port', 'No port was passed. So trying to bind default '+httpport+' port')
                newlines.append(line)
        with open(run_app_file, 'w') as f:
            for line in newlines:
                f.write(line)

    # add config.resource
    with open(run_app_file,'r') as f:
        newlines = []
        for line in f.readlines():
            line=line.replace('-DapplyEvolutions.default=true', '-Dconfig.file=conf/prod.conf -DapplyEvolutions.default=true')
            line=line.replace(RUN_WORKBENCH, RUN_APP)
            newlines.append(line)
    with open(run_app_file, 'w') as f:
        for line in newlines:
            f.write(line)


                
def function_build_play_dist(httpport, httpsport, sslcert, sslpassword):
        function_check_play_exists()
        function_play_dist()
        
        os.chdir(os.path.join('target','universal'))
        dirList=os.listdir(os.getcwd())
        zipName=""
        for fname in dirList:
                if fnmatch.fnmatch(fname, '*.zip'):
                    zipName=fname
        applicationName = zipName[0:len(zipName)-4]
        
        print ("Unzipping the dist to add few files in it...")
        function_unzip(zipName)
        os.remove(zipName)
        
        function_copy_files_to_play_dist(applicationName)
        function_change_run_app(applicationName, httpport, httpsport, sslcert, sslpassword)
        
        print ("Zipping the dist again...")
        function_zip(applicationName, zipName)
        
        print ("Play package is created successfully at "+os.getcwd()+os.sep+zipName)
        os.chdir(os.path.join('..', '..'))
        return zipName

        
        
def function_build_play():
        httpport = function_input_http_port()
        httpsport = function_input_https_port(httpport)
        sslcert = function_input_sslcert(httpsport)
        sslpassword = function_input_sslpassword(httpsport, sslcert)
        
        function_build_play_dist(httpport, httpsport, sslcert, sslpassword)
        

        
        
print ("----------------------------------------------------------------")
print ("Welcome to Predix, General Electric Company")
print ("");
print ("Copyright (c) 2012-2014 General Electric Company. All rights reserved.")
print ("")
print ("The copyright to the computer software herein is the property of")
print ("General Electric Company. The software may be used and/or copied only")
print ("with the written permission of General Electric Company or in accordance")
print ("with the terms and conditions stipulated in the agreement/contract")
print ("under which the software has been supplied.")
print ("----------------------------------------------------------------")
     
this_platform = platform.system()

# Input validation
parser = argparse.ArgumentParser(description='Workbench Application Build Script')
parser.add_argument("--http_port", nargs='?', help="Port number between 0-65535")
parser.add_argument("--https_port", nargs='?', help="Port number between 0-65535 or EMPTY")
parser.add_argument("--ssl_cert", nargs='?', help="SSL cert key-store name")
parser.add_argument("--ssl_passwd", nargs='?', help="SSL cert key-store password")

args = parser.parse_args()

function_build_play()
 
