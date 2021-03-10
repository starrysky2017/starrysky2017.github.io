import { createBrowserHistory, createHashHistory } from 'history';
import { obj2search } from '../../public/util/index'

const defineHistory = createHashHistory();

const linkTo = (pathname, search_data = null) => {
    let _search = search_data;
    if (_search === null) {
        console.log(defineHistory)
        const _location = defineHistory.location;
        _search = _location.search;
    } else {
        _search = obj2search(_search);
    }

    defineHistory.push({
        pathname,
        search: _search
    })
}

//back to login page
const backToLogin = () => {
    defineHistory.push('/login');
}

const getSearchParam = (key) => {
    const search = defineHistory.location.search;
    const params = new URLSearchParams(search);
    const value = params.get(key) ? params.get(key) : '';
    return value;
}

const goBack = () => {
    defineHistory.goBack();
}

export default defineHistory;
export { linkTo, backToLogin, goBack, getSearchParam }