import { memo } from 'react';
import { Table } from 'react-bootstrap';
import i18n from '../../i18n';
import TableHeaderSort from '../../../shared/components/table/table-header-sort/table-header-sort';
import TableBody from '../../../shared/components/table/table-body/table-body';
import TableBodyActionButtons from '../../../shared/components/table/table-body-action-buttons/table-body-action-buttons';
import CustomButton from '../../../shared/components/button/custom-button/custom-button';
import DetailDeviceModal from './detail-device-modal/detail-device-modal';
import DeleteDeviceModal from './delete-device-modal/delete-device-modal';
import './devices-list.scss';
import { useDeviceList } from '../custom-hook/use-device-list';
import I18n from '../../i18n';
import { DEVICE_TYPE } from '../../../shared/constants/device-type.constants';
import { ValidatedField } from 'react-jhipster';

function DevicesList() {
    const {
        sort,
        handleDeleteModal,
        handleDelete,
        handleEdit,
        handleCreate,
        handleDetailModal,
        handleCloseDetailModal,
        handleCloseDeleteModal,
        onChangeQuery,
        devices,
        showDetailModal,
        showDeleteModal,
        deviceSelected,
    } = useDeviceList()

    const renderDetailModal = () => {
        if (!showDetailModal) {
            return <div />
        }

        return (
            <DetailDeviceModal
                deviceSelected={deviceSelected}
                handleCreate={handleCreate}
                handleEdit={handleEdit}
                handleCloseDetailModal={handleCloseDetailModal}
            />
        )
    }

    const renderDeleteModal = () => {
        if (!showDeleteModal) {
            return <div />
        }

        return (
            <DeleteDeviceModal
                deviceSelected={deviceSelected}
                handleDelete={handleDelete}
                handleCloseDeleteModal={handleCloseDeleteModal}
            />
        )
    }

    const renderDropdownType = () => {
        return (
            <ValidatedField className='primary' type="select" name='type' onChange={onChangeQuery} defaultChecked={undefined} label={I18n.t('device.filter.type')}>
                <option value={undefined}></option>
                {Object.values(DEVICE_TYPE).map(type => (
                    <option value={type} key={type}>
                        {I18n.t(`deviceType.${type}`)}
                    </option>
                ))}
            </ValidatedField>
        )
    }

    return (
        <div>
            <div className='d-flex justify-content-between'>
                <div>
                    {renderDropdownType()}
                </div>
                <div className='align-self-center'>
                    <CustomButton
                        text={i18n.t('device.button.create')}
                        iconName='pencil-alt'
                        variantButton='info'
                        handleClick={handleDetailModal.bind(null, null)}
                    />
                </div>
            </div>

            {renderDetailModal()}
            {renderDeleteModal()}

            <Table responsive striped>
                <thead>
                    <tr>
                        <TableHeaderSort text={i18n.t('device.systemName')} onPressSort={sort} sortBy='system_name' />
                        <TableHeaderSort text={i18n.t('device.type')} onPressSort={sort} sortBy='type' />
                        <TableHeaderSort text={i18n.t('device.hddCapacity')} onPressSort={sort} sortBy='hdd_capacity' />
                        <TableHeaderSort text={i18n.t('global.buttons.title')} />
                    </tr>
                </thead>
                <tbody>
                    {devices.map((device, i) => (
                        <tr id={device.id} key={`device-${i}`}>
                            <TableBody text={device.system_name} />
                            <TableBody text={I18n.t(`deviceType.${device.type}`)} />
                            <TableBody text={device.hdd_capacity} />
                            <TableBodyActionButtons
                                handleEdit={handleDetailModal.bind(null, device)}
                                handleDelete={handleDeleteModal.bind(null, device)}
                            />
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default memo(DevicesList);
