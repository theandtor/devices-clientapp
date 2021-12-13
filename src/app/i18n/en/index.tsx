import _ from "lodash"

// import the language files
import global from "./global.json"
import device from "./device.json"

// merge all of json objects from the language files
export default _.merge(
    global,
    device,
)
