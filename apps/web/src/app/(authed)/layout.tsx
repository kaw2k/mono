import {
  LayoutBottomTabBar,
  LayoutMain,
  LayoutSideTabBar,
} from '../../components/layouts'
import { Tabs } from './components/tabs'

type Props = React.PropsWithChildren<{}>

export default function AuthedLayout({ children }: Props) {
  return (
    <>
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
