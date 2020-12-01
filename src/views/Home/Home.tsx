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
      {/* <StyledInfo>
        🏆<b>Pro Tip</b>: SUSHI-ETH SLP token pool yields 4.8x more token
        rewards per block.
      </StyledInfo> */}
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Button text={`🔪 ` + t('See the Menu')} to="/nstFarms" variant="secondary" />
      </div>
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

export default Home
