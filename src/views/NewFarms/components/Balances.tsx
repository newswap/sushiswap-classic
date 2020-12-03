import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import SushiIcon from '../../../components/SushiIcon'

import useAllEarningsNew from '../../../hooks/useAllEarningsNew'
import useNewFarms from '../../../hooks/useNewFarms'
import useSushi from '../../../hooks/useSushi'
import { getNewSupply } from '../../../sushi/utils'

import { getBalanceNumber } from '../../../utils/formatBalance'
import { useTranslation } from 'react-i18next'

const NEW_PER_BLOCK: number = parseInt(process.env.REACT_APP_NEW_PER_BLOCK ?? '1')

const PendingRewards: React.FC = () => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const allEarnings = useAllEarningsNew()
  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  const [farms] = useNewFarms()

  useEffect(() => {
    setStart(end)
    setEnd(sumEarning)
  }, [sumEarning])

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={1}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
}

const Balances: React.FC = () => {
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const sushi = useSushi()
  const { account, balance }: { account: any; balance: any;} = useWallet()
  const { t } = useTranslation()

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getNewSupply(sushi)
      setTotalSupply(supply)
    }
    if (sushi) {
      fetchTotalSupply()
    }
  }, [sushi, setTotalSupply])

  return (
    <StyledWrapper>
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              {/* <SushiIcon /> */}
              {/* <Spacer /> */}
              <div style={{ flex: 1 }}>
                <Label text={t('Your NEW Balance')} />
                <Value
                  value={!!account ? getBalanceNumber(new BigNumber(balance)) : t('Locked')}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        <Footnote>
          {t('Pending harvest')}
          <FootnoteValue>
            <PendingRewards /> NEW
          </FootnoteValue>
        </Footnote>
      </Card>
      <Spacer />

      <Card>
        <CardContent>
          <Label text={t('Total NEW Supply')} />
          <Value
            value={totalSupply ? getBalanceNumber(totalSupply) : t('Locked')}
          />
        </CardContent>
        <Footnote>
          {t('New rewards per block')}
          <FootnoteValue>{NEW_PER_BLOCK} NEW</FootnoteValue>
        </Footnote>
      </Card>
    </StyledWrapper>
  )
}

const Footnote = styled.div`
  font-size: 16px;
  padding: 20px 30px;
  font-family: 'PingFang SC Medium', sans-serif;
  // color: ${(props) => props.theme.color.grey[400]};
  color: #607686;
  // border-top: solid 1px ${(props) => props.theme.color.grey[300]};
`
const FootnoteValue = styled.div`
  font-family: 'Roboto Mono', monospace;
  float: right;
`

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

export default Balances
