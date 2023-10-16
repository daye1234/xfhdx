import * as React from 'react';
// import { useTranslation } from 'react-i18next';
import { Layout, Button, Dropdown, Menu, BackTop } from 'antd';
// import { QuestionCircleOutlined, UserOutlined } from '@ant-design/icons'
// import { useTranslation } from 'react-i18next'
// import { toJS } from 'mobx'
import { ArrowUpOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import * as styles from './index.scss';
import { useStores } from '@utils/index';
import Link, { Ilink } from '@components/Link';
import logo from '@assets/images/logo.png';
const { Sider } = Layout;
import headerBg from '@assets/images/index/logo_3.png';
import { INavBar, IMenu } from '@store/rootStore/type';
import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames';
import classnames from 'classnames';
const { SubMenu } = Menu;
const { Header } = Layout;
const userinfo: any = window['userinfo'];

const RenderMenu = () => {
  const handlerClickTo = () => {
    location.href = `/logout?referer=${location.pathname}`;
  };
  return (
    <Menu>
      <Menu.Item>
        <Link
          data={{ link: '/userpanel' }}
          styles={{ display: 'block', padding: '10px 20px' }}
        >
          个人信息
        </Link>
      </Menu.Item>
      <Menu.Item danger>
        <div className={styles.logoutBtn} onClick={handlerClickTo}>
          退出登录
        </div>
      </Menu.Item>
    </Menu>
  );
};
function Logo({ navList }: any) {
  const filePath = window['globalConfig']['filePath'];

  const defaultImg = userinfo.avatar
    ? `${filePath}${userinfo.avatar}`
    : '/assets/images/userlogo.png';
  const [top_url, setTopUrl] = useState(defaultImg);

  // const { t, i18n } = useTranslation('header');
  const bgStyles = {
    background: `url('${headerBg}') no-repeat left top/345px 120px`,
  };
  const [top, settop] = useState(0);
  // 可视高度+滚动条到顶部高度
  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    // const clientHeight = document.documentElement.clientHeight;
    // return ;
    settop(scrollTop);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handlerClickTo = () => {
    location.href = `/login?referer=${location.pathname}`;
  };
  return (
    <div
      aos-easing="ease-out-back"
      aos-duration="1000"
      aos-delay="0"
      className={classnames(styles.headTop, top > 0 ? styles.topVariety : '')}
    >
      <Link data={{ link: '/' }}>
        <div className={styles.logo}>
          <img src={headerBg} alt="logo" />
        </div>
      </Link>

      <Navbar navList={navList} />
      {userinfo && userinfo.token ? (
        <Dropdown overlay={RenderMenu()}>
          <div className={styles.userInfo}>
            <img className={styles.avatar} src={top_url} alt="" />
            <p title={userinfo.username} className={styles.info}>
              {userinfo.username}
            </p>
            {/* <img className={styles.msg} src={msg} alt="" /> */}
          </div>
        </Dropdown>
      ) : null}

      {!userinfo || !userinfo.token ? (
        <div className={styles.loginBtn}>
          <button onClick={() => handlerClickTo()}>登录 | 注册</button>
        </div>
      ) : null}
    </div>
  );
}

function Navbar({ navList }: any) {
  const navStyles = { fontSize: 14, color: '#fff' };
  return (
    <Menu mode="horizontal" selectable={false} className={styles.navBar}
      builtinPlacements={
        {
          bottomLeft:
          {
            points: ['tc', 'bc'], // 子菜单的 "上中" 和 对应菜单的title "下中" 对齐。
            overflow: {
              adjustX: 1,
              adjustY: 1
            },
            offset: [0, 5]
          }
        }
      }
    >
      {navList.map((el: INavBar, index: number) => {
        if (el.menu) {
          return (
            <SubMenu title={el.name} key={index} className={styles.item}>
              {/* {el.menu.length > 0 && */}
              {el.menu.map((item: IMenu, i: number) => (
                <Menu.ItemGroup title={item.name} key={index + '_' + i}>
                  {item.list.map((data: Ilink, dindex: number) => (
                    <Menu.Item key={index + '_' + i + '_' + dindex}>
                      <Link data={{ ...data }} styles={{ fontSize: 14 }} />
                    </Menu.Item>
                  ))}
                </Menu.ItemGroup>
              ))}
            </SubMenu>
          );
        } else {
          return (
            <Menu.Item key={index} className={styles.item}>
              <Link data={{ ...el }} styles={navStyles} />
            </Menu.Item>
          );
        }
      })}
    </Menu>
  );
}
function MobileNavbar({ navList }: any) {
  const [nav, setnav] = useState(-1);
  useEffect(() => {
    // 添加事件
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'),
      0
    );

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach((el) => {
        el.addEventListener('click', () => {
          event.stopPropagation();
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
          if ($target && $target.classList) {
            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
          }
        });
      });
    }

    document.addEventListener('click', (e) => {
      hideMobilePanel(e);
    });
  }, []);

  const hideMobilePanel = (e: any) => {
    const el = document.getElementsByClassName('navbar-burger')[0];
    const $target = document.getElementById('navbarBasicExample');
    if ($target && $target.classList) {
      $target.classList.remove('is-active');
      el.classList.remove('is-active');
    }
  };
  return (
    <nav
      style={{ position: 'relative', zIndex: 1001 }}
      className="navbar is-transparent is-mobile is-hidden-tablet"
    // role="navigation"
    // aria-label="main dropdown  navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={headerBg} alt="logo" />
        </a>
        <div className="navbar-burger" data-target="navbarBasicExample">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div
        id="navbarBasicExample"
        style={{ position: 'absolute', zIndex: 1001, width: '100%' }}
        className="navbar-menu"
        onClick={(e: any) => {
          e.nativeEvent.stopImmediatePropagation();
          if (e.target && e.target.href) {
            hideMobilePanel(e);
          }
        }}
      >
        <div className="navbar-start">
          {navList.map((el: INavBar, index: number) => {
            if (el.menu) {
              return (
                <Fragment key={index}>
                  <div
                    className={classNames(
                      'navbar-item',
                      index === nav
                        ? styles.sdIsNavbarLinkNotActive
                        : 'navbar-link'
                    )}
                    onClick={() => setnav(index)}
                  >
                    {el.name}
                  </div>
                  {index === nav &&
                    el.menu.map((item: IMenu, i: number) => (
                      <div
                        className="navbar-item has-dropdown"
                        key={index + '_' + i}
                      >
                        {item.name && (
                          <a
                            // style={{ color: '#9397A0', marginLeft: 4 }}
                            className={classNames('navbar-item')}
                          >
                            {item.name}
                          </a>
                        )}

                        <div className="navbar-dropdown">
                          {item.list.map((data: Ilink, dindex: number) => (
                            <a
                              key={index + '_' + i + '_' + dindex}
                              className="navbar-item"
                            >
                              <Link
                                data={{ ...data }}
                                styles={{
                                  fontSize: 14,
                                }}
                              />
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                </Fragment>
              );
            } else {
              return (
                <div
                  key={index}
                  style={{ lineHeight: 1.5, padding: '.5rem .75rem' }}
                >
                  <a href={el.link || el.outerLink}>{el.name}</a>
                </div>
              );
            }
          })}
        </div>
      </div>
    </nav>
  );
}
function SdHeader() {
  const rootStore = useStores('rootStore');
  const { navList } = rootStore;

  return (
    <Header
      className={styles.siteLayoutBackground}
      style={{
        // position: 'fixed',
        // zIndex: 1,
        // transition: 'all .2s',
        // width: 'calc(100%)',
        height: 'auto',
      }}
    >
      <BackTop>
        <ArrowUpOutlined className={styles.backTop} />
      </BackTop>
      <div className={'is-hidden-mobile'}>
        <Logo navList={navList} />
      </div>
      <MobileNavbar navList={navList} />
    </Header>
  );
}

export default observer(SdHeader);
