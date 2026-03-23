// MCA CRM JavaScript Application - FIXED VERSION
// Fixes: Data persistence with localStorage, delete lead, calendar year, settings persistence

// ============================================
// Data Store with localStorage Persistence
// ============================================

const STORAGE_KEY = 'mca_crm_data';

const defaultData = {
    leads: [
        { id: '1', business_name: 'ABC Trucking LLC', industry: 'Transportation', contact_name: 'John Smith', phone: '(555) 123-4567', email: 'john@abctrucking.com', monthly_revenue: 85000, years_in_business: 5, score: 85, temperature: 'HOT', stage: 'qualified', created_at: '2025-03-10' },
        { id: '2', business_name: 'Sunrise Restaurant', industry: 'Food & Beverage', contact_name: 'Maria Garcia', phone: '(555) 234-5678', email: 'maria@sunriserest.com', monthly_revenue: 42000, years_in_business: 3, score: 72, temperature: 'WARM', stage: 'contacted', created_at: '2025-03-12' },
        { id: '3', business_name: 'Metro Construction', industry: 'Construction', contact_name: 'David Chen', phone: '(555) 345-6789', email: 'david@metroconst.com', monthly_revenue: 120000, years_in_business: 8, score: 91, temperature: 'HOT', stage: 'application_sent', created_at: '2025-03-08' },
        { id: '4', business_name: 'Coastal Retail Co', industry: 'Retail', contact_name: 'Sarah Johnson', phone: '(555) 456-7890', email: 'sarah@coastalretail.com', monthly_revenue: 28000, years_in_business: 2, score: 45, temperature: 'COLD', stage: 'new_lead', created_at: '2025-03-14' },
        { id: '5', business_name: 'TechFlow Solutions', industry: 'Technology', contact_name: 'Michael Park', phone: '(555) 567-8901', email: 'michael@techflow.com', monthly_revenue: 95000, years_in_business: 4, score: 88, temperature: 'HOT', stage: 'submitted_to_funder', created_at: '2025-03-05' },
        { id: '6', business_name: 'Premium Auto Repair', industry: 'Automotive', contact_name: 'Robert Wilson', phone: '(555) 678-9012', email: 'robert@premiumauto.com', monthly_revenue: 55000, years_in_business: 6, score: 68, temperature: 'WARM', stage: 'contacted', created_at: '2025-03-11' },
        { id: '7', business_name: 'Elite Salon & Spa', industry: 'Beauty', contact_name: 'Jennifer Lee', phone: '(555) 789-0123', email: 'jennifer@elitesalon.com', monthly_revenue: 32000, years_in_business: 4, score: 58, temperature: 'WARM', stage: 'qualified', created_at: '2025-03-09' },
        { id: '8', business_name: 'Summit Roofing', industry: 'Construction', contact_name: 'Chris Brown', phone: '(555) 890-1234', email: 'chris@summitroofing.com', monthly_revenue: 78000, years_in_business: 7, score: 82, temperature: 'HOT', stage: 'approved', created_at: '2025-02-28' },
        { id: '9', business_name: 'Green Lawn Care', industry: 'Landscaping', contact_name: 'Tom Davis', phone: '(555) 901-2345', email: 'tom@greenlawn.com', monthly_revenue: 18000, years_in_business: 3, score: 42, temperature: 'COLD', stage: 'new_lead', created_at: '2025-03-13' },
        { id: '10', business_name: 'Royal Medical Supply', industry: 'Healthcare', contact_name: 'Lisa Anderson', phone: '(555) 012-3456', email: 'lisa@royalmedical.com', monthly_revenue: 145000, years_in_business: 10, score: 95, temperature: 'HOT', stage: 'funded', created_at: '2025-02-15' },
    ],
    activities: [
        { id: '1', lead_id: '1', type: 'call', subject: 'Initial consultation', content: 'Discussed funding needs for expansion', created_at: '2025-03-11T10:00:00' },
        { id: '2', lead_id: '1', type: 'email', subject: 'Document request', content: 'Sent bank statements and tax returns', created_at: '2025-03-12T14:30:00' },
        { id: '3', lead_id: '2', type: 'call', subject: 'Follow-up call', content: 'Left voicemail, will try again tomorrow', created_at: '2025-03-13T11:00:00' },
        { id: '4', lead_id: '3', type: 'email', subject: 'Application submitted', content: 'All documents received, application sent to underwriting', created_at: '2025-03-10T16:00:00' },
        { id: '5', lead_id: '10', type: 'status_change', subject: 'Status: Funded', content: 'Deal funded for $250,000', created_at: '2025-03-01T09:00:00' },
    ],
    followUps: [
        { id: '1', lead_id: '1', title: 'Review bank statements', due_at: '2025-03-16T10:00:00', status: 'pending' },
        { id: '2', lead_id: '2', title: 'Follow up call', due_at: '2025-03-16T14:00:00', status: 'pending' },
        { id: '3', lead_id: '5', title: 'Check submission status', due_at: '2025-03-17T11:00:00', status: 'pending' },
        { id: '4', lead_id: '3', title: 'Collect missing docs', due_at: '2025-03-15T16:00:00', status: 'completed' },
    ],
    funders: [
        { id: '1', name: 'Rapid Capital', tier: 'tier_1_beginner', min_deal_amount: 5000, max_deal_amount: 50000, default_commission_rate: 8, avg_turnaround_hours: 24, is_preferred: true, contact_name: 'James Wilson', contact_email: 'james@rapidcapital.com' },
        { id: '2', name: 'Progressive Funding', tier: 'tier_1_beginner', min_deal_amount: 10000, max_deal_amount: 75000, default_commission_rate: 9, avg_turnaround_hours: 48, is_preferred: false, contact_name: 'Amy Chen', contact_email: 'amy@progressive.com' },
        { id: '3', name: 'Summit Financial', tier: 'tier_2_intermediate', min_deal_amount: 25000, max_deal_amount: 150000, default_commission_rate: 10, avg_turnaround_hours: 72, is_preferred: true, contact_name: 'Mark Stevens', contact_email: 'mark@summitfin.com' },
        { id: '4', name: 'Atlas Capital', tier: 'tier_2_intermediate', min_deal_amount: 30000, max_deal_amount: 200000, default_commission_rate: 11, avg_turnaround_hours: 48, is_preferred: false, contact_name: 'Rachel Green', contact_email: 'rachel@atlascap.com' },
        { id: '5', name: 'Premier Lending Group', tier: 'tier_3_advanced', min_deal_amount: 50000, max_deal_amount: 500000, default_commission_rate: 12, avg_turnaround_hours: 72, is_preferred: true, contact_name: 'Michael Torres', contact_email: 'michael@premier.com' },
        { id: '6', name: 'Vanguard Merchant', tier: 'tier_4_premium', min_deal_amount: 100000, max_deal_amount: 2000000, default_commission_rate: 15, avg_turnaround_hours: 96, is_preferred: true, contact_name: 'Sarah Kim', contact_email: 'sarah@vanguard.com' },
    ],
    commissions: [
        { month: 'Apr 2024', deals_funded: 3, total_funded: 285000, total_commission: 28500, avg_commission_rate: 10 },
        { month: 'May 2024', deals_funded: 4, total_funded: 420000, total_commission: 42000, avg_commission_rate: 10 },
        { month: 'Jun 2024', deals_funded: 5, total_funded: 580000, total_commission: 58000, avg_commission_rate: 10 },
        { month: 'Jul 2024', deals_funded: 2, total_funded: 175000, total_commission: 17500, avg_commission_rate: 10 },
        { month: 'Aug 2024', deals_funded: 6, total_funded: 720000, total_commission: 72000, avg_commission_rate: 10 },
        { month: 'Sep 2024', deals_funded: 4, total_funded: 460000, total_commission: 46000, avg_commission_rate: 10 },
        { month: 'Oct 2024', deals_funded: 7, total_funded: 890000, total_commission: 89000, avg_commission_rate: 10 },
        { month: 'Nov 2024', deals_funded: 5, total_funded: 625000, total_commission: 62500, avg_commission_rate: 10 },
        { month: 'Dec 2024', deals_funded: 8, total_funded: 950000, total_commission: 95000, avg_commission_rate: 10 },
        { month: 'Jan 2025', deals_funded: 4, total_funded: 380000, total_commission: 38000, avg_commission_rate: 10 },
        { month: 'Feb 2025', deals_funded: 6, total_funded: 720000, total_commission: 72000, avg_commission_rate: 10 },
        { month: 'Mar 2025', deals_funded: 3, total_funded: 525000, total_commission: 52500, avg_commission_rate: 10 },
    ],
    user: {
        firstName: 'Damon',
        lastName: 'Mathews',
        email: 'damon@mathewsfunding.com',
        phone: '',
        company: 'Mathews Funding',
        commissionGoal: 1000000,
        notifications: {
            email: true,
            sms: false,
            followUpReminders: true,
            commissionAlerts: true
        }
    }
};

