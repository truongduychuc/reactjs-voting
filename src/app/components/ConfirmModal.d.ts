import * as React from 'react';

export interface ConfirmModalProps {
  confirmLabel: string;
  abortLabel: string;
  title: string;
  message: string;
  abort: () => Promise<void>;
  confirm: () => Promise<void>
}

export declare class ConfirmModal extends React.Component<ConfirmModalProps> {
}

export function confirm(message: string, options?: object): Promise<object>;
