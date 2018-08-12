import config from './api-config';

let api = {
    login: config.host + config.prefix + '/authorizations',
    me: config.host + config.prefix + '/user',
    logout: config.host + config.prefix + '/authorizations/current',
    updatePass: config.host + config.prefix + '/updatePass',
    myDevices: config.host + config.prefix + '/myDevices',
    deviceChart: config.host + config.prefix + '/deviceChart',
};

export default {
    api: api,
};