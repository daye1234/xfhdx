import React, { useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalProps } from 'antd/lib/modal';
import { Modal as AntdModal, Form } from 'antd';
import containsNode from './common/containsNode';
import classnames from 'classnames';
import FormBuilder from '@components/Form';
import './index.css';

interface IProps {
  form?: any;
  visible: boolean;
  draggable: boolean;
  children: any;
  formData?: any;
  onSubmit?: (form?: any) => any;
  // setFormRef: any
}

function Modal(props: ModalProps & IProps) {
  // const [form] = Form.useForm()

  let beginDrag = false;
  let modalWrapper: any = null;
  let modalContent: any = null;
  let points = [0, 0];

  const randomId = `${parseInt(
    (Math.random() * 1000000).toString(),
    10
  ).toString()}`;

  const initData = () => {
    beginDrag = false;
    modalWrapper = null;
    modalContent = null;
    points = [0, 0];
  };

  const handleMouseDown = (e: any) => {
    const { visible, draggable } = props;
    if (!visible || !draggable) {
      return;
    }
    const FmodalWrapper = document.querySelector(`.sd-model-${randomId}`);
    if (!FmodalWrapper) return;
    const FmodalContent = FmodalWrapper.querySelector('.ant-modal-content');
    const FmodalTitle = FmodalWrapper.querySelector('.ant-modal-header');
    if (FmodalContent && FmodalWrapper && containsNode(FmodalTitle, e.target)) {
      beginDrag = true;
      modalWrapper = FmodalWrapper;
      modalContent = FmodalContent;
      points = [e.clientX, e.clientY];
    }
  };

  const handleMouseUp = () => {
    initData();
  };

  const handleMouseMove = (e: any) => {
    if (!beginDrag || !modalWrapper || !modalContent) return;
    const { clientX, clientY } = e;
    const diffX = clientX - points[0];
    const diffY = clientY - points[1];
    points = [e.clientX, e.clientY];
    const { style } = modalContent;
    style.left = `${(parseFloat(style.left) || 0) + diffX}px`;
    style.top = `${(parseFloat(style.top) || 0) + diffY}px`;
  };

  const bindEvent = () => {
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
  };

  const removeEvent = () => {
    document.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
  };

  useLayoutEffect(() => {
    bindEvent();
    return () => {
      removeEvent();
    };
  });

  useEffect(() => {
    const { visible } = props;
    if (!visible) {
      beginDrag = false;
    }
  }, [props.visible]);

  const {
    // setFormRef,
    form,
    children,
    wrapClassName,
    visible,
    draggable,
    onSubmit,
    formData,
    ...restProps
  } = props;
  const forceUpdate = FormBuilder.useForceUpdate();
  return (
    <>
      <AntdModal
        getContainer={false}
        {...restProps}
        onOk={onSubmit}
        destroyOnClose
        visible={visible}
        wrapClassName={classnames(
          wrapClassName,
          `sd-model-${randomId}`,
          draggable ? 'draggable-antd-modal-container' : ''
        )}
      >
        {formData ? (
          <Form
            // ref={setFormRef}
            form={form}
            preserve={false}
            // onFinish={onSubmit}
            onValuesChange={forceUpdate}
          >
            <FormBuilder meta={formData} form={form} />
          </Form>
        ) : (
          children
        )}
      </AntdModal>
    </>
  );
}

Modal.info = AntdModal.info;
Modal.success = AntdModal.success;
Modal.error = AntdModal.error;
Modal.warning = AntdModal.warning;
Modal.confirm = AntdModal.confirm;

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  wrapClassName: PropTypes.string,
  draggable: PropTypes.bool,
  visible: PropTypes.bool,
};

export default Modal;
