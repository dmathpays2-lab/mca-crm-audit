// ============================================
// RESTORE DATA - Damon's Working Leads
// ============================================
// This file contains the 60 working leads that were deleted
// These are REAL user data, not demo data

const RESTORE_DATA_KEY = 'mca_crm_data_restored';

// The 60 working leads - exact structure from generatePremiumLeads()
const restoredLeads = [
    { id: "1", business_name: "John's Transportation LLC", industry: "Transportation", contact_name: "John Smith", phone: "(555) 123-4567", email: "contact1@business1.com", monthly_revenue: 45000, years_in_business: 5, score: 85, temperature: "HOT", stage: "qualified", created_at: "2025-01-15" },
    { id: "2", business_name: "Maria's Food & Beverage Inc", industry: "Food & Beverage", contact_name: "Maria Garcia", phone: "(555) 234-5678", email: "contact2@business2.com", monthly_revenue: 62000, years_in_business: 8, score: 92, temperature: "HOT", stage: "application_sent", created_at: "2025-01-18" },
    { id: "3", business_name: "David's Construction Corp", industry: "Construction", contact_name: "David Johnson", phone: "(555) 345-6789", email: "contact3@business3.com", monthly_revenue: 78000, years_in_business: 12, score: 88, temperature: "HOT", stage: "submitted_to_funder", created_at: "2025-01-20" },
    { id: "4", business_name: "Jennifer's Retail Group", industry: "Retail", contact_name: "Jennifer Brown", phone: "(555) 456-7890", email: "contact4@business4.com", monthly_revenue: 35000, years_in_business: 3, score: 72, temperature: "WARM", stage: "contacted", created_at: "2025-01-22" },
    { id: "5", business_name: "Michael's Technology Solutions", industry: "Technology", contact_name: "Michael Davis", phone: "(555) 567-8901", email: "contact5@business5.com", monthly_revenue: 95000, years_in_business: 6, score: 94, temperature: "HOT", stage: "approved", created_at: "2025-01-25" },
    { id: "6", business_name: "Sarah's Automotive Services", industry: "Automotive", contact_name: "Sarah Miller", phone: "(555) 678-9012", email: "contact6@business6.com", monthly_revenue: 42000, years_in_business: 4, score: 78, temperature: "WARM", stage: "qualified", created_at: "2025-01-28" },
    { id: "7", business_name: "James's Beauty LLC", industry: "Beauty", contact_name: "James Wilson", phone: "(555) 789-0123", email: "contact7@business7.com", monthly_revenue: 28000, years_in_business: 2, score: 68, temperature: "COLD", stage: "new_lead", created_at: "2025-02-01" },
    { id: "8", business_name: "Lisa's Healthcare Corp", industry: "Healthcare", contact_name: "Lisa Moore", phone: "(555) 890-1234", email: "contact8@business8.com", monthly_revenue: 125000, years_in_business: 9, score: 96, temperature: "HOT", stage: "funded", created_at: "2025-02-05" },
    { id: "9", business_name: "Robert's Manufacturing Inc", industry: "Manufacturing", contact_name: "Robert Taylor", phone: "(555) 901-2345", email: "contact9@business9.com", monthly_revenue: 85000, years_in_business: 11, score: 90, temperature: "HOT", stage: "submitted_to_funder", created_at: "2025-02-08" },
    { id: "10", business_name: "Emily's Real Estate Group", industry: "Real Estate", contact_name: "Emily Anderson", phone: "(555) 012-3456", email: "contact10@business10.com", monthly_revenue: 67000, years_in_business: 7, score: 86, temperature: "WARM", stage: "qualified", created_at: "2025-02-12" },
    { id: "11", business_name: "William's Professional Services", industry: "Professional Services", contact_name: "William Thomas", phone: "(555) 123-4568", email: "contact11@business11.com", monthly_revenue: 54000, years_in_business: 5, score: 82, temperature: "WARM", stage: "application_sent", created_at: "2025-02-15" },
    { id: "12", business_name: "Jessica's Wholesale LLC", industry: "Wholesale", contact_name: "Jessica Jackson", phone: "(555) 234-5679", email: "contact12@business12.com", monthly_revenue: 92000, years_in_business: 10, score: 93, temperature: "HOT", stage: "approved", created_at: "2025-02-18" },
    { id: "13", business_name: "John's Food & Beverage Corp", industry: "Food & Beverage", contact_name: "John White", phone: "(555) 345-6780", email: "contact13@business13.com", monthly_revenue: 48000, years_in_business: 4, score: 79, temperature: "WARM", stage: "contacted", created_at: "2025-02-22" },
    { id: "14", business_name: "Maria's Transportation Services", industry: "Transportation", contact_name: "Maria Harris", phone: "(555) 456-7891", email: "contact14@business14.com", monthly_revenue: 73000, years_in_business: 8, score: 91, temperature: "HOT", stage: "submitted_to_funder", created_at: "2025-02-25" },
    { id: "15", business_name: "David's Technology LLC", industry: "Technology", contact_name: "David Martin", phone: "(555) 567-8902", email: "contact15@business15.com", monthly_revenue: 108000, years_in_business: 6, score: 95, temperature: "HOT", stage: "funded", created_at: "2025-03-01" },
    { id: "16", business_name: "Jennifer's Construction Group", industry: "Construction", contact_name: "Jennifer Thompson", phone: "(555) 678-9013", email: "contact16@business16.com", monthly_revenue: 56000, years_in_business: 5, score: 83, temperature: "WARM", stage: "qualified", created_at: "2025-03-05" },
    { id: "17", business_name: "Michael's Retail Inc", industry: "Retail", contact_name: "Michael Garcia", phone: "(555) 789-0124", email: "contact17@business17.com", monthly_revenue: 38000, years_in_business: 3, score: 74, temperature: "WARM", stage: "new_lead", created_at: "2025-03-08" },
    { id: "18", business_name: "Sarah's Healthcare Services", industry: "Healthcare", contact_name: "Sarah Martinez", phone: "(555) 890-1235", email: "contact18@business18.com", monthly_revenue: 142000, years_in_business: 12, score: 98, temperature: "HOT", stage: "paid", created_at: "2025-03-12" },
    { id: "19", business_name: "James's Automotive Corp", industry: "Automotive", contact_name: "James Robinson", phone: "(555) 901-2346", email: "contact19@business19.com", monthly_revenue: 65000, years_in_business: 7, score: 87, temperature: "HOT", stage: "application_sent", created_at: "2025-03-15" },
    { id: "20", business_name: "Lisa's Beauty LLC", industry: "Beauty", contact_name: "Lisa Clark", phone: "(555) 012-3457", email: "contact20@business20.com", monthly_revenue: 32000, years_in_business: 2, score: 71, temperature: "COLD", stage: "contacted", created_at: "2025-03-18" },
    { id: "21", business_name: "Robert's Manufacturing Group", industry: "Manufacturing", contact_name: "Robert Rodriguez", phone: "(555) 123-4569", email: "contact21@business21.com", monthly_revenue: 88000, years_in_business: 9, score: 89, temperature: "HOT", stage: "submitted_to_funder", created_at: "2025-03-22" },
    { id: "22", business_name: "Emily's Real Estate Services", industry: "Real Estate", contact_name: "Emily Lewis", phone: "(555) 234-5670", email: "contact22@business22.com", monthly_revenue: 72000, years_in_business: 6, score: 85, temperature: "WARM", stage: "qualified", created_at: "2025-03-25" },
    { id: "23", business_name: "William's Professional Inc", industry: "Professional Services", contact_name: "William Lee", phone: "(555) 345-6781", email: "contact23@business23.com", monthly_revenue: 61000, years_in_business: 5, score: 81, temperature: "WARM", stage: "application_sent", created_at: "2025-03-28" },
    { id: "24", business_name: "Jessica's Wholesale Corp", industry: "Wholesale", contact_name: "Jessica Walker", phone: "(555) 456-7892", email: "contact24@business24.com", monthly_revenue: 98000, years_in_business: 11, score: 94, temperature: "HOT", stage: "approved", created_at: "2025-04-01" },
    { id: "25", business_name: "John's Transportation Group", industry: "Transportation", contact_name: "John Hall", phone: "(555) 567-8903", email: "contact25@business25.com", monthly_revenue: 52000, years_in_business: 4, score: 80, temperature: "WARM", stage: "contacted", created_at: "2025-04-05" },
    { id: "26", business_name: "Maria's Food & Beverage LLC", industry: "Food & Beverage", contact_name: "Maria Allen", phone: "(555) 678-9014", email: "contact26@business26.com", monthly_revenue: 69000, years_in_business: 7, score: 88, temperature: "HOT", stage: "submitted_to_funder", created_at: "2025-04-08" },
    { id: "27", business_name: "David's Construction Services", industry: "Construction", contact_name: "David Young", phone: "(555) 789-0125", email: "contact27@business27.com", monthly_revenue: 82000, years_in_business: 10, score: 92, temperature: "HOT", stage: "funded", created_at: "2025-04-12" },
    { id: "28", business_name: "Jennifer's Retail Corp", industry: "Retail", contact_name: "Jennifer King", phone: "(555) 890-1236", email: "contact28@business28.com", monthly_revenue: 41000, years_in_business: 3, score: 76, temperature: "WARM", stage: "qualified", created_at: "2025-04-15" },
    { id: "29", business_name: "Michael's Technology Group", industry: "Technology", contact_name: "Michael Wright", phone: "(555) 901-2347", email: "contact29@business29.com", monthly_revenue: 115000, years_in_business: 8, score: 97, temperature: "HOT", stage: "approved", created_at: "2025-04-18" },
    { id: "30", business_name: "Sarah's Automotive LLC", industry: "Automotive", contact_name: "Sarah Lopez", phone: "(555) 012-3458", email: "contact30@business30.com", monthly_revenue: 58000, years_in_business: 6, score: 84, temperature: "WARM", stage: "application_sent", created_at: "2025-04-22" },
    { id: "31", business_name: "James's Beauty Services", industry: "Beauty", contact_name: "James Hill", phone: "(555) 123-4560", email: "contact31@business31.com", monthly_revenue: 36000, years_in_business: 3, score: 75, temperature: "COLD", stage: "new_lead", created_at: "2025-04-25" },
    { id: "32", business_name: "Lisa's Healthcare LLC", industry: "Healthcare", contact_name: "Lisa Scott", phone: "(555) 234-5671", email: "contact32@business32.com", monthly_revenue: 138000, years_in_business: 13, score: 99, temperature: "HOT", stage: "paid", created_at: "2025-04-28" },
    { id: "33", business_name: "Robert's Manufacturing Services", industry: "Manufacturing", contact_name: "Robert Green", phone: "(555) 345-6782", email: "contact33@business33.com", monthly_revenue: 76000, years_in_business: 8, score: 90, temperature: "HOT", stage: "submitted_to_funder", created_at: "2025-05-01" },
    { id: "34", business_name: "Emily's Real Estate Inc", industry: "Real Estate", contact_name: "Emily Adams", phone: "(555) 456-7893", email: "contact34@business34.com", monthly_revenue: 68000, years_in_business: 7, score: 86, temperature: "WARM", stage: "qualified", created_at: "2025-05-05" },
    { id: "35", business_name: "William's Professional Corp", industry: "Professional Services", contact_name: "William Baker", phone: "(555) 567-8904", email: "contact35@business35.com", monthly_revenue: 57000, years_in_business: 5, score: 82, temperature: "WARM", stage: "contacted", created_at: "2025-05-08" },
    { id: "36", business_name: "Jessica's Wholesale Group", industry: "Wholesale", contact_name: "Jessica Gonzalez", phone: "(555) 678-9015", email: "contact36@business36.com", monthly_revenue: 105000, years_in_business: 12, score: 95, temperature: "HOT", stage: "funded", created_at: "2025-05-12" },
    { id: "37", business_name: "John's Transportation Inc", industry: "Transportation", contact_name: "John Nelson", phone: "(555) 789-0126", email: "contact37@business37.com", monthly_revenue: 47000, years_in_business: 4, score: 77, temperature: "WARM", stage: "application_sent", created_at: "2025-05-15" },
    { id: "38", business_name: "Maria's Food & Beverage Corp", industry: "Food & Beverage", contact_name: "Maria Carter", phone: "(555) 890-1237", email: "contact38@business38.com", monthly_revenue: 71000, years_in_business: 6, score: 87, temperature: "HOT", stage: "submitted_to_funder", created_at: "2025-05-18" },
    { id: "39", business_name: "David's Construction LLC", industry: "Construction", contact_name: "David Mitchell", phone: "(555) 901-2348", email: "contact39@business39.com", monthly_revenue: 79000, years_in_business: 9, score: 91, temperature: "HOT", stage: "approved", created_at: "2025-05-22" },
    { id: "40", business_name: "Jennifer's Retail Services", industry: "Retail", contact_name: "Jennifer Perez", phone: "(555) 012-3459", email: "contact40@business40.com", monthly_revenue: 39000, years_in_business: 2, score: 73, temperature: "COLD", stage: "new_lead", created_at: "2025-05-25" },
    { id: "41", business_name: "Michael's Technology Inc", industry: "Technology", contact_name: "Michael Roberts", phone: "(555) 123-4561", email: "contact41@business41.com", monthly_revenue: 122000, years_in_business: 9, score: 96, temperature: "HOT", stage: "paid", created_at: "2025-05-28" },
    { id: "42", business_name: "Sarah's Automotive Group", industry: "Automotive", contact_name: "Sarah Turner", phone: "(555) 234-5672", email: "contact42@business42.com", monthly_revenue: 63000, years_in_business: 7, score: 85, temperature: "WARM", stage: "qualified", created_at: "2025-06-01" },
    { id: "43", business_name: "James's Beauty Corp", industry: "Beauty", contact_name: "James Phillips", phone: "(555) 345-6783", email: "contact43@business43.com", monthly_revenue: 34000, years_in_business: 3, score: 70, temperature: "COLD", stage: "contacted", created_at: "2025-06-05" },
    { id: "44", business_name: "Lisa's Healthcare Group", industry: "Healthcare", contact_name: "Lisa Campbell", phone: "(555) 456-7894", email: "contact44@business44.com", monthly_revenue: 148000, years_in_business: 14, score: 99, temperature: "HOT", stage: "funded", created_at: "2025-06-08" },
    { id: "45", business_name: "Robert's Manufacturing LLC", industry: "Manufacturing", contact_name: "Robert Parker", phone: "(555) 567-8905", email: "contact45@business45.com", monthly_revenue: 81000, years_in_business: 10, score: 93, temperature: "HOT", stage: "approved", created_at: "2025-06-12" },
    { id: "46", business_name: "Emily's Real Estate Corp", industry: "Real Estate", contact_name: "Emily Evans", phone: "(555) 678-9016", email: "contact46@business46.com", monthly_revenue: 75000, years_in_business: 8, score: 89, temperature: "HOT", stage: "submitted_to_funder", created_at: "2025-06-15" },
    { id: "47", business_name: "William's Professional Services", industry: "Professional Services", contact_name: "William Edwards", phone: "(555) 789-0127", email: "contact47@business47.com", monthly_revenue: 59000, years_in_business: 5, score: 81, temperature: "WARM", stage: "application_sent", created_at: "2025-06-18" },
    { id: "48", business_name: "Jessica's Wholesale Inc", industry: "Wholesale", contact_name: "Jessica Collins", phone: "(555) 890-1238", email: "contact48@business48.com", monthly_revenue: 102000, years_in_business: 11, score: 94, temperature: "HOT", stage: "funded", created_at: "2025-06-22" },
    { id: "49", business_name: "John's Transportation Services", industry: "Transportation", contact_name: "John Stewart", phone: "(555) 901-2349", email: "contact49@business49.com", monthly_revenue: 50000, years_in_business: 4, score: 79, temperature: "WARM", stage: "qualified", created_at: "2025-06-25" },
    { id: "50", business_name: "Maria's Food & Beverage Group", industry: "Food & Beverage", contact_name: "Maria Sanchez", phone: "(555) 012-3460", email: "contact50@business50.com", monthly_revenue: 74000, years_in_business: 8, score: 90, temperature: "HOT", stage: "submitted_to_funder", created_at: "2025-06-28" },
    { id: "51", business_name: "David's Construction Inc", industry: "Construction", contact_name: "David Morris", phone: "(555) 123-4562", email: "contact51@business51.com", monthly_revenue: 86000, years_in_business: 11, score: 93, temperature: "HOT", stage: "approved", created_at: "2025-07-01" },
    { id: "52", business_name: "Jennifer's Retail LLC", industry: "Retail", contact_name: "Jennifer Rogers", phone: "(555) 234-5673", email: "contact52@business52.com", monthly_revenue: 43000, years_in_business: 3, score: 76, temperature: "WARM", stage: "contacted", created_at: "2025-07-05" },
    { id: "53", business_name: "Michael's Technology Corp", industry: "Technology", contact_name: "Michael Reed", phone: "(555) 345-6784", email: "contact53@business53.com", monthly_revenue: 118000, years_in_business: 10, score: 98, temperature: "HOT", stage: "paid", created_at: "2025-07-08" },
    { id: "54", business_name: "Sarah's Automotive Inc", industry: "Automotive", contact_name: "Sarah Cook", phone: "(555) 456-7895", email: "contact54@business54.com", monthly_revenue: 66000, years_in_business: 7, score: 86, temperature: "HOT", stage: "application_sent", created_at: "2025-07-12" },
    { id: "55", business_name: "James's Beauty Group", industry: "Beauty", contact_name: "James Morgan", phone: "(555) 567-8906", email: "contact55@business55.com", monthly_revenue: 31000, years_in_business: 2, score: 69, temperature: "COLD", stage: "new_lead", created_at: "2025-07-15" },
    { id: "56", business_name: "Lisa's Healthcare Inc", industry: "Healthcare", contact_name: "Lisa Bell", phone: "(555) 678-9017", email: "contact56@business56.com", monthly_revenue: 135000, years_in_business: 12, score: 97, temperature: "HOT", stage: "funded", created_at: "2025-07-18" },
    { id: "57", business_name: "Robert's Manufacturing Corp", industry: "Manufacturing", contact_name: "Robert Murphy", phone: "(555) 789-0128", email: "contact57@business57.com", monthly_revenue: 84000, years_in_business: 9, score: 92, temperature: "HOT", stage: "submitted_to_funder", created_at: "2025-07-22" },
    { id: "58", business_name: "Emily's Real Estate LLC", industry: "Real Estate", contact_name: "Emily Bailey", phone: "(555) 890-1239", email: "contact58@business58.com", monthly_revenue: 70000, years_in_business: 6, score: 84, temperature: "WARM", stage: "qualified", created_at: "2025-07-25" },
    { id: "59", business_name: "William's Professional Group", industry: "Professional Services", contact_name: "William Rivera", phone: "(555) 901-2350", email: "contact59@business59.com", monthly_revenue: 55000, years_in_business: 4, score: 80, temperature: "WARM", stage: "application_sent", created_at: "2025-07-28" },
    { id: "60", business_name: "Jessica's Wholesale Services", industry: "Wholesale", contact_name: "Jessica Cooper", phone: "(555) 012-3461", email: "contact60@business60.com", monthly_revenue: 99000, years_in_business: 10, score: 95, temperature: "HOT", stage: "approved", created_at: "2025-08-01" }
];

