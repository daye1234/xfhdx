import React, { useState } from 'react';
import { notification, Button } from 'antd';
import { Link } from 'react-router-dom';
import style from './index.scss';

export interface Ilink {
  name?: string;
  link?: string; // #或空表示暂无功能
  outerLink?: string; // 外链，新的标签页
  search?: string;
  hash?: string;
  id?: string | number;
}
function LinkWithAuth({
  data,
  styles,
  selStyle = { color: '#3473E2' },
  className,
  children,
}: {
  data: Ilink;
  styles?: any;
  selStyle?: any;
  children?: any;
  className?: any;
}) {
  const [state, setstate] = useState(false);
  const sty = state ? { ...styles, ...selStyle } : { ...styles };
  const noLink = () => {
    notification.warning({ message: '功能正在开发中，请耐心等待...' });
  };
  let LinkDom;
  if (data.outerLink) {
    LinkDom = (
      <a
        style={{ ...sty }}
        className={className}
        href={data.outerLink}
        target="_blank"
      >
        {data.name || children}
      </a>
    );
  } else if (data.link === '#' || !data.link) {
    LinkDom = (
      <a style={{ ...sty }} className={className} onClick={noLink}>
        {data.name || children}
      </a>
    );
  } else if (data.link) {
    LinkDom = (
      <Link
        className={className}
        style={{ ...sty }}
        to={{ pathname: data.link, search: data.search, hash: data.hash }}
      >
        {data.name || children}
      </Link>
    );
  }

  return (
    <div onMouseMove={() => setstate(true)} onMouseOut={() => setstate(false)}>
      {LinkDom}
    </div>
  );
}

export default LinkWithAuth;
