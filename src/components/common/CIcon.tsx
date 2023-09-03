import { defineComponent, defineProps, defineEmits } from 'vue'
import type { PropType } from 'vue'

export default defineComponent((props, ctx) => {
  // const props = defineProps({
  //   name: {
  //     type: String as PropType<string>,
  //     default: ''
  //   }
  // })
  defineEmits(['c-click'])

  console.log(props)
  console.log(ctx)

  const h2Click = function (e: Event) {
    console.log(props.name)
    ctx.emit('c-click', props.name)
  }
  return () => {
    return <button onClick={ (e) => h2Click(e) }>btn</button>
  }
},
{
  props: {
    name: {
      type: String as PropType<string>,
      default: ''
    }
  }
})
