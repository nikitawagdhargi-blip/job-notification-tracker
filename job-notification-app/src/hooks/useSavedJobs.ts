import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'job-notification-tracker-saved-jobs';

export const useSavedJobs = () => {
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved jobs from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedJobIds(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading saved jobs:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever savedJobIds changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedJobIds));
      } catch (error) {
        console.error('Error saving jobs:', error);
      }
    }
  }, [savedJobIds, isLoaded]);

  const toggleSaveJob = useCallback((jobId: string) => {
    setSavedJobIds((prev) => {
      if (prev.includes(jobId)) {
        return prev.filter((id) => id !== jobId);
      }
      return [...prev, jobId];
    });
  }, []);

  const isJobSaved = useCallback(
    (jobId: string) => savedJobIds.includes(jobId),
    [savedJobIds]
  );

  return {
    savedJobIds,
    toggleSaveJob,
    isJobSaved,
    isLoaded,
  };
};
