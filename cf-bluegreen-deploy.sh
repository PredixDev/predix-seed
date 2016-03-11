#!/bin/bash
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

function create_kibana_if_not_exists_and_bind_to_logstash(){
	cf app $1
	# Check the status of the previous command
	if [ $? -ne 0 ]; then
	    status "$1 not found. Creating new Kibana app"
	    git clone https://github.com/cloudfoundry-community/kibana-me-logs.git
	    cd kibana-me-logs
	    cf push $1 --no-start --random-route -b https://github.com/heroku/heroku-buildpack-go.git
		exit_if_error $? "Could not push $1 instance"
		cf bind-service $1 $2
		exit_if_error $? "Could not create bind $1 to $2"
		cf start $1
		exit_if_error $? "Could not start $1 instance"
		cd ..
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

function create_secure_service_if_not_exists(){
	cf service $3
	# Check the status of the previous command
	if [ $? -ne 0 ]; then
	    status "$1 instance not found. Creating new $1 instance"
	    cf cs $1 $2 $3 -c '{"trustedIssuerIds": ["'${UAA_URL}'/oauth/token"]}'
	    exit_if_error $? "Could not create $3 instance  from '$1 $2'"
	fi
}

function create_services(){
	create_service_if_not_exists $REDIS $REDIS_PLAN "predix_seed_session_store"
	create_secure_service_if_not_exists $VIEWSERVICE $VIEWSERVICE_PLAN "predix_seed_view_service"


	if [ -z $LOGSTASH ]; then
	    echo "LOGSTASH is undefined, disabling logstash & Kibana"
  else
	  create_service_if_not_exists $LOGSTASH $LOGSTASH_PLAN "predix-platform-logstash"; #"predix_seed_logstash"
	  create_kibana_if_not_exists_and_bind_to_logstash $KIBANA_APP  "predix-platform-logstash"; #"predix_seed_logstash"
	fi

	if [ -z $NEWRELIC ]; then
    echo "NEWRELIC is undefined, disabling NEWRELIC"
  else
    echo "create_services:NEWRELIC:" $NEWRELIC
    create_service_if_not_exists $NEWRELIC $NEWRELIC_PLAN "predix-platform-newrelic"; #"predix_seed_new_relic"
  fi
}

function push_app_to_cf(){
	status "Pushing $APP_ID to CF"
	cf push $APP_ID -f $MANIFEST -i $INSTANCE --no-start
	if [ $? -ne 0 ]; then
	    status "Could not push the application as expected, Please find below the logs"
    	cf logs $APP_ID --recent
    	exit 1;
	fi

	status "Setting UAA_SERVER_URL to ${UAA_URL}"
	cf set-env $APP_ID UAA_SERVER_URL $UAA_URL

	status "Setting REDIS for common.lua to ${REDIS}"
	cf set-env $APP_ID REDIS $REDIS

	#status "Setting NEW_RELIC_APP_NAME to ${NEW_RELIC_APP_NAME}"
	#cf set-env $APP_ID NEW_RELIC_APP_NAME $NEW_RELIC_APP_NAME

	cf start $APP_ID
	if [ $? -ne 0 ]; then
	    status "Could not start the application as expected, Please find below the logs"
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
	while getopts "f:s:b:d:i:t:n:k:l:" opt; do
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
	    t)
			UAA_URL=$OPTARG
	    ;;
	    n)
			NEW_RELIC_APP_NAME=$OPTARG
		;;
		k)
			KIBANA_APP=$OPTARG
		;;
		l)
      LOGSTASH=$OPTARG
    ;;
	  \?)
			echo "Invalid option -$OPTARG"
			show_help
	  ;;
	  esac
	done
}

function save_build_info(){
  printf "{
    'APP': '$APP' ,
    'APP_ID': '$APP_ID' ,
    'MANIFEST': '$MANIFEST' ,
    'NEWRELIC': '$NEWRELIC' ,
    'LOGSTASH': '$LOGSTASH' ,
    'LOGSTASH_PLAN':'$LOGSTASH_PLAN',
    'NEWRELIC_PLAN':'$NEWRELIC_PLAN',
    'POSTGRES_DB': '$POSTGRES_DB' ,
    'POSTGRES_DB_PLAN':'$POSTGRES_DB_PLAN',
    'POSTGRES_DB_INSTANCE' : '$POSTGRES_DB_INSTANCE',
    'ARTIFACTORY_BUILD_NUMBER': '$ARTIFACTORY_BUILD_NUMBER',
    'CF_DOMAIN': '$CF_DOMAIN' ,
    'CF_SPACE': '$CF_SPACE' ,
    'CF_ORG': '$CF_ORG' ,
    'INSTANCE': '$INSTANCE'
  }" > artifact.json
}

function main(){
	get_args $*
	save_build_info
	validate_inputs
	create_services
	push_app_to_cf
	do_zero_downtime_deployment
	delete_older_apps
	cleanup
}

main $*
