import _ from 'lodash';

// import the language files
import global from './global.json';
import device from './device.json';
import deviceType from './device-type.json';

// merge all of json objects from the language files
export default _.merge(
    global,
    device,
    deviceType,
)
