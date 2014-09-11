#!/usr/bin/env python
#
# Stopping running Predix Workbench
#
import os
import signal
import sys
import subprocess


# Check java version
fnull = open(os.devnull, 'w')
retcode=subprocess.call ("java -version", shell=True, stdout=fnull, stderr=fnull)
fnull.close()
if retcode:
    error_exit("Java not found in the path")
else:
    print("")
    os.system("java -version")
    print("")

# Checking if RUNNING_PID file exists . If it exists then delete the file 
if os.path.exists("RUNNING_PID"):
    pid_file =  open("RUNNING_PID", "r")
    pid = int(pid_file.readline())
    os.kill(pid, signal.SIGTERM)
    pid_file.close()    
    os.remove("RUNNING_PID")
else:
    print("No running process.")

