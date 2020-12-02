import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'
import newIcon from '../../assets/img/logo.d23eaded.svg'

import { makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';


interface FarmTableProps {
  dataSource: []
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(id: any, tokenIcon: any, tokenName: any, lpIcon: any, lpName: any) {
  return { id, tokenIcon, tokenName, lpIcon, lpName };
}

const rows = [
  createData('1', '', 'WANQI', '', 'WQ-NEW-LP'),
  createData('2', '', 'WANQI', '', 'WQ-NEW-LP'),
  createData('3', '', 'WANQI', '', 'WQ-NEW-LP'),
  createData('4', '', 'WANQI', '', 'WQ-NEW-LP'),
  createData('5', '', 'WANQI', '', 'WQ-NEW-LP'),
  createData('6', '', 'WANQI', '', 'WQ-NEW-LP'),
  createData('7', '', 'WANQI', '', 'WQ-NEW-LP'),
  createData('8', '', 'WANQI', '', 'WQ-NEW-LP'),
  createData('9', '', 'WANQI', '', 'WQ-NEW-LP'),
  createData('10', '', 'WANQI', '', 'WQ-NEW-LP')
];

const FarmTable: React.FC<FarmTableProps> = ({dataSource}) => {
     
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


    return (
      <StyledTableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">矿池名称</StyledTableCell>
            <StyledTableCell align="left">质押通证</StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
            return (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">                
                <StyledIDLabel>{row.id}</StyledIDLabel>
                <StyledLogo>
                    <img src={newIcon}/>
                </StyledLogo>
                <StyledTokenLabel>
                  {row.tokenName}
                </StyledTokenLabel>
              </StyledTableCell>
              <StyledTableCell align="left">
                <StyledLPLogo>
                  <img src={newIcon}/>
                </StyledLPLogo>
                <StyledLPLabel>{row.lpName}</StyledLPLabel>
              </StyledTableCell>
              <StyledTableCell align="right">
                <StyledEnterLabel>进入矿池</StyledEnterLabel>
              </StyledTableCell>                 
            </StyledTableRow>
          )})}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </StyledTableContainer>
    //   <StyledTable>
    //   <thead>
    //     <tr>
    //       <StyledTH>矿池名称</StyledTH>
    //       <StyledTH>质押通证</StyledTH>
    //       <StyledTH></StyledTH>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     <tr>
    //       <StyledTD>
    //         <StyledIDLabel>
    //           1
    //         </StyledIDLabel>

    //         <StyledLogo>
    //           <img src={newIcon}/>
    //         </StyledLogo>

    //         <StyledTokenLabel>
    //           WANQINEW
    //         </StyledTokenLabel>

    //       </StyledTD>
    //       <StyledTD>
    //         <StyledLPLogo>
    //           <img src={newIcon}/>
    //         </StyledLPLogo>
    //         <StyledLPLabel>
    //           WQ-NEW-LP
    //         </StyledLPLabel>
    //       </StyledTD>
    //       <StyledTD>
    //         <StyledTokenLabel>
    //           进入矿场
    //         </StyledTokenLabel>
    //       </StyledTD>
    //     </tr>
    //   </tbody>
    // </StyledTable>
    )
  }

  const StyledTableRow = withStyles((theme) => ({
    root: {
      // '&:nth-of-type(odd)': {
      //   backgroundColor: theme.palette.action.hover,
      // },
    },
  }))(TableRow);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      borderBottom: "1px solid #F8F8F8"
    },
    body: {
      borderBottom: "1px solid #F8F8F8"
    },
    root: {
      paddingLeft: "0px"
    }

  }))(TableCell);
 
  const StyledTableContainer = withStyles((theme) => ({
    root: {
      boxShadow: "0 #fff" 
    }
  }))(TableContainer);

// const StyledTH = styled.th`
//     width: 300px;
//     text-align: left;
//     height: 50px;
//     color: #647584;
// `

// const StyledTD = styled.td`
//     text-align: left;
//     height: 30px;
// `

const StyledIDLabel = styled.div`
    width: 30px;
    height: 30px;
    float: left;
    text-align: left;
    padding-top: 8px;
    font-size: 16px;
`
const StyledTokenLabel = styled.div`
    height: 30px;
    float: left;
    text-align: left;
    padding-top: 8px;
    margin-left: 10px;
    font-size: 14px;
    color: #20C5A0;
`

const StyledEnterLabel = styled.div`
    height: 30px;
    padding-top: 8px;
    margin-left: 10px;
    font-size: 14px;
    color: #20C5A0;
`

const StyledLPLabel = styled.div`
    height: 30px;
    float: left;
    text-align: center;
    padding-top: 8px;
    font-size: 14px;
    color: #647584;
`

const StyledLPLogo = styled.div`
    margin: 0;
    min-height: 30px;
    min-width: 30px;
    text-decoration: none;
    float: left;
    padding-top: 0px;
`

const StyledLogo = styled.div`
    display: flex;
    justify-content: center;
    margin: 0;
    min-height: 30px;
    min-width: 30px;
    text-decoration: none;
    float: left;
    padding-top: 0px;
`

export default FarmTable