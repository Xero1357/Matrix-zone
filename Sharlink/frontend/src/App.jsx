import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Homepage from './pages/Homepage';
import LinkPage from './pages/LinkPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import OneCollectionPage from './pages/OneCollectionPage';
import CollectionsPage from './pages/CollectionsPage';
import AddLinkForm from './components/collection/AddLinkForm';
import EditLinkForm from './components/collection/EditLinkForm';
import AISearch from './pages/AISearch';
import CreateMyCollection from './pages/CreateNewCollection';
import EditCollectionPage from './pages/EditCollectionPage';

import NotFound from './pages/NotFound';

import './App.css';

function App() {
  return (
    <Router>
      <div className='d-flex flex-column min-vh-100'>
        <Header />
        <main className='flex-grow-1 d-flex flex-column'>
          <Container fluid='md' className='py-4'>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/link/:linkId' element={<LinkPage />} />

              {/* SignUp and LogIn*/}
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/login' element={<LoginPage />} />

              {/* Link operations */}
              <Route
                path='/collection/:collectionId/add-link'
                element={<AddLinkForm />}
              />
              <Route
                path='/collection/add-link'
                element={<AddLinkForm />}
              />
              <Route path='/link/:linkId/edit' element={<EditLinkForm />} />
              {/* ai-search */}
              <Route path='/ai-search' element={<AISearch />} />

              {/* Profile and Collections */}
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/collection' element={<CollectionsPage />} />
              <Route
                path='/collection/:collectionId'
                element={<OneCollectionPage />}
              />
              <Route path='/collections/new' element={<CreateMyCollection />} />
              <Route
                path='/collection/:collectionId/edit'
                element={<EditCollectionPage />}
              />

              {/* 404 Page */}
              <Route path='/*' element={<NotFound />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
