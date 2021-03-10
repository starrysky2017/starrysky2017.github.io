import * as React from 'react';
import { Layout, Form, message, Input, Button, Image, Row, Col, Modal } from 'antd';
import myapply from '../action/apply';
import { mobileCheck } from '../../public/util/index';
import * as styles from './App.less';

const isMobile = mobileCheck();
const responsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
}
const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const FormItem: any = Form.Item;
const { Footer } = Layout;


interface ApplyFormProps {
    visible: boolean;
    onOK: (values: any, cb?: any) => void;
    onCancel: () => void;
}

const ApplyForm: React.FC<ApplyFormProps> = ({
    visible,
    onOK,
    onCancel,
}) => {
    const [form] = Form.useForm();
    return (
        <Modal
            title={'申请30天试用'}
            visible={visible}
            centered={true}
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then(values => {
                        const cb = () => form.resetFields();
                        onOK(values, cb);
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
            cancelText="关闭"
            okText="提交申请"
        >
            <div>
                <Form {...formLayout} labelAlign="left" form={form}>
                    <FormItem name="companyName" label="公司名" rules={[{ required: true, message: '请输入您的公司名' }]}>
                        <Input placeholder="请输入您的公司名" />
                    </FormItem>
                    <FormItem name="name" label="姓名" rules={[{ required: true, message: '请输入您的姓名' }]}>
                        <Input placeholder="请输入您的姓名" />
                    </FormItem>
                    <FormItem name="email" label="邮箱地址" rules={[{ required: true, message: '请输入您的邮箱地址' }]}>
                        <Input placeholder="请输入您的邮箱地址" />
                    </FormItem>
                </Form>
            </div>
        </Modal>
    )
}

interface Props {
}

interface States {
    showModal: boolean;
}
class App extends React.Component<Props, States> {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }
    }

    componentDidMount() {
        console.log(`App mount`);
    }

    handleOpenModal = () => {
        this.setState({
            showModal: true,
        })
    }

    handleCloseModal = () => {
        this.setState({
            showModal: false,
        })
    }

    handleSubmitForm = (values: any, cb: any) => {
        console.log('Received values of form: ', values);
        myapply
            .submitApply(values)
            .then(response => {
                if (response.code === 0) {
                    message.success(`Submit apply successfully.`)
                    if (cb) {
                        cb();
                    }
                } else {
                    message.error(response.msg)
                }
            })
    }

    handleDownload = () => {
        message.success('Download successfully.');
    }

    render() {
        const { showModal } = this.state;
        const modules = [
            {
                title: 'Dalvik字节码反编译',
                principle: 'Dalvik是存储在DEX文件中的低级字节码的名称。Incinerator通过将Dex文件中压缩的Dalvik字节码转化为IR附录7 中间码再将Smali转化为Java代码。通过我们独有的反编译引擎，能将IR转化为比其他反编译工具可读性更高的Pseudocode代码，并且通过全局分析代码和变量，找出变量的交叉引用关系。更有利于代码理解。',
                list: [
                    {
                        desc: '通过对APK包以及Dex文件的解析后，就可以看到整个应用的包结构，展开后找到对应的类即可查看Smali代码。',
                        imgUrl: '/images/modules/dalvik_1.png',
                    },
                    {
                        desc: '在Smali代码和Pseudocode代码之间可以通过Tab键相互切换。并且在其中进行变量重命名，注释，查找交叉引用，全局搜索等操作。',
                        imgUrl: '/images/modules/dalvik_2.png',
                    },
                ]
            },
            {
                title: 'APK动态调试',
                principle: 'Incinerator通过Java调试线协议（JDWP）实现了JDWP客户端来对应用进行调试。但是要进行动态调试，首先需要安卓机器上的ro.debuggable配置以及AndroidManifest属性的设置，并且要绕过部分应用的调试检测机制，Incinerator在有Root权限的情况下自动修改各种系统配置，能实现大部分设备的一键调试。',
                list: [
                    {
                        desc: '在连接到拥有Root权限的真机或者模拟器后，可以针对APK程序在无源码的情况下进行动态调试，支持断点，单步和变量查看等。',
                        imgUrl: '/images/modules/apk_debug_1.png',
                    },
                ]
            },
            {
                title: 'APK资源解析',
                principle: 'APK(Android Package)文件，是Android应用程序的标准安装包，本质上是一个ZIP文件，包含了Dex文件，so文件，结构化和非结构化资源，配置文件，签名文件。',
                list: [
                    {
                        desc: 'AndroidManifest解析、图片资源解析、XML资源解析',
                        imgUrl: '/images/modules/dalvik_1.png',
                    },
                ]
            },
        ];
        return (
            <div className={styles.App}>
                <div className={styles.bannerDiv}>
                    <div className={styles.banner}>
                        <div className={styles.bannerTitle}>Incinerator</div>
                        <div className={styles.bannerSubTitle}>安卓反编译工具</div>
                        <div className={styles.bannerBtns}>
                            <Button type="primary" size="large" onClick={this.handleOpenModal}>申请30天试用</Button>
                            <div className={styles.placeholder}></div>
                            <Button type="default" size="large" onClick={this.handleDownload}>下载产品及手册</Button>
                        </div>
                    </div>
                </div>
                <div className={styles.bodyDiv}>
                    <div className={styles.moduleDiv}>
                        {
                            modules.map(item => {
                                return <div className={styles.modulePanel}>
                                    <div className={styles.moduleTitle}>{item.title}</div>
                                    <div className={styles.moduleContent}>
                                        <div className={styles.principle}><span>原理:{' '}</span>{item.principle}</div>
                                        <div className={styles.list}>
                                            {
                                                item.list.map(i => {
                                                    return <Row className={styles.item}>
                                                        <Col className={styles.desc} {...responsiveProps}>{i.desc}</Col>
                                                        <Col className={styles.imgWrap} {...responsiveProps}>
                                                            {isMobile ? <img className={styles.img} src={i.imgUrl} /> : <Image className={styles.img} src={i.imgUrl} preview={{ mask: false }} />}
                                                        </Col>
                                                    </Row>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
                <ApplyForm visible={showModal} onCancel={this.handleCloseModal} onOK={this.handleSubmitForm} />
                <Footer className={styles.footer}>Incinerator ©2021 Created by Reversec</Footer>
            </div>
        )
    }
}

export default App;