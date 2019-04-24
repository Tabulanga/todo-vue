import { getters } from '@/store'

const {
  getSettings,
  getAlert,
  getTodo,
  filteredTodos
} = getters

describe('getters', () => {
  test('getSettings', () => {
    const state = {
      settings: {
        test: 'test'
      },
      trash: null
    }
    const result = getSettings(state)
    expect(result).toEqual(state.settings)
  })

  test('getAlert', () => {
    const state = {
      alert: {
        message: 'Oh god, we have a error here',
        type: 'error',
        flag: true
      }
    }
    const result = getAlert(state)
    expect(result).toEqual(state.alert)
  })

  test('getTodo', () => {
    const state = {
      todoColl: [
        { id: '1', todo: 'doudou' },
        { id: '2', todo: 'moumou' }
      ]
    }
    const result = getTodo(state)('1')
    expect(result).toEqual(state.todoColl[0])
  })

  test('filteredTodos', () => {
    const state = {
      todoColl: [
        { expired: false, deadline: '2019-04-24', status: 'done', tags: ['bug'] },
        { expired: false, deadline: '2019-05-22', status: 'in__work', tags: [] },
        { expired: true, deadline: '2019-03-21', status: 'in__work', tags: ['tag', 'bug'] }
      ]
    }
    const filtredDone = filteredTodos(state)({ status: 'done' })
    expect(filtredDone[0]).toEqual(state.todoColl[0])
    expect(filtredDone.length).toBe(1)

    const filtredInWork = filteredTodos(state)({ status: 'in__work' })
    expect(filtredInWork.length).toBe(2)

    const filtredExpired = filteredTodos(state)({ expired: true })
    expect(filtredExpired[0]).toEqual(state.todoColl[2])
    expect(filtredExpired.length).toBe(1)

    const filtredSelectedTag = filteredTodos(state)({ selectedTag: 'bug' })
    expect(filtredSelectedTag.length).toBe(2)

    expect(filtredInWork[0]).toEqual(state.todoColl[2])
    expect(filtredSelectedTag[0]).toEqual(state.todoColl[2])
  })
})