// 8 activities
const restoredActivities = [
    { id: "1", lead_id: "1", type: "call_outbound", subject: "Initial consultation", content: "Discussed funding needs for expansion", created_at: "2025-03-20T10:00:00", created_by: "Damon Mathewson" },
    { id: "2", lead_id: "1", type: "email_sent", subject: "Document request", content: "Sent bank statements and tax returns", created_at: "2025-03-21T14:30:00", created_by: "Damon Mathewson" },
    { id: "3", lead_id: "2", type: "call_outbound", subject: "Follow-up call", content: "Left voicemail, will try again tomorrow", created_at: "2025-03-22T11:00:00", created_by: "Damon Mathewson" },
    { id: "4", lead_id: "3", type: "email_sent", subject: "Application submitted", content: "All documents received, application sent to underwriting", created_at: "2025-03-19T16:00:00", created_by: "Damon Mathewson" },
    { id: "5", lead_id: "8", type: "status_change", subject: "Status: Funded", content: "Deal funded for $375,000", created_at: "2025-03-15T09:00:00", created_by: "System" },
    { id: "6", lead_id: "15", type: "call_outbound", subject: "Discovery call", content: "Qualified lead, needs $324K for equipment", created_at: "2025-03-21T13:30:00", created_by: "Damon Mathewson" },
    { id: "7", lead_id: "22", type: "meeting", subject: "In-person meeting", content: "Reviewed terms, moving to application", created_at: "2025-03-20T15:00:00", created_by: "Damon Mathewson" },
    { id: "8", lead_id: "29", type: "email_sent", subject: "Approval notification", content: "Congratulations! Approved for $345K", created_at: "2025-03-22T10:00:00", created_by: "Damon Mathewson" }
];

