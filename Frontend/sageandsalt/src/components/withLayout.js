import React from 'react';
import Layout from './Layout'; // Import the Layout component we created earlier

// Higher-Order Component to wrap pages with the layout
export const withLayout = (WrappedComponent) => {
  return (props) => {
    return (
      <Layout>
        <WrappedComponent {...props} />
      </Layout>
    );
  };
};