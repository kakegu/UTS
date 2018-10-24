const resp = require('../utils/responseUtil');
const express = require('express');
const router = express.Router();
const assetService = require('../services/assetService');

router.get('/balance/:address/:asset', function (req, res, next) {
    let address = req.params.address;
    let asset = req.params.asset;

    assetService.queryBalance(address, asset).then(balance => {
        resp.handleResponse(res, balance);
    }).catch(err => {
        resp.handleResponse(res, null, err);
    })
})

router.get('/txhistory/:address/:asset/:index/:size', function (req, res, next) {
    let asset = req.params.asset
    let address = req.params.address
    let index = parseInt(req.params.index)
    let size = parseInt(req.params.size)
    let pageXOffset = index * size - size

    assetService.queryHistory(address, asset, pageXOffset, size).then(arrJoint => {
        resp.handleResponse(res, { history: arrJoint });
    }).catch(err => {
        resp.handleResponse(res, null, err);
    })

})

router.post('/transfer', async function (req, res, next) {

    let asset = req.body.asset;
    let payer = req.body.payer;
    let outputs = req.body.outputs;
    let message = req.body.message;


    assetService.transfer(asset, payer, outputs, message).then(ret => {
        resp.handleResponse(res, ret);
    }).catch(err => {
        resp.handleResponse(res, null, err);
    })
})

router.post('/sign', function (req, res, next) {

    let txid = req.body.txid
    let sig = req.body.sig

    assetService.sign(txid, sig).then(ret => {
        resp.handleResponse(res, ret);
    }).catch(err => {
        resp.handleResponse(res, null, err);
    })
})

module.exports = router