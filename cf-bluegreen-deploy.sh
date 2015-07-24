#!/bin/bash

APP="predix-seed"

function status(){
    echo $(date +"%m-%d-%y %H:%M:%S ") $*
}

function exit_if_error(){
    if [ $1 -ne 0 ]
    then
        shift
        status "ERROR : "$*
        exit 1;
    fi
}

function create_service_if_not_exists(){
	cf service $3
	# Check the status of the previous command
	if [ $? -ne 0 ]; then
	    status "$1 instance not found. Creating new $1 instance"
	    cf cs $1 $2 $3
	    exit_if_error $? "Could not create $3 instance  from '$1 $2'"
	fi
}

function create_services(){
	create_service_if_not_exists "p-redis" "shared-vm" "predix_seed_session_store"
	create_service_if_not_exists "logstash14" "free" "logstash"
	create_service_if_not_exists "newrelic-predix" "standard" "newrelic"
}

function push_app_to_cf(){
	status "Pushing $APP_ID to CF"
	cf push $APP_ID -f $MANIFEST -i $INSTANCE
	if [ $? -ne 0 ]; then
	    status "Could not stage the application as expected, Please find below the logs"
    	cf logs $APP_ID --recent
    	exit 1;
	fi
}

function delete_if_old_app(){
	build_number=$(echo $1| sed "s/$APP_NAME-//")
	if [ "$build_number" = "$ARTIFACTORY_BUILD_NUMBER" ]; then 
		return;
	fi
	status "Deleting the old build of the app '$APP_NAME' : $1"
	cf delete "$1" -f
	exit_if_error $? "Unable to delete app $1 from CF"
}

function delete_older_apps(){
	for app in $(cf apps | grep "^$APP_NAME-" | awk -F" " '{print $1}')
	do
		delete_if_old_app $app
	done;
}

function do_zero_downtime_deployment(){
	cf map-route $APP_ID $CF_DOMAIN -n $APP_NAME
	exit_if_error $? "Unable to map route for $APP_NAME.$CF_DOMAIN to $APP_ID"
	
	if [ ${#CF_SPACE} -eq 0 ]
		then
		 cf map-route $APP_ID predix.ge.com
	fi
}

function show_help(){
	echo "Usage : $0 -f <path to manifest file> -s <SPACE name to suffix> -b <BUILD Number> -d <Domain To Use> -i INSTANCE"
}

function validate_inputs(){
	if [ ${#ARTIFACTORY_BUILD_NUMBER} -eq 0 ]
		then
		show_help
		exit_if_error 1 "Build to stage not set"
	fi

	if [ ${#CF_DOMAIN} -eq 0 ]
		then
		show_help
		exit_if_error 1 "Domain not set"
	fi
	
	if [ ${#CF_SPACE} -eq 0 ]
		then
		APP_NAME=$APP
	else
		APP_NAME=$APP-${CF_SPACE}
	fi

	if [ ${#MANIFEST} -eq 0 ]
		then
		show_help
		exit_if_error 1 "Manifest.yml not passed in"
	fi
	if [ ! -f ${MANIFEST} ]
		then
		exit_if_error 1 "Could not find the yml file "${MANIFEST}
	fi
	if [ ${#INSTANCE} -eq 0 ]
		then
		status "Setting instances to 2"
		INSTANCE=2
	fi

	status "Pushing $APP_NAME with build number $ARTIFACTORY_BUILD_NUMBER using "${MANIFEST}" file"
	APP_ID=$APP_NAME-${ARTIFACTORY_BUILD_NUMBER}
}

function cleanup(){
	status "Deleting orphaned routes from the space (if any)"
	cf delete-orphaned-routes -f
}

function get_args(){
	while getopts "f:s:b:d:i:" opt; do
	  case $opt in
	  	h) 
			show_help
			exit_if_error 1 "Exiting"
	    ;;
	    f) 
			MANIFEST=$OPTARG
	    ;;
	    b) 
			ARTIFACTORY_BUILD_NUMBER=$OPTARG
	    ;;
	    s) 
			CF_SPACE=$(echo "$OPTARG" | tr '[:upper:]' '[:lower:]')
	    ;;
	    d) 
			CF_DOMAIN=$(echo "$OPTARG" | tr '[:upper:]' '[:lower:]')
	    ;;
	    i) 
			INSTANCE=$OPTARG
	    ;;
	    \?) 
			echo "Invalid option -$OPTARG"
			show_help
	    ;;
	  esac
	done
}


function main(){
	get_args $*
	validate_inputs
	create_services
	push_app_to_cf
	do_zero_downtime_deployment
	delete_older_apps
	cleanup
}

main $*
