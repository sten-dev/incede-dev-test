import React from 'react';
import '../index.scss';
import LayoutBody from './LayoutBody';
import MetaData from './MetaData';

const Layout = ({ children, page, pageTitle }) => {
  console.log('pageTitle', pageTitle);

  return (
    <div>
      <MetaData pageTitle={pageTitle} />
      <LayoutBody page={page}>{children}</LayoutBody>
    </div>
  );
};

export default Layout;
