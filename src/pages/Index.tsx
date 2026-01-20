import { useState } from 'react';
import { UserProvider, useUser } from '@/contexts/UserContext';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { BottomNav } from '@/components/layout/BottomNav';
import { TodayScreen } from '@/components/screens/TodayScreen';
import { MethodScreen } from '@/components/screens/MethodScreen';
import { RoutineScreen } from '@/components/screens/RoutineScreen';
import { ProgressScreen } from '@/components/screens/ProgressScreen';
import { HelpScreen } from '@/components/screens/HelpScreen';
import { WeightLossScreen } from '@/components/screens/WeightLossScreen';

function AppContent() {
  const { isOnboarded, user } = useUser();
  const [activeTab, setActiveTab] = useState('today');

  if (!isOnboarded) {
    return <OnboardingFlow />;
  }

  return (
    <div className="min-h-screen bg-background">
      {activeTab === 'today' && <TodayScreen />}
      {activeTab === 'weightloss' && <WeightLossScreen />}
      {activeTab === 'method' && <MethodScreen />}
      {activeTab === 'routine' && <RoutineScreen />}
      {activeTab === 'progress' && <ProgressScreen />}
      {activeTab === 'help' && <HelpScreen />}
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

const Index = () => {
  return (
    <UserProvider>
      <div className="max-w-md mx-auto min-h-screen bg-background shadow-xl">
        <AppContent />
      </div>
    </UserProvider>
  );
};

export default Index;