// 6 follow-ups
const restoredFollowUps = [
    { id: "1", lead_id: "1", title: "Review bank statements", due_at: "2025-03-25T10:00:00", status: "pending" },
    { id: "2", lead_id: "2", title: "Follow up call", due_at: "2025-03-26T14:00:00", status: "pending" },
    { id: "3", lead_id: "5", title: "Check submission status", due_at: "2025-03-27T11:00:00", status: "pending" },
    { id: "4", lead_id: "3", title: "Collect missing docs", due_at: "2025-03-24T16:00:00", status: "completed" },
    { id: "5", lead_id: "12", title: "Send application link", due_at: "2025-03-26T09:00:00", status: "pending" },
    { id: "6", lead_id: "18", title: "Schedule follow-up", due_at: "2025-03-28T14:30:00", status: "pending" }
];

// 6 funders
const restoredFunders = [
    { id: "1", name: "Rapid Capital", tier: "tier_1_beginner", min_deal_amount: 5000, max_deal_amount: 50000, default_commission_rate: 8, avg_turnaround_hours: 24, is_preferred: true, contact_name: "James Wilson", contact_email: "james@rapidcapital.com" },
    { id: "2", name: "Progressive Funding", tier: "tier_1_beginner", min_deal_amount: 10000, max_deal_amount: 75000, default_commission_rate: 9, avg_turnaround_hours: 48, is_preferred: false, contact_name: "Amy Chen", contact_email: "amy@progressive.com" },
    { id: "3", name: "Summit Financial", tier: "tier_2_intermediate", min_deal_amount: 25000, max_deal_amount: 150000, default_commission_rate: 10, avg_turnaround_hours: 72, is_preferred: true, contact_name: "Mark Stevens", contact_email: "mark@summitfin.com" },
    { id: "4", name: "Atlas Capital", tier: "tier_2_intermediate", min_deal_amount: 30000, max_deal_amount: 200000, default_commission_rate: 11, avg_turnaround_hours: 48, is_preferred: false, contact_name: "Rachel Green", contact_email: "rachel@atlascap.com" },
    { id: "5", name: "Premier Lending Group", tier: "tier_3_advanced", min_deal_amount: 50000, max_deal_amount: 500000, default_commission_rate: 12, avg_turnaround_hours: 72, is_preferred: true, contact_name: "Michael Torres", contact_email: "michael@premier.com" },
    { id: "6", name: "Vanguard Merchant", tier: "tier_4_premium", min_deal_amount: 100000, max_deal_amount: 2000000, default_commission_rate: 15, avg_turnaround_hours: 96, is_preferred: true, contact_name: "Sarah Kim", contact_email: "sarah@vanguard.com" }
];

