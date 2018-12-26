"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
Object.defineProperty(exports, "__esModule", { value: true });
//需要引用wx-promise-pro库,如果在全局入口中已配置,则此处可省略
require("wx-promise-pro");
/**
 * 网络请求结果基类，通过{@linkplain BaseResp#getData}得到的对象只能调用成员属性，不能调用对象上面的方法。这是"鸭子辨型法"的结果
 */
var BaseResp = /** @class */ (function () {
    function BaseResp() {
        this.code = BaseResp.STATUS_CODE_DEFAULT;
        this.httpSuccess = false;
        this.statusCode = 0;
    }
    BaseResp.prototype.setInfo = function (httpSuccess, statusCode, code, msg, data) {
        this.httpSuccess = httpSuccess;
        this.statusCode = statusCode;
        this.code = code;
        this.msg = msg;
        this.data = data;
    };
    /**
     * 通过{@linkplain BaseResp#getData}得到的对象只能调用成员属性，不能调用对象上面的方法。这是"鸭子辨型法"的结果
     */
    BaseResp.prototype.getData = function () {
        return this.data;
    };
    /**
     * 调用此方法前应先判断data是否存在，可以先使用{@link #isSuccess}判断为true后，再直接调用此方法获得结果。
     * 通过{@linkplain BaseResp#getData}得到的对象只能调用成员属性，不能调用对象上面的方法。这是"鸭子辨型法"的结果
     */
    BaseResp.prototype.getDataTyped = function () {
        return this.data;
    };
    BaseResp.prototype.getCode = function () {
        return this.code;
    };
    BaseResp.prototype.getStatusCode = function () {
        return this.statusCode;
    };
    BaseResp.prototype.getMsg = function () {
        return this.msg;
    };
    /**
     * 只判断code为{@link BaseResp#STATUS_CODE_SUCCESS}
     */
    BaseResp.prototype.isSuccessByCode = function () {
        return this.httpSuccess && this.code == BaseResp.STATUS_CODE_SUCCESS;
    };
    /**
     * 判断{@link isSuccessByCode()} ,并且{@link #data} 有值
     */
    BaseResp.prototype.isSuccess = function () {
        return this.isSuccessByCode() && this.data != undefined && this.data != null;
    };
    BaseResp.prototype.isTokenExpired = function () {
        return this.code == BaseResp.CODE_TOKEN_EXPIRED;
    };
    BaseResp.STATUS_CODE_ERROR = -100;
    BaseResp.STATUS_CODE_DEFAULT = -1;
    BaseResp.STATUS_CODE_SUCCESS = 200;
    BaseResp.CODE_TOKEN_EXPIRED = 100;
    return BaseResp;
}());
exports.BaseResp = BaseResp;
/**
 * 服务Api调用类,可以通过设置{@link ApiService#ApiTokenHandler}来设置token处理类
 */
var ApiService = /** @class */ (function () {
    function ApiService() {
    }
    /**
     * 发送Post请求
     * @param url
     * @param data
     */
    ApiService.requestPost = function (url, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.innerHandle(url, data, "POST")];
            });
        });
    };
    /**
     * 发送Get请求
     * @param url
     * @param data
     */
    ApiService.requestGet = function (url, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.innerHandle(url, data, "GET")];
            });
        });
    };
    ApiService.createInstance = function (c) {
        return new c();
    };
    ApiService.createInstanceNoGeneric = function (c) {
        return new c();
    };
    ApiService.isEmpty = function (obj) {
        return obj == null || obj == undefined || (typeof obj == 'string' && obj.length == 0);
    };
    /**
     * 封装请求结果，进行全局错误处理.
    * 由于“鸭子辨型法”，泛型转换只是为了让编译器正常通过，运行时直接转换的子类只能访问和修改属性，不能调用方法。
    * 该方法中对数据结果进行封装，通过值拷贝封装到一个真实对象上，从而操作数据
    *
     * @param url
     * @param method
     * @param data
     */
    ApiService.innerHandle = function (url, data, method) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, wxresp, httpSuccess, httpData, token, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resp = new BaseResp();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, this.sendRequest(url, data, method)];
                    case 2:
                        wxresp = _a.sent();
                        console.log("api response received for: " + url);
                        console.log("response:", wxresp);
                        httpSuccess = wxresp && wxresp.statusCode.toString().startsWith("20");
                        if (httpSuccess) {
                            if (wxresp.data) {
                                httpData = wxresp.data ? wxresp.data : { code: BaseResp.STATUS_CODE_DEFAULT };
                                resp.setInfo(httpSuccess, wxresp.statusCode, httpData.code, httpData.msg, httpData.data);
                                if (httpData.token && !this.isEmpty(this.ApiTokenHandler)) {
                                    //返回了token
                                    this.ApiTokenHandler.onTokenReceived(httpData.token);
                                }
                            }
                        }
                        else {
                            resp.setInfo(false, wxresp.statusCode, 0, "服务端返回了出错信息");
                        }
                        console.log("check token");
                        if (!(resp.isTokenExpired() && !this.isEmpty(this.ApiTokenHandler))) return [3 /*break*/, 6];
                        console.log("token invalid. try refresh token...................................");
                        return [4 /*yield*/, this.ApiTokenHandler.refereshToken()];
                    case 3:
                        token = _a.sent();
                        console.log("token refreshed during request:" + token);
                        if (!(token != null && token != undefined && token.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.innerHandle(url, data, method)];
                    case 4:
                        //重新请求一次，并返回结果，从而对上层无感
                        resp = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        console.log("refresh token failed!!!!!");
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        console.log("api error:", error_1);
                        resp.setInfo(false, BaseResp.STATUS_CODE_ERROR, 0, "请求服务接口发生异常!");
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/, resp];
                }
            });
        });
    };
    /**
     * 发送Get请求
     * @param url
     * @param data
     */
    ApiService.sendRequest = function (url, data, method) {
        if (method === void 0) { method = "GET"; }
        console.log("wxpro send request:" + url);
        //添加共用参数
        var requestOp = {
            url: url,
            data: data,
            dataType: "json",
            header: { "token": this.isEmpty(this.ApiTokenHandler) ? "" : this.ApiTokenHandler.getToken() },
            // header: {
            //   sId:1,
            //   bId:1,
            //   gId:1, 
            //   "token":"NTE4MDc1ODkwNjc3MDU1NDg4XzUxODA3NTg5MDY3NzA1NTQ4OF81MTgwNzU4OTA2NzcwNTU0ODhfMzg1XzE1NDQ0MzA2ODIwNzA=" },
            method: method
        };
        return wx.pro.request(requestOp);
    };
    return ApiService;
}());
exports.ApiService = ApiService;
