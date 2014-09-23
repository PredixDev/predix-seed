
module.exports = (grunt) -> class ArtifactoryArtifact

	_ = require('lodash')


	# If an ID string is provided, this will return a config object suitable for creation of an ArtifactoryArtifact object
	# ID made from group_id:name:ext:{classifier:}version
	@fromString = (idString) ->
		config = {}
		parts = idString.split(':')
		if parts.length == 4
			parts.splice(3, 0, '')
		[config.group_id, config.name, config.ext, config.classifier, config.version] = parts
		return config

	constructor: (config) ->
		{@url, @base_path, @repository, @group_id, @name, @classifier, @version, @ext, @versionPattern} = config

	toString: () ->
		parts = [@group_id, @name, @ext, @version]
		if @classifier
			parts.splice(3, 0, @classifier)
		parts.join(':')

	dashClassifier: () ->
	 	if @classifier then "-#{@classifier}" else ''

	buildUrlPath: () ->
		_.compact(_.flatten([
			@url
			@base_path
			@repository
			@group_id.split('.')
			@name
			"#{@version}/"
		])).join('/')

	buildUrl: () ->
		"#{@buildUrlPath()}#{@buildArtifactUri()}"

	buildArtifactUri: () ->
		@versionPattern.replace /%([avce])/g, ($0, $1) =>
			{ a: @name, v: @version, c: @dashClassifier(), e: @ext }[$1]
