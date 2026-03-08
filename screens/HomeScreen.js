import { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import Animated, { useSharedValue, withRepeat, withSequence, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import RollingCurrency from '../components/RollingCurrency';
import ProgressBar from '../components/ProgressBar';
import BigActionButton from '../components/BigActionButton';
import BurstEffect from '../components/BurstEffect';
import { COLORS } from '../theme/colors';

const RATE_PER_SECOND = 0.05;
const DAILY_GOAL = 150;

export default function HomeScreen({ onEndDay }) {
  const [amount, setAmount] = useState(0);
  const [milestoneText, setMilestoneText] = useState('');
  const [showBurst, setShowBurst] = useState(false);
  const milestoneRef = useRef(0);
  const scale = useSharedValue(1);

  // pulse on milestone
  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    const tickMs = 50;
    const delta = RATE_PER_SECOND * (tickMs / 1000);
    const id = setInterval(() => {
      setAmount((a) => a + delta);
    }, tickMs);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const unit = Math.floor(amount / 10);
    if (unit > milestoneRef.current) {
      milestoneRef.current = unit;
      setMilestoneText(`Mais R$ 10! A caminho do churrasco!`);
      setShowBurst(true);
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch {}
      scale.value = withSequence(
        withTiming(1.1, { duration: 120 }),
        withTiming(1, { duration: 120 }),
      );
      const t = setTimeout(() => {
        setMilestoneText('');
        setShowBurst(false);
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [amount]);

  const progress = useMemo(() => Math.min(1, amount / DAILY_GOAL), [amount]);

  return (
    <View style={{ flex: 1, paddingTop: 64, paddingHorizontal: 20 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <Text style={{ color: COLORS.muted, fontSize: 16 }}>Taxímetro da renda</Text>
        <Animated.View style={[{ alignItems: 'center', justifyContent: 'center' }, scaleStyle]}>
          <RollingCurrency value={amount} fontSize={72} />
        </Animated.View>
        {milestoneText ? (
          <Text
            style={{
              color: COLORS.secondary,
              fontSize: 18,
              fontWeight: '800',
              textAlign: 'center',
              textShadowColor: COLORS.primary,
              textShadowRadius: 12,
            }}
          >
            {milestoneText}
          </Text>
        ) : null}
        <View style={{ width: '100%', gap: 8, marginTop: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: COLORS.text, fontWeight: '700' }}>Meta diária</Text>
            <Text style={{ color: COLORS.text, fontWeight: '700' }}>R$ 150,00</Text>
          </View>
          <ProgressBar progress={progress} />
        </View>
      </View>

      <View style={{ paddingBottom: 28 }}>
        <BigActionButton
          label="🚀 Bateu a meta! Encerrar dia"
          onPress={() => onEndDay(amount)}
          style={{ width: '100%' }}
        />
        <View
          style={{
            alignSelf: 'center',
            marginTop: 16,
            width: 320,
            height: 50,
            borderRadius: 8,
            backgroundColor: '#101512',
            borderColor: '#1F2A24',
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: COLORS.muted, fontSize: 12 }}>Banner Ads 320x50 (placeholder)</Text>
        </View>
      </View>

      <BurstEffect visible={showBurst} />
    </View>
  );
}

