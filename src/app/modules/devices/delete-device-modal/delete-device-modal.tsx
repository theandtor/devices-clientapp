
import { Button, Modal } from 'react-bootstrap';
import { IDevice } from '../../../../shared/model/device.model';
import I18n from '../../../i18n';

type DeleteDeviceModalProps = {
    deviceSelected: IDevice | null;
    handleDelete: any,
    handleCloseDeleteModal: any,
}

function DeleteDeviceModal({ deviceSelected , handleDelete, handleCloseDeleteModal }: DeleteDeviceModalProps) {
  return (
    <Modal
      show={true}
      backdrop="static"
      onHide={handleCloseDeleteModal}
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {I18n.t('device.delete.description', { deviceName: deviceSelected?.system_name })}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteDeviceModal;