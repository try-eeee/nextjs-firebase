import { ComponentProps } from "react";
import styles from "./Table.module.scss";
import React, { ReactNode } from "react";

interface TableProps {
  tableHeader: ReactNode;
  tableRow: ReactNode;
}

export function Table(props: TableProps) {
  const { tableHeader, tableRow } = props;
  return (
    <table className={styles.table}>
      <thead>{tableHeader}</thead>
      <tbody>{tableRow}</tbody>
    </table>
  );
}

export function TableHeader<HeaderId = string>(props: ComponentProps<"th">) {
  const { children, ...rest } = props;
  return <th {...rest}>{children}</th>;
}

export function TableRow(props: ComponentProps<"tr">) {
  const { children, ...rest } = props;
  return <tr {...rest}>{children}</tr>;
}

export function TableCell(
  props: ComponentProps<"td"> & { headerLabel: string }
) {
  const { children, headerLabel, ...rest } = props;
  return (
    <td {...rest} data-label={headerLabel}>
      {children}
    </td>
  );
}