// Load data from localStorage or use defaults
function loadStore() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error loading from localStorage:', e);
    }
    return JSON.parse(JSON.stringify(defaultData));
}

// Save data to localStorage
function saveStore() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

// Initialize store
const store = loadStore();

// ============================================
// Navigation
// ============================================

let currentLeadId = null;
let currentMonth = new Date();
let currentSettingsTab = 'profile';

function navigate(page, params = {}) {
    // Update sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === page) {
            item.classList.add('active');
        }
    });
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(page + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Handle specific pages
    if (page === 'dashboard') renderDashboard();
    if (page === 'leads') renderLeads();
    if (page === 'pipeline') renderPipeline();
    if (page === 'lead-detail') {
        currentLeadId = params.id;
        renderLeadDetail();
    }
    if (page === 'calendar') renderCalendar();
    if (page === 'commissions') renderCommissions();
    if (page === 'funders') renderFunders();
    if (page === 'settings') renderSettings();
    
    // Save state to URL hash
    window.location.hash = page + (params.id ? '/' + params.id : '');
}

function navigateToAddLead() {
    navigate('leads');
    setTimeout(() => {
        showAddLeadModal();
    }, 100);
}

// ============================================
// Dashboard
// ============================================

function renderDashboard() {
    const stats = calculateStats();
    
    document.getElementById('stat-total-leads').textContent = stats.totalLeads;
    document.getElementById('stat-hot').textContent = stats.hotLeads;
    document.getElementById('stat-warm').textContent = stats.warmLeads;
    document.getElementById('stat-hot-leads').textContent = stats.hotLeads;
    document.getElementById('stat-pipeline').textContent = '$' + stats.pipelineValue.toLocaleString();
    document.getElementById('stat-conversion').textContent = stats.conversionRate + '%';
    document.getElementById('stat-avg-deal').textContent = stats.avgDealSize.toLocaleString();
    document.getElementById('stat-commission').textContent = '$' + stats.commissionThisMonth.toLocaleString();
    document.getElementById('stat-deals').textContent = stats.dealsThisMonth;
    
    const pathProgress = (stats.totalCommission / store.user.commissionGoal) * 100;
    document.getElementById('path-percentage').textContent = pathProgress.toFixed(2) + '%';
    document.getElementById('path-fill').style.width = Math.min(100, pathProgress) + '%';
    document.getElementById('path-earned').textContent = stats.totalCommission.toLocaleString();
    
    renderPipelineSummary();
    renderTodaysFollowUps();
    renderRecentActivity();
}

function calculateStats() {
    const totalLeads = store.leads.length;
    const hotLeads = store.leads.filter(l => l.temperature === 'HOT').length;
    const warmLeads = store.leads.filter(l => l.temperature === 'WARM').length;
    
    const fundedLeads = store.leads.filter(l => l.stage === 'funded' || l.stage === 'paid');
    const conversionRate = totalLeads > 0 ? ((fundedLeads.length / totalLeads) * 100).toFixed(1) : 0;
    
    const pipelineValue = store.leads
        .filter(l => !['funded', 'paid'].includes(l.stage))
        .reduce((sum, l) => sum + (l.monthly_revenue || 0) * 3, 0);
    
    const avgDealSize = fundedLeads.length > 0 
        ? fundedLeads.reduce((sum, l) => sum + (l.monthly_revenue || 0) * 3, 0) / fundedLeads.length 
        : 0;
    
    const thisMonth = store.commissions[store.commissions.length - 1];
    const commissionThisMonth = thisMonth ? thisMonth.total_commission : 0;
    const dealsThisMonth = thisMonth ? thisMonth.deals_funded : 0;
    
    const totalCommission = store.commissions.reduce((sum, c) => sum + c.total_commission, 0);
    
    return {
        totalLeads,
        hotLeads,
        warmLeads,
        conversionRate,
        pipelineValue,
        avgDealSize,
        commissionThisMonth,
        dealsThisMonth,
        totalCommission
    };
}

