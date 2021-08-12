import React, { useState, useEffect } from "react";
import {Avatar, Grid as MaterialGrid,Paper} from "@material-ui/core";
import { PagingState, CustomPaging } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel
} from "@devexpress/dx-react-grid-material-ui";

import { Loading } from "./theme-sources/material-ui/components/loading";

const URL = "https://reqres.in/api/users";

 const Demo = () => {
  const [columns] = useState([
    { name: "id", title: "ID" },
    { name: "first_name", title: "First Name" },
    { name: "last_name", title: "Last Name" },
    { name: "email", title: "Email" },
    { name: "avatar", title: "Avatar" },
  ]);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState();

  const getQueryString = () => `${URL}?page=${currentPage + 1}`;

  const loadData = () => {
    const queryString = getQueryString();
    if (queryString !== lastQuery && !loading) {
      setLoading(true);
      fetch(queryString)
        .then((response) => response.json())
        .then(({ data, total: newTotalCount }) => {
          setRows(data);
          setTotalCount(newTotalCount);
          setLoading(false);
        })
        .catch(() => setLoading(false));
      setLastQuery(queryString);
    }
  };

  useEffect(() => loadData());

  const Cell = (props) => {
    const { column } = props;
    if (column.name === 'avatar') {
      return <HighlightedCell {...props} />;
    }
    return <Table.Cell {...props} />;
  };

  const HighlightedCell = ({ value, style, ...restProps }) => (
    <Table.Cell
      {...restProps}
    >
       <Avatar alt="value" src={value} />
    </Table.Cell>
  );

  return (
    <MaterialGrid container justifyContent='center' style={{marginTop: '2%'}}>
      
      <MaterialGrid item xs={2}></MaterialGrid>
      <MaterialGrid item xs={8}>
        
      <h2>Dynamic Paging</h2>
    <Paper style={{ position: "relative" }}>
      <Grid rows={rows} columns={columns}>
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
        />
        <CustomPaging totalCount={totalCount} />
        <Table  cellComponent={Cell} />
        <TableHeaderRow />
        <PagingPanel />
      </Grid>
      {loading && <Loading />}
    </Paper>
    </MaterialGrid>
    <MaterialGrid item xs={2}></MaterialGrid>
    </MaterialGrid>
  );
};
export default Demo;