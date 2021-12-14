import { memo } from 'react';
import { IMAGE_TYPE } from '../../../constants/image-types.constants';
import './primary-image.scss';

type PrimaryImageProps = {
    type: typeof IMAGE_TYPE.LOGO;
}

function PrimaryImage({ type, ...props }: PrimaryImageProps) {
    return (
        <img src={type.src} className={type.class} alt={type.alt} {...props} />
    );
}

export default memo(PrimaryImage);
