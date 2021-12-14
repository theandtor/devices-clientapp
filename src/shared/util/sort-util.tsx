import _, { lowerCase } from "lodash";
import { IDeviceFilter } from "../model/device-filter.model";

export const sortBy = (d1: any, d2: any, filter: IDeviceFilter): any => {
    const asc = filter.ascending ? 1 : -1;
    const desc = filter.ascending ? -1 : 1;

    const { device1Value, device2Value } = getValueByPropName(d1, d2, filter.sort);

    if (device1Value < device2Value) { return asc; }
    if (device1Value > device2Value) { return desc; }
    return 0;
}

const getValueByPropName = (d1: any, d2: any, propName: string) => {
    let device1Value = Number(d1[propName]) as number | string;
    let device2Value = Number(d2[propName]) as number | string;

    if (_.isNaN(device1Value) || _.isNaN(device2Value)) {
        device1Value = lowerCase(d1[propName]);
        device2Value = lowerCase(d2[propName]);
    }

    return {
        device1Value,
        device2Value,
    }
}