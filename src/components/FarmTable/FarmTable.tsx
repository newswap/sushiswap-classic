import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'
import newIcon from '../../assets/img/logo.d23eaded.svg'
import arrow from '../../assets/img/ic_arrow_right.svg'

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
import {isMobile} from 'react-device-detect'


interface FarmTableProps {
  dataSource: []
}

const useStyles = makeStyles({
  table: {
    // minWidth: {window.innerWidth - 48},
    // minWidth: 300
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
          {
            (isMobile) ? (
              <TableRow>
                <StyledTableCell align="left" width="48%">
                
                  <StyledTHMobile>矿池名称</StyledTHMobile>
                  
                </StyledTableCell>
                <StyledTableCell align="left" width="50%">
                  
                  <StyledTHMobile>质押通证</StyledTHMobile>
                    
                </StyledTableCell>
                <StyledTableCell align="left" width="2%"></StyledTableCell>
              </TableRow>
            ) : (
              <TableRow>
                <StyledTableCell align="left" width="35%">
                  <StyledTH>矿池名称</StyledTH>
                </StyledTableCell>
                <StyledTableCell align="left" width="45%">
                  <StyledTH>质押通证</StyledTH>
                </StyledTableCell>
                <StyledTableCell align="left" width="20%"></StyledTableCell>
              </TableRow>
            )
          }
        </TableHead>
        <TableBody>
        {
            rows[0].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((farm, j) => {
              console.log('====farm=====')
              console.log(farm)
              return (
                <StyledTableRow key={farm.pid}>
                  {
                      (isMobile) ? (
                        <>
                        <StyledTableCell component="th" scope="row"> 
                          <StyledIDLabelMob>{farm.pid}</StyledIDLabelMob>
                          <div>
                          <StyledLogo>
                          <StyledImgMob src={farm.iconL}/>
                          </StyledLogo>
                          <StyledTokenLabelMob>
                            {farm.name}
                          </StyledTokenLabelMob>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <StyledPoolLogo>
                            <StyledPoolImgMob src={farm.iconR}/>
                            <StyledImgLMob src={farm.iconL}/>
                          </StyledPoolLogo>
                          <StyledLPLabelMob>{farm.id}</StyledLPLabelMob>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <StyledLink to={`/newFarms/${farm.id}`}>
                            {(isMobile) ? '' : '进入矿池'}
                            <StyledArrow src={arrow} />
                          </StyledLink>
                        </StyledTableCell>  
                        </>
                      ) : (
                        <>
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
                          <StyledPoolLogo>
                            <StyledPoolImg src={farm.iconR}/>
                            <StyledImgL src={farm.iconL}/>
                          </StyledPoolLogo>
                          <StyledLPLabel>{farm.id}</StyledLPLabel>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <StyledLink to={`/newFarms/${farm.id}`}>
                            {(isMobile) ? '' : '进入矿池'}
                            <StyledArrow src={arrow} />
                          </StyledLink>
                        </StyledTableCell>  
                        </>
                      )
                  }
                  
                                 
                </StyledTableRow>
              )
            })
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
       paddingLeft: "0px",
       paddingRight: "0px"
    }

  }))(TableCell);

  const StyledTH = styled.span`
    margin-left: 30px;
  `
  const StyledTHMobile = styled.span`
    margin-left: 16px;
  `
 
  const StyledTableContainer = withStyles((theme) => ({
    root: {
      boxShadow: "0 #fff"
    }
  }))(TableContainer);

const StyledImg = styled.img `
    height: 32px;
    width: 32px;
    margin: 2px;
    margin-left: 14px;
`
const StyledImgMob = styled.img `
    height: 20px;
    width: 20px;
    margin: 2px;
    margin-left: 0px;
    margin-top: 6px;
`

const StyledPoolImg = styled.img `
    height: 32px;
    width: 32px;
    margin-left: 30px;
    z-index: 999;
`

const StyledPoolImgMob = styled.img `
    height: 20px;
    width: 20px;
    margin-left: 12px;
    z-index: 999;
    margin-top: 6px;
`


const StyledArrow = styled.img `
    height: 16px;
    width: 16px;
    margin: 0px;
    justify-content: center;
    float: left;
    margin: 20px; 
    margin-left: 10px;  
`

const StyledImgL = styled.img `
    height: 32px;
    width: 32px;
    border-radius: 16px;
    // margin: 2px;
    margin-left: -16px;
    margin-right: 20px;
`

const StyledImgLMob = styled.img `
    height: 20px;
    width: 20px;
    border-radius: 10px;
    // margin: 2px;
    margin-left: -10px;
    margin-top: 6px;
    // margin-right: 20px;
`

const StyledIDLabel = styled.div`
    height: 30px;
    float: left;
    text-align: left;
    padding-top: 8px;
    font-size: 16px;
    margin-left: 30px;
`
const StyledIDLabelMob = styled.div`
    height: 30px;
    float: left;
    text-align: left;
    padding-top: 0px;
    font-size: 16px;
    margin-left: 16px;
    margin-top: 6px;
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

const StyledTokenLabelMob = styled.div`
    height: 30px;
    float: left;
    text-align: left;
    padding-top: 8px;
    font-size: 12px;
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

const StyledLPLabelMob = styled.div`
    height: 30px;
    float: left;
    text-align: center;
    padding-top: 8px;
    font-size: 12px;
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

const StyledPoolLogo = styled.div`
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
  float: left;
`

export default FarmTable