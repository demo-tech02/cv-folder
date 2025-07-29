/**
 * Application Router
 * Centralized routing configuration
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants';

// Route Components
import HomePage from './HomePage';
import OrderPage from './OrderPage';
import PreviewPage from './PreviewPage';
import CoverLetterPreviewPage from './CoverLetterPreviewPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.ORDER} element={<OrderPage />} />
        <Route path={ROUTES.PREVIEW} element={<PreviewPage />} />
        <Route path={ROUTES.COVER_LETTER_PREVIEW} element={<CoverLetterPreviewPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;