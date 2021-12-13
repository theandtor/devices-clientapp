import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';
import './table-header-sort.scss';

function TableHeaderSort({ onPressSort, text }) {
    return (
        <th className="hand" onClick={onPressSort('id')}>
            {text}
            <FontAwesomeIcon icon="sort" />
        </th>
    )
}

export default memo(TableHeaderSort);