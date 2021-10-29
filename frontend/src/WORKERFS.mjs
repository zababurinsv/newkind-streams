import Action from './action.mjs'
Action.then(async (action) => {
    self.onmessage = async (events) => {
        console.log(action)
        for(let type in action) {
            if(events.data.action === type) {
                console.log(action[type] )
               await action[type](events.data.message)
            }
        }
    }
})

// let count = 0
// let timerId = setTimeout(async function tick() {
//     store.products = (isEmpty(store.products))
//       ? await ApiBack.get.products()
//       : await ApiBack.get.store(store.products)
//     store.cart = await ApiBack.get.cart(store.cart)
//     self.postMessage({
//       type: 'products',
//       tick: count,
//       isSend: isSend,
//       data: store.products,
//       cart: store.cart,
//       course: course
//     });
//   count = (count === 100) ? 0 : count + 1
//   timerId = setTimeout(tick, 15000);
// }, 0);