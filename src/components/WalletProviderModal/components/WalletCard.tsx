import React from 'react'
import Button from '../../Button'
import Card from '../../Card'
import CardContent from '../../CardContent'
import CardIcon from '../../CardIcon'
import CardTitle from '../../CardTitle'
import Spacer from '../../Spacer'

interface WalletCardProps {
  icon: React.ReactNode
  onConnect: () => void
  title: string
  connectTitle: string
}

const WalletCard: React.FC<WalletCardProps> = ({ icon, onConnect, title, connectTitle }) => (
  <Card>
    <CardContent>
      <CardIcon>{icon}</CardIcon>
      <CardTitle text={title} />
      <Spacer />
      <Button onClick={onConnect} text={connectTitle} size="new" variant="green" />
    </CardContent>
  </Card>
)

export default WalletCard
