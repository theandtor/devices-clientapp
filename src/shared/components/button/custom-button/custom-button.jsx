import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import './custom-button.scss';

function CustomButton({ text, iconName, variantButton, handleClick }) {
    return (
        <Button variant={variantButton} size="sm"  onClick={handleClick}>
            <FontAwesomeIcon icon={iconName} />{' '}
            <span className="d-none d-md-inline">
                {text}
            </span>
        </Button>
    )
}

export default memo(CustomButton);