const restClient = require('./RestClient');
const requestUtil = require("./RequestUtil");
const controlConstructUtils = require("./ControlConstructUtil");
const logger = require('../LoggingService.js').getLogger();


/**
 * forward request to MWDI instance depending on use case
 *
 * @param requestUrl
 * @param callbackName
 * @param payload
 * @return {Promise<*|null>}
 */
exports.postRequestDataFromMWDI = async function(requestUrl, callbackName, payload) {
    let opData = await controlConstructUtils.getForwardingConstructOutputOperationData(callbackName);
    if (!opData) {
        const msg = "Operation data could not queried: " + callbackName;
        logger.error(msg);
        return {code: 500, message: msg};
    }

    let operationUrl = opData.operationName;

    let targetUrl = requestUtil.buildRequestTargetPath(opData.protocol, opData.address, opData.port) + operationUrl;

    logger.debug("forwarding post data request to '" + targetUrl + "'");

    const ret = await restClient.startPostDataRequest(targetUrl, payload, requestUrl, opData.operationKey);

    return {
        code: ret.code,
        message: ret.message,
        headers: ret.headers,
        operationName: opData.operationName
    };
}


/**
 * Forward request to MWDI.
 * @param requestUrl
 * @param callbackName
 * @param payload
 * @param fieldsFilter
 * @returns {Promise}
 */
exports.getDataFromMWDI = async function (requestUrl, callbackName, payload, fieldsFilter=undefined) {
    let opData = await controlConstructUtils.getForwardingConstructOutputOperationData(callbackName);

    let operationUrl = opData.operationName;

    if (operationUrl.includes("{mountName}")) {
        operationUrl = operationUrl.replace("{mountName}", payload["mount-name"]);
    }

    let targetUrl = requestUtil.buildRequestTargetPath(opData.protocol, opData.address, opData.port) + operationUrl;

    if (fieldsFilter) {
        targetUrl += "?fields=" + encodeURIComponent(fieldsFilter);
        // () must be manually encoded
        targetUrl = targetUrl.replaceAll("(", "%28").replaceAll(")", "%29");
    }

    logger.debug("forwarding get request to '" + targetUrl + "'");

    const ret = await restClient.startGetRequest(targetUrl, requestUrl, opData.operationKey);

    return {
        code: ret.code,
        message: ret.message,
        headers: ret.headers,
        operationName: opData.operationName
    };
}
