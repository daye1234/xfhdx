import React, {useState,useEffect} from 'react';
import { Layout } from 'antd';
import { observer } from 'mobx-react';
import { renderRoutes } from '@utils/router.config';
import * as styles from './index.scss';
import { SdHeader, Footer } from './../components';
import { useStores } from '@utils/index';
import { useLocation } from 'react-router';
const { Content } = Layout;

interface IProps {
  route: any;
  rootStore: any;
}

function BaseLayout(props: IProps) {
  const routes = props.route.routes;
  const location =useLocation()
  console.log(location)
  const rootStore = useStores('rootStore');
 
  const [hideFooter,setHideFooter]= useState(true)
  const [hideHeader,setHideHideHeader]= useState(true)

  useEffect(()=>{
    if(location.pathname=='/login'||location.pathname=='/register'){
      setHideFooter(false)
    }else{
      setHideFooter(true)
    }
  },[])
  useEffect(()=>{
   
    if(location.pathname.indexOf('/nationalDetail')!=-1){
      setHideHideHeader(false)
    }else{
      setHideHideHeader(true)
    }
  },[location.pathname])
  return (
    <Layout className={styles.sdBaseLayout}>
      <Layout className="site-layout">
     {hideHeader?<SdHeader />:''}    
        <Content>
          {/* <Breadcrumb /> */}
          <div
            className={styles.siteLayoutBackground}
            style={{ minHeight: 500 }}
          >
            {renderRoutes(routes)}
          </div>
        </Content>

       {hideFooter?<Footer />:<></>} 
      </Layout>
    </Layout>
  );
}
export default observer(BaseLayout);
