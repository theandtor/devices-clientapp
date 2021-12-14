import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import { memo } from 'react';
import './table-header-sort.scss';

type TableHeaderSortProps = {
    text: string,
    onPressSort?: any;
    sortBy?: string,
}

function TableHeaderSort({ onPressSort, text, sortBy }: TableHeaderSortProps) {

    const onClick  = () => {
        if (!_.isNil(onPressSort)) {
            onPressSort(sortBy)
        }
    }

    const renderIcon = () => {
        if (_.isNil(onPressSort)) {
            return <div/>
        }

        return <FontAwesomeIcon icon="sort" />;
    }

    return (
        <th className="hand" onClick={onClick}>
            {text}
            {renderIcon()}
        </th>
    )
}

export default memo(TableHeaderSort);