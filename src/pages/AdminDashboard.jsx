import React, { useState, useEffect } from 'react';
import { ADMIN_DASHBOARD_DATA, NUTRITIONISTS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export const AdminDashboard = ({ setActivePage }) => {
  const { user, userEmail, switchRole } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); // overview, users, nutritionists, consultations
  const [searchUser, setSearchUser] = useState('');
  const [dashboardData, setDashboardData] = useState(ADMIN_DASHBOARD_DATA);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/admin/dashboard', {
          headers: {
            'X-User-Email': userEmail
          }
        });
        if (res.ok) {
          const data = await res.json();
          setDashboardData(data);
        }
      } catch (err) {
        console.warn("Backend API not reachable for dashboard metrics, using mock data.", err);
      }
    };
    fetchDashboard();
  }, [userEmail]);

  const filteredUsers = dashboardData.usersList.filter(u =>
    u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.email.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.plan.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col lg:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full lg:w-64 bg-surface-container-lowest border-b-2 lg:border-b-0 lg:border-r-2 border-outline-variant p-6 space-y-6 shrink-0">
        <div className="border-b border-white/10 pb-4">
          <div className="inline-block bg-secondary-container px-2 py-0.5 mb-1">
            <span className="font-label-caps text-[9px] uppercase text-white font-bold tracking-widest">
              SYSTEM COMMAND
            </span>
          </div>
          <h2 className="font-display-lg text-2xl uppercase text-white">Admin Portal</h2>
          <p className="font-body-md text-xs text-on-surface-variant">Live Operations Console</p>
        </div>

        <nav className="space-y-1 font-label-caps text-xs uppercase">
          {[
            { id: 'overview', label: 'Executive Metrics', icon: 'dashboard' },
            { id: 'users', label: 'Athlete Roster', icon: 'group' },
            { id: 'nutritionists', label: 'Clinical Staff', icon: 'local_hospital' },
            { id: 'consultations', label: 'Consultation Ledger', icon: 'calendar_month' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left p-3 border-l-2 flex items-center gap-3 transition-all ${
                activeTab === tab.id
                  ? 'bg-surface-container border-secondary text-secondary font-bold'
                  : 'border-transparent text-on-surface-variant hover:text-white hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/10 space-y-2">
          <button
            onClick={() => { switchRole('user'); setActivePage('profile'); }}
            className="w-full py-2.5 bg-surface-container border border-secondary/30 text-secondary font-label-caps text-xs uppercase hover:bg-secondary/10 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">switch_account</span>
            <span>Switch to Athlete View</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto">
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardData.kpis.map((kpi, idx) => (
            <div key={idx} className="p-6 bg-surface-container-low border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-on-surface-variant">
                <span className="font-label-caps text-[11px] uppercase">{kpi.label}</span>
                <span className="material-symbols-outlined text-secondary text-lg">{kpi.icon}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-display-lg text-3xl text-white">{kpi.value}</span>
                <span className="font-label-caps text-xs text-secondary font-bold">{kpi.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Analytics Bar Chart Simulation */}
        <div className="p-6 bg-surface-container-low border border-white/10 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-display-lg text-xl uppercase text-white">Monthly Gross Revenue (₹)</h3>
              <p className="font-body-md text-xs text-on-surface-variant">Q2-Q3 2024 Performance Fueling Revenue (in Thousands)</p>
            </div>
            <span className="font-label-caps text-xs text-secondary uppercase font-bold">
              +22.8% YOY Growth
            </span>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 pt-6 border-b border-white/10 px-2">
            {dashboardData.revenueHistory.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="font-label-caps text-[10px] text-secondary opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                  ₹{item.rev}k
                </span>
                <div
                  className="w-full bg-gradient-to-t from-secondary-container to-secondary transition-all group-hover:brightness-125"
                  style={{ height: `${(item.rev / 360) * 100}%` }}
                ></div>
                <span className="font-label-caps text-[11px] text-on-surface-variant uppercase">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Sub-tab views */}
        {activeTab === 'overview' || activeTab === 'consultations' ? (
          <div className="p-6 bg-surface-container-low border border-white/10 space-y-4">
            <h3 className="font-display-lg text-xl uppercase text-white">Live Consultation Schedule</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-md text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-surface-container font-label-caps text-xs uppercase text-on-surface-variant">
                    <th className="p-3">Athlete</th>
                    <th className="p-3">Assigned Dietitian</th>
                    <th className="p-3">Time Window</th>
                    <th className="p-3">Session Type</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-label-caps text-xs">
                  {dashboardData.recentConsultations.map((c, idx) => (
                    <tr key={idx} className="hover:bg-surface-container">
                      <td className="p-3 text-white font-bold">{c.client}</td>
                      <td className="p-3 text-on-surface-variant">{c.dietitian}</td>
                      <td className="p-3 text-white">{c.time}</td>
                      <td className="p-3 text-secondary">{c.type}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-surface-container border border-secondary/40 text-secondary font-bold">
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {activeTab === 'users' && (
          <div className="p-6 bg-surface-container-low border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="font-display-lg text-xl uppercase text-white">Active Athletes & Subscriptions</h3>
              <input
                type="text"
                placeholder="Search athlete or plan..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="bg-background border border-white/20 px-3 py-1.5 font-body-md text-xs text-white focus:border-secondary focus:outline-none w-full sm:w-64"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-md text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-surface-container font-label-caps text-xs uppercase text-on-surface-variant">
                    <th className="p-3">Athlete Name</th>
                    <th className="p-3">Email Address</th>
                    <th className="p-3">Active Protocol</th>
                    <th className="p-3">Joined Date</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-label-caps text-xs">
                  {filteredUsers.map((u, idx) => (
                    <tr key={idx} className="hover:bg-surface-container">
                      <td className="p-3 text-white font-bold">{u.name}</td>
                      <td className="p-3 text-on-surface-variant">{u.email}</td>
                      <td className="p-3 text-secondary">{u.plan}</td>
                      <td className="p-3 text-on-surface-variant">{u.joined}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-secondary-container text-white font-bold">
                          {u.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'nutritionists' && (
          <div className="p-6 bg-surface-container-low border border-white/10 space-y-4">
            <h3 className="font-display-lg text-xl uppercase text-white">Clinical Performance Staff</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {NUTRITIONISTS.map((nutr) => (
                <div key={nutr.id} className="p-4 bg-surface-container border border-white/10 space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={nutr.avatar} alt={nutr.name} className="w-12 h-12 object-cover border border-secondary" />
                    <div>
                      <h4 className="font-display-lg text-sm uppercase text-white">{nutr.name}</h4>
                      <span className="font-label-caps text-[10px] text-secondary">{nutr.experience}</span>
                    </div>
                  </div>
                  <p className="font-body-md text-xs text-on-surface-variant">{nutr.specialty}</p>
                  <div className="flex justify-between text-[11px] font-label-caps text-on-surface-variant pt-2 border-t border-white/5">
                    <span>Clients: <strong className="text-white">{nutr.clientsTrained}</strong></span>
                    <span>Rating: <strong className="text-secondary">★ {nutr.rating}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
