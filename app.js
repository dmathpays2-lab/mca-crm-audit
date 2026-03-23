// MCA CRM JavaScript Application - PREMIUM VERSION (FIXED)
// Premium Design System with GSAP animations, custom cursor, and preloader

// ============================================
// PRELOADER
// ============================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('preloader-progress');
    const progressText = document.getElementById('preloader-text');
    
    if (!preloader || !progressBar || !progressText) return;
    
    let progress = 0;
    const duration = 1500; // 1.5 seconds
    const interval = 20;
    const increment = 100 / (duration / interval);
    
    const loadingInterval = setInterval(() => {
        progress += increment;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            progressBar.style.width = '100%';
            progressText.textContent = 'Loading... 100%';
            
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    initAnimations();
                    initMobileMenu();
                }, 100);
            }, 300);
        } else {
            progressBar.style.width = progress + '%';
            progressText.textContent = 'Loading... ' + Math.round(progress) + '%';
        }
    }, interval);
}

// ============================================
// CUSTOM CURSOR (Desktop Only)
// ============================================
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('custom-cursor-dot');
    
    // Check if touch device - hide cursor elements
    if (window.matchMedia('(pointer: coarse)').matches) {
        if (cursor) cursor.style.display = 'none';
        if (cursorDot) cursorDot.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }
    
    if (!cursor || !cursorDot) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    let isActive = true;
    let rafId = null;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!isActive) {
            isActive = true;
            animateCursor();
        }
    }, { passive: true });
    
    function animateCursor() {
        if (!isActive) return;
        
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        dotX += (mouseX - dotX) * 0.35;
        dotY += (mouseY - dotY) * 0.35;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        
        rafId = requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects using event delegation
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, .nav-item, .stat-card, .card, .lead-card, .pipeline-column, input, select, textarea')) {
            cursor.classList.add('hover');
        }
    }, { passive: true });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a, button, .nav-item, .stat-card, .card, .lead-card, .pipeline-column, input, select, textarea')) {
            cursor.classList.remove('hover');
        }
    }, { passive: true });
    
    document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
    document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));
    
    // Pause when tab hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            isActive = false;
            if (rafId) cancelAnimationFrame(rafId);
        }
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const hamburger = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    if (!hamburger || !sidebar) return;
    
    function openMenu() {
        sidebar.classList.add('open');
        if (overlay) overlay.classList.add('active');
        hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (sidebar.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
    
    // Close menu when clicking nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                closeMenu();
            }
        });
    });
    
    // Close on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeMenu();
        }
    }, { passive: true });
}

// ============================================
// GSAP ANIMATIONS
// ============================================
function initAnimations() {
    if (typeof gsap === 'undefined') return;
    
    try {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero parallax
        gsap.to('.hero-section', {
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            y: 50,
            opacity: 0.7
        });
        
        // Reveal animations
        gsap.utils.toArray('.gsap-reveal').forEach((elem, i) => {
            gsap.fromTo(elem, 
                { opacity: 0, y: 20 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: 'power2.out'
                }
            );
        });
        
        // Left reveal
        gsap.utils.toArray('.gsap-reveal-left').forEach((elem, i) => {
            gsap.fromTo(elem, 
                { opacity: 0, x: -20 },
                { 
                    opacity: 1, 
                    x: 0, 
                    duration: 0.6,
                    delay: 0.1 + i * 0.08,
                    ease: 'power2.out'
                }
            );
        });
        
        // Right reveal
        gsap.utils.toArray('.gsap-reveal-right').forEach((elem, i) => {
            gsap.fromTo(elem, 
                { opacity: 0, x: 20 },
                { 
                    opacity: 1, 
                    x: 0, 
                    duration: 0.6,
                    delay: 0.15 + i * 0.08,
                    ease: 'power2.out'
                }
            );
        });
        
        // Scale animations
        gsap.utils.toArray('.gsap-scale').forEach((elem, i) => {
            gsap.fromTo(elem, 
                { opacity: 0, scale: 0.95 },
                { 
                    opacity: 1, 
                    scale: 1, 
                    duration: 0.6,
                    delay: 0.2 + i * 0.08,
                    ease: 'back.out(1.4)'
                }
            );
        });
        
        // Sidebar items
        gsap.fromTo('.nav-item', 
            { opacity: 0, x: -15 },
            { 
                opacity: 1, 
                x: 0, 
                duration: 0.4,
                stagger: 0.06,
                ease: 'power2.out',
                delay: 0.3
            }
        );
        
        // Logo
        gsap.fromTo('.logo', 
            { opacity: 0, scale: 0.9 },
            { 
                opacity: 1, 
                scale: 1, 
                duration: 0.6,
                ease: 'back.out(1.4)',
                delay: 0.2
            }
        );
    } catch (e) {
        console.warn('GSAP animation error:', e);
    }
}

// ============================================
// ANIMATED COUNTERS
// ============================================
function animateCounter(element, target, duration = 1500, prefix = '', suffix = '') {
    if (!element) return;
    
    const start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeProgress);
        
        element.textContent = prefix + current.toLocaleString() + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = prefix + target.toLocaleString() + suffix;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function animateCounters() {
    document.querySelectorAll('.counter-value[data-target]').forEach(counter => {
        const target = parseInt(counter.dataset.target) || 0;
        const suffix = counter.id === 'stat-conversion' ? '%' : '';
        animateCounter(counter, target, 1500, '', suffix);
    });
}

function animateMoneyValue(element, targetValue, duration = 1500) {
    if (!element) return;
    
    const startTime = performance.now();
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = targetValue * easeProgress;
        
        element.textContent = '$' + Math.floor(current).toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        } else {
            element.textContent = '$' + targetValue.toLocaleString();
        }
    }
    
    requestAnimationFrame(updateValue);
}

// ============================================
// Data Store with localStorage Persistence
// ============================================
const STORAGE_KEY = 'mca_crm_data';
const DEMO_LOADED_KEY = 'mca_crm_demo_loaded';

// Default funder reference data (not user data, so always available)
const defaultFunders = [
    { id: '1', name: 'Rapid Capital', tier: 'tier_1_beginner', min_deal_amount: 5000, max_deal_amount: 50000, default_commission_rate: 8, avg_turnaround_hours: 24, is_preferred: true, contact_name: 'James Wilson', contact_email: 'james@rapidcapital.com' },
    { id: '2', name: 'Progressive Funding', tier: 'tier_1_beginner', min_deal_amount: 10000, max_deal_amount: 75000, default_commission_rate: 9, avg_turnaround_hours: 48, is_preferred: false, contact_name: 'Amy Chen', contact_email: 'amy@progressive.com' },
    { id: '3', name: 'Summit Financial', tier: 'tier_2_intermediate', min_deal_amount: 25000, max_deal_amount: 150000, default_commission_rate: 10, avg_turnaround_hours: 72, is_preferred: true, contact_name: 'Mark Stevens', contact_email: 'mark@summitfin.com' },
    { id: '4', name: 'Atlas Capital', tier: 'tier_2_intermediate', min_deal_amount: 30000, max_deal_amount: 200000, default_commission_rate: 11, avg_turnaround_hours: 48, is_preferred: false, contact_name: 'Rachel Green', contact_email: 'rachel@atlascap.com' },
    { id: '5', name: 'Premier Lending Group', tier: 'tier_3_advanced', min_deal_amount: 50000, max_deal_amount: 500000, default_commission_rate: 12, avg_turnaround_hours: 72, is_preferred: true, contact_name: 'Michael Torres', contact_email: 'michael@premier.com' },
    { id: '6', name: 'Vanguard Merchant', tier: 'tier_4_premium', min_deal_amount: 100000, max_deal_amount: 2000000, default_commission_rate: 15, avg_turnaround_hours: 96, is_preferred: true, contact_name: 'Sarah Kim', contact_email: 'sarah@vanguard.com' },
];