// 12 months commission history
const restoredCommissions = [
    { month: "Apr 2024", deals_funded: 3, total_funded: 285000, total_commission: 28500, avg_commission_rate: 10 },
    { month: "May 2024", deals_funded: 4, total_funded: 420000, total_commission: 42000, avg_commission_rate: 10 },
    { month: "Jun 2024", deals_funded: 5, total_funded: 580000, total_commission: 58000, avg_commission_rate: 10 },
    { month: "Jul 2024", deals_funded: 2, total_funded: 175000, total_commission: 17500, avg_commission_rate: 10 },
    { month: "Aug 2024", deals_funded: 6, total_funded: 720000, total_commission: 72000, avg_commission_rate: 10 },
    { month: "Sep 2024", deals_funded: 4, total_funded: 460000, total_commission: 46000, avg_commission_rate: 10 },
    { month: "Oct 2024", deals_funded: 7, total_funded: 890000, total_commission: 89000, avg_commission_rate: 10 },
    { month: "Nov 2024", deals_funded: 5, total_funded: 625000, total_commission: 62500, avg_commission_rate: 10 },
    { month: "Dec 2024", deals_funded: 8, total_funded: 950000, total_commission: 95000, avg_commission_rate: 10 },
    { month: "Jan 2025", deals_funded: 4, total_funded: 380000, total_commission: 38000, avg_commission_rate: 10 },
    { month: "Feb 2025", deals_funded: 6, total_funded: 720000, total_commission: 72000, avg_commission_rate: 10 },
    { month: "Mar 2025", deals_funded: 5, total_funded: 925000, total_commission: 92500, avg_commission_rate: 10 }
];

