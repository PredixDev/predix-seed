'use strict'
const expect = require('chai').expect;
const sinon = require('sinon');
const lp = require('../../server/routes/learning-paths');
const predixConfig = require('../../server/predix-config');
const stubConfig = {};
const expressResponse = {};
const baseResponse = {"appMode": "default", "services": {} };
let expectedResponse;

beforeEach(() => {
    expressResponse.send = sinon.spy()
    stubConfig.isUaaConfigured = sinon.stub().returns(false);
    stubConfig.isAssetConfigured = sinon.stub().returns(false);
    stubConfig.isTimeSeriesConfigured = sinon.stub().returns(false);
    expectedResponse = baseResponse;
});

describe('Learning Paths', () => {
    it('returns default object when nothing is configured', () => {
        const mw = lp(stubConfig);
        mw(null, expressResponse, function(){});
        expect(expressResponse.send.calledOnce).to.be.true;
        expect(expressResponse.send.calledWith(expectedResponse)).to.be.true;
    });

    it('returns correct object if only uaa is configured', () => {
        stubConfig.isUaaConfigured.returns(true);
        const mw = lp(stubConfig);
        mw(null, expressResponse, function(){});
        expectedResponse.services.uaa = true;
        expect(expressResponse.send.calledOnce).to.be.true;
        expect(expressResponse.send.calledWith(expectedResponse)).to.be.true;
    });

    it('returns correct object if uaa and asset are configured', () => {
        stubConfig.isUaaConfigured.returns(true);
        stubConfig.isAssetConfigured.returns(true);
        const mw = lp(stubConfig);
        mw(null, expressResponse, function(){});
        expectedResponse.services.uaa = true;
        expectedResponse.services.asset = true;
        expect(expressResponse.send.calledOnce).to.be.true;
        expect(expressResponse.send.calledWith(expectedResponse)).to.be.true;
    });

    it('returns correct object if uaa, asset, and ts are configured', () => {
        stubConfig.isUaaConfigured.returns(true);
        stubConfig.isAssetConfigured.returns(true);
        stubConfig.isTimeSeriesConfigured.returns(true);
        const mw = lp(stubConfig);
        mw(null, expressResponse, function(){});
        expectedResponse.services.uaa = true;
        expectedResponse.services.asset = true;
        expectedResponse.services.timeseries = true;
        expect(expressResponse.send.calledOnce).to.be.true;
        expect(expressResponse.send.calledWith(expectedResponse)).to.be.true;
    });        
});