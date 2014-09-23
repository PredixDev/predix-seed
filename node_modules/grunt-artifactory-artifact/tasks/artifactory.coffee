"use strict"
Q = require 'q'

module.exports = (grunt) ->
  ArtifactoryArtifact = require('../lib/artifactory-artifact')(grunt)
  util = require('../lib/util')(grunt)
  # shortcut to Lodash
  _ = require('lodash')

  grunt.registerMultiTask 'artifactory', 'Download an artifact from artifactory', ->
    done = @async()

    # defaults
    options = this.options
      url: ''
      base_path: 'artifactory'
      repository: ''
      versionPattern: '%a-%v%c.%e'
      username: ''
      password: ''

    processes = []

    if !@args.length or _.contains @args, 'fetch'
      _.forEach options.fetch, (cfg) ->
        # get the base artifactory path
        _.assign cfg, ArtifactoryArtifact.fromString(cfg.id) if cfg.id
        _.assign cfg, options

        artifact = new ArtifactoryArtifact cfg
        reqOpts = {}
        if(options.username)
          reqOpts = {'auth':{'user':options.username, 'pass':options.password}}
        processes.push util.download(artifact, cfg.path, reqOpts, cfg.decompress)

    if @args.length and _.contains @args, 'package'
      _.forEach options.publish, (cfg) =>
        artifactCfg = {}

        _.assign artifactCfg, ArtifactoryArtifact.fromString(cfg.id) if cfg.id
        _.assign artifactCfg, cfg, options

        artifact = new ArtifactoryArtifact artifactCfg
        processes.push util.package(artifact, @files, { path: cfg.path } )

    if @args.length and _.contains @args, 'publish'
      _.forEach options.publish, (cfg) =>
        artifactCfg = {}
        _.assign artifactCfg, ArtifactoryArtifact.fromString(cfg.id) if cfg.id
        _.assign artifactCfg, cfg, options

        artifact = new ArtifactoryArtifact artifactCfg
        deferred = Q.defer()
        util.package(artifact, @files, { path: cfg.path }).then () ->
            util.publish(artifact, { path: cfg.path, credentials: { username: options.username, password: options.password }}).then ()->
                deferred.resolve()
            .fail (err) ->
                deferred.reject(err)
        .fail (err) ->
            deferred.reject(err)
        processes.push deferred.promise

    Q.all(processes).then(() ->
      done()
    ).fail (err) ->
      grunt.fail.warn err
