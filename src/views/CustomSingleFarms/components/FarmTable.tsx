import React, { useContext, useMemo } from 'react'
import { useParams, Route, Switch, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import newIcon from '../../assets/img/logo.d23eaded.svg'
import arrow from '../../../assets/img/ic_arrow_right.svg'

import { makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

import useNodeFarms from '../../../hooks/useNodeFarms'
import { NodeFarm } from '../../../contexts/NodeFarms'
import { Link } from 'react-router-dom'
import {isMobile} from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import LazyIcon from '../../../components/LazyIcon'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CustomCreateLPFarm from '../../../views/CustomCreateLPFarm'

interface FarmTableProps {
  dataSource: []
}

const useStyles = makeStyles({
    root: {
        color: '#647684',
        textTransform: 'none',
        minWidth: 72,
        fontWeight: 700,
        marginRight: 20,
        fontSize: 20,
        '&:hover': {
          color: '#555A6A',
          opacity: 1,
        },
        '&$selected': {
          color: '#555A6A',
          fontWeight: 700,
        },
        '&:focus': {
          color: '#555A6A',
        },
        
    },
    table: {
    // minWidth: {window.innerWidth - 48},
    // minWidth: 300
    },
    indicator: {
        display: "none",
    }

});

interface FarmWithStakedValue extends NodeFarm {
}

const FarmTable: React.FC<FarmTableProps> = ({dataSource}) => {
    const { t } = useTranslation()
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 25));
        setPage(0);
    };

    const [value, setValue] = React.useState(2);
    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
        console.log('new value is: ' + newValue )
    };

    const [nodeFarms] = useNodeFarms()

    const rows = nodeFarms.reduce<FarmWithStakedValue[][]>(
        (farmRows, farm, i) => {

            const farmWithStakedValue = {
                ...farm,
            }
            const newFarmRows = [...farmRows]
     
            newFarmRows[newFarmRows.length - 1].push(farmWithStakedValue)
      
            return newFarmRows
        },
        [[]],
    )
      
    const testRows = [
        [
            {
                id: "0",
                farmName: "西西矿区",
                stakeToken: "CICI",
                rewardToken: "MCT",
                rewardAmount: "1,300",
                stakeTime: "2021.03.05 13:22 - 03.17 13:22",
                totalStake: "$123,456,789"
            },
            {
                id: "1",
                farmName: "飞天矿区",
                stakeToken: "FTT",
                rewardToken: "MCT",
                rewardAmount: "900",
                stakeTime: "2021.03.05 13:22 - 03.17 13:22",
                totalStake: "$13,456,789"
            }
        ],
        [
            {
                id: "2",
                farmName: "共赢矿区",
                stakeToken: "GYSQ",
                rewardToken: "BIA",
                rewardAmount: "1,100",
                stakeTime: "2021.03.01 21:22 - 03.12 21:22",
                totalStake: "$123,456,789"
            }
        ],
        [
            {
                id: "3",
                farmName: "比特全球",
                stakeToken: "BTQ",
                rewardToken: "CICI",
                rewardAmount: "1,400",
                stakeTime: "2021.02.28 05:16 - 03.06 05:16",
                totalStake: "--"
            },
            {
                id: "4",
                farmName: "飞毛腿宇宙",
                stakeToken: "FMT",
                rewardToken: "CICI",
                rewardAmount: "2,400",
                stakeTime: "2021.02.28 05:16 - 05.06 05:16",
                totalStake: "$222,222,22"
            },
            {
                id: "5",
                farmName: "比特全球",
                stakeToken: "BTQ",
                rewardToken: "CICI",
                rewardAmount: "1,400",
                stakeTime: "2021.02.28 05:16 - 03.06 05:16",
                totalStake: "--"
            },
            {
                id: "6",
                farmName: "飞毛腿宇宙",
                stakeToken: "FMT",
                rewardToken: "CICI",
                rewardAmount: "2,400",
                stakeTime: "2021.02.28 05:16 - 05.06 05:16",
                totalStake: "$222,222,22"
            }
        ]
    ]



    return (
        <StyledTableContainer>
            <HeadDiv>
                <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                    <Tab className = {classes.root} label="进行中" />
                    <Tab className = {classes.root} label="即将开始" />
                    <Tab className = {classes.root} label="已完成" />
                </AntTabs>
                <CreateFarmDiv>
                    <StyledNomalLink  to={'/customCreateSingleFarms'} >
                        {'创建自定义矿池 >'}
                    </StyledNomalLink>
                </CreateFarmDiv>
            </HeadDiv>
            <Table className={classes.table} aria-label="simple table">
        {/* <TableHead>
          {
            (isMobile) ? (
              <TableRow>
                <StyledTableCell align="left" width="48%">
                
                  <StyledTHMobile>{t('Pool Name')}</StyledTHMobile>
                  
                </StyledTableCell>
                <StyledTableCell align="left" width="50%">
                  
                  <StyledTHMobile>{t('Liquidity Token')}</StyledTHMobile>
                    
                </StyledTableCell>
                <StyledTableCell align="left" width="2%"></StyledTableCell>
              </TableRow>
            ) : (
              <TableRow>
                <StyledTableCell align="left" width="35%">
                  <StyledTH>{t('Pool Name')}</StyledTH>
                </StyledTableCell>
                <StyledTableCell align="left" width="45%">
                  <StyledTH>{t('Liquidity Token')}</StyledTH>
                </StyledTableCell>
                <StyledTableCell align="left" width="20%"></StyledTableCell>
              </TableRow>
            )
          }
        </TableHead> */}
            <TableBody>
                {
                    testRows[value].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((farm, j) => {
                        // testRows[value].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        // .map((farm, j) => {

                            // let address = farm.tokenAddress

                            return (
                                // <StyledNavLink to={`/communityMining/`}>
                                    <StyledTableRow key={j}>
                                        <CardDiv>
                                            <TopDiv>
                                                <TopLeftDiv>
                                                    <StyledIcon></StyledIcon>
                                                    <DetailDiv>
                                                        <TitleDiv>{farm.farmName}</TitleDiv>
                                                        <TitleDetailDiv>质押 <StyledSpan>{farm.stakeToken}</StyledSpan>, 获得<StyledSpan>{farm.rewardToken}</StyledSpan></TitleDetailDiv>
                                                    </DetailDiv>
                                
                                                </TopLeftDiv>
                                                <TopRightDiv>
                                                    <AwardDiv>{farm.rewardAmount}</AwardDiv>
                                                    <AwardTip>总奖励</AwardTip>
                                                </TopRightDiv>
                                            </TopDiv>
                                            <Line></Line>
                                            <BottomDiv>
                                                <TimeDiv>
                                                    <TimeTitle>质押时间</TimeTitle>
                                                    <TimeValue>{farm.stakeTime}</TimeValue>
                                                </TimeDiv>
                                                <StakeDiv>
                                                    <StakeTitle>当前总锁仓价值</StakeTitle>
                                                    <StakeValue>{farm.totalStake}</StakeValue>
                                                </StakeDiv>
                                                <EnterDiv>
                                                    <StyledNavLink to={'/customSingleFarms/${farm.id}'}>
                                                        <EnterBtn>
                                                            进入
                                                        </EnterBtn>
                                                    </StyledNavLink>
                                                </EnterDiv>
                                            </BottomDiv>
                                        </CardDiv>
                                    </StyledTableRow>
                                // </StyledNavLink>
                            )
                        })
                    }
                </TableBody>
            </Table>
            <TablePagination
                // rowsPerPageOptions={[5, 10, 25]}
                rowsPerPageOptions={[25]}
                component="div"
                count={testRows[value].length}
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
        // backgroundColor: theme.palette.action.hover,
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

// const StyledTH = styled.span`
//     margin-left: 30px;
// `
// const StyledTHMobile = styled.span`
//     margin-left: 16px;
// `
 
const StyledTableContainer = withStyles((theme) => ({
    root: {
      boxShadow: "0 #fff"
    }
}))(TableContainer);

const HeadDiv = styled.div`
    height: 50px;
    width: 100%;
    background: clear;
    margin-bottom: 10px;
`

const AntTabs = withStyles({
    root: {
      borderBottom: '0px solid #e8e8e8',
      float: 'left'
    },
    indicator: {
        display: 'none'
    }
})(Tabs);

const StyledSpan = styled.span`
    color: #20C5A0;
`

const CreateFarmDiv = styled.button`
    font-size: 16px;
    color: #20C5A0;
    font-weight: 700;
    float: right;
    background: #F6FCFA;
    border: none;
    margin-top: 10px;
    cursor: pointer;

    &:focus {
        border: none;
        outline: none;
        
    }
`

const CardDiv = styled.div`
    height: 166px;
    width: 100%;
    border-radius: 24px;
    background: white;
    margin-bottom: 30px;
    border-radius: 12px;
    box-shadow: 0px 3px 12px 0px rgba(7,94,68,0.11);
`

const TopDiv = styled.div`
    background: clear;
    width: 100%;
    height: 90px;
`

const TopLeftDiv = styled.div`
    background: clear;
    height: 100%;
    float: left;
    display: flex;
    flex-direction: row;
`
const StyledIcon = styled.img `
    height: 45px;
    width: 45px;
    border-radius: 22.5px;
    background: pink;
    margin-top: 28px;
    margin-left: 20px;
`
const DetailDiv = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 3px;
`
const TitleDiv = styled.div`
    font-size: 18px;
    margin-top: 25px;
    color: #647684;
`

const TitleDetailDiv = styled.div`
    font-size: 14px;
    color: #647684;
    font-weight: 700;
`

const TopRightDiv = styled.div`
    background: clear;
    height: 100%;
    float: right;
    margin-right: 20px;
`

const AwardDiv = styled.div`
    margin-top: 25px;
    color: #20C5A0;
    font-size: 20px;
`

const AwardTip = styled.div`
    color: #647684;
    font-size: 14px;
    text-align: right;
`
const Line = styled.div`
    background: #F2F2F7;
    height: 1px;
    width: calc(100%-40px);
    margin-left: 20px;
    margin-right: 20px;
`

const BottomDiv = styled.div`
    background: clear;
    width: 100%;
    height: 74px;
`

const TimeDiv = styled.div`
    background: clear;
    height: 100%;
    float: left;
    margin-top: 10px;
    margin-left: 20px;
`

const TimeTitle = styled.div`
    font-size: 14px;
    color: #647684;
`
const TimeValue = styled.div`
    font-size: 14px;
    color: #647684;
    font-weight: 700;
`


const StakeDiv = styled.div`
    background: clear;
    height: 100%;
    float: left;
    margin-top: 10px;
    margin-left: 80px;
`

const StakeTitle = styled.div`
    font-size: 14px;
    color: #647684;
`
const StakeValue = styled.div`
    font-size: 14px;
    color: #647684;
    font-weight: 700;
`


const EnterDiv = styled.div`
    background: clear;
    height: 100%;
    float: right;
`

const EnterBtn = styled.button`
    background: #20C5A0;
    border-radius: 12px;
    height: 36px;
    width: 100px;
    color: white;
    border: none;
    cursor: pointer;
    margin-top: 21px;
    margin-right: 20px;

    &:focus {
        border: none;
        outline: none;
        
    }
`

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
    margin-left: -10px;
    margin-top: 6px;
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
const iconStyle: React.CSSProperties = {

  width: '32px',
  height: '32px',
  margin: '2px',
  marginLeft: '14px',
  borderRadius: '16px',
}

const iconStyleL: React.CSSProperties = {
    height: '32px',
    width: '32px',
    borderRadius: '16px',
    marginLeft: '-16px',
    marginRight: '20px',
}

const iconStyleMob: React.CSSProperties = {
  width: '20px',
  height: '20px',
  margin: '2px',
  marginLeft: '0px',
  marginTop: '6px',
  borderRadius: '10px',
}

const iconLStyleMob: React.CSSProperties = {
  width: '20px',
  height: '20px',
  borderRadius: '10px',
  marginLeft: '-10px',
  marginTop: '6px',
}

const StyledNavLink = styled(Link)`
    align-items: center;
    font-size: 14px;
    color: white;
    
    text-decoration: none;
`

const StyledNomalLink = styled(Link)`
    align-items: center;
    font-size: 14px;    
    text-decoration: none;
    color: #20C5A0;
`


export default FarmTable