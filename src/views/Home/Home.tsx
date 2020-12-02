import React from 'react'
import styled from 'styled-components'
import chef from '../../assets/img/chef.png'
import coin from '../../assets/img/new.a6cfc11f.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import { useTranslation } from 'react-i18next'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import FarmTable from '../../components/FarmTable'
import Label from '../../components/Label'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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
  createData('5', '', 'WANQI', '', 'WQ-NEW-LP')
];

const Home: React.FC = () => {
  const { t } = useTranslation()

  const classes = useStyles();

  return (
    <Page>
      <PageHeader
        icon={<img src={coin} height={120} />}
        title={t('NEW FARM')}
        subtitle={t('newFarmDesc')}
      />

      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
       
      <Container size = 'md'>
        <StyledTableDiv>
          <StyleLabel>矿池列表</StyleLabel>
          <FarmTable dataSource = {[]}></FarmTable>
        </StyledTableDiv>
      </Container>
      <Spacer size="lg" />
      {/* <Button text={`🔪 ` + t('See the Menu')} to="/nstFarms" variant="secondary" /> */}

    </Page>
  )
}


const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`
const StyledTableDiv = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 3px 3px 3px 3px rgba(7,94,68,0.02);
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 10px
`

const StyleLabel = styled.div`
  color: #607686;
  font-size: 20px;
`

export default Home