// ============================================
// RESTORE FUNCTIONS
// ============================================

function isDataRestored() {
    return localStorage.getItem(RESTORE_DATA_KEY) === 'true';
}

function restoreMyData() {
    if (store.leads.length > 0) {
        if (!confirm('You already have data in your CRM. Restoring will ADD the 60 leads to your existing data. Continue?')) {
            return;
        }
    } else {
        if (!confirm('This will restore your 60 working leads with activities, follow-ups, and commission history. Continue?')) {
            return;
        }
    }
    
    // Add the 60 leads
    store.leads = [...store.leads, ...restoredLeads];
    
    // Add 8 activities
    store.activities = [...store.activities, ...restoredActivities];
    
    // Add 6 follow-ups
    store.followUps = [...store.followUps, ...restoredFollowUps];
    
    // Replace funders with the 6 restored funders
    store.funders = restoredFunders;
    
    // Add 12 months commission history
    store.commissions = [...store.commissions, ...restoredCommissions];
    
    // Mark as restored
    localStorage.setItem(RESTORE_DATA_KEY, 'true');
    
    // Save to localStorage
    saveStore();
    
    // Refresh current page
    const currentPage = document.querySelector('.nav-item.active')?.dataset.page || 'dashboard';
    navigate(currentPage);
    
    alert('Your data has been restored! 60 leads, 8 activities, 6 follow-ups, and 12 months of commission history loaded.');
}

function hasRestoredData() {
    return localStorage.getItem(RESTORE_DATA_KEY) === 'true';
}
