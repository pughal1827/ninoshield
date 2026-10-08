import React, { useState } from 'react';
import { NinoShieldProvider, useNinoShield } from './context/NinoShieldContext';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import LandingHero from './components/Landing/LandingHero';
import ThreeLevelsPage from './components/Landing/ThreeLevelsPage';
import PeopleDashboard from './components/Citizen/PeopleDashboard';
import CommunityDashboard from './components/Citizen/CommunityDashboard';
import CommunityLogin from './components/Community/CommunityLogin';
import CommunityRegister from './components/Community/CommunityRegister';
import CommunityLocationSetup from './components/Community/CommunityLocationSetup';
import DecisionMakerDashboard from './components/Authority/DecisionMakerDashboard';
import DecisionMakerLogin from './components/Authority/DecisionMakerLogin';
import DecisionMakerRegister from './components/Authority/DecisionMakerRegister';
import DecisionMakerRegionSetup from './components/Authority/DecisionMakerRegionSetup';
import CommandCenter from './components/Dashboard/CommandCenter';
import RiskMap from './components/Dashboard/RiskMap';
import LocationProfile from './components/RiskAnalysis/LocationProfile';
import WhatIfSimulator from './components/Simulator/WhatIfSimulator';
import AIAnalystPanel from './components/AI/AIAnalystPanel';
import AuthorityActionCenter from './components/Authority/AuthorityActionCenter';
import CitizenView from './components/Citizen/CitizenView';
import EarlyWarningModal from './components/AI/EarlyWarningModal';
import ResponsePlanModal from './components/Authority/ResponsePlanModal';
import AboutModal from './components/About/AboutModal';
import GuidedDemoBanner from './components/Demo/GuidedDemoBanner';
import { calculateRiskScore } from './data/climateData';

