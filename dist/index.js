'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var WalletConnectProvider = require('@walletconnect/web3-provider');
var ethers = require('ethers');
var Web3Modal = require('web3modal');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var WalletConnectProvider__default = /*#__PURE__*/_interopDefaultLegacy(WalletConnectProvider);
var Web3Modal__default = /*#__PURE__*/_interopDefaultLegacy(Web3Modal);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var Context = React.createContext({
    handleConnect: function () { },
    handleDisconnect: function () { },
    connected: false,
    walletAddress: null,
    wallet: null,
});
var Provider = function (_a) {
    var children = _a.children;
    var _b = React.useState(undefined), web3Modal = _b[0], setWeb3Modal = _b[1];
    var _c = React.useState(false), connected = _c[0], setConnected = _c[1];
    var _d = React.useState(undefined), walletAddress = _d[0], setWalletAddress = _d[1];
    var _e = React.useState(undefined), wallet = _e[0], setWallet = _e[1];
    var handleConnect = React.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var provider, newWeb3, accounts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (web3Modal === null || web3Modal === void 0 ? void 0 : web3Modal.connect())];
                case 1:
                    provider = _a.sent();
                    if (!provider) return [3 /*break*/, 3];
                    newWeb3 = new ethers.ethers.providers.Web3Provider(provider);
                    return [4 /*yield*/, newWeb3.listAccounts()];
                case 2:
                    accounts = _a.sent();
                    setConnected(true);
                    setWalletAddress(accounts[0]);
                    setWallet(newWeb3.getSigner());
                    provider.on('accountsChanged', function (newAccounts) {
                        if (Array.isArray(newAccounts) && newAccounts.length) {
                            setWalletAddress(newAccounts[0]);
                        }
                    });
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, handleDisconnect()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); }, [setWalletAddress, setWallet, web3Modal, setConnected]);
    var handleDisconnect = React.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setConnected(false);
            setWalletAddress(undefined);
            setWallet(undefined);
            return [2 /*return*/];
        });
    }); }, [setConnected, setWalletAddress, setWallet]);
    React.useEffect(function () {
        function initWeb3Modal() {
            return __awaiter(this, void 0, void 0, function () {
                var providerOptions, web3Modal_1;
                return __generator(this, function (_a) {
                    try {
                        if (!web3Modal) {
                            providerOptions = {
                                walletconnect: {
                                    package: WalletConnectProvider__default['default'],
                                    options: {
                                        infuraId: process.env.INFURA_ID,
                                    },
                                },
                            };
                            web3Modal_1 = new Web3Modal__default['default']({
                                cacheProvider: true,
                                providerOptions: providerOptions,
                                theme: 'dark',
                            });
                            setWeb3Modal(web3Modal_1);
                        }
                    }
                    catch (e) {
                        console.log(e);
                    }
                    return [2 /*return*/];
                });
            });
        }
        initWeb3Modal();
        handleConnect();
    }, [setWeb3Modal, web3Modal]);
    return (React__default['default'].createElement(Context.Provider, { value: {
            handleConnect: handleConnect,
            handleDisconnect: handleDisconnect,
            connected: connected,
            walletAddress: walletAddress,
            wallet: wallet,
        } }, children));
};

var useWeb3 = function () {
    return __assign({}, React.useContext(Context));
};

exports.Context = Context;
exports.Provider = Provider;
exports.useWeb3 = useWeb3;
