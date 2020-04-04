import * as React from "react";

export interface SwitchButtonProps {
  round: boolean;
  checked: boolean;
  onChange: (value: boolean) => void;
}
export declare class SwitchButton extends React.Component<SwitchButtonProps>{}