function AppContent() {
  const { 
    currentRoute, 
    navigate, 
    selectedLocation, 
    changeLocation, 
    communityAuth, 
    communityLocationConfirmed,
    decisionMakerAuth,
    decisionMakerRegionConfirmed
  } = useNinoShield();
  
  const [activeNav, setActiveNav] = useState('home'); 
  const [activeView, setActiveView] = useState('dashboard');
  const [isCitizenMode, setIsCitizenMode] = useState(false);

  // Modals
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showResponsePlanModal, setShowResponsePlanModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showDemoBanner, setShowDemoBanner] = useState(false);

  // Dynamic simulation overrides
  const [customIndicators, setCustomIndicators] = useState(null);

  const activeIndicators = customIndicators || {
    temperatureRisk: selectedLocation.temperatureRisk,
    rainfallRisk: selectedLocation.rainfallRisk,
    waterStress: selectedLocation.waterStress,
    elNinoStatus: selectedLocation.elNinoStatus,
    vulnerability: selectedLocation.vulnerability,
  };

  const calculatedScore = calculateRiskScore(activeIndicators);

  // Route matching
  const isLandingPage = currentRoute === '/' || currentRoute === '';
  const isPeopleRoute = currentRoute.startsWith('/people');
  const isCommunityRoute = currentRoute.startsWith('/community');
  const isDecisionMakerRoute = currentRoute.startsWith('/decision-maker');
  const isThreeLevelsRoute = currentRoute === '/three-levels';
  const isDashboardRoute = currentRoute === '/dashboard';

  const handleNavigate = (targetId) => {
    setActiveNav(targetId);
    if (targetId === 'home') {
      navigate('/');
    } else if (targetId === 'features') {
      navigate('/three-levels');
    } else if (targetId === 'about') {
      setShowAboutModal(true);
    } else {
      navigate('/dashboard');
      if (targetId === 'how-it-works') setActiveView('risk-analysis');
      if (targetId === 'impact') setActiveView('ai-analyst');
    }
  };

  const handleViewLocationProfile = (loc) => {
    changeLocation(loc.id);
    navigate('/dashboard');
    setActiveView('risk-analysis');
  };

  const handleSimulationUpdate = (newScore, newIndicators) => {
    setCustomIndicators(newIndicators);
  };

  return (
    <div className="min-h-screen bg-[#F8FBFF] text-[#0B1736] flex flex-col font-sans selection:bg-[#1769FF] selection:text-white">
      
      {/* 2-Min Pitch Walkthrough Banner for Hackathon Demo */}
      {showDemoBanner && (
        <GuidedDemoBanner
          onClose={() => setShowDemoBanner(false)}
          setActiveView={(v) => {
            navigate('/dashboard');
            setActiveView(v);
          }}
          setSelectedLocation={(loc) => changeLocation(loc.id)}
          SAMPLE_LOCATIONS={[selectedLocation]}
          onGenerateWarning={() => setShowWarningModal(true)}
          onActivateResponsePlan={() => setShowResponsePlanModal(true)}
        />
      )}

      {/* Conditional Header: DO NOT show Navbar on Landing Page or Portal Routes */}
      {(!isLandingPage && !isPeopleRoute && !isCommunityRoute && !isDecisionMakerRoute) && (
        <Navbar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          onNavigate={handleNavigate}
          onGetStarted={() => navigate('/people')}
        />
      )}

      {/* Page Routing */}
      {isLandingPage && (
        <LandingHero
          onExplore={() => navigate('/three-levels')}
          onWatchDemo={() => setShowDemoBanner(true)}
          onGetStarted={() => navigate('/people')}
        />
      )}

      {isThreeLevelsRoute && (
        <ThreeLevelsPage
          onExplorePerson={() => navigate('/people')}
          onExploreCommunity={() => navigate('/community')}
          onExploreDecisionMaker={() => navigate('/decision-maker')}
        />
      )}

      {isPeopleRoute && (
        <PeopleDashboard
          onNavigateLanding={() => navigate('/')}
        />
      )}

      {/* PROTECTED COMMUNITY PORTAL ROUTING */}
      {isCommunityRoute && (
        !communityAuth ? (
          currentRoute === '/community/register' ? (
            <CommunityRegister />
          ) : (
            <CommunityLogin />
          )
        ) : !communityLocationConfirmed ? (
          <CommunityLocationSetup />
        ) : (
          <CommunityDashboard
            onNavigateLanding={() => navigate('/')}
          />
        )
      )}

      {/* PROTECTED DECISION-MAKER PORTAL ROUTING */}
      {isDecisionMakerRoute && (
        !decisionMakerAuth ? (
          currentRoute === '/decision-maker/register' ? (
            <DecisionMakerRegister />
          ) : (
            <DecisionMakerLogin />
          )
        ) : !decisionMakerRegionConfirmed ? (
          <DecisionMakerRegionSetup />
        ) : (
          <DecisionMakerDashboard
            onNavigateLanding={() => navigate('/')}
          />
        )
      )}

      {isDashboardRoute && (
        <div className="flex-1 flex overflow-hidden max-w-7xl w-full mx-auto">
          
          <Sidebar
            activeView={activeView}
            setActiveView={(view) => {
              setActiveView(view);
            }}
            isCitizenMode={isCitizenMode}
          />

          <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
            
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={() => navigate('/three-levels')}
                className="text-xs font-semibold text-[#1769FF] hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <span>← Back to Three Levels Overview</span>
              </button>

              <button
                onClick={() => setIsCitizenMode(!isCitizenMode)}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-[#1769FF] border border-blue-200 cursor-pointer"
              >
                {isCitizenMode ? 'Switch to Authority View' : 'Switch to Citizen View'}
              </button>
            </div>

            {isCitizenMode ? (
              <CitizenView
                selectedLocation={selectedLocation}
                setSelectedLocation={(loc) => changeLocation(loc.id)}
              />
            ) : (
              <>
                {activeView === 'dashboard' && (
                  <CommandCenter
                    selectedLocation={selectedLocation}
                    setSelectedLocation={(loc) => changeLocation(loc.id)}
                    calculatedRiskScore={calculatedScore}
                    onGenerateWarning={() => setShowWarningModal(true)}
                    onActivateResponsePlan={() => setShowResponsePlanModal(true)}
                    onLaunchSimulator={() => setActiveView('simulator')}
                    onViewLocationProfile={handleViewLocationProfile}
                    setActiveView={setActiveView}
                  />
                )}

                {activeView === 'risk-map' && (
                  <div className="space-y-6">
                    <RiskMap
                      selectedLocation={selectedLocation}
                      setSelectedLocation={(loc) => changeLocation(loc.id)}
                      onViewLocationProfile={handleViewLocationProfile}
                    />
                    <LocationProfile location={selectedLocation} />
                  </div>
                )}

                {activeView === 'risk-analysis' && (
                  <LocationProfile location={selectedLocation} />
                )}

                {activeView === 'simulator' && (
                  <WhatIfSimulator
                    selectedLocation={selectedLocation}
                    onSimulationUpdate={handleSimulationUpdate}
                  />
                )}

                {activeView === 'ai-analyst' && (
                  <AIAnalystPanel
                    selectedLocation={selectedLocation}
                    onGenerateWarning={() => setShowWarningModal(true)}
                    onActivateResponsePlan={() => setShowResponsePlanModal(true)}
                  />
                )}

                {activeView === 'authority' && (
                  <AuthorityActionCenter
                    selectedLocation={selectedLocation}
                    onActivateResponsePlan={() => setShowResponsePlanModal(true)}
                    onGenerateWarning={() => setShowWarningModal(true)}
                  />
                )}
              </>
            )}

          </main>
        </div>
      )}

      {/* Global Interactive Modals */}
      {showWarningModal && (
        <EarlyWarningModal
          selectedLocation={selectedLocation}
          onClose={() => setShowWarningModal(false)}
        />
      )}

      {showResponsePlanModal && (
        <ResponsePlanModal
          selectedLocation={selectedLocation}
          onClose={() => setShowResponsePlanModal(false)}
        />
      )}

      {showAboutModal && (
        <AboutModal
          onClose={() => setShowAboutModal(false)}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <NinoShieldProvider>
      <AppContent />
    </NinoShieldProvider>
  );
}
