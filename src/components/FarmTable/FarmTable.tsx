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

import useNewFarms from '../../hooks/useNewFarms'
import { NewFarm } from '../../contexts/NewFarms'
import { Link } from 'react-router-dom'


interface FarmTableProps {
  dataSource: []
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface FarmWithStakedValue extends NewFarm {
}

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

  const [newFarms] = useNewFarms()
  console.log('====FarmTable=====')
  console.log(newFarms)

  const rows = newFarms.reduce<FarmWithStakedValue[][]>(
    (farmRows, farm, i) => {
      
      const farmWithStakedValue = {
        ...farm,
        // ...stakedValue[i],
        // apy: null,
      }
      const newFarmRows = [...farmRows]
      if (newFarmRows[newFarmRows.length - 1].length === 3) {  // TODO 什么逻辑？？？？？？
        newFarmRows.push([farmWithStakedValue])
      } else {
        newFarmRows[newFarmRows.length - 1].push(farmWithStakedValue)
      }
      
      return newFarmRows
    },
    [[]],
  )
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
          // rows.map((farmRow, i) => {
          //   console.log('====farmRow=====')
          //   console.log(farmRow)
            
            rows[0].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((farm, j) => {
              console.log('====farm=====')
              console.log(farm)
              return (
                <StyledTableRow key={farm.pid}>
                  <StyledTableCell component="th" scope="row">                
                    <StyledIDLabel>{farm.pid + 1}</StyledIDLabel>
                    <StyledLogo>
                      <StyledImg src={farm.iconL}/>
                    </StyledLogo>
                    <StyledTokenLabel>
                      {farm.name}
                    </StyledTokenLabel>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <StyledLPLogo>
                      <StyledImg src={farm.iconR}/>
                      <StyledImgL src={farm.iconL}/>
                    </StyledLPLogo>
                    <StyledLPLabel>{farm.id}</StyledLPLabel>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {/* <StyledEnterLabel>进入矿池</StyledEnterLabel> */}
                    <StyledLink to={`/newFarms/${farm.id}`}>进入矿池</StyledLink>
                  </StyledTableCell>                 
                </StyledTableRow>
              )
            })
          // })
        }
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows[0].length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </StyledTableContainer>
    )
  }

  const StyledTableRow = withStyles((theme) => ({
    root: {
      // '&:nth-of-type(odd)': {
      //   backgroundColor: theme.palette.action.hover,
      // },
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
      // '&:hover': {
      //   background-color: red,
      // },
    },
  }))(TableRow);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      borderBottom: "1px solid #F8F8F8",
    },
    body: {
      borderBottom: "1px solid #F8F8F8"
    },
    root: {
      paddingLeft: "30px"
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

const StyledImg = styled.img `
    height: 32px;
    width: 32px;
    margin: 2px;
    margin-left: 14px;
`
const StyledImgL = styled.img `
    height: 32px;
    width: 32px;
    border-radius: 16px;
    margin: 2px;
    margin-left: -47px;
    margin-right: 20px;
`

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

const StyledLPLabel = styled.div`
    height: 30px;
    float: left;
    text-align: center;
    padding-top: 8px;
    font-size: 14px;
    color: #647584;
    margin-left: 10px;
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

const StyledLink = styled(Link)`
  align-items: center;
  font-size: 14px;
  color: #20C5A0;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${props => -props.theme.spacing[4]}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  text-decoration: none;
`

export default FarmTable