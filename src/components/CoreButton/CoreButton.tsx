import { FC, ReactNode } from "react";
import style from "./CoreButton.module.scss";
import classNames from "classnames";

interface ICoreButton {
  children: ReactNode;
  customClassName?: string;
  onClick: () => void;
}

export const CoreButton: FC<ICoreButton> = ({
  children,
  onClick,
  customClassName = "",
}) => {
  return (
    <button
      className={classNames(style.coreButton, {
        [customClassName]: !!customClassName,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
