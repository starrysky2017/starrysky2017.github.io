import JsonPApi from '../api/jsonp';
import { remoteHost } from '../config';

const actions = {
    submitApply: function (data) {
        return new Promise(resolve => {
            JsonPApi({
                url: `${remoteHost}/api/apply/trial`,
                data,
            }).then(response => {
                resolve(response);
            })
        })
    }
}

export default actions;