// Demo data generator function (only called when user requests demo)
function generateDemoLeads() {
    const industries = ['Transportation', 'Food & Beverage', 'Construction', 'Retail', 'Technology', 'Automotive', 'Beauty', 'Healthcare', 'Manufacturing', 'Real Estate', 'Professional Services', 'Wholesale'];
    const businessTypes = ['LLC', 'Inc', 'Corp', 'Company', 'Services', 'Solutions', 'Group'];
    const contacts = ['John', 'Michael', 'David', 'James', 'Robert', 'William', 'Maria', 'Jennifer', 'Lisa', 'Sarah', 'Jessica', 'Emily'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    
    const leads = [];
    
    for (let i = 1; i <= 60; i++) {
        const revenue = Math.floor(Math.random() * 180000) + 15000;
        const years = Math.floor(Math.random() * 12) + 1;
        const industry = industries[Math.floor(Math.random() * industries.length)];
        const temp = Math.random() > 0.6 ? 'HOT' : (Math.random() > 0.4 ? 'WARM' : 'COLD');
        
        const stages = ['new_lead', 'contacted', 'qualified', 'application_sent', 'submitted_to_funder', 'approved', 'funded', 'paid'];
        const stageWeights = [0.15, 0.15, 0.15, 0.15, 0.15, 0.1, 0.1, 0.05];
        const stage = weightedRandom(stages, stageWeights);
        
        const score = Math.min(95, Math.floor(revenue / 2500) + (years * 3) + Math.floor(Math.random() * 20));
        
        leads.push({
            id: i.toString(),
            business_name: `${contacts[Math.floor(Math.random() * contacts.length)]}'s ${industry} ${businessTypes[Math.floor(Math.random() * businessTypes.length)]}`,
            industry: industry,
            contact_name: `${contacts[Math.floor(Math.random() * contacts.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
            phone: `(${555 + Math.floor(Math.random() * 400)}) ${Math.floor(100 + Math.random() * 899)}-${Math.floor(1000 + Math.random() * 8999)}`,
            email: `contact${i}@business${i}.com`,
            monthly_revenue: revenue,
            years_in_business: years,
            score: score,
            temperature: temp,
            stage: stage,
            created_at: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });
    }
    
    return leads;
}

function generateDemoActivities() {
    return [
        { id: '1', lead_id: '1', type: 'call', subject: 'Initial consultation', content: 'Discussed funding needs for expansion', created_at: '2025-03-20T10:00:00' },
        { id: '2', lead_id: '1', type: 'email', subject: 'Document request', content: 'Sent bank statements and tax returns', created_at: '2025-03-21T14:30:00' },
        { id: '3', lead_id: '2', type: 'call', subject: 'Follow-up call', content: 'Left voicemail, will try again tomorrow', created_at: '2025-03-22T11:00:00' },
        { id: '4', lead_id: '3', type: 'email', subject: 'Application submitted', content: 'All documents received, application sent to underwriting', created_at: '2025-03-19T16:00:00' },
        { id: '5', lead_id: '10', type: 'status_change', subject: 'Status: Funded', content: 'Deal funded for $250,000', created_at: '2025-03-15T09:00:00' },
        { id: '6', lead_id: '15', type: 'call', subject: 'Discovery call', content: 'Qualified lead, needs $150K for equipment', created_at: '2025-03-21T13:30:00' },
        { id: '7', lead_id: '22', type: 'meeting', subject: 'In-person meeting', content: 'Reviewed terms, moving to application', created_at: '2025-03-20T15:00:00' },
        { id: '8', lead_id: '8', type: 'email', subject: 'Approval notification', content: 'Congratulations! Approved for $180K', created_at: '2025-03-22T10:00:00' },
    ];
}

function generateDemoFollowUps() {
    return [
        { id: '1', lead_id: '1', title: 'Review bank statements', due_at: '2025-03-24T10:00:00', status: 'pending' },
        { id: '2', lead_id: '2', title: 'Follow up call', due_at: '2025-03-24T14:00:00', status: 'pending' },
        { id: '3', lead_id: '5', title: 'Check submission status', due_at: '2025-03-25T11:00:00', status: 'pending' },
        { id: '4', lead_id: '3', title: 'Collect missing docs', due_at: '2025-03-23T16:00:00', status: 'completed' },
        { id: '5', lead_id: '12', title: 'Send application link', due_at: '2025-03-24T09:00:00', status: 'pending' },
        { id: '6', lead_id: '18', title: 'Schedule follow-up', due_at: '2025-03-25T14:30:00', status: 'pending' },
    ];
}

function generateDemoCommissions() {
    return [
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
        { month: 'Mar 2025', deals_funded: 5, total_funded: 925000, total_commission: 92500, avg_commission_rate: 10 },
    ];
}

// Load demo data into the store
function loadDemoData() {
    if (!confirm('This will load 60 sample leads with demo activities, follow-ups, and commission history. Your current data will be preserved unless you clear it first. Continue?')) {
        return;
    }
    
    store.leads = generateDemoLeads();
    store.activities = generateDemoActivities();
    store.followUps = generateDemoFollowUps();
    store.commissions = generateDemoCommissions();
    
    localStorage.setItem(DEMO_LOADED_KEY, 'true');
    saveStore();
    
    // Refresh current page
    const currentPage = document.querySelector('.nav-item.active')?.dataset.page || 'dashboard';
    navigate(currentPage);
    
    alert('Demo data loaded successfully! 60 leads, 8 activities, 6 follow-ups, and 12 months of commission history.');
}

// Clear all user data
function clearAllData() {
    if (!confirm('⚠️ WARNING: This will permanently delete ALL your leads, activities, follow-ups, and commission history. This cannot be undone.\n\nAre you sure you want to continue?')) {
        return;
    }
    
    if (!confirm('Last chance: All your data will be erased. Type "yes" in your mind to confirm.')) {
        return;
    }
    
    store.leads = [];
    store.activities = [];
    store.followUps = [];
    store.commissions = [];
    
    localStorage.removeItem(DEMO_LOADED_KEY);
    localStorage.removeItem('mca_crm_data_restored');
    saveStore();
    
    // Refresh current page
    const currentPage = document.querySelector('.nav-item.active')?.dataset.page || 'dashboard';
    navigate(currentPage);
    
    alert('All data has been cleared. Your CRM is now empty and ready for real work.');
}

// Check if demo data is loaded
function isDemoDataLoaded() {
    return localStorage.getItem(DEMO_LOADED_KEY) === 'true';
}

const defaultData = {
    leads: [],
    activities: [],
    followUps: [],
    funders: defaultFunders,
    commissions: [],
    user: {
        firstName: 'Damon',
        lastName: 'Mathewson',
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

function weightedRandom(items, weights) {
    const random = Math.random();
    let sum = 0;
    for (let i = 0; i < items.length; i++) {
        sum += weights[i];
        if (random < sum) return items[i];
    }
    return items[items.length - 1];
}

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

function saveStore() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

const store = loadStore();

// ============================================
// Navigation
// ============================================
let currentLeadId = null;
let currentMonth = new Date();
let currentSettingsTab = 'profile';

function navigate(page, params = {}) {
    // Update sidebar active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === page) {
            item.classList.add('active');
        }
    });
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(page + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Handle specific pages
    switch(page) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'leads':
            renderLeads();
            break;
        case 'pipeline':
            renderPipeline();
            break;
        case 'lead-detail':
            currentLeadId = params.id;
            renderLeadDetail();
            break;
        case 'calendar':
            renderCalendar();
            break;
        case 'commissions':
            renderCommissions();
            break;
        case 'funders':
            renderFunders();
            break;
        case 'settings':
            renderSettings();
            break;
    }
    
    // Update URL hash
    window.location.hash = page + (params.id ? '/' + params.id : '');
}

function navigateToAddLead() {
    navigate('leads');
    setTimeout(() => showAddLeadModal(), 150);
}

// ============================================
// Dashboard
// ============================================
function renderDashboard() {
    const stats = calculateStats();
    
    // Update DOM elements
    const totalLeadsEl = document.getElementById('stat-total-leads');
    const hotLeadsEl = document.getElementById('stat-hot');
    const warmLeadsEl = document.getElementById('stat-warm');
    const statHotLeadsEl = document.getElementById('stat-hot-leads');
    const pipelineEl = document.getElementById('stat-pipeline');
    const conversionEl = document.getElementById('stat-conversion');
    const avgDealEl = document.getElementById('stat-avg-deal');
    const commissionEl = document.getElementById('stat-commission');
    const dealsEl = document.getElementById('stat-deals');
    
    if (totalLeadsEl) {
        totalLeadsEl.textContent = stats.totalLeads;
        totalLeadsEl.dataset.target = stats.totalLeads;
    }
    if (hotLeadsEl) hotLeadsEl.textContent = stats.hotLeads;
    if (warmLeadsEl) warmLeadsEl.textContent = stats.warmLeads;
    if (statHotLeadsEl) {
        statHotLeadsEl.textContent = stats.hotLeads;
        statHotLeadsEl.dataset.target = stats.hotLeads;
    }
    if (pipelineEl) pipelineEl.textContent = '$' + stats.pipelineValue.toLocaleString();
    if (conversionEl) {
        conversionEl.textContent = stats.conversionRate + '%';
        conversionEl.dataset.target = parseFloat(stats.conversionRate);
    }
    if (avgDealEl) avgDealEl.textContent = stats.avgDealSize.toLocaleString();
    if (commissionEl) commissionEl.textContent = '$' + stats.commissionThisMonth.toLocaleString();
    if (dealsEl) dealsEl.textContent = stats.dealsThisMonth;
    
    // Path to $1M
    const pathProgress = (stats.totalCommission / store.user.commissionGoal) * 100;
    const pathPercentEl = document.getElementById('path-percentage');
    const pathFillEl = document.getElementById('path-fill');
    const pathEarnedEl = document.getElementById('path-earned');
    
    if (pathPercentEl) pathPercentEl.textContent = pathProgress.toFixed(1) + '%';
    if (pathFillEl) pathFillEl.style.width = Math.min(100, pathProgress) + '%';
    if (pathEarnedEl) pathEarnedEl.textContent = stats.totalCommission.toLocaleString();
    
    renderPipelineSummary();
    renderTodaysFollowUps();
    renderRecentActivity();
    
    // Animate counters
    setTimeout(() => {
        animateCounters();
        const pipelineValueEl = document.getElementById('stat-pipeline');
        const commissionThisMonthEl = document.getElementById('stat-commission');
        if (pipelineValueEl) animateMoneyValue(pipelineValueEl, stats.pipelineValue, 1500);
        if (commissionThisMonthEl) animateMoneyValue(commissionThisMonthEl, stats.commissionThisMonth, 1500);
    }, 300);
}

function calculateStats() {
    const totalLeads = store.leads.length;
    const hotLeads = store.leads.filter(l => l.temperature === 'HOT').length;
    const warmLeads = store.leads.filter(l => l.temperature === 'WARM').length;
    
    const fundedLeads = store.leads.filter(l => l.stage === 'funded' || l.stage === 'paid');
    const conversionRate = totalLeads > 0 ? ((fundedLeads.length / totalLeads) * 100).toFixed(1) : '0.0';
    
    const pipelineValue = store.leads
        .filter(l => !['funded', 'paid'].includes(l.stage))
        .reduce((sum, l) => sum + (l.monthly_revenue || 0) * 3, 0);
    
    const avgDealSize = fundedLeads.length > 0 
        ? Math.floor(fundedLeads.reduce((sum, l) => sum + (l.monthly_revenue || 0) * 3, 0) / fundedLeads.length)
        : 0;
    
    const thisMonth = store.commissions.length > 0 ? store.commissions[store.commissions.length - 1] : null;
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
    
    const container = document.getElementById('pipeline-summary');
    if (!container) return;
    
    container.innerHTML = stages.map(s => `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
            <div style="display: flex; align-items: center;">
                <div style="width: 12px; height: 12px; border-radius: 50%; background: ${s.color}; margin-right: 0.5rem;"></div>
                <span style="font-size: 0.875rem; color: rgba(255,255,255,0.8);">${s.name}</span>
            </div>
            <span style="font-weight: 600; color: #fff;">${stageCounts[s.key] || 0}</span>
        </div>
    `).join('');
}

function renderTodaysFollowUps() {
    const today = new Date().toISOString().split('T')[0];
    const todaysFollowUps = store.followUps.filter(f => {
        const dueDate = f.due_at.split('T')[0];
        return dueDate === today && f.status === 'pending';
    });
    
    const container = document.getElementById('todays-followups');
    if (!container) return;
    
    if (todaysFollowUps.length === 0) {
        container.innerHTML = '<p style="color: rgba(255,255,255,0.5); font-size: 0.875rem;">No follow-ups scheduled for today.</p>';
        return;
    }
    
    container.innerHTML = todaysFollowUps.map(f => {
        const lead = store.leads.find(l => l.id === f.lead_id);
        return `
            <div class="follow-up-item" onclick="navigate('lead-detail', {id: '${f.lead_id}'})" style="cursor: pointer;">
                <i class="fas fa-clock" style="color: var(--gold); margin-right: 0.75rem;"></i>
                <div style="flex: 1;">
                    <div style="font-weight: 500; color: #fff;">${lead ? lead.business_name : 'Unknown'}</div>
                    <div style="font-size: 0.75rem; color: rgba(255,255,255,0.6);">${f.title}</div>
                </div>
                <span style="font-size: 0.75rem; color: rgba(255,255,255,0.5);">${f.due_at.split('T')[1].substring(0, 5)}</span>
            </div>
        `;
    }).join('');
}

function renderRecentActivity() {
    const recentActivities = store.activities
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);
    
    const container = document.getElementById('recent-activity');
    if (!container) return;
    
    if (recentActivities.length === 0) {
        container.innerHTML = '<p style="color: rgba(255,255,255,0.5); font-size: 0.875rem;">No recent activity.</p>';
        return;
    }
    
    container.innerHTML = recentActivities.map(a => {
        const lead = store.leads.find(l => l.id === a.lead_id);
        const config = getActivityTypeConfig(a.type);
        return `
            <div class="activity-row" onclick="navigate('lead-detail', {id: '${a.lead_id}'})" style="cursor: pointer;">
                <div style="width: 32px; height: 32px; background: ${config.color}20; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 0.75rem; color: ${config.color}; flex-shrink: 0;">
                    <i class="fas fa-${config.icon}" style="font-size: 0.75rem;"></i>
                </div>
                <div style="flex: 1; min-width: 0;">
                    <div style="font-size: 0.875rem;">
                        <span style="font-weight: 500; color: #fff;">${lead ? lead.business_name : 'Unknown'}</span>
                        <span style="color: rgba(255,255,255,0.6);"> — ${config.label}</span>
                    </div>
                    <div style="font-size: 0.75rem; color: rgba(255,255,255,0.4);">${formatActivityTime(a.created_at)}</div>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// Leads List
// ============================================
function renderLeads() {
    filterLeads();
}

function filterLeads() {
    const searchInput = document.getElementById('lead-search');
    const stageFilter = document.getElementById('filter-stage');
    const tempFilter = document.getElementById('filter-temp');
    
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    const stage = stageFilter ? stageFilter.value : '';
    const temp = tempFilter ? tempFilter.value : '';
    
    let filtered = store.leads.filter(lead => {
        const matchesSearch = !search || 
            (lead.business_name && lead.business_name.toLowerCase().includes(search)) ||
            (lead.contact_name && lead.contact_name.toLowerCase().includes(search)) ||
            (lead.email && lead.email.toLowerCase().includes(search)) ||
            (lead.phone && lead.phone.includes(search));
        
        const matchesStage = !stage || lead.stage === stage;
        const matchesTemp = !temp || lead.temperature === temp;
        
        return matchesSearch && matchesStage && matchesTemp;
    });
    
    const tbody = document.getElementById('leads-table');
    if (!tbody) return;
    
    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 2rem; color: rgba(255,255,255,0.5);">No leads found.</td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = filtered.map(lead => `
        <tr class="lead-table-row">
            <td onclick="navigate('lead-detail', {id: '${lead.id}'});">
                <div style="font-weight: 500; color: #fff;">${lead.business_name}</div>
                <div style="font-size: 0.75rem; color: rgba(255,255,255,0.5);">${lead.industry || '-'}</div>
            </td>
            <td onclick="navigate('lead-detail', {id: '${lead.id}'});">
                <div style="color: #fff;">${lead.contact_name || '-'}</div>
                <div style="font-size: 0.75rem; color: rgba(255,255,255,0.5);">${lead.email || '-'}</div>
            </td>
            <td onclick="navigate('lead-detail', {id: '${lead.id}'});">
                <div style="color: #fff;">${lead.monthly_revenue ? '$' + lead.monthly_revenue.toLocaleString() : '-'}</div>
                <div style="font-size: 0.75rem; color: rgba(255,255,255,0.5);">${lead.years_in_business || '-'} years</div>
            </td>
            <td onclick="navigate('lead-detail', {id: '${lead.id}'});"><div style="font-weight: 500; color: var(--gold);">${lead.score || '-'}</div></td>
            <td onclick="navigate('lead-detail', {id: '${lead.id}'});"><span class="badge badge-${lead.temperature.toLowerCase()}">${lead.temperature}</span></td>
            <td onclick="navigate('lead-detail', {id: '${lead.id}'});"><span class="badge badge-${lead.stage}">${lead.stage.replace(/_/g, ' ')}</span></td>
            <td>
                <div class="lead-actions">
                    <button class="quick-action-btn call" onclick="event.stopPropagation(); showQuickCallModal('${lead.id}');" title="Log Call">
                        <i class="fas fa-phone"></i> <span class="btn-text">Log</span>
                    </button>
                    <button class="btn btn-secondary btn-icon" onclick="event.stopPropagation(); navigate('lead-detail', {id: '${lead.id}'});" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-secondary btn-icon btn-danger" onclick="event.stopPropagation(); deleteLead('${lead.id}');" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function showAddLeadModal() {
    const modal = document.getElementById('add-lead-modal');
    if (modal) {
        modal.style.display = 'flex';
        // Focus first input
        setTimeout(() => {
            const firstInput = document.getElementById('new-business-name');
            if (firstInput) firstInput.focus();
        }, 100);
    }
}

function hideAddLeadModal() {
    const modal = document.getElementById('add-lead-modal');
    if (modal) {
        modal.style.display = 'none';
    }
    // Clear form
    const fields = ['new-business-name', 'new-industry', 'new-contact-name', 'new-phone', 'new-email', 'new-revenue'];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
}

function addLead() {
    const businessNameInput = document.getElementById('new-business-name');
    const businessName = businessNameInput ? businessNameInput.value.trim() : '';
    
    if (!businessName) {
        alert('Business name is required');
        return;
    }
    
    const revenueInput = document.getElementById('new-revenue');
    const revenue = revenueInput ? parseInt(revenueInput.value) || 0 : 0;
    
    const newLead = {
        id: Date.now().toString(),
        business_name: businessName,
        industry: document.getElementById('new-industry')?.value || '',
        contact_name: document.getElementById('new-contact-name')?.value || '',
        phone: document.getElementById('new-phone')?.value || '',
        email: document.getElementById('new-email')?.value || '',
        monthly_revenue: revenue,
        temperature: 'WARM',
        stage: 'new_lead',
        score: Math.floor(Math.random() * 40) + 40,
        created_at: new Date().toISOString().split('T')[0]
    };
    
    store.leads.push(newLead);
    saveStore();
    
    hideAddLeadModal();
    navigate('leads');
}

function deleteLead(leadId) {
    if (!confirm('Are you sure you want to delete this lead?')) {
        return;
    }
    
    const index = store.leads.findIndex(l => l.id === leadId);
    if (index > -1) {
        store.leads.splice(index, 1);
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
        { id: 'new_lead', name: 'New Lead', color: '#3b82f6' },
        { id: 'contacted', name: 'Contacted', color: '#a855f7' },
        { id: 'qualified', name: 'Qualified', color: '#14b8a6' },
        { id: 'application_sent', name: 'Application Sent', color: '#6366f1' },
        { id: 'submitted_to_funder', name: 'Submitted to Funder', color: '#06b6d4' },
        { id: 'approved', name: 'Approved', color: '#10b981' },
        { id: 'funded', name: 'Funded', color: '#22c55e' },
        { id: 'paid', name: 'Paid', color: '#84cc16' },
    ];
    
    const container = document.getElementById('pipeline-container');
    if (!container) return;
    
    container.innerHTML = stages.map(stage => {
        const stageLeads = store.leads.filter(l => l.stage === stage.id);
        
        return `
            <div class="pipeline-column">
                <div class="pipeline-header" style="background: ${stage.color};">
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
                                <span style="font-size: 0.75rem; color: rgba(255,255,255,0.5);">Score: ${lead.score}</span>
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
    
    const businessNameEl = document.getElementById('detail-business-name');
    const tempSelect = document.getElementById('detail-temperature');
    const stageSelect = document.getElementById('detail-stage');
    const scoreEl = document.getElementById('detail-score');
    const revenueEl = document.getElementById('detail-revenue');
    
    if (businessNameEl) businessNameEl.textContent = lead.business_name;
    if (tempSelect) tempSelect.value = lead.temperature;
    if (stageSelect) stageSelect.value = lead.stage;
    if (scoreEl) scoreEl.textContent = lead.score || '-';
    if (revenueEl) revenueEl.textContent = lead.monthly_revenue ? '$' + lead.monthly_revenue.toLocaleString() : '-';
    
    // Contact Info
    const contactInfo = document.getElementById('detail-contact-info');
    if (contactInfo) {
        contactInfo.innerHTML = `
            ${lead.contact_name ? `
            <div class="detail-item">
                <i class="fas fa-user"></i>
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
    }
    
    // Business Info
    const businessInfo = document.getElementById('detail-business-info');
    if (businessInfo) {
        businessInfo.innerHTML = `
            <div class="detail-info-grid">
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
    }
    
    // Activities Timeline
    const leadActivities = store.activities
        .filter(a => a.lead_id === lead.id)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    const activitiesContainer = document.getElementById('detail-activities');
    if (activitiesContainer) {
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
    }
    
    // Follow-ups
    const leadFollowUps = store.followUps
        .filter(f => f.lead_id === lead.id)
        .sort((a, b) => new Date(a.due_at) - new Date(b.due_at));
    
    const followUpsContainer = document.getElementById('detail-followups');
    if (followUpsContainer) {
        if (leadFollowUps.length === 0) {
            followUpsContainer.innerHTML = '<p style="color: rgba(255,255,255,0.5);">No follow-ups scheduled.</p>';
        } else {
            followUpsContainer.innerHTML = leadFollowUps.map(f => `
                <div class="follow-up-card">
                    <div>
                        <div style="font-weight: 500; color: #fff;">${f.title}</div>
                        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.5);">Due: ${new Date(f.due_at).toLocaleString()}</div>
                    </div>
                    <span class="badge badge-${f.status === 'completed' ? 'funded' : 'warm'}">${f.status}</span>
                </div>
            `).join('');
        }
    }
}

const ACTIVITY_TYPES = {
    call_outbound: { label: 'Call - Outbound', icon: 'phone', color: '#2563eb', category: 'call' },
    call_inbound: { label: 'Call - Inbound', icon: 'phone', color: '#16a34a', category: 'call' },
    email_sent: { label: 'Email - Sent', icon: 'envelope', color: '#db2777', category: 'email' },
    email_received: { label: 'Email - Received', icon: 'envelope', color: '#9333ea', category: 'email' },
    meeting: { label: 'Meeting', icon: 'users', color: '#d97706', category: 'meeting' },
    note: { label: 'Note', icon: 'sticky-note', color: '#6b7280', category: 'note' },
    status_change: { label: 'Status Change', icon: 'exchange-alt', color: '#059669', category: 'status' }
};

let currentActivityLeadId = null;
let quickCallLeadId = null;

function showActivityModal(leadId = null) {
    currentActivityLeadId = leadId || currentLeadId;
    if (!currentActivityLeadId) return;
    
    const modal = document.getElementById('activity-modal');
    if (!modal) return;
    
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    
    const datetimeInput = document.getElementById('activity-datetime');
    if (datetimeInput) datetimeInput.value = now.toISOString().slice(0, 16);
    
    const typeSelect = document.getElementById('activity-type');
    if (typeSelect) typeSelect.value = 'call_outbound';
    
    const subjectInput = document.getElementById('activity-subject');
    if (subjectInput) subjectInput.value = '';
    
    const contentInput = document.getElementById('activity-content');
    if (contentInput) contentInput.value = '';
    
    const followupCheck = document.getElementById('activity-followup-check');
    if (followupCheck) {
        followupCheck.checked = false;
        toggleFollowUpFields();
    }
    
    const titleEl = document.getElementById('activity-modal-title');
    const lead = store.leads.find(l => l.id === currentActivityLeadId);
    if (titleEl) {
        titleEl.textContent = lead ? `Log Activity - ${lead.business_name}` : 'Log Activity';
    }
    
    modal.style.display = 'flex';
    if (subjectInput) setTimeout(() => subjectInput.focus(), 100);
}

function hideActivityModal() {
    const modal = document.getElementById('activity-modal');
    if (modal) modal.style.display = 'none';
    currentActivityLeadId = null;
}

function toggleFollowUpFields() {
    const check = document.getElementById('activity-followup-check');
    const fields = document.getElementById('followup-fields');
    if (!fields) return;
    
    fields.style.display = check && check.checked ? 'block' : 'none';
    
    if (check && check.checked) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setMinutes(tomorrow.getMinutes() - tomorrow.getTimezoneOffset());
        
        const datetimeInput = document.getElementById('activity-followup-datetime');
        if (datetimeInput) datetimeInput.value = tomorrow.toISOString().slice(0, 16);
    }
}

function updateActivityForm() {
    const typeSelect = document.getElementById('activity-type');
    const subjectInput = document.getElementById('activity-subject');
    if (!typeSelect || !subjectInput) return;
    
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
        subjectInput.value = defaults[typeSelect.value] || '';
    }
}

function saveActivity() {
    const typeSelect = document.getElementById('activity-type');
    const subjectInput = document.getElementById('activity-subject');
    const contentInput = document.getElementById('activity-content');
    const datetimeInput = document.getElementById('activity-datetime');
    
    if (!typeSelect || !subjectInput) return;
    
    const type = typeSelect.value;
    const subject = subjectInput.value.trim();
    const content = contentInput ? contentInput.value.trim() : '';
    const datetime = datetimeInput ? datetimeInput.value : '';
    
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
    
    const followupCheck = document.getElementById('activity-followup-check');
    if (followupCheck && followupCheck.checked) {
        const followupDateInput = document.getElementById('activity-followup-datetime');
        const followupTitleInput = document.getElementById('activity-followup-title');
        
        const followupDate = followupDateInput ? followupDateInput.value : '';
        const followupTitle = followupTitleInput ? followupTitleInput.value.trim() : 'Follow-up';
        
        if (followupDate) {
            store.followUps.push({
                id: Date.now().toString(),
                lead_id: currentActivityLeadId,
                title: followupTitle || 'Follow-up',
                due_at: new Date(followupDate).toISOString(),
                status: 'pending',
                related_activity_id: activity.id
            });
        }
    }
    
    saveStore();
    hideActivityModal();
    
    // Refresh current page
    const leadDetailPage = document.getElementById('lead-detail-page');
    const leadsPage = document.getElementById('leads-page');
    const dashboardPage = document.getElementById('dashboard-page');
    
    if (leadDetailPage && leadDetailPage.classList.contains('active')) {
        renderLeadDetail();
    } else if (leadsPage && leadsPage.classList.contains('active')) {
        renderLeads();
    } else if (dashboardPage && dashboardPage.classList.contains('active')) {
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
    
    const modal = document.getElementById('quick-call-modal');
    if (!modal) return;
    
    const nameEl = document.getElementById('quick-call-lead-name');
    if (nameEl) nameEl.textContent = lead.business_name;
    
    // Reset form
    const outboundRadio = document.querySelector('input[name="quick-call-type"][value="call_outbound"]');
    if (outboundRadio) outboundRadio.checked = true;
    
    const outcomeSelect = document.getElementById('quick-call-outcome');
    if (outcomeSelect) outcomeSelect.value = 'Connected';
    
    const notesInput = document.getElementById('quick-call-notes');
    if (notesInput) notesInput.value = '';
    
    const followupCheck = document.getElementById('quick-call-schedule-followup');
    if (followupCheck) {
        followupCheck.checked = false;
        const followupFields = document.getElementById('quick-call-followup-fields');
        if (followupFields) followupFields.style.display = 'none';
    }
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setMinutes(tomorrow.getMinutes() - tomorrow.getTimezoneOffset());
    
    const followupDateInput = document.getElementById('quick-call-followup-date');
    if (followupDateInput) followupDateInput.value = tomorrow.toISOString().slice(0, 16);
    
    modal.style.display = 'flex';
}

function hideQuickCallModal() {
    const modal = document.getElementById('quick-call-modal');
    if (modal) modal.style.display = 'none';
    quickCallLeadId = null;
}

function saveQuickCall() {
    const callTypeRadio = document.querySelector('input[name="quick-call-type"]:checked');
    const outcomeSelect = document.getElementById('quick-call-outcome');
    const notesInput = document.getElementById('quick-call-notes');
    
    if (!callTypeRadio || !outcomeSelect) return;
    
    const callType = callTypeRadio.value;
    const outcome = outcomeSelect.value;
    const notes = notesInput ? notesInput.value.trim() : '';
    
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
    
    const followupCheck = document.getElementById('quick-call-schedule-followup');
    if (followupCheck && followupCheck.checked) {
        const followupDateInput = document.getElementById('quick-call-followup-date');
        const followupTitleInput = document.getElementById('quick-call-followup-title');
        
        const followupDate = followupDateInput ? followupDateInput.value : '';
        const followupTitle = followupTitleInput ? followupTitleInput.value.trim() : `Follow-up: ${outcome}`;
        
        if (followupDate) {
            store.followUps.push({
                id: Date.now().toString(),
                lead_id: quickCallLeadId,
                title: followupTitle || `Follow-up: ${outcome}`,
                due_at: new Date(followupDate).toISOString(),
                status: 'pending',
                related_activity_id: activity.id
            });
        }
    }
    
    saveStore();
    hideQuickCallModal();
    
    const leadsPage = document.getElementById('leads-page');
    const leadDetailPage = document.getElementById('lead-detail-page');
    
    if (leadsPage && leadsPage.classList.contains('active')) {
        renderLeads();
    } else if (leadDetailPage && leadDetailPage.classList.contains('active')) {
        renderLeadDetail();
    }
}

function toggleActivityCollapse(activityId) {
    const content = document.getElementById(`activity-content-${activityId}`);
    if (content) {
        content.classList.toggle('collapsed');
    }
}

function getActivityTypeConfig(type) {
    return ACTIVITY_TYPES[type] || { label: type, icon: 'clock', color: '#D4AF37', category: 'default' };
}

function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const tabIndex = tab === 'overview' ? 0 : tab === 'activities' ? 1 : 2;
    const tabs = document.querySelectorAll('.tab');
    if (tabs[tabIndex]) tabs[tabIndex].classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
    const tabContent = document.getElementById('tab-' + tab);
    if (tabContent) tabContent.style.display = 'block';
}

function updateLeadTemperature() {
    const lead = store.leads.find(l => l.id === currentLeadId);
    const tempSelect = document.getElementById('detail-temperature');
    if (lead && tempSelect) {
        lead.temperature = tempSelect.value;
        saveStore();
    }
}

function updateLeadStage() {
    const lead = store.leads.find(l => l.id === currentLeadId);
    const stageSelect = document.getElementById('detail-stage');
    if (lead && stageSelect) {
        const oldStage = lead.stage;
        const newStage = stageSelect.value;
        lead.stage = newStage;
        
        store.activities.push({
            id: Date.now().toString(),
            lead_id: currentLeadId,
            type: 'status_change',
            subject: 'Stage Changed',
            content: `From "${oldStage.replace(/_/g, ' ')}" to "${newStage.replace(/_/g, ' ')}"`,
            created_at: new Date().toISOString(),
            created_by: `${store.user.firstName} ${store.user.lastName}`
        });
        saveStore();
        renderLeadDetail();
    }
}

// ============================================
// Calendar
// ============================================
function renderCalendar() {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const monthTitle = document.getElementById('calendar-month');
    if (monthTitle) {
        monthTitle.textContent = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
    
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
    
    const grid = document.getElementById('calendar-grid');
    if (grid) grid.innerHTML = html;
    
    const upcoming = store.followUps
        .filter(f => f.status === 'pending')
        .sort((a, b) => new Date(a.due_at) - new Date(b.due_at))
        .slice(0, 5);
    
    const upcomingContainer = document.getElementById('upcoming-followups');
    if (!upcomingContainer) return;
    
    if (upcoming.length === 0) {
        upcomingContainer.innerHTML = '<p style="color: rgba(255,255,255,0.5);">No upcoming follow-ups.</p>';
    } else {
        upcomingContainer.innerHTML = upcoming.map(f => {
            const lead = store.leads.find(l => l.id === f.lead_id);
            return `
                <div class="follow-up-card" style="cursor: pointer;" onclick="navigate('lead-detail', {id: '${f.lead_id}'})">
                    <div>
                        <div style="font-weight: 500; color: #fff;">${f.title}</div>
                        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.5);">${lead ? lead.business_name : 'Unknown'} — ${new Date(f.due_at).toLocaleString()}</div>
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
    const avgRate = store.commissions.length > 0 
        ? store.commissions.reduce((sum, c) => sum + c.avg_commission_rate, 0) / store.commissions.length 
        : 0;
    
    const totalEl = document.getElementById('comm-total');
    const fundedEl = document.getElementById('comm-funded');
    const dealsEl = document.getElementById('comm-deals');
    const rateEl = document.getElementById('comm-rate');
    
    if (totalEl) totalEl.textContent = '$' + totalCommission.toLocaleString();
    if (fundedEl) fundedEl.textContent = '$' + totalFunded.toLocaleString();
    if (dealsEl) dealsEl.textContent = totalDeals;
    if (rateEl) rateEl.textContent = avgRate.toFixed(1) + '%';
    
    const chart = document.getElementById('commission-chart');
    if (chart) {
        if (store.commissions.length === 0) {
            chart.innerHTML = '<div style="text-align: center; color: rgba(255,255,255,0.5); padding: 2rem;">No commission data yet. Add leads and fund deals to see your earnings history.</div>';
        } else {
            const maxCommission = Math.max(...store.commissions.map(c => c.total_commission), 1);
            const maxFunded = Math.max(...store.commissions.map(c => c.total_funded / 1000), 1);
            
            chart.innerHTML = store.commissions.map(c => {
                const commissionHeight = maxCommission > 0 ? (c.total_commission / maxCommission) * 200 : 0;
                const fundedHeight = maxFunded > 0 ? ((c.total_funded / 1000) / maxFunded) * 200 : 0;
                
                return `
                    <div class="bar-group">
                        <div style="display: flex; align-items: flex-end; gap: 2px; height: 200px;">
                            <div class="bar bar-commission" style="height: ${commissionHeight}px;"></div>
                            <div class="bar bar-funded" style="height: ${fundedHeight}px;"></div>
                        </div>
                        <span class="bar-label">${c.month}</span>
                    </div>
                `;
            }).join('');
        }
    }
    
    const table = document.getElementById('commissions-table');
    if (table) {
        if (store.commissions.length === 0) {
            table.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 2rem; color: rgba(255,255,255,0.5);">
                        No commission history yet. Fund your first deal to start tracking earnings!
                    </td>
                </tr>
            `;
        } else {
            table.innerHTML = store.commissions.map(c => `
                <tr>
                    <td>${c.month}</td>
                    <td>${c.deals_funded}</td>
                    <td>$${c.total_funded.toLocaleString()}</td>
                    <td style="color: #4ade80; font-weight: 500;">$${c.total_commission.toLocaleString()}</td>
                    <td>${c.avg_commission_rate}%</td>
                </tr>
            `).join('');
        }
    }
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
    if (!container) return;
    
    container.innerHTML = Object.entries(grouped).map(([tier, funders]) => `
        <div class="funder-tier-card">
            <div class="funder-tier-header">
                <h3>${tierLabels[tier] || tier}</h3>
            </div>
            <div>
                ${funders.map(f => `
                    <div class="funder-item">
                        <div class="funder-main">
                            <div>
                                <div class="funder-name-row">
                                    <h4>${f.name}</h4>
                                    ${f.is_preferred ? '<span class="badge badge-funded" style="font-size: 0.625rem;">Preferred</span>' : ''}
                                </div>
                                <div class="funder-stats">
                                    <div>
                                        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.5);">Deal Range</div>
                                        <div style="font-weight: 500; color: #fff;">$${f.min_deal_amount.toLocaleString()} - $${f.max_deal_amount ? f.max_deal_amount.toLocaleString() : '∞'}</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.5);">Commission</div>
                                        <div style="font-weight: 500; color: #4ade80;">${f.default_commission_rate}%</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.5);">Turnaround</div>
                                        <div style="font-weight: 500; color: #fff;">${f.avg_turnaround_hours}h</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.5);">Contact</div>
                                        <div style="font-weight: 500; color: #fff;">${f.contact_name || '-'}</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                ${f.contact_email ? `<a href="mailto:${f.contact_email}" style="color: var(--gold); font-size: 0.875rem;">Email</a>` : ''}
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
    
    // Find the clicked element's parent nav-item
    const clickedItem = event.target.closest('.settings-nav-item');
    if (clickedItem) clickedItem.classList.add('active');
    
    renderSettingsContent(tab);
}

function renderSettingsContent(tab) {
    const container = document.getElementById('settings-content');
    if (!container) return;
    
    switch(tab) {
        case 'profile':
            container.innerHTML = `
                <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1.5rem; font-family: 'Cormorant Garamond', serif; color: var(--gold);">Profile Settings</h3>
                <div class="settings-form-grid">
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
                <div class="settings-actions">
                    <button class="btn btn-primary" onclick="saveSettings()">Save Changes</button>
                </div>
            `;
            break;
            
        case 'notifications':
            container.innerHTML = `
                <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1.5rem; font-family: 'Cormorant Garamond', serif; color: var(--gold);">Notification Preferences</h3>
                <div class="notification-list">
                    <div class="notification-item">
                        <div>
                            <div style="font-weight: 500; color: #fff;">Email Notifications</div>
                            <div style="font-size: 0.875rem; color: rgba(255,255,255,0.5);">Receive updates via email</div>
                        </div>
                        <input type="checkbox" id="notif-email" ${store.user.notifications.email ? 'checked' : ''}>
                    </div>
                    <div class="notification-item">
                        <div>
                            <div style="font-weight: 500; color: #fff;">SMS Notifications</div>
                            <div style="font-size: 0.875rem; color: rgba(255,255,255,0.5);">Receive updates via text</div>
                        </div>
                        <input type="checkbox" id="notif-sms" ${store.user.notifications.sms ? 'checked' : ''}>
                    </div>
                    <div class="notification-item">
                        <div>
                            <div style="font-weight: 500; color: #fff;">Follow-up Reminders</div>
                            <div style="font-size: 0.875rem; color: rgba(255,255,255,0.5);">Get reminded about scheduled follow-ups</div>
                        </div>
                        <input type="checkbox" id="notif-followup" ${store.user.notifications.followUpReminders ? 'checked' : ''}>
                    </div>
                    <div class="notification-item">
                        <div>
                            <div style="font-weight: 500; color: #fff;">Commission Alerts</div>
                            <div style="font-size: 0.875rem; color: rgba(255,255,255,0.5);">Notify when commissions are paid</div>
                        </div>
                        <input type="checkbox" id="notif-commission" ${store.user.notifications.commissionAlerts ? 'checked' : ''}>
                    </div>
                </div>
                <div class="settings-actions">
                    <button class="btn btn-primary" onclick="saveSettings()">Save Changes</button>
                </div>
            `;
            break;
            
        case 'commission':
            const currentProgress = store.commissions.reduce((sum, c) => sum + c.total_commission, 0);
            container.innerHTML = `
                <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1.5rem; font-family: 'Cormorant Garamond', serif; color: var(--gold);">Commission Settings</h3>
                <div class="form-group" style="max-width: 400px;">
                    <label class="form-label">Annual Commission Goal</label>
                    <input type="number" class="form-input" id="setting-goal" value="${store.user.commissionGoal}">
                    <div style="font-size: 0.875rem; color: rgba(255,255,255,0.5); margin-top: 0.5rem;">Current progress: $${currentProgress.toLocaleString()}</div>
                </div>
                <div class="settings-actions">
                    <button class="btn btn-primary" onclick="saveSettings()">Save Changes</button>
                </div>
            `;
            break;
            
        case 'data':
            const leadCount = store.leads.length;
            const activityCount = store.activities.length;
            const hasData = leadCount > 0 || activityCount > 0 || store.followUps.length > 0;
            container.innerHTML = `
                <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1.5rem; font-family: 'Cormorant Garamond', serif; color: var(--gold);">Data Management</h3>
                
                <div style="background: rgba(5, 13, 24, 0.5); padding: 1.5rem; border-radius: 0.75rem; border: 1px solid rgba(212, 175, 55, 0.2); margin-bottom: 1.5rem;">
                    <h4 style="font-size: 1rem; font-weight: 600; color: #fff; margin-bottom: 1rem;">Current Data</h4>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                        <div style="text-align: center; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 0.5rem;">
                            <div style="font-size: 1.75rem; font-weight: 700; color: var(--gold); font-family: 'Cormorant Garamond', serif;">${leadCount}</div>
                            <div style="font-size: 0.75rem; color: rgba(255,255,255,0.6);">Leads</div>
                        </div>
                        <div style="text-align: center; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 0.5rem;">
                            <div style="font-size: 1.75rem; font-weight: 700; color: var(--gold); font-family: 'Cormorant Garamond', serif;">${activityCount}</div>
                            <div style="font-size: 0.75rem; color: rgba(255,255,255,0.6);">Activities</div>
                        </div>
                        <div style="text-align: center; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 0.5rem;">
                            <div style="font-size: 1.75rem; font-weight: 700; color: var(--gold); font-family: 'Cormorant Garamond', serif;">${store.followUps.length}</div>
                            <div style="font-size: 0.75rem; color: rgba(255,255,255,0.6);">Follow-ups</div>
                        </div>
                    </div>
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <h4 style="font-size: 1rem; font-weight: 600; color: #fff; margin-bottom: 0.75rem;">Demo Data</h4>
                    <p style="color: rgba(255,255,255,0.6); font-size: 0.875rem; margin-bottom: 1rem;">
                        Load sample data to explore the CRM features. Includes 60 demo leads, activities, follow-ups, and 12 months of commission history.
                    </p>
                    <button class="btn btn-primary" onclick="loadDemoData()" ${hasData ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                        <i class="fas fa-download" style="margin-right: 0.5rem;"></i> Load Demo Data
                    </button>
                    ${hasData ? '<p style="color: #fbbf24; font-size: 0.75rem; margin-top: 0.5rem;">⚠️ Clear your existing data first to load demo data</p>' : ''}
                </div>

                <div style="margin-bottom: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.5rem;">
                    <h4 style="font-size: 1rem; font-weight: 600; color: var(--gold); margin-bottom: 0.75rem;">
                        <i class="fas fa-undo-alt" style="margin-right: 0.5rem;"></i>Restore My Data
                    </h4>
                    <p style="color: rgba(255,255,255,0.6); font-size: 0.875rem; margin-bottom: 1rem;">
                        Restore your 60 working leads that were previously deleted. This will also restore 8 activities, 6 follow-ups, 6 funders, and 12 months of commission history.
                    </p>
                    <button class="btn btn-primary" onclick="restoreMyData()" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-color: #059669;">
                        <i class="fas fa-magic" style="margin-right: 0.5rem;"></i> Restore My Data
                    </button>
                    ${hasRestoredData() ? '<p style="color: #4ade80; font-size: 0.75rem; margin-top: 0.5rem;">✓ Your data has been restored</p>' : ''}
                </div>

                <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.5rem;">
                    <h4 style="font-size: 1rem; font-weight: 600; color: #ff6b6b; margin-bottom: 0.75rem;">Danger Zone</h4>
                    <p style="color: rgba(255,255,255,0.6); font-size: 0.875rem; margin-bottom: 1rem;">
                        Permanently delete all your leads, activities, follow-ups, and commission history. This action cannot be undone.
                    </p>
                    <button class="btn btn-secondary" onclick="clearAllData()" style="background: rgba(220, 38, 38, 0.2); border-color: rgba(220, 38, 38, 0.5); color: #ff6b6b;">
                        <i class="fas fa-trash-alt" style="margin-right: 0.5rem;"></i> Clear All Data
                    </button>
                </div>
            `;
            break;
            
        case 'preferences':
            container.innerHTML = `
                <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1.5rem; font-family: 'Cormorant Garamond', serif; color: var(--gold);">Application Preferences</h3>
                <p style="color: rgba(255,255,255,0.6);">Customize your CRM experience.</p>
                <div class="settings-actions">
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
    if (goal) store.user.commissionGoal = parseInt(goal.value) || 1000000;
    
    const notifEmail = document.getElementById('notif-email');
    const notifSms = document.getElementById('notif-sms');
    const notifFollowup = document.getElementById('notif-followup');
    const notifCommission = document.getElementById('notif-commission');
    
    if (notifEmail) store.user.notifications.email = notifEmail.checked;
    if (notifSms) store.user.notifications.sms = notifSms.checked;
    if (notifFollowup) store.user.notifications.followUpReminders = notifFollowup.checked;
    if (notifCommission) store.user.notifications.commissionAlerts = notifCommission.checked;
    
    saveStore();
    alert('Settings saved successfully!');
}

// ============================================
// Utilities
// ============================================
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
        
        const bridgeLeads = JSON.parse(bridgeData);
        if (!Array.isArray(bridgeLeads) || bridgeLeads.length === 0) {
            alert('No leads found to import.');
            return;
        }
        
        const result = categorizeLeads(bridgeLeads);
        showImportPreviewModal(result, bridgeLeads);
        
    } catch (e) {
        console.error('Import error:', e);
        alert('Error importing leads. Please try again.');
    }
}

function categorizeLeads(bridgeLeads) {
    const newLeads = [];
    const phoneDuplicates = [];
    const nameDuplicates = [];
    
    bridgeLeads.forEach(lead => {
        const phoneDup = store.leads.find(l => 
            l.phone && lead.phone && l.phone === lead.phone && l.phone !== ''
        );
        
        if (phoneDup) {
            phoneDuplicates.push({ lead, existing: phoneDup, reason: 'Same phone number' });
            return;
        }
        
        const nameDup = store.leads.find(l => {
            if (!l.business_name || !lead.business_name) return false;
            const existingName = l.business_name.toLowerCase().trim();
            const newName = lead.business_name.toLowerCase().trim();
            return existingName === newName || 
                   existingName.includes(newName) || 
                   newName.includes(existingName);
        });
        
        if (nameDup) {
            nameDuplicates.push({ lead, existing: nameDup, reason: 'Similar business name' });
            return;
        }
        
        newLeads.push(lead);
    });
    
    return { newLeads, phoneDuplicates, nameDuplicates };
}

function showImportPreviewModal(result, allBridgeLeads) {
    const { newLeads, phoneDuplicates, nameDuplicates } = result;
    const totalDuplicates = phoneDuplicates.length + nameDuplicates.length;
    
    const modal = document.createElement('div');
    modal.id = 'import-preview-modal';
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(5, 13, 24, 0.9); z-index: 200;
        display: flex; align-items: center; justify-content: center;
        padding: 1rem; backdrop-filter: blur(8px);
    `;
    
    const sourceBreakdown = getSourceBreakdown(allBridgeLeads);
    
    modal.innerHTML = `
        <div style="background: #0A1829; border-radius: 1rem; width: 100%; max-width: 900px; max-height: 90vh; overflow-y: auto; border: 1px solid rgba(212, 175, 55, 0.3); box-shadow: 0 25px 50px rgba(0,0,0,0.5);">
            <div style="padding: 1.5rem; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
                <h2 style="font-size: 1.5rem; font-weight: 600; color: #fff; font-family: 'Cormorant Garamond', serif;">Import Preview</h2>
                <p style="color: rgba(255,255,255,0.6); margin-top: 0.5rem;">Review leads before importing into your CRM</p>
            </div>
            
            <div style="padding: 1.5rem;">
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
                    <div style="background: rgba(74, 222, 128, 0.1); padding: 1rem; border-radius: 0.5rem; text-align: center; border: 1px solid rgba(74, 222, 128, 0.3);">
                        <div style="font-size: 1.75rem; font-weight: 700; color: #4ade80; font-family: 'Cormorant Garamond', serif;">${newLeads.length}</div>
                        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.6);">New Leads</div>
                    </div>
                    <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 0.5rem; text-align: center; border: 1px solid rgba(251, 191, 36, 0.3);">
                        <div style="font-size: 1.75rem; font-weight: 700; color: #fbbf24; font-family: 'Cormorant Garamond', serif;">${totalDuplicates}</div>
                        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.6);">Duplicates</div>
                    </div>
                    <div style="background: rgba(212, 175, 55, 0.1); padding: 1rem; border-radius: 0.5rem; text-align: center; border: 1px solid rgba(212, 175, 55, 0.3);">
                        <div style="font-size: 1.75rem; font-weight: 700; color: var(--gold); font-family: 'Cormorant Garamond', serif;">${calculateAverageScore(newLeads)}</div>
                        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.6);">Avg Score</div>
                    </div>
                    <div style="background: rgba(192, 132, 252, 0.1); padding: 1rem; border-radius: 0.5rem; text-align: center; border: 1px solid rgba(192, 132, 252, 0.3);">
                        <div style="font-size: 1.75rem; font-weight: 700; color: #c084fc; font-family: 'Cormorant Garamond', serif;">${newLeads.filter(l => l.temperature === 'HOT').length}</div>
                        <div style="font-size: 0.75rem; color: rgba(255,255,255,0.6);">HOT Leads</div>
                    </div>
                </div>
                
                <div style="background: rgba(5, 13, 24, 0.5); padding: 1rem; border-radius: 0.5rem; margin-bottom: 1.5rem; border: 1px solid rgba(212, 175, 55, 0.1);">
                    <div style="font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem; color: #fff;">Lead Sources:</div>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        ${sourceBreakdown.map(s => `
                            <span style="font-size: 0.75rem; padding: 0.25rem 0.75rem; background: rgba(212, 175, 55, 0.1); border-radius: 9999px; border: 1px solid rgba(212, 175, 55, 0.2); color: rgba(255,255,255,0.8);">
                                ${s.source}: ${s.count}
                            </span>
                        `).join('')}
                    </div>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                        <span style="font-weight: 600; color: #fff;">New Leads to Import</span>
                        <span style="background: rgba(74, 222, 128, 0.2); color: #4ade80; font-size: 0.75rem; padding: 0.125rem 0.5rem; border-radius: 9999px;">${newLeads.length}</span>
                    </div>
                    <div style="max-height: 200px; overflow-y: auto; border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 0.5rem; background: rgba(5, 13, 24, 0.3);">
                        ${newLeads.length > 0 ? newLeads.map(lead => `
                            <div style="padding: 0.75rem 1rem; border-bottom: 1px solid rgba(212, 175, 55, 0.1); display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 500; color: #fff;">${lead.business_name}</div>
                                    <div style="font-size: 0.75rem; color: rgba(255,255,255,0.5);">${lead.industry || 'Unknown'} • ${lead.source || 'Manual'}</div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <span style="font-size: 0.875rem; font-weight: 600; color: ${getScoreColor(lead.score)};">${lead.score || '-'}</span>
                                    <span class="badge badge-${(lead.temperature || 'WARM').toLowerCase()}">${lead.temperature || 'WARM'}</span>
                                </div>
                            </div>
                        `).join('') : '<div style="padding: 1rem; text-align: center; color: rgba(255,255,255,0.5);">No new leads to import</div>'}
                    </div>
                </div>
                
                ${totalDuplicates > 0 ? `
                <div style="margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                        <span style="font-weight: 600; color: #fff;">Potential Duplicates (Will be skipped)</span>
                        <span style="background: rgba(251, 191, 36, 0.2); color: #fbbf24; font-size: 0.75rem; padding: 0.125rem 0.5rem; border-radius: 9999px;">${totalDuplicates}</span>
                    </div>
                    <div style="max-height: 150px; overflow-y: auto; border: 1px solid rgba(251, 191, 36, 0.3); border-radius: 0.5rem; background: rgba(251, 191, 36, 0.05);">
                        ${[...phoneDuplicates, ...nameDuplicates].map(dup => `
                            <div style="padding: 0.75rem 1rem; border-bottom: 1px solid rgba(251, 191, 36, 0.1);">
                                <div style="display: flex; justify-content: space-between;">
                                    <div>
                                        <div style="font-weight: 500; color: #fbbf24;">${dup.lead.business_name}</div>
                                        <div style="font-size: 0.75rem; color: rgba(251, 191, 36, 0.7);">${dup.reason}</div>
                                    </div>
                                    <div style="font-size: 0.75rem; color: rgba(255,255,255,0.5);">Matches: ${dup.existing.business_name}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
            
            <div style="padding: 1.5rem; border-top: 1px solid rgba(212, 175, 55, 0.2); display: flex; justify-content: flex-end; gap: 0.75rem;">
                <button class="btn btn-secondary" onclick="closeImportPreviewModal()">Cancel</button>
                <button class="btn btn-primary" onclick="confirmImport(${newLeads.length}, ${totalDuplicates})" 
                    ${newLeads.length === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                    Import ${newLeads.length} New Leads
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeImportPreviewModal();
    });
}

function getSourceBreakdown(leads) {
    const sources = {};
    leads.forEach(l => {
        const source = l.source || 'Manual';
        sources[source] = (sources[source] || 0) + 1;
    });
    return Object.entries(sources).map(([source, count]) => ({ source, count }));
}

function calculateAverageScore(leads) {
    if (leads.length === 0) return '-';
    const avg = leads.reduce((sum, l) => sum + (l.score || 0), 0) / leads.length;
    return Math.round(avg);
}

function getScoreColor(score) {
    if (!score) return 'rgba(255,255,255,0.5)';
    if (score >= 80) return '#ff6b6b';
    if (score >= 60) return '#fbbf24';
    return 'rgba(255,255,255,0.5)';
}

function closeImportPreviewModal() {
    const modal = document.getElementById('import-preview-modal');
    if (modal) modal.remove();
}

function confirmImport(newCount, duplicateCount) {
    const bridgeData = localStorage.getItem(CRM_BRIDGE_KEY);
    const bridgeLeads = JSON.parse(bridgeData);
    
    const result = categorizeLeads(bridgeLeads);
    
    let imported = 0;
    let skipped = 0;
    let errors = 0;
    
    result.newLeads.forEach(lead => {
        try {
            const newLead = {
                ...lead,
                source: lead.source || 'Manual',
                score: lead.score || 50,
                import_metadata: {
                    imported_at: new Date().toISOString(),
                    original_source: lead.source || 'Manual',
                    import_score: lead.score || 50
                }
            };
            
            store.leads.unshift(newLead);
            
            store.activities.unshift({
                id: String(Date.now() + Math.random()),
                lead_id: newLead.id,
                type: 'status_change',
                subject: 'Lead Imported',
                content: `Imported from Lead Generator (Source: ${newLead.source}, Score: ${newLead.score})`,
                created_at: new Date().toISOString()
            });
            
            imported++;
        } catch (e) {
            console.error('Error importing lead:', e);
            errors++;
        }
    });
    
    skipped = duplicateCount;
    
    saveStore();
    
    localStorage.removeItem(CRM_BRIDGE_KEY);
    
    closeImportPreviewModal();
    
    showImportSummary(imported, skipped, errors);
    
    const banner = document.getElementById('import-banner');
    if (banner) banner.style.display = 'none';
    
    const currentPage = document.querySelector('.nav-item.active')?.dataset.page;
    if (currentPage) {
        navigate(currentPage);
    }
}

function showImportSummary(imported, skipped, errors) {
    const modal = document.createElement('div');
    modal.id = 'import-summary-modal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(5, 13, 24, 0.9); z-index: 200;
        display: flex; align-items: center; justify-content: center;
        padding: 1rem; backdrop-filter: blur(8px);
    `;
    
    modal.innerHTML = `
        <div style="background: #0A1829; border-radius: 1rem; width: 100%; max-width: 500px; text-align: center; padding: 2rem; border: 1px solid rgba(212, 175, 55, 0.3); box-shadow: 0 25px 50px rgba(0,0,0,0.5);">
            <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
            <h2 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem; color: #fff; font-family: 'Cormorant Garamond', serif;">Import Complete!</h2>
            <p style="color: rgba(255,255,255,0.6); margin-bottom: 1.5rem;">Your leads have been successfully imported into the CRM.</p>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
                <div style="background: rgba(74, 222, 128, 0.1); padding: 1rem; border-radius: 0.5rem; border: 1px solid rgba(74, 222, 128, 0.3);">
                    <div style="font-size: 1.75rem; font-weight: 700; color: #4ade80; font-family: 'Cormorant Garamond', serif;">${imported}</div>
                    <div style="font-size: 0.75rem; color: rgba(255,255,255,0.6);">Imported</div>
                </div>
                <div style="background: ${skipped > 0 ? 'rgba(251, 191, 36, 0.1)' : 'rgba(255,255,255,0.05)'}; padding: 1rem; border-radius: 0.5rem; border: 1px solid ${skipped > 0 ? 'rgba(251, 191, 36, 0.3)' : 'rgba(255,255,255,0.1)'};">
                    <div style="font-size: 1.75rem; font-weight: 700; color: ${skipped > 0 ? '#fbbf24' : 'rgba(255,255,255,0.4)'}; font-family: 'Cormorant Garamond', serif;">${skipped}</div>
                    <div style="font-size: 0.75rem; color: ${skipped > 0 ? 'rgba(251, 191, 36, 0.8)' : 'rgba(255,255,255,0.4)'};">Duplicates Skipped</div>
                </div>
                <div style="background: ${errors > 0 ? 'rgba(220, 38, 38, 0.1)' : 'rgba(255,255,255,0.05)'}; padding: 1rem; border-radius: 0.5rem; border: 1px solid ${errors > 0 ? 'rgba(220, 38, 38, 0.3)' : 'rgba(255,255,255,0.1)'};">
                    <div style="font-size: 1.75rem; font-weight: 700; color: ${errors > 0 ? '#ff6b6b' : 'rgba(255,255,255,0.4)'}; font-family: 'Cormorant Garamond', serif;">${errors}</div>
                    <div style="font-size: 0.75rem; color: ${errors > 0 ? 'rgba(255, 107, 107, 0.8)' : 'rgba(255,255,255,0.4)'};">Errors</div>
                </div>
            </div>
            
            <button class="btn btn-primary" onclick="closeImportSummaryModal()" style="width: 100%;">
                Got it!
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function closeImportSummaryModal() {
    const modal = document.getElementById('import-summary-modal');
    if (modal) modal.remove();
}

// ============================================
// Initialize Application
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize preloader
    initPreloader();
    
    // Initialize custom cursor (after preloader)
    setTimeout(() => {
        initCustomCursor();
    }, 500);
    
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
    
    // Handle URL hash routing
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
    
    // Setup global event listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Quick call followup checkbox
    document.addEventListener('change', function(e) {
        if (e.target.id === 'quick-call-schedule-followup') {
            const fields = document.getElementById('quick-call-followup-fields');
            if (fields) fields.style.display = e.target.checked ? 'block' : 'none';
        }
    });
    
    // Modal click-outside-to-close
    document.addEventListener('click', function(e) {
        const addLeadModal = document.getElementById('add-lead-modal');
        const activityModal = document.getElementById('activity-modal');
        const quickCallModal = document.getElementById('quick-call-modal');
        
        if (e.target === addLeadModal) hideAddLeadModal();
        if (e.target === activityModal) hideActivityModal();
        if (e.target === quickCallModal) hideQuickCallModal();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // ESC to close modals
        if (e.key === 'Escape') {
            hideAddLeadModal();
            hideActivityModal();
            hideQuickCallModal();
            closeImportPreviewModal();
            closeImportSummaryModal();
        }
    });
}
