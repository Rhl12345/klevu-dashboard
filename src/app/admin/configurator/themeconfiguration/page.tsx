import ThemeConfiguration from '@/admin-pages/theme-configurator/list'
import React from 'react'

export const metadata = {
  title: "Theme Configuration",
  description: "Theme Configuration",
};

const ThemeConfiguratorPage = () => {
  return (
    <ThemeConfiguration />
  )
}

export default ThemeConfiguratorPage