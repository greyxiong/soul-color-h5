import { StatusBar } from 'expo-status-bar';
import { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SetupScreen from './screens/SetupScreen';
import DashboardScreen from './screens/DashboardScreen';
import AdScreen from './screens/AdScreen';
import SummaryScreen from './screens/SummaryScreen';
import { COLORS } from './theme/colors';

export default function App() {
  const [screen, setScreen] = useState('login');
  const [total, setTotal] = useState(0);
  const [settings, setSettings] = useState({ goal: 150, hours: 8 });

  const goDashboard = useCallback((next) => {
    setSettings(next);
    setScreen('dashboard');
  }, []);

  const goAd = useCallback((amount) => {
    setTotal(amount);
    setScreen('ad');
  }, []);

  const resetDay = useCallback(() => {
    setTotal(0);
    setScreen('setup');
  }, []);

  return (
    <View style={styles.container}>
      {screen === 'login' ? <LoginScreen onContinue={() => setScreen('setup')} /> : null}
      {screen === 'setup' ? <SetupScreen onStart={goDashboard} /> : null}
      {screen === 'dashboard' ? (
        <DashboardScreen goal={settings.goal} hours={settings.hours} onClockOut={goAd} />
      ) : null}
      {screen === 'ad' ? <AdScreen onFinish={() => setScreen('summary')} /> : null}
      {screen === 'summary' ? <SummaryScreen total={total} onReset={resetDay} /> : null}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
});
