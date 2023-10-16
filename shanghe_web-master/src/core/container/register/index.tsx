import React, { useEffect, useState, useRef } from 'react';
import Layout from '@core/container/components/layout';
import styles from './index.scss'
import { Button, Checkbox, Form, Input, notification, Statistic } from 'antd';
import { useStores } from '@utils/index';
const { Countdown } = Statistic;
import request from '@utils/request'
import { send_email, register } from '@http/apis';

const Register = () => {
    const timerCount = 60
    const [count, setCount] = useState(timerCount)
    const timerRef = useRef(null) // 记录时间的定时器
    const [form] = Form.useForm();
    const [isSubmmiting, setSubmmiting] = useState(false);
    const [curEmail, setCurEmail] = useState('')
    const rootStore = useStores('rootStore');
    const onFinish = (data: any) => {
        if (isSubmmiting || !data) return;
        setSubmmiting(true);
        ;

        request.post(register, data).then((res: any) => {
            if (res.data.code == 200) {
                setTimeout(() => {
                    location.href = "/login"
                }, 1000);
                notification.success({ message: '注册成功' });
            } else {
                notification.warning({ message: res.data.msg });
                setSubmmiting(false);
            }
            setSubmmiting(false);
        })

    };
    const goLogin = () => {
        location.href = "/login"
    }
    const cutCount = () => {
        setCount((prevState) => prevState - 1) // 为什么这里要用函数- 如果用count 发现count闭包了 不会发生变化了
    }
    const sendCode = () => {
        const tencentCallBack = ((res: any) => {
            if (res.ret == 0) {
                cutCount()
                timerRef.current = setInterval(cutCount, 1000)
                get_email_content(res.ticket, res.randstr)
            }
        })
        {/* @ts-ignore */ }
        var captcha1 = new TencentCaptcha('2008074529', tencentCallBack)
        captcha1.show() // 显示验证码
        // 要发送验证码
    }
    const get_email_content = (ticket: any, randstr: any) => {
        request.post(send_email, {
            email: curEmail,
            type: 'register',
            ticket,
            randstr
        }).then((res: any) => {
            if (res.data.code == 200) {
                setSubmmiting(false);

                notification.success({ message: res.data.msg });
            } else {
                notification.warning({ message: res.data.msg });
                setSubmmiting(false);
            }
        })
    }
    const handleEmailChange = (v: any) => {
        setCurEmail(v.target.value)
    }
    useEffect(() => {
        if (count === 0) {
            clearInterval(timerRef.current) // 清空定时器
            setCount(timerCount) // 重新将技术器设置为60秒
        }
    }, [count])

    return (
        <>
            <Layout>
                <div className={styles.body}>
                    <div className={styles.form}>
                        <div className={styles.top}>
                            <span>注册</span>
                        </div>
                        <div className={styles.form_main}>
                            <Form
                                autoComplete="off"

                                form={form}
                                name="normal_register"
                                initialValues={{}}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: '请输入用户名' }]}
                                >
                                    <div className={styles.item}>
                                        <Input
                                            autoComplete="off"
                                            className={styles.input}
                                            placeholder="请输入您的用户名"
                                        />
                                    </div>
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: '请输入密码' }]}
                                >
                                    <div className="item">
                                        <Input.Password
                                            autoComplete="password"
                                            type="password"
                                            placeholder="请输入您的密码"
                                            className={styles.input}
                                        />
                                    </div>
                                </Form.Item>
                                <Form.Item
                                    name="confirm_password"
                                    rules={[{ required: true, message: '请输入密码' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('两次密码不匹配'));
                                        },
                                    }),
                                    ]}
                                    dependencies={['password']}

                                >
                                    <div className="item">
                                        <Input.Password
                                            autoComplete="new-password"
                                            type="password"
                                            placeholder="请再次输入您的密码"
                                            className={styles.input}
                                        />
                                    </div>
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    rules={[{ required: true, message: '请输入手机号' }]}
                                >
                                    <div className={styles.item}>
                                        <Input
                                            className={styles.input}
                                            placeholder="请输入您的手机号"
                                        />
                                    </div>
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: '请输入邮箱' }]}
                                >
                                    <div className={styles.item}>
                                        <Input
                                            autoComplete="off"
                                            className={styles.input}
                                            placeholder="请输入您的邮箱"
                                            onChange={handleEmailChange}
                                        />

                                        <Button
                                            disabled={count < timerCount}
                                            onClick={count === timerCount ? sendCode : null}
                                            className={styles.yzmbtn} ><span> {count === timerCount ? "发送验证码" : `还剩${count}秒`}</span></Button>

                                    </div>
                                </Form.Item>
                                <Form.Item
                                    name="code"
                                    rules={[{ required: true, message: '请输入您的邮箱验证码' }]}
                                >
                                    <div className="item">
                                        <Input
                                            autoComplete="code"
                                            placeholder="请输入您的邮箱验证码"
                                            className={styles.input}
                                        />
                                    </div>
                                </Form.Item>


                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className={styles.btn}>
                                        {isSubmmiting ? '正在注册' : '注册'}
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <div className={styles.item}>
                                            <span onClick={goLogin}>已有帐号?立即登录</span>
                                        </div>
                                    </Form.Item>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </Layout>

        </>
    )
}
export default Register