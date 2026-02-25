import type { Job } from '../data/jobs';
import type { Preferences } from '../hooks/usePreferences';
import { calculateMatchScore } from './matchScore';

export interface DigestJob {
  job: Job;
  matchScore: number;
}

export interface DailyDigest {
  date: string;
  jobs: DigestJob[];
  generatedAt: string;
}

const DIGEST_KEY_PREFIX = 'jobTrackerDigest_';

/**
 * Get the storage key for a specific date
 */
export const getDigestKey = (date: string): string => {
  return `${DIGEST_KEY_PREFIX}${date}`;
};

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Check if a digest exists for a specific date
 */
export const hasDigestForDate = (date: string): boolean => {
  const key = getDigestKey(date);
  return localStorage.getItem(key) !== null;
};

/**
 * Load digest for a specific date
 */
export const loadDigest = (date: string): DailyDigest | null => {
  try {
    const key = getDigestKey(date);
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored) as DailyDigest;
    }
  } catch (error) {
    console.error('Error loading digest:', error);
  }
  return null;
};

/**
 * Save digest for a specific date
 */
export const saveDigest = (digest: DailyDigest): void => {
  try {
    const key = getDigestKey(digest.date);
    localStorage.setItem(key, JSON.stringify(digest));
  } catch (error) {
    console.error('Error saving digest:', error);
  }
};

/**
 * Generate digest for today
 * Selects top 10 jobs sorted by:
 * 1) matchScore descending
 * 2) postedDaysAgo ascending
 */
export const generateDigest = (
  allJobs: Job[],
  preferences: Preferences
): DailyDigest => {
  const today = getTodayDate();

  // Calculate match scores and sort
  const scoredJobs: DigestJob[] = allJobs
    .map((job) => ({
      job,
      matchScore: calculateMatchScore(job, preferences).score,
    }))
    .sort((a, b) => {
      // Primary: matchScore descending
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }
      // Secondary: postedDaysAgo ascending (most recent first)
      return a.job.postedDaysAgo - b.job.postedDaysAgo;
    });

  // Take top 10
  const topJobs = scoredJobs.slice(0, 10);

  const digest: DailyDigest = {
    date: today,
    jobs: topJobs,
    generatedAt: new Date().toISOString(),
  };

  // Save to localStorage
  saveDigest(digest);

  return digest;
};

/**
 * Get or generate digest for today
 * If digest exists, returns it; otherwise generates new one
 */
export const getOrGenerateDigest = (
  allJobs: Job[],
  preferences: Preferences
): DailyDigest => {
  const today = getTodayDate();
  const existingDigest = loadDigest(today);

  if (existingDigest) {
    return existingDigest;
  }

  return generateDigest(allJobs, preferences);
};

/**
 * Format digest as plain text for clipboard
 */
export const formatDigestAsText = (digest: DailyDigest): string => {
  const date = new Date(digest.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let text = `Top 10 Jobs For You — 9AM Digest\n`;
  text += `${date}\n`;
  text += `\n`;

  digest.jobs.forEach((item, index) => {
    const job = item.job;
    text += `${index + 1}. ${job.title}\n`;
    text += `   Company: ${job.company}\n`;
    text += `   Location: ${job.location}\n`;
    text += `   Experience: ${job.experience}\n`;
    text += `   Match Score: ${item.matchScore}%\n`;
    text += `   Apply: ${job.applyUrl}\n`;
    text += `\n`;
  });

  text += `---\n`;
  text += `This digest was generated based on your preferences.\n`;

  return text;
};

/**
 * Format digest as HTML for email
 */
export const formatDigestAsHtml = (digest: DailyDigest): string => {
  const date = new Date(digest.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let html = `<h2>Top 10 Jobs For You — 9AM Digest</h2>`;
  html += `<p>${date}</p>`;
  html += `<hr/>`;

  digest.jobs.forEach((item, index) => {
    const job = item.job;
    html += `<div style="margin-bottom: 20px;">`;
    html += `<h3>${index + 1}. ${job.title}</h3>`;
    html += `<p><strong>Company:</strong> ${job.company}</p>`;
    html += `<p><strong>Location:</strong> ${job.location}</p>`;
    html += `<p><strong>Experience:</strong> ${job.experience}</p>`;
    html += `<p><strong>Match Score:</strong> ${item.matchScore}%</p>`;
    html += `<p><a href="${job.applyUrl}">Apply Now</a></p>`;
    html += `</div>`;
  });

  html += `<hr/>`;
  html += `<p><em>This digest was generated based on your preferences.</em></p>`;

  return html;
};

/**
 * Create mailto link for digest
 */
export const createMailtoLink = (digest: DailyDigest): string => {
  const subject = encodeURIComponent('My 9AM Job Digest');
  const body = encodeURIComponent(formatDigestAsText(digest));
  return `mailto:?subject=${subject}&body=${body}`;
};

/**
 * Copy digest to clipboard
 */
export const copyDigestToClipboard = async (digest: DailyDigest): Promise<boolean> => {
  try {
    const text = formatDigestAsText(digest);
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
};
