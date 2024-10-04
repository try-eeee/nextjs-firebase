import React from "react";
import { render } from "@testing-library/react";
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/table/Table";

describe("Table UnitTest", () => {
  test("Snapshot Test Of Table", () => {
    const { asFragment } = render(
      <Table
        tableHeader={
          <TableRow>
            <TableHeader>テストID</TableHeader>
            <TableHeader>テスト日時</TableHeader>
            <TableHeader>テストタイトル</TableHeader>
          </TableRow>
        }
        tableRow={
          <>
            <TableRow>
              <TableCell headerLabel="テストID" width={150}>
                1122
              </TableCell>
              <TableCell headerLabel="テスト日時" width={150}>
                2024/11/07
              </TableCell>
              <TableCell headerLabel="タイトル" width={150}>
                テストタイトル
              </TableCell>
            </TableRow>
          </>
        }
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
