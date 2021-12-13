import { memo, useCallback, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getDevices } from '../../../shared/reducer/device.reducer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import i18n from '../../i18n';
import TableHeaderSort from '../../../shared/components/table/table-header-sort/table-header-sort';
import TableBody from '../../../shared/components/table/table-body/table-body';
import TableBodyActionButtons from '../../../shared/components/table/table-body-action-buttons/table-body-action-buttons';
import './devices-list.scss';

function DevicesList() {
    const dispatch = useAppDispatch();
    const devices = useAppSelector(state => state.device.devices);
    const [filter, setFilter] = useState({
        sort: 'id',
        query: ''
    });

    useEffect(() => {
        dispatch(
            getDevices()
        );
    }, [dispatch, filter]);

    const sort = useCallback((sort: string) => () =>
        setFilter((prevFilter: any) => {
            return {
                ...prevFilter,
                sort
            }
        }), []);

    return (
        <Table responsive striped>
            <thead>
                <tr>
                    <TableHeaderSort text={i18n.t('device.systemName')} onPressSort={sort}/>
                    <TableHeaderSort text={i18n.t('device.type')} onPressSort={sort}/>
                    <TableHeaderSort text={i18n.t('device.hddCapacity')} onPressSort={sort}/>
                    <TableHeaderSort text={i18n.t('global.buttons.title')} onPressSort={sort}/>
                </tr>
            </thead>
            <tbody>
                {devices.map((device, i) => (
                    <tr id={device.id} key={`device-${i}`}>
                        <TableBody text={device.system_name}/>
                        <TableBody text={device.type}/>
                        <TableBody text={device.hdd_capacity}/>
                        <TableBodyActionButtons
                        />
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default memo(DevicesList);
