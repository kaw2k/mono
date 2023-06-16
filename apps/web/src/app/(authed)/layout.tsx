import {
  LayoutBottomTabBar,
  LayoutMain,
  LayoutSideTabBar,
} from '../../components/layouts'
import { Tabs } from './components/tabs'
import { AuthListener } from './components/authListener'

type Props = React.PropsWithChildren<{}>

export default function AuthedLayout({ children }: Props) {
  return (
    <>
      <AuthListener />
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
