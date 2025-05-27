import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Plus, Users, FolderOpen, Clock, BarChart3, User, Target, Play, Square, Timer } from 'lucide-react';
// Hauptkomponente mit Hash Router
const AccessForAllProjectApp = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

// App Content mit globalem State
const AppContent = () => {
  const [activeTimer, setActiveTimer] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [showZeiteintragModal, setShowZeiteintragModal] = useState(false);
  const [neuerZeiteintrag, setNeuerZeiteintrag] = useState({
    projektId: '',
    mitarbeiterId: '',
    dauer: '',
    datum: new Date().toISOString().split('T')[0],
    verrechenbar: true,
    aktivität: '',
    notizen: ''
  });

  // Beispieldaten - echte Teammitglieder von Access for All
  const teammitglieder = [
    { 
      id: 1, 
      name: 'Markus Böni', 
      email: 'markus.boeni@access-for-all.ch', 
      rolle: 'Geschäftsführer',
      fähigkeiten: ['Projektmanagement', 'Inklusion', 'Barrierefreiheit', 'Networking'],
      aktiv: true,
      stundenSoll: 40,
      stundenIst: 38.5
    },
    { 
      id: 2, 
      name: 'Andreas Uebelbacher', 
      email: 'andreas.uebelbacher@access-for-all.ch', 
      rolle: 'Leiter Dienstleistungen',
      fähigkeiten: ['Usability/UX', 'Accessibility Consulting', 'Projektintegration'],
      aktiv: true,
      stundenSoll: 40,
      stundenIst: 42.0
    },
    { 
      id: 3, 
      name: 'Philipp Keller', 
      email: 'philipp.keller@access-for-all.ch', 
      rolle: 'Head of Technology & Innovation',
      fähigkeiten: ['Software Development', 'Assistive Technology', 'Innovation'],
      aktiv: true,
      stundenSoll: 40,
      stundenIst: 35.5
    },
    { 
      id: 4, 
      name: 'Josua Muheim', 
      email: 'josua.muheim@access-for-all.ch', 
      rolle: 'Accessibility Consultant',
      fähigkeiten: ['Application Development', 'Training', 'Accessible Software'],
      aktiv: true,
      stundenSoll: 40,
      stundenIst: 40.0
    },
    { 
      id: 5, 
      name: 'Petra Ritter', 
      email: 'petra.ritter@access-for-all.ch', 
      rolle: 'Accessibility Consultant (CPACC)',
      fähigkeiten: ['WCAG Auditing', 'Android Development', 'User Testing'],
      aktiv: true,
      stundenSoll: 30,
      stundenIst: 28.5
    },
    { 
      id: 6, 
      name: 'Mo Sherif', 
      email: 'mo.sherif@access-for-all.ch', 
      rolle: 'Accessibility Consultant',
      fähigkeiten: ['Screen Reader Testing', 'Blind User Experience', 'Legal Studies'],
      aktiv: true,
      stundenSoll: 25,
      stundenIst: 22.0
    },
    { 
      id: 7, 
      name: 'Thinh-Lay Wonesky', 
      email: 'thinh-lay.wonesky@access-for-all.ch', 
      rolle: 'Accessibility Consultant & Marketing',
      fähigkeiten: ['Web Accessibility', 'Communication', 'Remote Work'],
      aktiv: true,
      stundenSoll: 30,
      stundenIst: 32.0
    },
    { 
      id: 8, 
      name: 'Manu Heim', 
      email: 'manu.heim@access-for-all.ch', 
      rolle: 'Event Management (CPACC)',
      fähigkeiten: ['Event Management', 'Accessible Communication', 'Project Management'],
      aktiv: true,
      stundenSoll: 20,
      stundenIst: 18.5
    }
  ];

  const projekte = [
    {
      id: 1,
      name: 'SBB Accessibility Audit',
      kunde: 'SBB AG',
      status: 'in_bearbeitung',
      priorität: 'hoch',
      startdatum: '2025-01-15',
      enddatum: '2025-03-30',
      geschätztStunden: 120,
      istStunden: 45.5,
      budget: 24000,
      istKosten: 9100,
      team: [1, 2, 5],
      fortschritt: 38,
      beschreibung: 'Umfassende Barrierefreiheitsprüfung der SBB Website und Mobile App'
    },
    {
      id: 2,
      name: 'Migros Online Shop Optimierung',
      kunde: 'Migros',
      status: 'in_bearbeitung',
      priorität: 'mittel',
      startdatum: '2025-02-01',
      enddatum: '2025-04-15',
      geschätztStunden: 80,
      istStunden: 12.0,
      budget: 16000,
      istKosten: 2400,
      team: [2, 4],
      fortschritt: 15,
      beschreibung: 'Verbesserung der Barrierefreiheit im Online-Shop'
    },
    {
      id: 3,
      name: 'Zurich Versicherung Schulung',
      kunde: 'Zurich Versicherung',
      status: 'abgeschlossen',
      priorität: 'niedrig',
      startdatum: '2024-11-01',
      enddatum: '2024-12-20',
      geschätztStunden: 40,
      istStunden: 38.5,
      budget: 8000,
      istKosten: 7700,
      team: [1, 6],
      fortschritt: 100,
      beschreibung: 'Schulung der Entwicklungsteams in WCAG 2.1'
    }
  ];

  const zeiteinträge = [
    { id: 1, projektId: 1, mitarbeiterId: 5, datum: '2025-01-26', stunden: 6.5, beschreibung: 'WCAG Audit - Navigation', typ: 'Audit', verrechenbar: true, notizen: 'Hauptnavigation getestet' },
    { id: 2, projektId: 1, mitarbeiterId: 4, datum: '2025-01-26', stunden: 4.0, beschreibung: 'Technische Implementierung Test', typ: 'Entwicklung', verrechenbar: true, notizen: 'Screen Reader Kompatibilität verbessert' },
    { id: 3, projektId: 2, mitarbeiterId: 2, datum: '2025-01-25', stunden: 3.5, beschreibung: 'UX Research - Nutzer mit Behinderungen', typ: 'Research', verrechenbar: true, notizen: 'Interviews mit 5 Testpersonen' },
    { id: 4, projektId: 1, mitarbeiterId: 6, datum: '2025-01-24', stunden: 5.0, beschreibung: 'Screen Reader Testing', typ: 'Testing', verrechenbar: true, notizen: 'JAWS und NVDA getestet' },
    { id: 5, projektId: 3, mitarbeiterId: 1, datum: '2025-01-23', stunden: 2.5, beschreibung: 'Projektleitung - Zurich Schulung', typ: 'Management', verrechenbar: false, notizen: 'Internes Koordinationsmeeting' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('de-CH', {
      style: 'currency',
      currency: 'CHF'
    }).format(amount);
  };

  const formatDatum = (datum) => {
    return new Date(datum).toLocaleDateString('de-CH');
  };

  const getTeamMitgliedName = (id) => {
    const mitglied = teammitglieder.find(t => t.id === id);
    return mitglied ? mitglied.name : 'Unbekannt';
  };

  const startTimer = (projektId) => {
    setActiveTimer(projektId);
    setTimerSeconds(0);
  };

  const stopTimer = () => {
    setActiveTimer(null);
    setTimerSeconds(0);
  };

  const handleZeiteintragSubmit = (e) => {
    e.preventDefault();
    
    const neuerEintrag = {
      id: zeiteinträge.length + 1,
      projektId: parseInt(neuerZeiteintrag.projektId),
      mitarbeiterId: parseInt(neuerZeiteintrag.mitarbeiterId),
      datum: neuerZeiteintrag.datum,
      stunden: parseFloat(neuerZeiteintrag.dauer),
      beschreibung: neuerZeiteintrag.aktivität,
      typ: getAktivitätTyp(neuerZeiteintrag.aktivität),
      verrechenbar: neuerZeiteintrag.verrechenbar,
      notizen: neuerZeiteintrag.notizen
    };

    console.log('Neuer Zeiteintrag:', neuerEintrag);
    alert('Zeiteintrag wurde erfolgreich gespeichert!');
    
    setShowZeiteintragModal(false);
    setNeuerZeiteintrag({
      projektId: '',
      mitarbeiterId: '',
      dauer: '',
      datum: new Date().toISOString().split('T')[0],
      verrechenbar: true,
      aktivität: '',
      notizen: ''
    });
  };

  const getAktivitätTyp = (aktivität) => {
    if (aktivität.toLowerCase().includes('audit')) return 'Audit';
    if (aktivität.toLowerCase().includes('entwicklung') || aktivität.toLowerCase().includes('programming')) return 'Entwicklung';
    if (aktivität.toLowerCase().includes('research') || aktivität.toLowerCase().includes('forschung')) return 'Research';
    if (aktivität.toLowerCase().includes('test')) return 'Testing';
    if (aktivität.toLowerCase().includes('management') || aktivität.toLowerCase().includes('leitung')) return 'Management';
    if (aktivität.toLowerCase().includes('beratung') || aktivität.toLowerCase().includes('consulting')) return 'Beratung';
    return 'Sonstiges';
  };

  // Timer Effect
  React.useEffect(() => {
    let interval;
    if (activeTimer) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTimer]);

  const props = {
    activeTimer, setActiveTimer,
    timerSeconds, setTimerSeconds,
    showZeiteintragModal, setShowZeiteintragModal,
    neuerZeiteintrag, setNeuerZeiteintrag,
    teammitglieder,
    projekte,
    zeiteinträge,
    formatCurrency,
    formatDatum,
    getTeamMitgliedName,
    startTimer,
    stopTimer,
    handleZeiteintragSubmit
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardView {...props} />} />
        <Route path="/projekte" element={<ProjekteView {...props} />} />
        <Route path="/pipeline" element={<PipelineView {...props} />} />
        <Route path="/team" element={<TeamView {...props} />} />
        <Route path="/zeiterfassung" element={<ZeiterfassungView {...props} />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
      <ZeiteintragModal {...props} />
    </div>
  );
};

// Navigation mit Hash Router Links
const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img 
              src="zfa-logo.png"
              alt="Access for All Logo" 
              className="h-8 w-auto"
            />
            <h1 className="text-xl font-semibold text-gray-900">
              <Link to="/dashboard" className="hover:text-blue-600">
                Projektverwaltung
              </Link>
            </h1>
          </div>
        </div>
        <div className="flex space-x-6">
          <Link
            to="/dashboard"
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
              isActive('/dashboard') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
            }`}
            aria-current={isActive('/dashboard') ? 'page' : undefined}
          >
            <BarChart3 size={16} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/projekte"
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
              isActive('/projekte') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
            }`}
            aria-current={isActive('/projekte') ? 'page' : undefined}
          >
            <FolderOpen size={16} />
            <span>Projekte</span>
          </Link>
          <Link
            to="/pipeline"
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
              isActive('/pipeline') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
            }`}
            aria-current={isActive('/pipeline') ? 'page' : undefined}
          >
            <Target size={16} />
            <span>Pipeline</span>
          </Link>
          <Link
            to="/team"
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
              isActive('/team') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
            }`}
            aria-current={isActive('/team') ? 'page' : undefined}
          >
            <Users size={16} />
            <span>Team</span>
          </Link>
          <Link
            to="/zeiterfassung"
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
              isActive('/zeiterfassung') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
            }`}
            aria-current={isActive('/zeiterfassung') ? 'page' : undefined}
          >
            <Clock size={16} />
            <span>Zeiterfassung</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Dashboard View
const DashboardView = (props) => {
  const { projekte, teammitglieder, formatCurrency } = props;
  
  React.useEffect(() => {
    document.title = 'Dashboard - Access for All Projektverwaltung';
  }, []);

  const gesamtBudget = projekte.reduce((sum, p) => sum + p.budget, 0);
  const gesamtKosten = projekte.reduce((sum, p) => sum + p.istKosten, 0);
  const gesamtStunden = projekte.reduce((sum, p) => sum + p.istStunden, 0);
  const aktiveProjekte = projekte.filter(p => p.status === 'in_bearbeitung').length;
  
  return (
    <main className="p-6" role="main">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-2xl font-bold text-blue-600">{aktiveProjekte}</div>
          <div className="text-sm text-gray-600">Aktive Projekte</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-2xl font-bold text-green-600">{formatCurrency(gesamtBudget)}</div>
          <div className="text-sm text-gray-600">Gesamt Budget</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-2xl font-bold text-orange-600">{gesamtStunden.toFixed(1)}h</div>
          <div className="text-sm text-gray-600">Erfasste Stunden</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-2xl font-bold text-gray-900">{Math.round((gesamtKosten / gesamtBudget) * 100)}%</div>
          <div className="text-sm text-gray-600">Budget Auslastung</div>
        </div>
      </div>

      {/* Aktuelle Projekte */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Aktuelle Projekte</h3>
        <div className="space-y-4">
          {projekte.filter(p => p.status === 'in_bearbeitung').map(projekt => (
            <div key={projekt.id} className="border border-gray-100 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{projekt.name}</h4>
                  <p className="text-sm text-gray-600">{projekt.kunde}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  projekt.priorität === 'hoch' ? 'bg-red-100 text-red-800' :
                  projekt.priorität === 'mittel' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {projekt.priorität}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Fortschritt</span>
                <span className="text-sm text-gray-600">{projekt.fortschritt}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${projekt.fortschritt}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{projekt.istStunden}h von {projekt.geschätztStunden}h</span>
                <span>Ende: {new Date(projekt.enddatum).toLocaleDateString('de-CH')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

// Projekte View
const ProjekteView = (props) => {
  const { projekte, formatCurrency, formatDatum, getTeamMitgliedName, activeTimer, startTimer, stopTimer } = props;
  
  React.useEffect(() => {
    document.title = 'Projekte - Access for All Projektverwaltung';
  }, []);
  
  return (
    <main className="p-6" role="main">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Projekte</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2">
          <Plus size={16} />
          <span>Neues Projekt</span>
        </button>
      </div>
      
      <div className="grid gap-4">
        {projekte.map(projekt => (
          <div key={projekt.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{projekt.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    projekt.status === 'in_bearbeitung' ? 'bg-blue-100 text-blue-800' :
                    projekt.status === 'abgeschlossen' ? 'bg-green-100 text-green-800' :
                    projekt.status === 'planung' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {projekt.status.replace('_', ' ')}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    projekt.priorität === 'hoch' ? 'bg-red-100 text-red-800' :
                    projekt.priorität === 'mittel' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {projekt.priorität}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2"><strong>Kunde:</strong> {projekt.kunde}</p>
                <p className="text-sm text-gray-600 mb-3">{projekt.beschreibung}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Zeitraum:</span>
                    <p className="font-medium">{formatDatum(projekt.startdatum)} - {formatDatum(projekt.enddatum)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Budget:</span>
                    <p className="font-medium">{formatCurrency(projekt.budget)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Stunden:</span>
                    <p className="font-medium">{projekt.istStunden}h / {projekt.geschätztStunden}h</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Team:</span>
                    <p className="font-medium">{projekt.team.map(id => getTeamMitgliedName(id)).join(', ')}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{projekt.fortschritt}%</div>
                  <div className="text-sm text-gray-500">Fortschritt</div>
                </div>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${projekt.fortschritt}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Kosten: {formatCurrency(projekt.istKosten)}</span>
                <span>•</span>
                <span>Budget-Auslastung: {Math.round((projekt.istKosten / projekt.budget) * 100)}%</span>
              </div>
              <div className="flex space-x-2">
                {activeTimer === projekt.id ? (
                  <button
                    onClick={stopTimer}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 flex items-center space-x-1"
                  >
                    <Square size={12} />
                    <span>Stop</span>
                  </button>
                ) : (
                  <button
                    onClick={() => startTimer(projekt.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 flex items-center space-x-1"
                  >
                    <Play size={12} />
                    <span>Start</span>
                  </button>
                )}
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

// Pipeline View
const PipelineView = (props) => {
  const { projekte, formatCurrency, formatDatum, getTeamMitgliedName } = props;
  
  React.useEffect(() => {
    document.title = 'Pipeline - Access for All Projektverwaltung';
  }, []);

  const pipelineSpalten = [
    { id: 'angebot', titel: 'Angebot', projekte: projekte.filter(p => p.status === 'angebot') },
    { id: 'planung', titel: 'Planung', projekte: projekte.filter(p => p.status === 'planung') },
    { id: 'in_bearbeitung', titel: 'In Bearbeitung', projekte: projekte.filter(p => p.status === 'in_bearbeitung') },
    { id: 'review', titel: 'Review', projekte: projekte.filter(p => p.status === 'review') },
    { id: 'abgeschlossen', titel: 'Abgeschlossen', projekte: projekte.filter(p => p.status === 'abgeschlossen') }
  ];
  
  return (
    <main className="p-6" role="main">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Projekt Pipeline</h2>
        <div className="text-sm text-gray-600">
          Gesamt: {projekte.length} Projekte
        </div>
      </div>
      
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {pipelineSpalten.map(spalte => (
          <div key={spalte.id} className="flex-shrink-0 w-80">
            <div className={`rounded-lg p-4 ${
              spalte.id === 'abgeschlossen' ? 'bg-green-50 border border-green-200' :
              spalte.id === 'in_bearbeitung' ? 'bg-blue-50 border border-blue-200' :
              spalte.id === 'review' ? 'bg-purple-50 border border-purple-200' :
              'bg-gray-100'
            }`}>
              <h3 className={`font-semibold mb-4 flex items-center justify-between ${
                spalte.id === 'abgeschlossen' ? 'text-green-900' :
                spalte.id === 'in_bearbeitung' ? 'text-blue-900' :
                spalte.id === 'review' ? 'text-purple-900' :
                'text-gray-900'
              }`}>
                {spalte.titel}
                <span className={`text-white text-xs px-2 py-1 rounded-full ${
                  spalte.id === 'abgeschlossen' ? 'bg-green-600' :
                  spalte.id === 'in_bearbeitung' ? 'bg-blue-600' :
                  spalte.id === 'review' ? 'bg-purple-600' :
                  'bg-gray-600'
                }`}>
                  {spalte.projekte.length}
                </span>
              </h3>
              <div className="space-y-3">
                {spalte.projekte.map(projekt => (
                  <div key={projekt.id} className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{projekt.name}</h4>
                      <span className={`px-1 py-0.5 rounded text-xs font-medium ${
                        projekt.priorität === 'hoch' ? 'bg-red-100 text-red-800' :
                        projekt.priorität === 'mittel' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {projekt.priorität}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">{projekt.kunde}</div>
                    <div className="text-xs text-gray-500 mb-3">
                      {projekt.istStunden}h / {projekt.geschätztStunden}h
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full" 
                        style={{ width: `${projekt.fortschritt}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">{formatCurrency(projekt.budget)}</span>
                      <span className="text-gray-500">{formatDatum(projekt.enddatum)}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {projekt.team.slice(0, 2).map(mitarbeiterId => (
                        <span key={mitarbeiterId} className="inline-block bg-blue-100 text-blue-800 text-xs px-1 py-0.5 rounded">
                          {getTeamMitgliedName(mitarbeiterId).split(' ')[0]}
                        </span>
                      ))}
                      {projekt.team.length > 2 && (
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-1 py-0.5 rounded">
                          +{projekt.team.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                <button className="w-full border-2 border-dashed border-gray-300 rounded-md p-3 text-gray-500 hover:border-gray-400 hover:text-gray-600 text-sm">
                  + Projekt hinzufügen
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

// Team View
const TeamView = (props) => {
  const { teammitglieder } = props;
  
  React.useEffect(() => {
    document.title = 'Team - Access for All Projektverwaltung';
  }, []);
  
  return (
    <main className="p-6" role="main">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2">
          <Plus size={16} />
          <span>Teammitglied hinzufügen</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teammitglieder.map(mitglied => (
          <div key={mitglied.id} className={`bg-white border rounded-lg p-6 ${
            mitglied.aktiv ? 'border-gray-200' : 'border-gray-100 opacity-75'
          }`}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{mitglied.name}</h3>
                <p className="text-sm text-gray-600">{mitglied.rolle}</p>
                <p className="text-xs text-gray-500">{mitglied.email}</p>
              </div>
              <div className="ml-auto">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  mitglied.aktiv ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {mitglied.aktiv ? 'Aktiv' : 'Inaktiv'}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Wochenauslastung</span>
                <span className="text-sm text-gray-600">
                  {mitglied.stundenIst}h / {mitglied.stundenSoll}h
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    (mitglied.stundenIst / mitglied.stundenSoll) > 1 ? 'bg-red-600' :
                    (mitglied.stundenIst / mitglied.stundenSoll) > 0.8 ? 'bg-yellow-600' :
                    'bg-green-600'
                  }`}
                  style={{ width: `${Math.min((mitglied.stundenIst / mitglied.stundenSoll) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Fähigkeiten</h4>
              <div className="flex flex-wrap gap-1">
                {mitglied.fähigkeiten.map(fähigkeit => (
                  <span key={fähigkeit} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {fähigkeit}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 text-blue-600 hover:text-blue-800 text-sm font-medium">
                Bearbeiten
              </button>
              <button className="flex-1 text-blue-600 hover:text-blue-800 text-sm font-medium">
                Projekte
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

// Zeiterfassung View
const ZeiterfassungView = (props) => {
  const {
    activeTimer, setActiveTimer,
    timerSeconds, setTimerSeconds,
    showZeiteintragModal, setShowZeiteintragModal,
    teammitglieder,
    projekte,
    zeiteinträge,
    formatDatum,
    getTeamMitgliedName,
    startTimer,
    stopTimer
  } = props;

  React.useEffect(() => {
    document.title = 'Zeiterfassung - Access for All Projektverwaltung';
  }, []);

  return (
    <main className="p-6" role="main">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Zeiterfassung</h2>
        <div className="flex items-center space-x-4">
          {activeTimer && (
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-md flex items-center space-x-2" role="status" aria-live="polite">
              <Timer size={16} />
              <span>Timer läuft: {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}</span>
            </div>
          )}
          <button 
            onClick={() => setShowZeiteintragModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus size={16} />
            <span>Zeiteintrag hinzufügen</span>
          </button>
        </div>
      </div>
      
      {/* Schnell-Timer für aktive Projekte */}
      <section className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Schnell-Timer</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projekte.filter(p => p.status === 'in_bearbeitung').map(projekt => (
            <div key={projekt.id} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-1">{projekt.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{projekt.kunde}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{projekt.istStunden}h erfasst</span>
                {activeTimer === projekt.id ? (
                  <button
                    onClick={stopTimer}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 flex items-center space-x-1"
                  >
                    <Square size={12} />
                    <span>Stop</span>
                  </button>
                ) : (
                  <button
                    onClick={() => startTimer(projekt.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 flex items-center space-x-1"
                  >
                    <Play size={12} />
                    <span>Start</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Zeiteinträge Tabelle */}
      <section className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Aktuelle Zeiteinträge</h3>
          <p className="text-sm text-gray-600 mt-1">
            {zeiteinträge.length} Einträge insgesamt
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Datum</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projekt</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mitarbeiter</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stunden</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Typ</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beschreibung/Notizen</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {zeiteinträge.slice().reverse().map(eintrag => {
                const projekt = projekte.find(p => p.id === eintrag.projektId);
                const mitarbeiter = teammitglieder.find(m => m.id === eintrag.mitarbeiterId);
                return (
                  <tr key={eintrag.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <time dateTime={eintrag.datum}>{formatDatum(eintrag.datum)}</time>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{projekt?.name}</div>
                        <div className="text-sm text-gray-500">{projekt?.kunde}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {mitarbeiter?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {eintrag.stunden}h
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        eintrag.typ === 'Entwicklung' ? 'bg-blue-100 text-blue-800' :
                        eintrag.typ === 'Audit' ? 'bg-purple-100 text-purple-800' :
                        eintrag.typ === 'Research' ? 'bg-green-100 text-green-800' :
                        eintrag.typ === 'Testing' ? 'bg-orange-100 text-orange-800' :
                        eintrag.typ === 'Management' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {eintrag.typ}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="max-w-xs truncate" title={eintrag.beschreibung}>
                        {eintrag.beschreibung}
                      </div>
                      {eintrag.notizen && (
                        <div className="text-xs text-gray-500 mt-1" title={eintrag.notizen}>
                          {eintrag.notizen}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {eintrag.verrechenbar && (
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full" title="Verrechenbar" aria-label="Verrechenbar an Kunde"></span>
                        )}
                        <button className="text-blue-600 hover:text-blue-900 mr-3 focus:outline-none focus:underline">
                          Bearbeiten
                        </button>
                        <button className="text-red-600 hover:text-red-900 focus:outline-none focus:underline">
                          Löschen
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

// 404 View
const NotFoundView = () => {
  React.useEffect(() => {
    document.title = 'Seite nicht gefunden - Access for All Projektverwaltung';
  }, []);
  
  return (
    <main className="p-6" role="main">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Seite nicht gefunden</h2>
        <p className="text-gray-600 mb-4">Die angeforderte Seite konnte nicht gefunden werden.</p>
        <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 underline">
          Zurück zum Dashboard
        </Link>
      </div>
    </main>
  );
};

// Modal für Zeiteintrag hinzufügen
const ZeiteintragModal = (props) => {
  const {
    showZeiteintragModal, setShowZeiteintragModal,
    neuerZeiteintrag, setNeuerZeiteintrag,
    teammitglieder, projekte,
    handleZeiteintragSubmit
  } = props;
  
  if (!showZeiteintragModal) return null;
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" role="dialog" aria-modal="true">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Zeiteintrag hinzufügen</h3>
            <button
              onClick={() => setShowZeiteintragModal(false)}
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Modal schließen"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleZeiteintragSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Projekt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Projekt *
                </label>
                <select
                  value={neuerZeiteintrag.projektId}
                  onChange={(e) => setNeuerZeiteintrag({...neuerZeiteintrag, projektId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Projekt auswählen...</option>
                  {projekte.map(projekt => (
                    <option key={projekt.id} value={projekt.id}>
                      {projekt.name} ({projekt.kunde})
                    </option>
                  ))}
                </select>
              </div>

              {/* Mitarbeiter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mitarbeiter *
                </label>
                <select
                  value={neuerZeiteintrag.mitarbeiterId}
                  onChange={(e) => setNeuerZeiteintrag({...neuerZeiteintrag, mitarbeiterId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Mitarbeiter auswählen...</option>
                  {teammitglieder.filter(m => m.aktiv).map(mitarbeiter => (
                    <option key={mitarbeiter.id} value={mitarbeiter.id}>
                      {mitarbeiter.name} ({mitarbeiter.rolle})
                    </option>
                  ))}
                </select>
              </div>

              {/* Datum */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Datum *
                </label>
                <input
                  type="date"
                  value={neuerZeiteintrag.datum}
                  onChange={(e) => setNeuerZeiteintrag({...neuerZeiteintrag, datum: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Dauer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dauer (Stunden) *
                </label>
                <input
                  type="number"
                  step="0.25"
                  min="0.25"
                  max="24"
                  value={neuerZeiteintrag.dauer}
                  onChange={(e) => setNeuerZeiteintrag({...neuerZeiteintrag, dauer: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="z.B. 2.5"
                  required
                />
              </div>
            </div>

            {/* Aktivität */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Aktivität/Beschreibung *
              </label>
              <input
                type="text"
                value={neuerZeiteintrag.aktivität}
                onChange={(e) => setNeuerZeiteintrag({...neuerZeiteintrag, aktivität: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="z.B. WCAG Audit - Formular-Validierung"
                required
              />
            </div>

            {/* Verrechenbar */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="verrechenbar"
                checked={neuerZeiteintrag.verrechenbar}
                onChange={(e) => setNeuerZeiteintrag({...neuerZeiteintrag, verrechenbar: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="verrechenbar" className="ml-2 block text-sm text-gray-700">
                Verrechenbar an Kunde
              </label>
            </div>

            {/* Notizen */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notizen (optional)
              </label>
              <textarea
                value={neuerZeiteintrag.notizen}
                onChange={(e) => setNeuerZeiteintrag({...neuerZeiteintrag, notizen: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Zusätzliche Informationen zum Arbeitsschritt..."
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowZeiteintragModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                Zeiteintrag speichern
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccessForAllProjectApp;
