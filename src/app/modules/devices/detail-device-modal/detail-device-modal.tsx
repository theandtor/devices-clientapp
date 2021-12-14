import _ from 'lodash';
import { Button, Modal } from 'react-bootstrap';
import { IDevice } from '../../../../shared/model/device.model';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import I18n from '../../../i18n';
import { FIELD_SIZE } from '../../../../shared/constants/fields.constants';
import { DEVICE_TYPE } from '../../../../shared/constants/device-type.constants';

type DetailDeviceModalProps = {
  deviceSelected: IDevice | null;
  handleCreate: any,
  handleEdit: any,
  handleCloseDetailModal: any,
}

function DetailDeviceModal({ deviceSelected, handleCreate, handleEdit, handleCloseDetailModal }: DetailDeviceModalProps) {

  const isCreatingForm = () => _.isNil(deviceSelected);

  const submit = (values: IDevice) => {
    if (isCreatingForm()) {
      handleCreate(values);
    } else {
      handleEdit(values);
    }
  }

  const getTitle = () => {
    if (isCreatingForm()) {
      return I18n.t('device.create.title');
    } else {
      return I18n.t('device.edit.title');
    }
  }

  return (
    <Modal
      show={true}
      backdrop="static"
      onHide={handleCloseDetailModal}
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{getTitle()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ValidatedForm onSubmit={submit} defaultValues={deviceSelected || {}}>

          {/* SYSTEM NAME */}
          <ValidatedField
            type='text'
            name="system_name"
            label={I18n.t('device.systemName')}
            validate={{
              required: true,
              maxLength: {
                value: FIELD_SIZE.CHAR_50,
                message: I18n.t('global.form.validation.maxlength', { max: FIELD_SIZE.CHAR_50 }),
              },
            }}
          />

          {/* HDD CAPACITY */}
          <ValidatedField type="select" name="type" label={I18n.t('device.type')}>
            {Object.values(DEVICE_TYPE).map(type => (
              <option value={type} key={type}>
                {I18n.t(`deviceType.${type}`)}
              </option>
            ))}
          </ValidatedField>

          {/* HDD CAPACITY */}
          <ValidatedField
            type="number"
            name="hdd_capacity"
            label={I18n.t('device.hddCapacity')}
            validate={{
              required: true,
            }}
          />

          <Button variant="primary" type='submit'>{I18n.t('global.buttons.save')}</Button>

        </ValidatedForm>
      </Modal.Body>
    </Modal>
  );
}

export default DetailDeviceModal;