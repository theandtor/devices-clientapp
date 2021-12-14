import { memo } from 'react';
import './title.scss';

type TitleProps = {
    text: string;
}

function Title({ text, ...props }: TitleProps) {
    return (
        <h1 className='primary' {...props}>
            {text}
        </h1>
    );
}

export default memo(Title);
