import { shallowMount, createLocalVue } from '@vue/test-utils'
import { SilenceWarnHack } from '@/../tests/helpers/SilenceWarnHack'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Alert from '@/components/Alert'

const silenceWarnHack = new SilenceWarnHack()

describe('Alert.vue', () => {
  let getters
  let mutations
  let store
  let wrapper

  beforeEach(() => {
    silenceWarnHack.enable()
    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(Vuetify)
    silenceWarnHack.disable()

    getters = {
      getAlert: () => {
        return {
          message: 'Text',
          type: 'success',
          flag: true
        }
      }
    }

    mutations = {
      setAlert: jest.fn()
    }

    store = new Vuex.Store({
      getters,
      mutations
    })

    wrapper = shallowMount(Alert, { store, localVue })
  })

  test('there is an alert', () => {
    const alert = wrapper.find('v-alert-stub')
    expect(alert.exists()).toBeTruthy()
  })

  test('change flag to false', () => {
    wrapper.vm.clearAlert()
    expect(mutations.setAlert).toBeCalled()
    expect(mutations.setAlert.mock.calls[0][1].flag).toBeFalsy()
  })

})