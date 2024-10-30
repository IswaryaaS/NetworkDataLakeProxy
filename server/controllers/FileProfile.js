'use strict';

const fileProfileService = require('../service/FileProfileService');
const responseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
const responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
const oamLogService = require('onf-core-model-ap/applicationPattern/services/OamLogService');

module.exports.getFileProfileFileDescription = async function getFileProfileFileDescription(req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  await fileProfileService.getFileProfileFileDescription(req.url)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      let sentResp = responseBuilder.buildResponse(res, undefined, response);
      responseCode = sentResp.code;
    });
  void oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getFileProfileFileIdentifier = async function getFileProfileFileIdentifier(req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  await fileProfileService.getFileProfileFileIdentifier(req.url)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      let sentResp = responseBuilder.buildResponse(res, undefined, response);
      responseCode = sentResp.code;
    });
  void oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getFileProfileFileName = async function getFileProfileFileName(req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  await fileProfileService.getFileProfileFileName(req.url)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      let sentResp = responseBuilder.buildResponse(res, undefined, response);
      responseCode = sentResp.code;
    });
  void oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getFileProfileOperation = async function getFileProfileOperation(req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  await fileProfileService.getFileProfileOperation(req.url)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      let sentResp = responseBuilder.buildResponse(res, undefined, response);
      responseCode = sentResp.code;
    });
  void oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.putFileProfileFileName = async function putFileProfileFileName(req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  await fileProfileService.putFileProfileFileName(req.url, body)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      let sentResp = responseBuilder.buildResponse(res, undefined, response);
      responseCode = sentResp.code;
    });
  void oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.putFileProfileOperation = async function putFileProfileOperation(req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  await fileProfileService.putFileProfileOperation(req.url, body)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      let sentResp = responseBuilder.buildResponse(res, undefined, response);
      responseCode = sentResp.code;
    });
  void oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};
