import CIcon from './common/CIcon'
import CAlert from './common/CAlert'


export default {
  install (app: any) {
    app.component('CIcon', CIcon)
    app.component('CAlert', CAlert)
  }
}
