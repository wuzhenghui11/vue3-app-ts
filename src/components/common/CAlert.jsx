/* @jsxImportSource vue */
// 你也可以通过在文件的顶部加入 /* @jsxImportSource vue */ 注释来选择性地开启。
import { defineComponent, defineProps, defineEmits } from 'vue'
import { Alert } from 'ant-design-vue'

export default defineComponent((props) => {
  console.log(props);
  return () => <Alert message={props.message} type="warning" show-icon></Alert>
},
{
  props: {
    message: {
      type: String,
      default: ''
    }
  }
})