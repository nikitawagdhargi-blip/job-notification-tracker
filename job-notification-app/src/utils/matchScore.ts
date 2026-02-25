import type { Job } from '../data/jobs';
import type { Preferences } from '../hooks/usePreferences';

export interface MatchResult {
  score: number;
  breakdown: {
    titleMatch: number;
    descriptionMatch: number;
    locationMatch: number;
    modeMatch: number;
    experienceMatch: number;
    skillsMatch: number;
    recencyBonus: number;
    sourceBonus: number;
  };
}

/**
 * Calculate match score for a job based on user preferences
 * Scoring rules:
 * +25 if any roleKeyword appears in job.title (case-insensitive)
 * +15 if any roleKeyword appears in job.description
 * +15 if job.location matches preferredLocations
 * +10 if job.mode matches preferredMode
 * +10 if job.experience matches experienceLevel
 * +15 if overlap between job.skills and user.skills (any match)
 * +5 if postedDaysAgo <= 2
 * +5 if source is LinkedIn
 * Cap score at 100
 */
export const calculateMatchScore = (
  job: Job,
  preferences: Preferences
): MatchResult => {
  const breakdown = {
    titleMatch: 0,
    descriptionMatch: 0,
    locationMatch: 0,
    modeMatch: 0,
    experienceMatch: 0,
    skillsMatch: 0,
    recencyBonus: 0,
    sourceBonus: 0,
  };

  // Parse role keywords
  const roleKeywords = preferences.roleKeywords
    .split(',')
    .map((k) => k.trim().toLowerCase())
    .filter((k) => k.length > 0);

  // Parse user skills
  const userSkills = preferences.skills
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length > 0);

  const jobTitleLower = job.title.toLowerCase();
  const jobDescriptionLower = job.description.toLowerCase();
  const jobSkillsLower = job.skills.map((s) => s.toLowerCase());

  // +25 if any roleKeyword appears in job.title
  if (roleKeywords.length > 0) {
    const hasTitleMatch = roleKeywords.some((keyword) =>
      jobTitleLower.includes(keyword)
    );
    if (hasTitleMatch) {
      breakdown.titleMatch = 25;
    }
  }

  // +15 if any roleKeyword appears in job.description
  if (roleKeywords.length > 0) {
    const hasDescriptionMatch = roleKeywords.some((keyword) =>
      jobDescriptionLower.includes(keyword)
    );
    if (hasDescriptionMatch) {
      breakdown.descriptionMatch = 15;
    }
  }

  // +15 if job.location matches preferredLocations
  if (
    preferences.preferredLocations.length > 0 &&
    preferences.preferredLocations.includes(job.location)
  ) {
    breakdown.locationMatch = 15;
  }

  // +10 if job.mode matches preferredMode
  if (
    preferences.preferredMode.length > 0 &&
    preferences.preferredMode.includes(job.mode)
  ) {
    breakdown.modeMatch = 10;
  }

  // +10 if job.experience matches experienceLevel
  if (
    preferences.experienceLevel &&
    job.experience === preferences.experienceLevel
  ) {
    breakdown.experienceMatch = 10;
  }

  // +15 if overlap between job.skills and user.skills (any match)
  if (userSkills.length > 0) {
    const hasSkillMatch = userSkills.some((skill) =>
      jobSkillsLower.some((jobSkill) => jobSkill.includes(skill))
    );
    if (hasSkillMatch) {
      breakdown.skillsMatch = 15;
    }
  }

  // +5 if postedDaysAgo <= 2
  if (job.postedDaysAgo <= 2) {
    breakdown.recencyBonus = 5;
  }

  // +5 if source is LinkedIn
  if (job.source === 'LinkedIn') {
    breakdown.sourceBonus = 5;
  }

  // Calculate total score and cap at 100
  const totalScore = Object.values(breakdown).reduce((sum, val) => sum + val, 0);
  const score = Math.min(totalScore, 100);

  return {
    score,
    breakdown,
  };
};

/**
 * Get badge variant based on match score
 * 80–100: green (success)
 * 60–79: amber (warning)
 * 40–59: neutral (default)
 * <40: subtle grey
 */
export const getScoreBadgeVariant = (
  score: number
): 'success' | 'warning' | 'default' | 'subtle' => {
  if (score >= 80) return 'success';
  if (score >= 60) return 'warning';
  if (score >= 40) return 'default';
  return 'subtle';
};

/**
 * Get display color for score badge
 */
export const getScoreBadgeColor = (score: number): string => {
  if (score >= 80) return 'var(--color-success)';
  if (score >= 60) return 'var(--color-warning)';
  if (score >= 40) return 'var(--color-text-secondary)';
  return 'var(--color-text-muted)';
};
