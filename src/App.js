import React from 'react';
import Layout from './hoc/Layout/Layout';

function App() {
  return (
    <Layout>
      <div style={{ width: '400px', border: '5px solid #ccc' }}>
        <h1>Hello Layout</h1>
      </div>
    </Layout>
  );
}

export default App;
