import { mountQuasar } from '../index'
import axios from 'axios'
import Crud from '@components/Crud.vue'
import columns from './columns.js'
import response from './response.json'

jest.mock('axios');

axios.get.mockResolvedValue([]);

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => { });
  jest.spyOn(console, 'error').mockImplementation(() => { });
});

const defaultPropsData = () => ({
  http: axios,
  api: '',
  columns,
  listIndex: value => value,
  rowKey: ''
})

let returnData = [
  { id: 1, first_name: 'Brominator', 'email': 'bro@gmail.com' },
  { id: 2, first_name: 'Foo f', 'email': 'foo@gmail.com' }
]

test('all columns enabled to create', () => {

  const wrapper = mountQuasar(Crud, {
    propsData: defaultPropsData()
  })

  expect(wrapper.vm.filteredColumns).toHaveLength(2)
})

test('at least one row was selected', () => {
  axios.get.mockResolvedValue(returnData);

  const wrapper = mountQuasar(Crud, {
    propsData: defaultPropsData()
  })
  wrapper.setData({ selected: [returnData[0]] })

  expect(wrapper.vm.someSelected).toBeTruthy()
})

test('using customSelected slot', () => {
  const wrapper = mountQuasar(Crud, {
    propsData: defaultPropsData(),
    slots: {
      customSelected: '<div />'
    }
  })

  expect(wrapper.vm.hasCustomSelectedSlot).toBeTruthy()
})

test('get fields with validation', () => {
  const props = defaultPropsData()

  const wrapper = mountQuasar(Crud, {
    propsData: props
  })

  expect(wrapper.vm.fieldsWithValidation).toHaveLength(1)
  expect(wrapper.vm.fieldsWithValidation).toStrictEqual([props.columns[0]])
})

test('custom message delete with function after user select', () => {

  axios.get.mockResolvedValue(returnData);

  const props = defaultPropsData()
  props.msgDelete = row => `Deleted ${row.first_name} ?`

  const wrapper = mountQuasar(Crud, {
    propsData: props
  })

  wrapper.setData({ selected: [returnData[0]] })

  expect(wrapper.vm.messageDeleteForShow).toBe('Deleted Brominator ?')
})

test('custom title delete with function after user select', () => {

  axios.get.mockResolvedValue(returnData);

  const props = defaultPropsData()
  props.titleDelete = row => `Do you want delete ${row.first_name} ?`

  const wrapper = mountQuasar(Crud, {
    propsData: props
  })

  wrapper.setData({ selected: [returnData[1]] })

  expect(wrapper.vm.titleDeleteForShow).toBe('Do you want delete Foo f ?')
})


test('get fields with validation', () => {

  const wrapper = mountQuasar(Crud, {
    propsData: defaultPropsData()
  })

  expect(wrapper.vm.fieldsWithValidation).toHaveLength(1)
  expect(wrapper.vm.fieldsWithValidation).toStrictEqual([defaultPropsData.columns[0]])
})


test('mount component without make requests', () => {

  const props = defaultPropsData()
  props.getOnStart = false

  const spyOnGet = jest.spyOn(Crud.methods, 'get')

  const wrapper = mountQuasar(Crud, {
    propsData: props
  })

  expect(spyOnGet).not.toBeCalled()
})

test('make a get request ONLY when param change', async () => {

  const props = defaultPropsData()

  props.getOnStart = false
  props.getOnParamChange = true

  const spyOnGet = jest.spyOn(Crud.methods, 'get')

  const wrapper = mountQuasar(Crud, {
    propsData: props
  })

  expect(spyOnGet).not.toBeCalled()

  await wrapper.setProps({ params: 'id=5' })
  expect(spyOnGet).toBeCalled()
})

test('only email column are visible to create', () => {

  const props = defaultPropsData()

  props.columns[0].showCreate = false
  axios.get.mockResolvedValue([]);

  const wrapper = mountQuasar(Crud, {
    propsData: props
  })

  expect(wrapper.vm.filteredColumns).toHaveLength(1)
})

test('api url mounting defalt mouting', () => {

  const props = defaultPropsData()

  props.api = 'people'

  const wrapper = mountQuasar(Crud, {
    propsData: props
  })

  expect(wrapper.vm.apiUri).toBe('people?page=1&per_page=3&sort=,asc')
})

test('object to save mounting empty', () => {

  axios.get.mockResolvedValue([]);

  const props = defaultPropsData()

  props.columns[0].value = ''
  props.columns[1].value = ''

  const wrapper = mountQuasar(Crud, {
    propsData: props
  })

  expect(wrapper.vm.objectToSave).toStrictEqual({})
})

