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

    return (
        <div>
            <CustomButton
                text={i18n.t('device.button.create')}
                iconName='pencil-alt'
                variantButton='info'
                handleClick={handleDetailModal.bind(null, null)}
            />

            {renderDetailModal()}
            {renderDeleteModal()}

            <Table responsive striped>
                <thead>
                    <tr>
                        <TableHeaderSort text={i18n.t('device.systemName')} onPressSort={sort} />
                        <TableHeaderSort text={i18n.t('device.type')} onPressSort={sort} />
                        <TableHeaderSort text={i18n.t('device.hddCapacity')} onPressSort={sort} />
                        <TableHeaderSort text={i18n.t('global.buttons.title')} onPressSort={sort} />
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
