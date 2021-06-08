import * as React from 'react';
export interface ErrorListProps {
    errors?: React.ReactNode[];
    /** @private Internal Usage. Do not use in your production */
    help?: React.ReactNode;
    /** @private Internal Usage. Do not use in your production */
    onDomErrorVisibleChange?: (visible: boolean) => void;
}
export default function ErrorList({ errors, help, onDomErrorVisibleChange, }: ErrorListProps): JSX.Element;
