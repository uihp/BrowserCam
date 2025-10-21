import Component from './component'
import getHistoryRouterConstructor from '@radical-web/practice/history-router'

customElements.define('history-router', getHistoryRouterConstructor(Component))
