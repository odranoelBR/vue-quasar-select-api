# SelectApi

## Props

| Prop name        | Description                                                                                                        | Type    | Values | Default |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ | ------- | ------ | ------- |
| api              | The rest API endpoint                                                                                              | string  | -      |         |
| http             | The Axios instance<br/>`@example` axios.create({ baseURL: 'https://reqres.in/' })                                  | func    | -      |         |
| params           | Query params of the url<br/>`@link` https://en.wikipedia.org/wiki/Query_string                                     | string  | -      | ''      |
| getOnStart       | The component will fetch remote data on mounted hook                                                               | boolean | -      | true    |
| getOnParamChange | The component will fetch remote data on params props change                                                        | boolean | -      | false   |
| optionFormater   | The function to format the API response<br/>`@example` formter (data) { return data.map(row => row.nestedObject) } | func    | -      | null    |
| inputFilter      | Set filter using input (you must set useInput props to true, like QSelect docs)                                    | boolean | -      | false   |

## Events

| Event name   | Properties | Description                                               |
| ------------ | ---------- | --------------------------------------------------------- |
| successOnGet |            | \$emit('successOnGet', response) on sucefull get request. |
| errorOnGet   |            | Emit the ERROR Object of axios catch.                     |

---
