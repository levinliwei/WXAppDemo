"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function showToast(msg) {
    if (msg == undefined) {
        return;
    }
    var option = {
        title: msg,
        duration: 2000,
        icon: "none"
    };
    wx.showToast(option);
}
exports.showToast = showToast;
function showLoading(msg, mask, timeout) {
    if (msg === void 0) { msg = "加载中"; }
    if (mask === void 0) { mask = true; }
    if (timeout === void 0) { timeout = -1; }
    wx.showLoading({
        title: msg,
        mask: mask,
    });
    if (timeout > 0) {
        setTimeout(function () {
            hideLoading();
        }, timeout);
    }
}
exports.showLoading = showLoading;
function hideLoading() {
    wx.hideLoading({});
}
exports.hideLoading = hideLoading;
function formatTime(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}
exports.formatTime = formatTime;
function formatDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return [year, month, day].map(formatNumber).join('-');
}
exports.formatDate = formatDate;
var formatNumber = function (n) {
    var str = n.toString();
    return str[1] ? str : '0' + str;
};
function isNullOrEmpty(obj) {
    return obj == null || obj == undefined || (typeof obj == 'string' && obj.length == 0);
}
exports.isNullOrEmpty = isNullOrEmpty;
// 分转化为元
function fen2Yuan(num) {
    if (typeof num == 'string') {
        num = parseFloat(num);
    }
    return num ? parseFloat((num / 100).toFixed(2)) : 0;
}
exports.fen2Yuan = fen2Yuan;
//金额为元，添加千分位
function formatYuan(num) {
    num = fen2Yuan(num);
    var str = num.toString().replace(/(\d{1,3})(?=(\d{3})+.*$)/g, '$1,');
    return str;
}
exports.formatYuan = formatYuan;
// 分转化为元，并添加千分位
function fen2YuanFormmatted(num) {
    num = fen2Yuan(num);
    return formatYuan(num);
}
exports.fen2YuanFormmatted = fen2YuanFormmatted;
