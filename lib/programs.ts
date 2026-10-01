export type Program = {
  slug: string;
  name: string;
  eyebrow: string;
  tone: "sun" | "sky" | "mint" | "berry";
  icon: string;
  summary: string;
  purpose: string;
  audience: string[];
  objectives: string[];
  activities: string[];
  measures: string[];
  safeguards: string[];
};

export const programs: Program[] = [
  {
    slug: "kids4future",
    name: "Kids4Future",
    eyebrow: "Flagship child protection pathway",
    tone: "sun",
    icon: "☀️",
    summary: "Protection, stabilization, family reconnection, education and long-term development for street-connected and highly vulnerable children.",
    purpose: "Move children from immediate vulnerability toward safe family and community environments, education continuity, wellbeing and sustained development without turning crisis response into permanent institutionalization.",
    audience: ["Street-connected children", "Children at imminent risk of street involvement", "Children experiencing unsafe family separation", "Caregivers requiring reintegration support"],
    objectives: ["Respond safely to urgent protection and basic-needs concerns", "Support family tracing and safe reintegration where appropriate", "Restore or protect access to education and healthcare", "Provide structured psychosocial and mentorship support", "Track progress beyond the first intervention"],
    activities: ["Child-protection referral and case coordination", "Food, clothing and emergency support through verified interventions", "Education reintegration and school-support planning", "Healthcare and psychosocial referrals", "Family tracing, assessment and reintegration support", "Aftercare and development follow-up"],
    measures: ["Safety plans completed", "Education re-entry and retention", "Family reintegration stability", "Referral completion", "Follow-up continuity", "Age-appropriate wellbeing indicators"],
    safeguards: ["No public case files or identifiable protection histories", "No child story published without documented consent and safeguarding review", "No direct unsupervised volunteer access to children", "Referral decisions follow qualified child-protection guidance"],
  },
  {
    slug: "rise-boys",
    name: "Rise Boys",
    eyebrow: "Boys and young men",
    tone: "sky",
    icon: "🚀",
    summary: "A deliberate pathway for boys and young men centered on mentorship, wellbeing, identity, skills, healthy relationships and opportunity.",
    purpose: "Help boys build the internal stability, practical capability and positive networks required to enter adulthood with direction, dignity and alternatives to harmful coping, exploitation and exclusion.",
    audience: ["Boys aged roughly 8–17", "Young men transitioning into adulthood", "Boys affected by school disengagement or unstable support networks", "Young men needing structured skills and opportunity pathways"],
    objectives: ["Expand access to consistent positive mentorship", "Strengthen emotional literacy and mental wellbeing", "Build healthy identity, responsibility and relationship skills", "Reduce exposure to harmful substance-use and violence pathways", "Connect young men to education, trades, technology and work"],
    activities: ["Mentorship circles", "Sports and structured community activity", "Wellbeing and resilience sessions", "Healthy relationships and life-skills learning", "Career exposure and role-model sessions", "TVET, digital and apprenticeship referrals"],
    measures: ["Mentorship attendance and continuity", "Education or training engagement", "Skills milestones", "Referral uptake", "Self-reported support-network strength", "Transition into work, apprenticeship or further study"],
    safeguards: ["Mentors are vetted and trained", "Clear adult-child boundaries and reporting routes", "No counselling claims beyond qualified scope", "Participation never replaces statutory child-protection response"],
  },
  {
    slug: "family-forward",
    name: "Family Forward",
    eyebrow: "Family strengthening",
    tone: "mint",
    icon: "🏡",
    summary: "Practical support for families and caregivers to reduce avoidable separation and strengthen safe, stable home environments.",
    purpose: "Address family-level pressures that can contribute to children entering the street, dropping out of school or remaining separated from caregivers.",
    audience: ["Families preparing for child reintegration", "Caregivers under acute economic or social pressure", "Households with children at risk of separation", "Kinship caregivers and community support networks"],
    objectives: ["Strengthen safe caregiving environments", "Reduce preventable education disruption", "Improve referral access", "Support household stability around reintegration", "Connect caregivers to livelihood and community resources"],
    activities: ["Family needs assessment with qualified partners", "Caregiver planning and referral", "School continuity support", "Household livelihood referrals", "Parenting and family-strengthening sessions", "Post-reintegration follow-up"],
    measures: ["Reintegration stability", "School continuity", "Referral completion", "Caregiver engagement", "Household support-plan completion", "Repeat crisis incidence"],
    safeguards: ["Poverty alone is never treated as a reason to remove a child", "Family information remains confidential", "Home assessments require appropriate qualified personnel", "Child safety overrides reunification targets"],
  },
  {
    slug: "future-skills",
    name: "Future Skills",
    eyebrow: "Skills and livelihoods",
    tone: "berry",
    icon: "🛠️",
    summary: "Digital skills, TVET, apprenticeships, entrepreneurship and work-readiness pathways for adolescents and young adults.",
    purpose: "Turn protection and education support into real capability for independent adulthood by connecting young people with practical, market-relevant skills and opportunity networks.",
    audience: ["Older adolescents", "Young adults exiting child-support pathways", "Youth seeking vocational or digital skills", "Young people preparing for first employment or enterprise"],
    objectives: ["Build practical and employable skills", "Improve financial capability", "Create apprenticeship and employer links", "Support responsible entrepreneurship", "Track transition from training into income-generating opportunity"],
    activities: ["Digital-literacy and coding pathways", "TVET and trade referrals", "Apprenticeship partnerships", "Career readiness", "Financial literacy", "Entrepreneurship foundations and business mentorship"],
    measures: ["Course completion", "Skills verification", "Apprenticeship placement", "Employment or enterprise transition", "Income-readiness milestones", "Six- and twelve-month follow-up"],
    safeguards: ["Age-appropriate work only", "No exploitative placement arrangements", "Partner due diligence", "Clear consent and data-minimization for employer referrals"],
  },
];

export function getProgram(slug: string) {
  return programs.find((program) => program.slug === slug);
}