test('object to save mounting simple values', () => {

  const props = defaultPropsData()

  props.columns[0].value = 'Brother Lee'
  props.columns[1].value = 'brother@mail.com'

  const wrapper = mountQuasar(Crud, {
    propsData: props
  })

  expect(wrapper.vm.objectToSave).toStrictEqual({ "email": "brother@mail.com", "first_name": "Brother Lee" })
})


test('object to save mounting complex values', () => {

  defaultPropsData.columns[0].value = {}
  defaultPropsData.columns[1].value = []

  const wrapper = mountQuasar(Crud, {
    propsData: defaultPropsData
  })

  expect(wrapper.vm.objectToSave).toStrictEqual({ "email": [], "first_name": {} })
})

test('object to save mounting with formating values', () => {

  defaultPropsData.columns[0].value = { value: 'BROTHER', label: 'Brother' }
  defaultPropsData.columns[0].formatForPost = (value) => value.value

  defaultPropsData.columns[1].value = 'brother'
  defaultPropsData.columns[1].formatForPost = (value) => `${value}@mail.com`

  const wrapper = mountQuasar(Crud, {
    propsData: defaultPropsData
  })

  expect(wrapper.vm.objectToSave).toStrictEqual({ "email": 'brother@mail.com', "first_name": 'BROTHER' })
})

test('column prop valitador with string value on format', () => {

  defaultPropsData.columns[0].value = { value: 'BROTHER', label: 'Brother' }
  defaultPropsData.columns[0].formatForPost = ''

  defaultPropsData.columns[1].value = 'brother'
  defaultPropsData.columns[1].formatForPost = {}

  const validator = Crud.props.columns.validator

  expect(validator(defaultPropsData.columns)).toBeFalsy()
  expect(console.warn).toHaveBeenCalled();
})

test('open modal without data', () => {

  axios.get.mockResolvedValue([]);

  const wrapper = mountQuasar(Crud, {
    propsData: defaultPropsData
  })
  const spyOnResetColumnsValuesMethod = jest.spyOn(wrapper.vm, 'resetColumnsValues')

  expect(wrapper.vm.modalOpened).toBeFalsy()
  wrapper.vm.toggleModal()

  expect(wrapper.vm.modalOpened).toBeTruthy()
  expect(spyOnResetColumnsValuesMethod).toHaveBeenCalled()
})
test('open modal with data after select a row ', () => {

  axios.get.mockResolvedValue(returnData);

  const wrapper = mountQuasar(Crud, {
    propsData: defaultPropsData
  })

  wrapper.setData({ selected: [returnData[0]] })// select a row

  const spyOnResetColumnsValuesMethod = jest.spyOn(wrapper.vm, 'populateColumnsWithSelectedRow')

  expect(wrapper.vm.modalOpened).toBeFalsy()
  wrapper.vm.toggleModalWithData()

  expect(wrapper.vm.modalOpened).toBeTruthy()
  expect(spyOnResetColumnsValuesMethod).toHaveBeenCalled()
})

test('get $emit successOnGet event', async () => {

  const wrapper = mountQuasar(Crud, {
    propsData: defaultPropsData
  })

  wrapper.vm.get()
  await wrapper.vm.$nextTick()

  expect(wrapper.emitted().successOnGet).toBeTruthy()

})

test('o succefull get set the total size from api', async () => {
  axios.get.mockResolvedValue({ data: response });

  defaultPropsData.paginationTotalIndex = 'total'

  const wrapper = mountQuasar(Crud, {
    propsData: defaultPropsData
  })

  expect(wrapper.vm.pagination.rowsNumber).toBe(1)

  wrapper.vm.get()
  await wrapper.vm.$nextTick()

  expect(wrapper.vm.pagination.rowsNumber).toBe(12)
})

test('delete $emit successOnDelete event', async () => {

  axios.delete.mockResolvedValue();

  const wrapper = mountQuasar(Crud, {
    propsData: defaultPropsData
  })

  wrapper.setData({ selected: [returnData[0]] })

  wrapper.vm.delete()
  await wrapper.vm.$nextTick()

  expect(wrapper.emitted().successOnDelete).toBeTruthy()

})

test('put $emit successOnPut event', async () => {

  axios.put.mockResolvedValue();

  const wrapper = mountQuasar(Crud, {
    propsData: defaultPropsData
  })

  wrapper.setData({ selected: [returnData[0]] })

  wrapper.vm.put()
  await wrapper.vm.$nextTick()

  expect(wrapper.emitted().successOnPut).toBeTruthy()

})