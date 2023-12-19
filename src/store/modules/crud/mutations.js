const dataSetter = (state, data) => {
  state.data = data
}
const formDataSetter = (state, data) => {
  state.formData = data
}
const formDataCleaner = (state) => {
  let formData
  for (formData in state.formData) {
    if (formData === 'Id') {
      delete state.formData[formData]
    } else {
      state.formData[formData] = null
    }
  }
}
const editSetter = (state, data) => {
  state.edit = data
}
const loadSetter = (state, data) => {
  state.isLoading = data
}

const formDataFieldSetter = (state, data) => {
  state.formData[data.field] = data.val
}
export default {
  dataSetter,
  formDataSetter,
  formDataFieldSetter,
  formDataCleaner,
  editSetter,
  loadSetter
}
