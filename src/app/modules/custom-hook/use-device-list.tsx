import { useCallback, useEffect, useState } from "react";
import { deleteDevice, getDevices, createDevice, updateDevice } from "../../../shared/reducer/device.reducer";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { IDevice } from '../../../shared/model/device.model';
import { IDeviceFilter } from "../../../shared/model/device-filter.model";

export const useDeviceList = () => {
    const dispatch = useAppDispatch();
    const devices = useAppSelector(state => state.device.devices);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [deviceSelected, setDeviceSelected] = useState<IDevice | null>(null);

    const [filter, setFilter] = useState<IDeviceFilter>({
        sort: 'id',
        ascending: true,
        query: ''
    });

    const handleCloseDetailModal = () => setShowDetailModal(false);
    const handleShowDetailModal = () => setShowDetailModal(true);

    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = () => setShowDeleteModal(true);

    useEffect(() => {
        dispatch(
            getDevices(filter)
        );
    }, [dispatch, filter]);

    const handleDetailModal = useCallback((device: IDevice | null) => {
        setDeviceSelected(device);
        handleShowDetailModal();
    }, [])

    const handleCreate = (device: IDevice) => {
        setDeviceSelected(null);
        dispatch(
            createDevice(device)
        );
        handleCloseDetailModal();
    }

    const handleEdit = (device: IDevice) => {
        setDeviceSelected(null);
        dispatch(
            updateDevice(device)
        );
        handleCloseDetailModal();
    }

    const handleDeleteModal = useCallback((device: IDevice) => {
        setDeviceSelected(device);
        handleShowDeleteModal();
    }, [])

    const handleDelete = () => {
        dispatch(
            deleteDevice(deviceSelected?.id)
        );
        handleCloseDeleteModal();
    }

    const onChangeQuery = useCallback((event: any) =>
        setFilter((prevFilter: IDeviceFilter) => {
            return {
                ...prevFilter,
                query: event.target.value,
            }
        }), []);

    const sort = useCallback((sort: string) =>
        setFilter((prevFilter: IDeviceFilter) => {
            const ascending = prevFilter.sort === sort ? !prevFilter.ascending : true;
            return {
                ...prevFilter,
                sort,
                ascending,
            }
        }), []);

    return {
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
    }
}
