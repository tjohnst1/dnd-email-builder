import React from 'react';
import EmailPreview from '../components/previewPanel/EmailPreview';
import MenuBar from './MenuBar';

const PreviewPanel = () => (
  <section className="preview-panel">
    <MenuBar />
    <EmailPreview />
  </section>
);

export default PreviewPanel;
