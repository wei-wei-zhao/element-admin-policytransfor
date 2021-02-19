import defaultSettings from '@/settings'

const title = defaultSettings.title || '识别引擎'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
