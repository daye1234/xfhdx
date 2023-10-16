/*
 * Created: 2020-08-21 10:02:15
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description: 更多操作组件
 */
import { IDropdownProps } from './types';
import { Menu, Dropdown, Button } from 'antd';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';
import React from 'react';

export default function TableDropdown(props: IDropdownProps) {
  const menu = (
    <Menu>
      {props.data.map((child, index) => {
        const onClick = () => {
          child.action && child.action();
        };
        return (
          <Menu.Item
            disabled={child.disable}
            key={index}
            icon={child.icon && child.icon}
            onClick={onClick}
          >
            {child.label}
          </Menu.Item>
        );
      })}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button icon={<MenuOutlined />}>
        更多操作 <DownOutlined />
      </Button>
    </Dropdown>
  );
}
