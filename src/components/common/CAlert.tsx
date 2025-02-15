import { defineComponent, defineProps, defineEmits } from 'vue'
import type { PropType } from 'vue'
import { Alert } from 'ant-design-vue';

export default defineComponent((props, ctx) => {
  // const props = defineProps({
  //   message: {
  //     type: String as PropType<string>,
  //     default: ''
  //   }
  // })
  return () => {
    return <alert message="message" type="warning"></alert>
  }
},
// components: {
//   Alert,
// },
// {
//   props: {
//     message: {
//       type: String as PropType<string>,
//       default: ''
//     }
//   }
// }
)
