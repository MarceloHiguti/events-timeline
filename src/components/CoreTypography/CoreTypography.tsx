import classNames from "classnames";
import styles from "./CoreTypography.module.scss";
import { ReactNode } from "react";

interface ICoreTypography {
  children: ReactNode;
  customClassName?: string;
}

export const CoreTypography: React.FC<ICoreTypography> = ({
  children,
  customClassName = "",
}) => {
  return (
    <span
      className={classNames(styles.coreTypography, {
        [customClassName]: !!customClassName,
      })}
    >
      {children}
    </span>
  );
};
