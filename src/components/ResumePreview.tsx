import React from 'react';
import type { Resume } from '../types/resume';
import MinimalistTemplate from './templates/MinimalistTemplate';
import ModernTemplate from './templates/ModernTemplate';
import PrintableResume from './PrintableResume';

interface ResumePreviewProps {
  resume: Resume;
  template: string;
  isPrintMode?: boolean;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resume, template, isPrintMode = false }) => {
  if (isPrintMode) {
    return <PrintableResume resume={resume} />;
  }

  switch (template) {
    case 'minimalist':
      return <MinimalistTemplate resume={resume} />;
    case 'modern':
      return <ModernTemplate resume={resume} />;
    default:
      return <MinimalistTemplate resume={resume} />;
  }
};

export default ResumePreview;
