import 'whatwg-fetch';
import { dictToString } from '../../public/util';

const data = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    mode: 'cors',
    cache: 'default',
}

export default function (...params) {
    //use timestamp to fix cache
    let timestamp = (new Date()).getTime();
    if (params[0].query === undefined) {
        params[0].query = {};
    }

    params[0].query['timestamp'] = timestamp;
    if (params.length > 1) {
        fetchAllData(params);
    } else {
        switch (params[0].method) {
            case 'GET':
                params[0].query = '?' + dictToString(params[0].query)
                return fetchData(params, Object.assign({}, {
                    method: params[0].method
                }, data))
            case 'POST':
            case 'DELETE':
                let fetch_data = {};
                if (params[0].formData) {
                    const _data = JSON.parse(JSON.stringify(data));
                    //if formData existed,delete headers Content-type
                    delete _data['headers']['Content-Type'];
                    fetch_data = Object.assign({}, {
                        method: params[0].method,
                        body: params[0].formData
                    }, _data);
                } else {
                    params[0].query = JSON.stringify(params[0].query)
                    fetch_data = Object.assign({}, {
                        method: params[0].method,
                        body: params[0].query,
                    }, data);
                }
                return fetchData(params, fetch_data);
        }
    }
}

function fetchAllData(params) {
    Promise.all(params.map(request => {
        let url = request.path + '?' + dictToString(request.query);
        return fetch(url, data)
            .then(res => res.json())
            .then(res => res)
    }))
}

function fetchData(params, data) {
    let url = params[0].path + (data.method !== 'GET' ? '' : params[0].query);
    return fetch(url, data)
        .then(res => res.json())
        .then(res => res)
}

