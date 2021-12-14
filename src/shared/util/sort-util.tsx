import { IDeviceFilter } from "../model/device-filter.model";

export const sortBy = (d1: any, d2: any, filter: IDeviceFilter): any => {
    const asc = filter.ascending ? 1 : -1;
    const desc = filter.ascending ? -1 : 1;
    if (d1[filter.sort] < d2[filter.sort]) { return asc; }
    if (d1[filter.sort] > d2[filter.sort]) { return desc; }
    return 0;
}