function renderPipelineSummary() {
    const stages = [
        { key: 'new_lead', name: 'New Lead', color: '#3b82f6' },
        { key: 'contacted', name: 'Contacted', color: '#a855f7' },
        { key: 'qualified', name: 'Qualified', color: '#14b8a6' },
        { key: 'application_sent', name: 'Application', color: '#6366f1' },
        { key: 'submitted_to_funder', name: 'Submitted', color: '#06b6d4' },
        { key: 'approved', name: 'Approved', color: '#10b981' },
        { key: 'funded', name: 'Funded', color: '#22c55e' },
        { key: 'paid', name: 'Paid', color: '#84cc16' },
    ];
    
    const stageCounts = {};
    store.leads.forEach(l => {
        stageCounts[l.stage] = (stageCounts[l.stage] || 0) + 1;
    });
    
    const html = stages.map(s => `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
            <div style="display: flex; align-items: center;">
                <div style="width: 12px; height: 12px; border-radius: 50%; background: ${s.color}; margin-right: 0.5rem;"></div>
                <span style="font-size: 0.875rem;">${s.name}</span>
            </div>
            <span style="font-weight: 500;">${stageCounts[s.key] || 0}</span>
        </div>
    `).join('');
    
    document.getElementById('pipeline-summary').innerHTML = html;
}

function renderTodaysFollowUps() {
    const today = new Date().toISOString().split('T')[0];
    const todaysFollowUps = store.followUps.filter(f => {
        const dueDate = f.due_at.split('T')[0];
        return dueDate === today && f.status === 'pending';
    });
    
    if (todaysFollowUps.length === 0) {
        document.getElementById('todays-followups').innerHTML = 
            '<p style="color: #6b7280; font-size: 0.875rem;">No follow-ups scheduled for today.</p>';
        return;
    }
    
    const html = todaysFollowUps.map(f => {
        const lead = store.leads.find(l => l.id === f.lead_id);
        return `
            <div style="display: flex; align-items: center; padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem; margin-bottom: 0.5rem; cursor: pointer;" onclick="navigate('lead-detail', {id: '${f.lead_id}'})">
                <i class="fas fa-clock" style="color: #9ca3af; margin-right: 0.75rem;"></i>
                <div style="flex: 1;">
                    <div style="font-weight: 500;">${lead ? lead.business_name : 'Unknown'}</div>
                    <div style="font-size: 0.75rem; color: #6b7280;">${f.title}</div>
                </div>
                <span style="font-size: 0.75rem; color: #6b7280;">${f.due_at.split('T')[1].substring(0, 5)}</span>
            </div>
        `;
    }).join('');
    
    document.getElementById('todays-followups').innerHTML = html;
}

function renderRecentActivity() {
    const recentActivities = store.activities
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);
    
    if (recentActivities.length === 0) {
        document.getElementById('recent-activity').innerHTML = 
            '<p style="color: #6b7280; font-size: 0.875rem;">No recent activity.</p>';
        return;
    }
    
    const html = recentActivities.map(a => {
        const lead = store.leads.find(l => l.id === a.lead_id);
        const config = getActivityTypeConfig(a.type);
        return `
            <div style="display: flex; align-items: flex-start; padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem; margin-bottom: 0.5rem; cursor: pointer;" onclick="navigate('lead-detail', {id: '${a.lead_id}'})\">
                <div style="width: 28px; height: 28px; background: ${config.color}20; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 0.75rem; color: ${config.color}; flex-shrink: 0;">
                    <i class="fas fa-${config.icon}" style="font-size: 0.75rem;"></i>
                </div>
                <div style="flex: 1; min-width: 0;">
                    <div style="font-size: 0.875rem;">
                        <span style="font-weight: 500;">${lead ? lead.business_name : 'Unknown'}</span>
                        <span style="color: #6b7280;"> — ${config.label}</span>
                    </div>
                    <div style="font-size: 0.75rem; color: #9ca3af;">${formatActivityTime(a.created_at)}</div>
                </div>
            </div>
        `;
    }).join('');
    
    document.getElementById('recent-activity').innerHTML = html;
}

// ============================================
// Leads List
// ============================================

function renderLeads() {
    filterLeads();
}

