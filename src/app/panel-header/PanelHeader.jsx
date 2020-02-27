/**
 Created by Gray
 using WebStorm at
 23:08 on 23-Feb-20
 */
import React from 'react';

const PanelHeader = ({content, size}) => (
    <div className={`panel-header ${size ? 'panel-header-' + size : ''}`}>
        {content}
    </div>
);
export default PanelHeader;
