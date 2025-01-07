// types/menu.ts

// 定义二级菜单项接口
export interface SubMenuItem {
  id: string
  name: string
  icon?: string
  path?: string
}

// 定义主菜单项接口
export interface MenuItem {
  id: string
  name: string
  icon: string
  path?: string
  submenu: SubMenuItem[]
}

// 定义头部按钮接口
export interface HeaderButton {
  id: string
  title: string
  icon: string
  onClick?: () => void
}

// 菜单配置
export const menuConfig = {
  // 主菜单配置
  mainMenus: [
    {
      id: 'database',
      name: 'Database',
      icon: '/icons/database.svg',
      submenu: [
        { id: 'viewData', name: 'View Data', path: '/database/view-data' },
        { id: 'compound', name: 'Compound', path: '/database/compound' },
        { id: 'solution', name: 'Solution', path: '/database/solution' }
      ]
    },
    {
      id: 'calculate',
      name: 'Calculate',
      icon: '/icons/calculate.svg',
      submenu: [
        { id: 'reaction', name: 'Reaction', path: '/calculate/reaction' },
        { id: 'equilib', name: 'Equilib', path: '/calculate/equilib' },
        { id: 'phaseDiagram', name: 'Phase Diagram', path: '/calculate/phase-diagram' },
        { id: 'predom', name: 'Predom', path: '/calculate/predom' },
        { id: 'eph', name: 'EpH', path: '/calculate/eph' },
        { id: 'optimize', name: 'Optimize', path: '/calculate/optimize' }
      ]
    },
    {
      id: 'manipulate',
      name: 'Manipulate',
      icon: '/icons/manipulate.svg',
      submenu: [
        { id: 'results', name: 'Results', path: '/manipulate/results' },
        { id: 'mixture', name: 'Mixture', path: '/manipulate/mixture' },
        { id: 'viewFigure', name: 'View Figure', path: '/manipulate/view-figure' },
        { id: 'figure', name: 'Figure', path: '/manipulate/figure' },
        { id: 'reset', name: 'Reset', path: '/manipulate/reset' },
        { id: 'quit', name: 'Quit', path: '/manipulate/quit' }
      ]
    }
  ] as MenuItem[],

  // 头部按钮配置
  headerButtons: [
    {
      id: 'home',
      title: '主页',
      icon: '/icons/home.svg'
    },
    {
      id: 'menu',
      title: '常用菜单',
      icon: '/icons/menu.svg'
    },
    {
      id: 'theme',
      title: '更换皮肤',
      icon: '/icons/theme.svg'
    },
    {
      id: 'message',
      title: '系统消息',
      icon: '/icons/message.svg'
    },
    {
      id: 'logout',
      title: '退出登录',
      icon: '/icons/logout.svg'
    }
  ] as HeaderButton[]
}

// 路由路径类型
export type MenuPath = {
  [K in MenuItem['id']]: {
    [S in MenuItem['submenu'][number]['id']]: string
  }
}

// 获取菜单项方法
export function getMenuItem(id: string): MenuItem | undefined {
  return menuConfig.mainMenus.find(item => item.id === id)
}

// 获取子菜单项方法
export function getSubMenuItem(mainId: string, subId: string): SubMenuItem | undefined {
  const mainMenu = getMenuItem(mainId)
  return mainMenu?.submenu.find(item => item.id === subId)
}

// 获取菜单路径方法
export function getMenuPath(mainId: string, subId: string): string | undefined {
  return getSubMenuItem(mainId, subId)?.path
}

export interface MenuItem {
    id: string;
    title: string;
    icon?: string;
    path?: string;
    submenu?: SubMenuItem[];
  }

export interface SubMenuItem {
  id: string;
  title: string;
  path?: string;
}