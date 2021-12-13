import { memo } from 'react';
import i18n from '../../../../app/i18n'
import CustomButton from '../../button/custom-button/custom-button'
import './table-body-action-buttons.scss';

function TableBodyActionButtons() {
    return (
        <td className="text-end">
            <div className="btn-group flex-btn-group-container">
                <CustomButton
                    variantButton='primary'
                    iconName='pencil-alt'
                    text={i18n.t('global.buttons.edit')}
                />
                <CustomButton
                    variantButton='danger'
                    iconName='trash'
                    text={i18n.t('global.buttons.delete')}
                />
            </div>
        </td>
    )
}

export default memo(TableBodyActionButtons);