function filterLeads() {
    const search = document.getElementById('lead-search').value.toLowerCase();
    const stageFilter = document.getElementById('filter-stage').value;
    const tempFilter = document.getElementById('filter-temp').value;
    
    let filtered = store.leads.filter(lead => {
        const matchesSearch = !search || 
            lead.business_name.toLowerCase().includes(search) ||
            (lead.contact_name && lead.contact_name.toLowerCase().includes(search)) ||
            (lead.email && lead.email.toLowerCase().includes(search)) ||
            (lead.phone && lead.phone.includes(search));
        
        const matchesStage = !stageFilter || lead.stage === stageFilter;
        const matchesTemp = !tempFilter || lead.temperature === tempFilter;
        
        return matchesSearch && matchesStage && matchesTemp;
    });
    
    const tbody = document.getElementById('leads-table');
    
    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 2rem; color: #6b7280;">No leads found.</td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = filtered.map(lead => `
        <tr style="cursor: pointer;">
            <td onclick="navigate('lead-detail', {id: '${lead.id}'});">
                <div style="font-weight: 500;">${lead.business_name}</div>
                <div style="font-size: 0.75rem; color: #6b7280;">${lead.industry || '-'}</div>
            </td>
            <td onclick="navigate('lead-detail', {id: '${lead.id}'});">
                <div>${lead.contact_name || '-'}</div>
                <div style="font-size: 0.75rem; color: #6b7280;">${lead.email || '-'}</div>
            </td>
            <td onclick="navigate('lead-detail', {id: '${lead.id}'});">
                <div>${lead.monthly_revenue ? '$' + lead.monthly_revenue.toLocaleString() : '-'}</div>
                <div style="font-size: 0.75rem; color: #6b7280;">${lead.years_in_business || '-'} years</div>
            </td>
            <td onclick="navigate('lead-detail', {id: '${lead.id}'});"><div style="font-weight: 500;">${lead.score || '-'}</div></td>
            <td onclick="navigate('lead-detail', {id: '${lead.id}'});"><span class="badge badge-${lead.temperature.toLowerCase()}">${lead.temperature}</span></td>
            <td onclick="navigate('lead-detail', {id: '${lead.id}'});"><span class="badge badge-${lead.stage}">${lead.stage.replace(/_/g, ' ')}</span></td>
            <td>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <button class="quick-action-btn call" onclick="event.stopPropagation(); showQuickCallModal('${lead.id}');" title="Log Call">
                        <i class="fas fa-phone"></i> Log
                    </button>
                    <button class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" onclick="event.stopPropagation(); navigate('lead-detail', {id: '${lead.id}'});" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #fef2f2; color: #dc2626;" onclick="event.stopPropagation(); deleteLead('${lead.id}');" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                    ${lead.phone ? `<a href="tel:${lead.phone}" style="color: #16a34a; padding: 0.25rem;" onclick="event.stopPropagation();" title="Call">
                        <i class="fas fa-phone"></i>
                    </a>` : ''}
                    ${lead.email ? `<a href="mailto:${lead.email}" style="color: #4f46e5; padding: 0.25rem;" onclick="event.stopPropagation();" title="Email">
                        <i class="fas fa-envelope"></i>
                    </a>` : ''}
                </div>
            </td>
        </tr>
    `).join('');
}

function showAddLeadModal() {
    document.getElementById('add-lead-modal').style.display = 'flex';
}

function hideAddLeadModal() {
    document.getElementById('add-lead-modal').style.display = 'none';
    // Clear form
    document.getElementById('new-business-name').value = '';
    document.getElementById('new-industry').value = '';
    document.getElementById('new-contact-name').value = '';
    document.getElementById('new-phone').value = '';
    document.getElementById('new-email').value = '';
    document.getElementById('new-revenue').value = '';
}

function addLead() {
    const businessName = document.getElementById('new-business-name').value;
    if (!businessName) {
        alert('Business name is required');
        return;
    }
    
    const newLead = {
        id: Date.now().toString(),
        business_name: businessName,
        industry: document.getElementById('new-industry').value,
        contact_name: document.getElementById('new-contact-name').value,
        phone: document.getElementById('new-phone').value,
        email: document.getElementById('new-email').value,
        monthly_revenue: parseInt(document.getElementById('new-revenue').value) || 0,
        temperature: 'WARM',
        stage: 'new_lead',
        score: Math.floor(Math.random() * 40) + 40,
        created_at: new Date().toISOString().split('T')[0]
    };
    
    store.leads.push(newLead);
    saveStore(); // FIXED: Save to localStorage
    
    hideAddLeadModal();
    navigate('leads');
}

// FIXED: New delete lead function
function deleteLead(leadId) {
    if (!confirm('Are you sure you want to delete this lead?')) {
        return;
    }
    
    const index = store.leads.findIndex(l => l.id === leadId);
    if (index > -1) {
        store.leads.splice(index, 1);
        // Also remove related activities and follow-ups
        store.activities = store.activities.filter(a => a.lead_id !== leadId);
        store.followUps = store.followUps.filter(f => f.lead_id !== leadId);
        saveStore();
        renderLeads();
    }
}

// ============================================
// Pipeline
// ============================================

function renderPipeline() {
    const stages = [
        { id: 'new_lead', name: 'New Lead', color: 'bg-blue-500' },
        { id: 'contacted', name: 'Contacted', color: 'bg-purple-500' },
        { id: 'qualified', name: 'Qualified', color: 'bg-teal-500' },
        { id: 'application_sent', name: 'Application Sent', color: 'bg-indigo-500' },
        { id: 'submitted_to_funder', name: 'Submitted to Funder', color: 'bg-cyan-500' },
        { id: 'approved', name: 'Approved', color: 'bg-emerald-500' },
        { id: 'funded', name: 'Funded', color: 'bg-green-500' },
        { id: 'paid', name: 'Paid', color: 'bg-lime-500' },
    ];
    
    const stageColors = {
        new_lead: '#3b82f6',
        contacted: '#a855f7',
        qualified: '#14b8a6',
        application_sent: '#6366f1',
        submitted_to_funder: '#06b6d4',
        approved: '#10b981',
        funded: '#22c55e',
        paid: '#84cc16'
    };
    
    const container = document.getElementById('pipeline-container');
    
    container.innerHTML = stages.map(stage => {
        const stageLeads = store.leads.filter(l => l.stage === stage.id);
        
        return `
            <div class="pipeline-column">
                <div class="pipeline-header" style="background: ${stageColors[stage.id]};">
                    <span>${stage.name}</span>
                    <span class="pipeline-count">${stageLeads.length}</span>
                </div>
                <div class="pipeline-body">
                    ${stageLeads.map(lead => `
                        <div class="lead-card ${lead.temperature.toLowerCase()}" onclick="navigate('lead-detail', {id: '${lead.id}'});">
                            <div class="lead-title">${lead.business_name}</div>
                            <div class="lead-industry">${lead.industry || 'Unknown Industry'}</div>
                            ${lead.monthly_revenue ? `<div class="lead-revenue">$${lead.monthly_revenue.toLocaleString()}/mo</div>` : ''}
                            <div class="lead-footer">
                                <span class="badge badge-${lead.temperature.toLowerCase()}" style="font-size: 0.625rem;">${lead.temperature}</span>
                                <span style="font-size: 0.75rem; color: #6b7280;">Score: ${lead.score}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// Lead Detail
// ============================================

function renderLeadDetail() {
    const lead = store.leads.find(l => l.id === currentLeadId);
    if (!lead) {
        navigate('leads');
        return;
    }
    
    document.getElementById('detail-business-name').textContent = lead.business_name;
    document.getElementById('detail-temperature').value = lead.temperature;
    document.getElementById('detail-stage').value = lead.stage;
    document.getElementById('detail-score').textContent = lead.score || '-';
    document.getElementById('detail-revenue').textContent = lead.monthly_revenue ? '$' + lead.monthly_revenue.toLocaleString() : '-';
    
    // Contact Info
    const contactInfo = document.getElementById('detail-contact-info');
    contactInfo.innerHTML = `
        ${lead.contact_name ? `
        <div class="detail-item">
            <i class="fas fa-building"></i>
            <div>
                <div class="detail-label">Contact</div>
                <div class="detail-value">${lead.contact_name}</div>
            </div>
        </div>` : ''}
        
        ${lead.phone ? `
        <div class="detail-item">
            <i class="fas fa-phone"></i>
            <div>
                <div class="detail-label">Phone</div>
                <div class="detail-value"><a href="tel:${lead.phone}">${lead.phone}</a></div>
            </div>
        </div>` : ''}
        
        ${lead.email ? `
        <div class="detail-item">
            <i class="fas fa-envelope"></i>
            <div>
                <div class="detail-label">Email</div>
                <div class="detail-value"><a href="mailto:${lead.email}">${lead.email}</a></div>
            </div>
        </div>` : ''}
    `;
    
    // Business Info
    document.getElementById('detail-business-info').innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
            <div>
                <div class="detail-label">Years in Business</div>
                <div class="detail-value">${lead.years_in_business || '-'}</div>
            </div>
            <div>
                <div class="detail-label">Industry</div>
                <div class="detail-value">${lead.industry || '-'}</div>
            </div>
            <div>
                <div class="detail-label">Monthly Revenue</div>
                <div class="detail-value">${lead.monthly_revenue ? '$' + lead.monthly_revenue.toLocaleString() : '-'}</div>
            </div>
            <div>
                <div class="detail-label">Created</div>
                <div class="detail-value">${lead.created_at}</div>
            </div>
        </div>
    `;
    
    // Activities Timeline
    const leadActivities = store.activities
        .filter(a => a.lead_id === lead.id)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    const activitiesContainer = document.getElementById('detail-activities');
    if (leadActivities.length === 0) {
        activitiesContainer.innerHTML = `
            <div class="activity-empty-state">
                <i class="fas fa-clipboard-list"></i>
                <p>No activities yet. Click "Log Activity" to add one.</p>
            </div>
        `;
    } else {
        activitiesContainer.innerHTML = `
            <div class="activity-timeline">
                ${leadActivities.map(a => {
                    const config = getActivityTypeConfig(a.type);
                    const hasNotes = a.content && a.content.trim();
                    return `
                        <div class="activity-timeline-item">
                            <div class="activity-timeline-icon ${config.category}">
                                <i class="fas fa-${config.icon}"></i>
                            </div>
                            <div class="activity-timeline-content ${hasNotes ? 'collapsed' : ''}" id="activity-content-${a.id}" onclick="toggleActivityCollapse('${a.id}')">
                                <div class="activity-timeline-header">
                                    <div>
                                        <div class="activity-timeline-title">${a.subject || 'Activity'}</div>
                                        <div class="activity-timeline-meta">
                                            <span><i class="fas fa-user"></i> ${a.created_by || 'System'}</span>
                                            <span><i class="fas fa-clock"></i> ${formatActivityTime(a.created_at)}</span>
                                        </div>
                                    </div>
                                    <span class="activity-timeline-type" style="background: ${config.color}20; color: ${config.color};">
                                        <i class="fas fa-${config.icon}"></i> ${config.label}
                                    </span>
                                </div>
                                ${hasNotes ? `<div class="activity-notes">${a.content}</div>` : ''}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
    
    // Follow-ups
    const leadFollowUps = store.followUps
        .filter(f => f.lead_id === lead.id)
        .sort((a, b) => new Date(a.due_at) - new Date(b.due_at));
    
    const followUpsContainer = document.getElementById('detail-followups');
    if (leadFollowUps.length === 0) {
        followUpsContainer.innerHTML = '<p style="color: #6b7280;">No follow-ups scheduled.</p>';
    } else {
        followUpsContainer.innerHTML = leadFollowUps.map(f => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f9fafb; border-radius: 0.5rem; margin-bottom: 0.75rem;">
                <div>
                    <div style="font-weight: 500;">${f.title}</div>
                    <div style="font-size: 0.75rem; color: #6b7280;">Due: ${new Date(f.due_at).toLocaleString()}</div>
                </div>
                <span class="badge badge-${f.status === 'completed' ? 'funded' : 'warm'}">${f.status}</span>
            </div>
        `).join('');
    }
}

// Activity Types Configuration
const ACTIVITY_TYPES = {
    call_outbound: { label: 'Call - Outbound', icon: 'phone', color: '#2563eb', category: 'call' },
    call_inbound: { label: 'Call - Inbound', icon: 'phone', color: '#16a34a', category: 'call' },
    email_sent: { label: 'Email - Sent', icon: 'envelope', color: '#db2777', category: 'email' },
    email_received: { label: 'Email - Received', icon: 'envelope', color: '#9333ea', category: 'email' },
    meeting: { label: 'Meeting', icon: 'users', color: '#d97706', category: 'meeting' },
    note: { label: 'Note', icon: 'sticky-note', color: '#6b7280', category: 'note' },
    status_change: { label: 'Status Change', icon: 'exchange-alt', color: '#059669', category: 'status' }
};

// Activity Modal State
let currentActivityLeadId = null;
let quickCallLeadId = null;

// ============================================
// Activity Functions
// ============================================

function showActivityModal(leadId = null) {
    currentActivityLeadId = leadId || currentLeadId;
    if (!currentActivityLeadId) return;
    
    // Set default datetime to now
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('activity-datetime').value = now.toISOString().slice(0, 16);
    
    // Reset form
    document.getElementById('activity-type').value = 'call_outbound';
    document.getElementById('activity-subject').value = '';
    document.getElementById('activity-content').value = '';
    document.getElementById('activity-followup-check').checked = false;
    document.getElementById('followup-fields').style.display = 'none';
    document.getElementById('activity-followup-datetime').value = '';
    document.getElementById('activity-followup-title').value = '';
    
    // Update title with lead name if available
    const lead = store.leads.find(l => l.id === currentActivityLeadId);
    document.getElementById('activity-modal-title').textContent = lead 
        ? `Log Activity - ${lead.business_name}` 
        : 'Log Activity';
    
    document.getElementById('activity-modal').style.display = 'flex';
}

function hideActivityModal() {
    document.getElementById('activity-modal').style.display = 'none';
    currentActivityLeadId = null;
}

function toggleFollowUpFields() {
    const checked = document.getElementById('activity-followup-check').checked;
    document.getElementById('followup-fields').style.display = checked ? 'block' : 'none';
    
    if (checked) {
        // Default to tomorrow same time
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setMinutes(tomorrow.getMinutes() - tomorrow.getTimezoneOffset());
        document.getElementById('activity-followup-datetime').value = tomorrow.toISOString().slice(0, 16);
    }
}

function updateActivityForm() {
    const type = document.getElementById('activity-type').value;
    const subjectInput = document.getElementById('activity-subject');
    
    // Set default subjects based on type
    const defaults = {
        call_outbound: 'Outbound call',
        call_inbound: 'Inbound call',
        email_sent: 'Email sent',
        email_received: 'Email received',
        meeting: 'Meeting scheduled',
        note: 'Note added',
        status_change: 'Status update'
    };
    
    if (!subjectInput.value) {
        subjectInput.value = defaults[type] || '';
    }
}

function saveActivity() {
    const type = document.getElementById('activity-type').value;
    const subject = document.getElementById('activity-subject').value.trim();
    const content = document.getElementById('activity-content').value.trim();
    const datetime = document.getElementById('activity-datetime').value;
    
    if (!subject) {
        alert('Please enter a subject/title');
        return;
    }
    
    const activity = {
        id: Date.now().toString(),
        lead_id: currentActivityLeadId,
        type: type,
        subject: subject,
        content: content,
        created_at: datetime ? new Date(datetime).toISOString() : new Date().toISOString(),
        created_by: `${store.user.firstName} ${store.user.lastName}`
    };
    
    store.activities.push(activity);
    
    // Handle follow-up if checked
    if (document.getElementById('activity-followup-check').checked) {
        const followupDate = document.getElementById('activity-followup-datetime').value;
        const followupTitle = document.getElementById('activity-followup-title').value.trim() || 'Follow-up';
        
        if (followupDate) {
            store.followUps.push({
                id: Date.now().toString(),
                lead_id: currentActivityLeadId,
                title: followupTitle,
                due_at: new Date(followupDate).toISOString(),
                status: 'pending',
                related_activity_id: activity.id
            });
        }
    }
    
    saveStore();
    hideActivityModal();
    
    // Refresh current view
    if (document.getElementById('lead-detail-page').classList.contains('active')) {
        renderLeadDetail();
    } else if (document.getElementById('leads-page').classList.contains('active')) {
        renderLeads();
    } else if (document.getElementById('dashboard-page').classList.contains('active')) {
        renderDashboard();
    }
}

// ============================================
// Quick Log Call Functions
// ============================================

function showQuickCallModal(leadId) {
    quickCallLeadId = leadId;
    const lead = store.leads.find(l => l.id === leadId);
    if (!lead) return;
    
    document.getElementById('quick-call-lead-name').textContent = lead.business_name;
    
    // Reset form
    document.querySelector('input[name="quick-call-type"][value="call_outbound"]').checked = true;
    document.getElementById('quick-call-outcome').value = 'Connected';
    document.getElementById('quick-call-notes').value = '';
    document.getElementById('quick-call-schedule-followup').checked = false;
    document.getElementById('quick-call-followup-fields').style.display = 'none';
    document.getElementById('quick-call-followup-date').value = '';
    document.getElementById('quick-call-followup-title').value = '';
    
    // Default follow-up date (tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setMinutes(tomorrow.getMinutes() - tomorrow.getTimezoneOffset());
    document.getElementById('quick-call-followup-date').value = tomorrow.toISOString().slice(0, 16);
    
    document.getElementById('quick-call-modal').style.display = 'flex';
}

function hideQuickCallModal() {
    document.getElementById('quick-call-modal').style.display = 'none';
    quickCallLeadId = null;
}

// Toggle follow-up fields in quick call modal
document.addEventListener('change', function(e) {
    if (e.target.id === 'quick-call-schedule-followup') {
        document.getElementById('quick-call-followup-fields').style.display = e.target.checked ? 'block' : 'none';
    }
});

function saveQuickCall() {
    const callType = document.querySelector('input[name="quick-call-type"]:checked').value;
    const outcome = document.getElementById('quick-call-outcome').value;
    const notes = document.getElementById('quick-call-notes').value.trim();
    
    const activity = {
        id: Date.now().toString(),
        lead_id: quickCallLeadId,
        type: callType,
        subject: `Call - ${outcome}`,
        content: notes,
        created_at: new Date().toISOString(),
        created_by: `${store.user.firstName} ${store.user.lastName}`,
        outcome: outcome
    };
    
    store.activities.push(activity);
    
    // Handle follow-up scheduling
    if (document.getElementById('quick-call-schedule-followup').checked) {
        const followupDate = document.getElementById('quick-call-followup-date').value;
        const followupTitle = document.getElementById('quick-call-followup-title').value.trim() || `Follow-up: ${outcome}`;
        
        if (followupDate) {
            store.followUps.push({
                id: Date.now().toString(),
                lead_id: quickCallLeadId,
                title: followupTitle,
                due_at: new Date(followupDate).toISOString(),
                status: 'pending',
                related_activity_id: activity.id
            });
        }
    }
    
    saveStore();
    hideQuickCallModal();
    
    // Refresh view
    if (document.getElementById('leads-page').classList.contains('active')) {
        renderLeads();
    } else if (document.getElementById('lead-detail-page').classList.contains('active')) {
        renderLeadDetail();
    }
}

function toggleActivityCollapse(activityId) {
    const content = document.getElementById(`activity-content-${activityId}`);
    if (content) {
        content.classList.toggle('collapsed');
    }
}

function getActivityIcon(type) {
    const config = ACTIVITY_TYPES[type] || { icon: 'clock', category: 'default' };
    return config.icon;
}

function getActivityTypeConfig(type) {
    return ACTIVITY_TYPES[type] || { label: type, icon: 'clock', color: '#4f46e5', category: 'default' };
}

function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.tab:nth-child(${tab === 'overview' ? 1 : tab === 'activities' ? 2 : 3})`).classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
    document.getElementById('tab-' + tab).style.display = 'block';
}

function updateLeadTemperature() {
    const lead = store.leads.find(l => l.id === currentLeadId);
    if (lead) {
        lead.temperature = document.getElementById('detail-temperature').value;
        saveStore(); // FIXED: Save to localStorage
    }
}

function updateLeadStage() {
    const lead = store.leads.find(l => l.id === currentLeadId);
    if (lead) {
        const oldStage = lead.stage;
        const newStage = document.getElementById('detail-stage').value;
        lead.stage = newStage;
        
        store.activities.push({
            id: Date.now().toString(),
            lead_id: currentLeadId,
            type: 'status_change',
            subject: `Stage Changed`,
            content: `From "${oldStage.replace(/_/g, ' ')}" to "${newStage.replace(/_/g, ' ')}"`,
            created_at: new Date().toISOString(),
            created_by: `${store.user.firstName} ${store.user.lastName}`
        });
        saveStore(); // FIXED: Save to localStorage
        renderLeadDetail(); // Refresh to show the new activity
    }
}

// ============================================
// Calendar
// ============================================

function renderCalendar() {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // FIXED: Display correct year (was showing 2026)
    document.getElementById('calendar-month').textContent = 
        currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    let html = weekDays.map(day => `
        <div class="calendar-day-header">${day}</div>
    `).join('');
    
    for (let i = 0; i < startingDay; i++) {
        html += '<div class="calendar-day"></div>';
    }
    
    const today = new Date();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isToday = date.toDateString() === today.toDateString();
        const dateStr = date.toISOString().split('T')[0];
        
        const dayFollowUps = store.followUps.filter(f => {
            return f.due_at.startsWith(dateStr) && f.status === 'pending';
        });
        
        html += `
            <div class="calendar-day ${isToday ? 'today' : ''}">
                <div class="calendar-day-number">${day}</div>
                ${dayFollowUps.map(f => `
                    <div class="calendar-event">${f.title}</div>
                `).join('')}
            </div>
        `;
    }
    
    document.getElementById('calendar-grid').innerHTML = html;
    
    // Upcoming follow-ups
    const upcoming = store.followUps
        .filter(f => f.status === 'pending')
        .sort((a, b) => new Date(a.due_at) - new Date(b.due_at))
        .slice(0, 5);
    
    const upcomingContainer = document.getElementById('upcoming-followups');
    if (upcoming.length === 0) {
        upcomingContainer.innerHTML = '<p style="color: #6b7280;">No upcoming follow-ups.</p>';
    } else {
        upcomingContainer.innerHTML = upcoming.map(f => {
            const lead = store.leads.find(l => l.id === f.lead_id);
            return `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem; margin-bottom: 0.5rem;">
                    <div>
                        <div style="font-weight: 500;">${f.title}</div>
                        <div style="font-size: 0.75rem; color: #6b7280;">${lead ? lead.business_name : 'Unknown'} — ${new Date(f.due_at).toLocaleString()}</div>
                    </div>
                    <span class="badge badge-warm">Pending</span>
                </div>
            `;
        }).join('');
    }
}

function prevMonth() {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    renderCalendar();
}

// ============================================
// Commissions
// ============================================

function renderCommissions() {
    const totalCommission = store.commissions.reduce((sum, c) => sum + c.total_commission, 0);
    const totalFunded = store.commissions.reduce((sum, c) => sum + c.total_funded, 0);
    const totalDeals = store.commissions.reduce((sum, c) => sum + c.deals_funded, 0);
    const avgRate = store.commissions.reduce((sum, c) => sum + c.avg_commission_rate, 0) / store.commissions.length;
    
    document.getElementById('comm-total').textContent = '$' + totalCommission.toLocaleString();
    document.getElementById('comm-funded').textContent = '$' + totalFunded.toLocaleString();
    document.getElementById('comm-deals').textContent = totalDeals;
    document.getElementById('comm-rate').textContent = avgRate.toFixed(1) + '%';
    
    // Chart
    const maxCommission = Math.max(...store.commissions.map(c => c.total_commission));
    const maxFunded = Math.max(...store.commissions.map(c => c.total_funded / 1000));
    
    const chartHtml = store.commissions.map(c => {
        const commissionHeight = maxCommission > 0 ? (c.total_commission / maxCommission) * 200 : 0;
        const fundedHeight = maxFunded > 0 ? ((c.total_funded / 1000) / maxFunded) * 200 : 0;
        
        return `
            <div class="bar-group">
                <div style="display: flex; align-items: flex-end; gap: 2px; height: 200px;">
                    <div class="bar bar-commission" style="height: ${commissionHeight}px; width: 16px;"></div>
                    <div class="bar bar-funded" style="height: ${fundedHeight}px; width: 16px;"></div>
                </div>
                <span class="bar-label">${c.month}</span>
            </div>
        `;
    }).join('');
    
    document.getElementById('commission-chart').innerHTML = chartHtml;
    
    // Table
    document.getElementById('commissions-table').innerHTML = store.commissions.map(c => `
        <tr>
            <td>${c.month}</td>
            <td>${c.deals_funded}</td>
            <td>$${c.total_funded.toLocaleString()}</td>
            <td style="color: #16a34a; font-weight: 500;">$${c.total_commission.toLocaleString()}</td>
            <td>${c.avg_commission_rate}%</td>
        </tr>
    `).join('');
}

// ============================================
// Funders
// ============================================

function renderFunders() {
    const tierLabels = {
        tier_1_beginner: 'Tier 1 - Beginner Friendly',
        tier_2_intermediate: 'Tier 2 - Intermediate',
        tier_3_advanced: 'Tier 3 - Advanced',
        tier_4_premium: 'Tier 4 - Premium',
    };
    
    const grouped = store.funders.reduce((acc, f) => {
        if (!acc[f.tier]) acc[f.tier] = [];
        acc[f.tier].push(f);
        return acc;
    }, {});
    
    const container = document.getElementById('funders-container');
    
    container.innerHTML = Object.entries(grouped).map(([tier, funders]) => `
        <div class="card" style="margin-bottom: 1.5rem; overflow: hidden; padding: 0;">
            <div style="background: #4f46e5; padding: 0.75rem 1.5rem;">
                <h3 style="color: white; font-weight: 600;">${tierLabels[tier] || tier}</h3>
            </div>
            <div>
                ${funders.map(f => `
                    <div style="padding: 1.5rem; border-bottom: 1px solid #e5e7eb;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div>
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <h4 style="font-size: 1.125rem; font-weight: 500;">${f.name}</h4>
                                    ${f.is_preferred ? '<span class="badge badge-funded" style="font-size: 0.625rem;">Preferred</span>' : ''}
                                </div>
                                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-top: 0.75rem;">
                                    <div>
                                        <div style="font-size: 0.75rem; color: #6b7280;">Deal Range</div>
                                        <div style="font-weight: 500;">$${f.min_deal_amount.toLocaleString()} - $${f.max_deal_amount ? f.max_deal_amount.toLocaleString() : '∞'}</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.75rem; color: #6b7280;">Commission</div>
                                        <div style="font-weight: 500; color: #16a34a;">${f.default_commission_rate}%</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.75rem; color: #6b7280;">Turnaround</div>
                                        <div style="font-weight: 500;">${f.avg_turnaround_hours}h</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.75rem; color: #6b7280;">Contact</div>
                                        <div style="font-weight: 500;">${f.contact_name || '-'}</div>
                                    </div>
                                </div>
                            </div>
                            <div style="display: flex; gap: 1rem;">
                                ${f.contact_email ? `<a href="mailto:${f.contact_email}" style="color: #4f46e5; font-size: 0.875rem;">Email</a>` : ''}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// ============================================
// Settings
// ============================================

function renderSettings() {
    renderSettingsContent(currentSettingsTab);
}

function switchSettingsTab(tab) {
    currentSettingsTab = tab;
    
    document.querySelectorAll('.settings-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.settings-nav-item').classList.add('active');
    
    renderSettingsContent(tab);
}

function renderSettingsContent(tab) {
    const container = document.getElementById('settings-content');
    
    switch(tab) {
        case 'profile':
            container.innerHTML = `
                <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1.5rem;">Profile Settings</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
                    <div class="form-group">
                        <label class="form-label">First Name</label>
                        <input type="text" class="form-input" id="setting-firstname" value="${store.user.firstName}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Last Name</label>
                        <input type="text" class="form-input" id="setting-lastname" value="${store.user.lastName}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-input" id="setting-email" value="${store.user.email}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Phone</label>
                        <input type="tel" class="form-input" id="setting-phone" value="${store.user.phone}">
                    </div>
                    <div class="form-group" style="grid-column: span 2;">
                        <label class="form-label">Company Name</label>
                        <input type="text" class="form-input" id="setting-company" value="${store.user.company}">
                    </div>
                </div>
                <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb;">
                    <button class="btn btn-primary" onclick="saveSettings()">Save Changes</button>
                </div>
            `;
            break;
            
        case 'notifications':
            container.innerHTML = `
                <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1.5rem;">Notification Preferences</h3>
                <div style="space-y: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f9fafb; border-radius: 0.5rem; margin-bottom: 1rem;">
                        <div>
                            <div style="font-weight: 500;">Email Notifications</div>
                            <div style="font-size: 0.875rem; color: #6b7280;">Receive updates via email</div>
                        </div>
                        <input type="checkbox" id="notif-email" ${store.user.notifications.email ? 'checked' : ''}>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f9fafb; border-radius: 0.5rem; margin-bottom: 1rem;">
                        <div>
                            <div style="font-weight: 500;">SMS Notifications</div>
                            <div style="font-size: 0.875rem; color: #6b7280;">Receive updates via text</div>
                        </div>
                        <input type="checkbox" id="notif-sms" ${store.user.notifications.sms ? 'checked' : ''}>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f9fafb; border-radius: 0.5rem; margin-bottom: 1rem;">
                        <div>
                            <div style="font-weight: 500;">Follow-up Reminders</div>
                            <div style="font-size: 0.875rem; color: #6b7280;">Get reminded about scheduled follow-ups</div>
                        </div>
                        <input type="checkbox" id="notif-followup" ${store.user.notifications.followUpReminders ? 'checked' : ''}>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #f9fafb; border-radius: 0.5rem;">
                        <div>
                            <div style="font-weight: 500;">Commission Alerts</div>
                            <div style="font-size: 0.875rem; color: #6b7280;">Notify when commissions are paid</div>
                        </div>
                        <input type="checkbox" id="notif-commission" ${store.user.notifications.commissionAlerts ? 'checked' : ''}>
                    </div>
                </div>
                <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb;">
                    <button class="btn btn-primary" onclick="saveSettings()">Save Changes</button>
                </div>
            `;
            break;
            
        case 'commission':
            container.innerHTML = `
                <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1.5rem;">Commission Settings</h3>
                <div class="form-group" style="max-width: 400px;">
                    <label class="form-label">Annual Commission Goal</label>
                    <input type="number" class="form-input" id="setting-goal" value="${store.user.commissionGoal}">
                    <div style="font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem;">Current progress: $${store.commissions.reduce((sum, c) => sum + c.total_commission, 0).toLocaleString()}</div>
                </div>
                <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb;">
                    <button class="btn btn-primary" onclick="saveSettings()">Save Changes</button>
                </div>
            `;
            break;
            
        case 'preferences':
            container.innerHTML = `
                <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1.5rem;">Application Preferences</h3>
                <p style="color: #6b7280;">Customize your CRM experience.</p>
                <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb;">
                    <button class="btn btn-primary" onclick="saveSettings()">Save Changes</button>
                </div>
            `;
            break;
    }
}

function saveSettings() {
    const firstName = document.getElementById('setting-firstname');
    const lastName = document.getElementById('setting-lastname');
    const email = document.getElementById('setting-email');
    const phone = document.getElementById('setting-phone');
    const company = document.getElementById('setting-company');
    const goal = document.getElementById('setting-goal');
    
    if (firstName) store.user.firstName = firstName.value;
    if (lastName) store.user.lastName = lastName.value;
    if (email) store.user.email = email.value;
    if (phone) store.user.phone = phone.value;
    if (company) store.user.company = company.value;
    if (goal) store.user.commissionGoal = parseInt(goal.value);
    
    const notifEmail = document.getElementById('notif-email');
    const notifSms = document.getElementById('notif-sms');
    const notifFollowup = document.getElementById('notif-followup');
    const notifCommission = document.getElementById('notif-commission');
    
    if (notifEmail) store.user.notifications.email = notifEmail.checked;
    if (notifSms) store.user.notifications.sms = notifSms.checked;
    if (notifFollowup) store.user.notifications.followUpReminders = notifFollowup.checked;
    if (notifCommission) store.user.notifications.commissionAlerts = notifCommission.checked;
    
    saveStore(); // FIXED: Save to localStorage
    alert('Settings saved successfully!');
}

// ============================================
// Lead Import from Lead Generator
// ============================================

const CRM_BRIDGE_KEY = 'mca_crm_bridge';

function checkForLeadGeneratorImports() {
    try {
        const bridgeData = localStorage.getItem(CRM_BRIDGE_KEY);
        if (!bridgeData) return 0;
        
        const leads = JSON.parse(bridgeData);
        return Array.isArray(leads) ? leads.length : 0;
    } catch (e) {
        console.error('Error checking bridge:', e);
        return 0;
    }
}

function importLeadsFromBridge() {
    try {
        const bridgeData = localStorage.getItem(CRM_BRIDGE_KEY);
        if (!bridgeData) {
            alert('No leads found in bridge storage. Go to Lead Generator and select leads to export.');
            return;
        }
        
        const leads = JSON.parse(bridgeData);
        if (!Array.isArray(leads) || leads.length === 0) {
            alert('No leads found to import.');
            return;
        }
        
        // Add leads to CRM
        let imported = 0;
        let duplicates = 0;
        
        leads.forEach(lead => {
            // Check for duplicates by phone
            const exists = store.leads.some(l => 
                l.phone === lead.phone && lead.phone !== ''
            );
            
            if (exists) {
                duplicates++;
            } else {
                store.leads.unshift(lead);
                imported++;
                
                // Add activity
                store.activities.unshift({
                    id: String(Date.now() + Math.random()),
                    lead_id: lead.id,
                    type: 'status_change',
                    subject: 'Lead Imported',
                    content: `Imported from Lead Generator (${lead.source || 'Unknown'})`,
                    created_at: new Date().toISOString()
                });
            }
        });
        
        saveStore();
        
        // Clear the bridge
        localStorage.removeItem(CRM_BRIDGE_KEY);
        
        // Show result
        alert(`Import Complete!\n\n✅ Imported: ${imported} leads\n⚠️ Duplicates skipped: ${duplicates}\n\nYour leads are now in the CRM.`);
        
        // Refresh current view
        const currentPage = document.querySelector('.nav-item.active')?.dataset.page;
        if (currentPage) {
            navigate(currentPage);
        }
        
        // Hide import banner
        const banner = document.getElementById('import-banner');
        if (banner) banner.style.display = 'none';
        
    } catch (e) {
        console.error('Import error:', e);
        alert('Error importing leads. Please try again.');
    }
}

// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Check for lead generator imports
    const importCount = checkForLeadGeneratorImports();
    if (importCount > 0) {
        const banner = document.getElementById('import-banner');
        const countSpan = document.getElementById('import-count');
        if (banner && countSpan) {
            banner.style.display = 'block';
            countSpan.textContent = importCount;
        }
    }
    
    const hash = window.location.hash.substring(1);
    if (hash) {
        const [page, id] = hash.split('/');
        if (page === 'lead-detail' && id) {
            navigate('lead-detail', { id });
        } else if (['dashboard', 'leads', 'pipeline', 'calendar', 'commissions', 'funders', 'settings'].includes(page)) {
            navigate(page);
        } else {
            navigate('dashboard');
        }
    } else {
        navigate('dashboard');
    }
});

function formatActivityTime(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const addLeadModal = document.getElementById('add-lead-modal');
    const activityModal = document.getElementById('activity-modal');
    const quickCallModal = document.getElementById('quick-call-modal');
    
    if (e.target === addLeadModal) {
        hideAddLeadModal();
    }
    if (e.target === activityModal) {
        hideActivityModal();
    }
    if (e.target === quickCallModal) {
        hideQuickCallModal();
    }
});
