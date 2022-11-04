import React, { FunctionComponent } from "react";

interface ITableCellProps {
  children?: React.ReactNode;
  colSpan?: number;
}

const TableCell: FunctionComponent<ITableCellProps> = ({
  children,
  colSpan,
}) => {
  return (
    <td colSpan={colSpan}>
      <div>{children}</div>
    </td>
  );
};

export default TableCell;
