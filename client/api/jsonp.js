import JsonP from 'jsonp';
import { dictToString } from '../../public/util/index';

export default function (options) {
    const data = {
        ...options.data,
    }
    let url = options.url;
    console.log(data)
    if (Object.keys(data).length) {
        url = `${url}?${dictToString(data)}`;
    }
    return new Promise((resolve, reject) => {
        JsonP(url, {
            param: 'callbackName',
        }, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}