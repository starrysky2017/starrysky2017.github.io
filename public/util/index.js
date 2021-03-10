Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * get random num
 */
function getRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

/**
 * query obj convert to search
 */
function obj2search(obj, split = '&') {
    let result = '?';
    let arr = [];
    for (let key in obj) {
        arr.push(`${key}=${obj[key]}`);
    }
    result += arr.join(split);
    return result;
}

/**
 * dict convert to query
 */
function dictToString(dict, split = '&') {
    let result = '';
    for (let key in dict) {
        try {
            if (result === '') {
                result = key + '=' + dict[key];
            } else {
                result += split + key + '=' + dict[key];
            }
        } catch (error) {
            console.log(error);
        }
    }
    return result;
}

/*
* if is number
*/
function isNumber(value) {
    return !Number.isNaN(Number(value))
}

/*
* if is positive number
*/
function isPositiveNumber(value) {
    return isNumber(value) && Number(value) > 0 ? true : false;
}

/**
 * isArray
 */
function isArray(something) {
    return Object.prototype.toString.call(something) === '[object Array]';
}

module.exports = {
    getRandomNum,
    obj2search,
    dictToString,
    isNumber,
    isPositiveNumber,
    isArray,
}