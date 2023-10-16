### 结构

#### metaType

getMeta

meta

form

#### fieldType



### 动态字段

```jsx
const [form] = Form.useForm()
const forceUpdate = FormBuilder.useForceUpdate() 

<Form form={form} onValuesChange={forceUpdate}>
  <FormBuilder meta={meta} form={form} />
</Form>
```

如果你想控制的动态逻辑更灵活，可以使用`shouldUpdate`与`Form.Item`自己。

#### 参数的使用

##### shouldUpdate

Form 通过增量更新方式，只更新被修改的字段相关组件以达到性能优化目的。

大部分场景下，你只需要编写代码或者与 `dependencies` 属性配合校验即可。

###### 使用

当 `shouldUpdate` 为 `true` 时，Form 的任意变化都会使该 Form.Item 重新渲染。

```react
<Form.Item shouldUpdate>
  {() => {
    return <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>;
  }}
</Form.Item>
```

当 `shouldUpdate` 为方法时，表单的每次数值更新都会调用该方法，提供原先的值与当前的值以供你比较是否需要更新。这对于是否根据值来渲染额外字段十分有帮助：

```react
<Form.Item shouldUpdate={(prev, current) => prev.gender !== current.gender} >
  {({ getFieldValue }) => {
    return getFieldValue('gender') === 'other' ? (
      <Form.Item name="input" label="input" rules={[{ required: true }]}>
        <Input />
       </Form.Item>
   ) : null;
  }}
</Form.Item>
```

##### dependencies

如果一个字段设置了 `dependencies` 属性。那么它所依赖的字段更新时，该字段将自动触发更新与校验。

`dependencies` 不应和 `shouldUpdate` 一起使用，因为这可能带来更新逻辑的混乱。

###### 使用

以下场景，就是注册用户表单的“密码”与“确认密码”字段。“确认密码”校验依赖于“密码”字段，设置 `dependencies` 后，“密码”字段更新会重新触发“校验密码”的校验逻辑。


```json
{
    key: 'password',
    label: 'Password',
    widget: 'password',
    rules: [
        {
            required: true,
            message: 'Please input your password!',
        },
    ],
},
{
    key: 'confirmpassword',
    label: 'confirmpassword',
    widget: 'password',
    dependencies: ['password'],
    rules: [
        {
            required: true,
            message: '请输入确认密码!',
        },
        ({ getFieldValue }) => ({
            validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                }
                return Promise.reject(
                    'The two passwords that you entered do not match!'
                )
            },
        }),
    ],
}
```