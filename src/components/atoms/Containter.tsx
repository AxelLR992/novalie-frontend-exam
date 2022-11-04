import React, { FunctionComponent } from "react";
import "../../assets/styles/container.scss";

interface IContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Container: FunctionComponent<IContainerProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <div className={`container ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Container;
