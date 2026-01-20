import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, DailyFocus, CheckIn } from '@/types/user';

interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  todayFocus: DailyFocus | null;
  setTodayFocus: (focus: DailyFocus) => void;
  completeFocus: () => void;
  addCheckIn: (checkIn: CheckIn) => void;
  isOnboarded: boolean;
  setIsOnboarded: (value: boolean) => void;
  // Weight loss mission system
  missionDay: number;
  missionCompletedToday: boolean;
  completeMission: () => void;
  resetMissionCycle: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [todayFocus, setTodayFocus] = useState<DailyFocus | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [missionDay, setMissionDay] = useState(1);
  const [missionCompletedToday, setMissionCompletedToday] = useState(false);

  const completeFocus = () => {
    if (todayFocus) {
      setTodayFocus({ ...todayFocus, completed: true });
      if (user) {
        setUser({
          ...user,
          todayCompleted: true,
          streak: user.streak + 1,
        });
      }
    }
  };

  const addCheckIn = (checkIn: CheckIn) => {
    if (user) {
      setUser({
        ...user,
        lastCheckIn: checkIn.date,
      });
    }
  };

  const completeMission = () => {
    setMissionCompletedToday(true);
    // Advance to next day, cycle back to 1 after 30
    setMissionDay((prev) => (prev >= 30 ? 1 : prev + 1));
    // Reset completed status (in a real app, this would be time-based)
    setTimeout(() => setMissionCompletedToday(false), 100);
  };

  const resetMissionCycle = () => {
    setMissionDay(1);
    setMissionCompletedToday(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        todayFocus,
        setTodayFocus,
        completeFocus,
        addCheckIn,
        isOnboarded,
        setIsOnboarded,
        missionDay,
        missionCompletedToday,
        completeMission,
        resetMissionCycle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
