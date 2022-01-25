import { RootBottomTabsParamsList } from '@/routes/app.routes'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootBottomTabsParamsList {}
  }
}
