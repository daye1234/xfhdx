import React, { useEffect, useState, useRef } from 'react';
import Layout from '@core/container/components/layout';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { useStores, encrypt } from '@utils/index';
import ResetPassword from './pop/resetPassword';
import styles from './index.scss'
//提交
const Login = () => {
    const [form] = Form.useForm();
    const [isSubmmiting, setSubmmiting] = useState(false);
    const rootStore = useStores('rootStore');
    const [captchaUrl, setCaptchaUrl] = useState('/captcha')
    const popResetPasswordRef = useRef(null)
    const onFinish = (data: any) => {
        if (isSubmmiting || !data) return;
        setSubmmiting(true);
        const params = {
            username: data.username,
            encrypt: encrypt('shangheweb', data.password),
            captcha: data.captcha
        };
        rootStore.login(params).then((res: any) => {
            if (res.data.status === 200) {
                setTimeout(() => {
                    location.href = res.data.referer;
                    changeCaptcha();
                }, 1000);
                notification.success({ message: res.data.message });
            } else {
                notification.warning({ message: res.data.message });
                setSubmmiting(false);
                changeCaptcha();
            }

            setSubmmiting(false);
        });
    };
    const goRegiter = () => {
        location.href = '/register'
    }
    // 更新验证码
    const changeCaptcha = () => {
        setCaptchaUrl('/captcha?random=' + Math.random())

    };
    const onResetPasswordSubmit = (type: any) => {

    };
    const handleReset = () => {
        popResetPasswordRef.current.show()
    }
    return (
        <>
            <Layout>
                <div className={styles.body}>
                    <div className={styles.form}>
                        <div className={styles.top}>
                            <span>登录</span>
                            <span onClick={goRegiter}>没有账号？立即注册</span>
                        </div>
                        <div className={styles.form_main}>
                            <Form
                                autoComplete="new-password"
                                form={form}
                                name="normal_login"
                                initialValues={{}}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="username"
                                    required
                                    rules={[{ required: true, message: '请输入用户名' }]}
                                >
                                    <Input
                                        //  autoComplete="new-password"
                                        className={styles.input}

                                        placeholder="请输入您的用户名..."
                                    />
                                </Form.Item>
                                <Form.Item
                                
                                    name="password"
                                    required
                                    rules={[{ required: true, message: '请输入密码' }]}
                                    
                                >
                                    <Input.Password
                                       autoComplete="new-password"
                                        type="password"
                                        placeholder="请输入您的密码..."
                                        className={styles.input}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="captcha"
                                    required
                                    rules={[{ required: true, message: '输入验证码' }]}
                                >
                                    <div className={styles.item}>
                                        <Input
                                            autoComplete="off"
                                            type="input"
                                            placeholder="输入验证码"
                                            className={styles.input}
                                        />
                                        <img
                                            onClick={changeCaptcha}
                                            //   className={styles.captcha}
                                            src={captchaUrl}
                                            title="看不清？换一张"
                                        />
                                    </div>
                                </Form.Item>


                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className={styles.btn}>
                                        {isSubmmiting ? '正在登录' : '登录'}
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <div onClick={handleReset} className={styles.item}>
                                            <span>忘记密码?</span>

                                        </div>
                                    </Form.Item>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </Layout>
            <ResetPassword onSubmit={onResetPasswordSubmit} ref={popResetPasswordRef}></ResetPassword>
        </>
    )
}
export default Login