import api from '../api';

const actions = {
    submitApply: function (data) {
        return new Promise(resolve => {
            api({
                method: 'POST',
                path: `/api/apply`,
                query: { ...data }
            })
                .then(response => {
                    resolve(response)
                })
        })
    }
}

export default actions;
