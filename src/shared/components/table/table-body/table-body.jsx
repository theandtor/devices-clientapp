import { memo } from 'react';
import './table-body.scss';

function TableBody({ text }) {
    return (
        <td>{text}</td>
    )
}

export default memo(TableBody);