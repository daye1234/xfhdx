import React, {
    useState,
    useImperativeHandle,
    forwardRef,
    useCallback,
    useRef,
    useEffect,
} from 'react';
import Modal from '@components/Modal';
import { Form, Row, Col, notification, Input, Button } from 'antd';
import request from '@utils/request';
import styles from './index.scss'
import { send_email } from '@http/apis';
import { resetPassword } from '@http/userpanel';
const editInfo = (obj: any) => {
    return new Promise((resolve, reject) => {
        request
            .post(resetPassword, obj)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
const timerCount = 60
function ResetPassword(props: any, ref: any) {
    const [count, setCount] = useState(timerCount)
    const timerRef = useRef(null) // 记录时间的定时器
    const [curemail, setCurEmail] = useState('')
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const meta = {
        columns: 1, //显示列数
        preserve: false,
        initialValues: {
            // apply_dept: dw[0].value || '无',
        },
        // viewMode: true, //为ture,不能编辑
        formItemLayout: [4, 20], // Must set this for inline layout
        fields: [
            {
                key: 'new_password', // 键
                label: '新密码',
                widget: 'password', // 自定义组件
                required: true, // 不能为空
                message: '新密码不能为空',
                placeholder: '请输入新密码',
                trigger: 'onChange',
                getValueProps: (value: any) => {
                    return;
                },
            },

            {
                key: 'email', // 键
                render() {
                    return (
                        <Form.Item label='邮箱' required labelCol={{ span: 4 }}>
                            <Row>
                                <Col span={18}>
                                    <Input onChange={handleNewpasswordChange} placeholder="请输入邮箱" />

                                </Col>

                                <Col span={4}>
                                    <Button
                                        style={{ marginLeft: '15px' }}
                                        disabled={count < timerCount}
                                        onClick={count === timerCount ? sendCode : null}
                                    ><span> {count === timerCount ? "发送验证码" : `还剩${count}秒`}</span></Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    )
                }
            },
            {
                key: 'code', // 键
                label: '验证码',
                widget: 'input', // 自定义组件
                required: true, // 不能为空
                message: '验证码不能为空',
                placeholder: '请输入验证码',
                trigger: 'onChange',
                widgetProps: {
                    autoComplete: 'off',

                },

                getValueProps: (value: any) => {
                    return;
                },
            },
        ],
    };
    const handleNewpasswordChange = (v: any) => {
        setCurEmail(v.target.value)
    }
    const get_email_content = (ticket: any, randstr: any) => {
        request.post(send_email, {
            email: curemail,
            type: 'reset_pwd',
            ticket,
            randstr
        }).then((res: any) => {
            if (res.data.code == 200) {

                notification.success({ message: res.data.msg });
            } else {
                notification.warning({ message: res.data.msg });
            }
        })
    }
    const cutCount = () => {
        setCount((prevState) => prevState - 1) // 为什么这里要用函数- 如果用count 发现count闭包了 不会发生变化了
    }
    const tencentCallBack = ((res: any) => {
        if (res.ret == 0) {
            cutCount()
            timerRef.current = setInterval(cutCount, 1000)
            get_email_content(res.ticket, res.randstr)
        }
    })
    const sendCode = () => {

        {/* @ts-ignore */ }
        var captcha1 = new TencentCaptcha('2008074529', tencentCallBack)
        captcha1.show() // 显示验证码
        // 要发送验证码
    }

    useEffect(() => {
        if (count === 0) {
            clearInterval(timerRef.current) // 清空定时器
            setCount(timerCount) // 重新将技术器设置为60秒
        }
    }, [count])
    const handleSubmit = () => {
        form.validateFields().then((values: any) => {
            const obj = { ...values, email: curemail }
            setLoading(true);
            editInfo(obj)
                .then((res: any) => {
                    if (res.data.code == 200) {

                        notification.success({ message: res.data.msg });
                        setLoading(false);
                        setVisible(false);

                    } else {
                        setLoading(false);

                        notification.warning({ message: res.data.msg });
                    }

                })
                .catch((err: any) => {
                    setLoading(false);
                });
        });
    };
    const handleCancel = () => {
        setVisible(false);
    };

    useImperativeHandle(ref, () => ({
        // show 就是暴露给父组件的方法
        show: (selectedRows: any) => {
            setVisible(true);
        },
    }));
    return (
        <Modal
            // setFormRef={setFormRef}
            width={600}
            form={form}
            visible={visible}
            title="重置密码"
            confirmLoading={loading}
            maskClosable={false}
            draggable={true}
            centered={true}
            formData={meta}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        ></Modal>
    );

}
export default forwardRef(ResetPassword);
