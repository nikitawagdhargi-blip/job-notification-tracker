import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'jobTrackerPreferences';

export interface Preferences {
  roleKeywords: string;
  preferredLocations: string[];
  preferredMode: string[];
  experienceLevel: string;
  skills: string;
  minMatchScore: number;
}

const defaultPreferences: Preferences = {
  roleKeywords: '',
  preferredLocations: [],
  preferredMode: [],
  experienceLevel: '',
  skills: '',
  minMatchScore: 40,
};

export const usePreferences = () => {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences({
          ...defaultPreferences,
          ...parsed,
        });
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever preferences change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      } catch (error) {
        console.error('Error saving preferences:', error);
      }
    }
  }, [preferences, isLoaded]);

  const updatePreferences = useCallback((updates: Partial<Preferences>) => {
    setPreferences((prev) => ({ ...prev, ...updates }));
  }, []);

  const savePreferences = useCallback((newPreferences: Preferences) => {
    setPreferences(newPreferences);
  }, []);

  const hasPreferences = useCallback(() => {
    return (
      preferences.roleKeywords.trim() !== '' ||
      preferences.preferredLocations.length > 0 ||
      preferences.preferredMode.length > 0 ||
      preferences.experienceLevel !== '' ||
      preferences.skills.trim() !== ''
    );
  }, [preferences]);

  return {
    preferences,
    updatePreferences,
    savePreferences,
    isLoaded,
    hasPreferences: hasPreferences(),
  };
};
