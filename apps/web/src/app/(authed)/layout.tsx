import {
  LayoutBottomTabBar,
  LayoutMain,
  LayoutSideTabBar,
} from '../../components/layouts'
import { useAuth } from '../../providers/authProvider'
import { Tabs } from './components/tabs'
import { ValidateAuth } from './components/validateAuth'

type Props = React.PropsWithChildren<{}>

export default function AuthedLayout({ children }: Props) {
  return (
    <>
      <ValidateAuth />
      <LayoutSideTabBar>
        <Tabs type="vertical" />
      </LayoutSideTabBar>
      <LayoutMain>{children}</LayoutMain>
      <LayoutBottomTabBar>
        <Tabs type="horizontal" />
      </LayoutBottomTabBar>
    </>
  )
}

export const runtime = 'nodejs'
