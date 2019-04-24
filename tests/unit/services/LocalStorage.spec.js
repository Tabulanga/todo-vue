import { saveState, loadState } from '@/services/LocalStorage'

const testState = {
  model: {
    id: 'test-todo',
    data: [ 't1' ]
  },
  t1: 'hurra',
  t2: 'never'
}

describe('Check save/load data in localstorage', () => {
// Конечно, стоит проверять независимо, но в данном случае не будем усложнять
  test('save marked data only', done => {
    saveState(testState)
    const result = loadState(testState)
    expect(result.t1).toMatch(testState.t1)
    done()
  })

  test('do not save not marked', done => {
    saveState(testState)
    const result = loadState(testState)
    expect(result.t2).toBeUndefined()
    done()
  })
})
