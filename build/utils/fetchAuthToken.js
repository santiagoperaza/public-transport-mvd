"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const buffer_1 = require("buffer");
const config_1 = __importDefault(require("../config/config"));
const fetchAuthToken = async () => {
    const { clientId, clientSecret, mvdApiAuthUrl } = config_1.default;
    const basicAuth = buffer_1.Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await fetch(mvdApiAuthUrl, {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
            Authorization: `Basic ${basicAuth}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    });
    const token = await response.json();
    return token.access_token;
};
exports.default = fetchAuthToken;
