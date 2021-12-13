import { memo } from 'react';
import './main.scss';

function MainContainer({ children }) {
    return (
        <div className="App d-flex flex-column justify-content-center">
            {children}
        </div>
    );
}

export default memo(MainContainer);
