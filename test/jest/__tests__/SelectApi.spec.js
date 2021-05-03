import { mountQuasar } from '../index'
import axios from 'axios'
import SelectApi from '@components/SelectApi.vue'
import response from './response.json'

jest.mock('axios');

beforeAll(() => {
  jest.clearAllMocks();

  jest.spyOn(console, 'warn').mockImplementation(() => { });
  jest.spyOn(console, 'error').mockImplementation(() => { });
});

beforeEach(() => {
  jest.clearAllMocks();
});

const defaultPropsData = () => ({ http: axios, api: '' })

let returnData = [
  { id: 1, first_name: 'Brominator', email: 'bro@gmail.com' },
  { id: 2, first_name: 'Foo f', email: 'foo@gmail.com' }
]

test('mount component with request', async () => {
  axios.get.mockResolvedValueOnce({ data: returnData });

  const spyOnGet = jest.spyOn(axios, 'get')

  const props = defaultPropsData()

  const wrapper = await mountQuasar(SelectApi, {
    propsData: props
  })

  expect(spyOnGet).toBeCalled()
  expect(wrapper.vm.clearOptions).toHaveLength(2)
  expect(wrapper.vm.options).toHaveLength(2)
})

test('mount component without request', () => {
  axios.get.mockResolvedValueOnce({ data: returnData });

  const spyOnGet = jest.spyOn(axios, 'get')

  const props = defaultPropsData()
  props.getOnStart = false

  const wrapper = mountQuasar(SelectApi, {
    propsData: props
  })

  expect(spyOnGet).not.toBeCalled()
  expect(wrapper.vm.clearOptions).toHaveLength(0)
  expect(wrapper.vm.options).toHaveLength(0)
})

test('make a get request ONLY when param change', async () => {

  const props = defaultPropsData()

  props.getOnStart = false
  props.getOnParamChange = true

  const wrapper = mountQuasar(SelectApi, {
    propsData: props
  })

  const spyOnGet = jest.spyOn(axios, 'get')

  expect(spyOnGet).not.toBeCalled()

  await wrapper.setProps({ params: 'id=5' })
  expect(spyOnGet).toBeCalled()
})

test('computed url mount correct', () => {
  axios.get.mockResolvedValueOnce({ data: returnData });

  const props = defaultPropsData()
  props.api = 'jsonplaceholder'
  props.params = 'posts=5'

  const wrapper = mountQuasar(SelectApi, {
    propsData: props
  })

  expect(wrapper.vm.url).toBe('jsonplaceholder?posts=5')
})


test('get $emit successOnGet event', async () => {
  axios.get.mockResolvedValueOnce({ data: returnData });

  const props = defaultPropsData()
  const wrapper = mountQuasar(SelectApi, {
    propsData: props
  })

  await wrapper.vm.$nextTick()

  expect(wrapper.emitted().successOnGet).toBeTruthy()
})


test('get $emit errorOnGet event', async () => {

  axios.get.mockRejectedValue('error msg')

  const props = defaultPropsData()

  const wrapper = await mountQuasar(SelectApi, {
    propsData: props
  })

  await wrapper.vm.$nextTick()

  expect(wrapper.emitted().errorOnGet).toBeTruthy()
})
