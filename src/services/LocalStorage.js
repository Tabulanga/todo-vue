export const saveState = (state) => {
  const data = {}
  state.model.data.forEach(el => {
    data[el] = state[el]
  })
  localStorage.setItem(state.model.id, JSON.stringify(data))
}

export const loadState = (model) => {
  return JSON.parse(localStorage.getItem(model.id))
}
