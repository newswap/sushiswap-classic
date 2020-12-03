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
import FarmTable from '../../components/FarmTable'

const Home: React.FC = () => {
  const { t } = useTranslation()

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
