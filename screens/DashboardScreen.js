import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, { useSharedValue, withSequence, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { COLORS } from '../theme/colors';
import ProgressBar from '../components/ProgressBar';
import DigitalAmount from '../components/DigitalAmount';
import FloatingGain from '../components/FloatingGain';

export const DEBUG_SPEED_UP = false;

export default function DashboardScreen({ goal, hours, onClockOut }) {
  const [amount, setAmount] = useState(0);
  const [milestoneVisible, setMilestoneVisible] = useState(false);
  const [gains, setGains] = useState([]);
  const milestoneRef = useRef(0);
  const scale = useSharedValue(1);
  const shake = useSharedValue(0);
  const pop = useSharedValue(0);

  const ratePerSecond = useMemo(() => {
    const base = goal / (hours * 3600);
    return base * (DEBUG_SPEED_UP ? 1000 : 1);
  }, [goal, hours]);

  const overtime = amount >= goal;
  const progress = useMemo(() => Math.min(1, amount / goal), [amount, goal]);
  const extraPercent = Math.max(0, Math.floor((amount / goal - 1) * 100));

  useEffect(() => {
    let frame;
    let last = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const loop = (now) => {
      const current = now || Date.now();
      const delta = (current - last) / 1000;
      last = current;
      setAmount((prev) => {
        return prev + ratePerSecond * delta;
      });
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [ratePerSecond]);

  const triggerShake = useCallback(() => {
    shake.value = withSequence(
      withTiming(-6, { duration: 50 }),
      withTiming(6, { duration: 50 }),
      withTiming(-4, { duration: 50 }),
      withTiming(4, { duration: 50 }),
      withTiming(0, { duration: 50 }),
    );
  }, []);

  const triggerMilestone = useCallback(() => {
    setMilestoneVisible(true);
    pop.value = withSequence(withTiming(1, { duration: 200 }), withTiming(0, { duration: 200, delay: 1100 }));
    scale.value = withSequence(withTiming(1.15, { duration: 120 }), withTiming(1, { duration: 120 }));
    triggerShake();
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {}
    setTimeout(() => setMilestoneVisible(false), 1500);
  }, []);

  useEffect(() => {
    const currentMilestone = Math.floor(amount / 5);
    if (currentMilestone > milestoneRef.current && currentMilestone > 0) {
      milestoneRef.current = currentMilestone;
      triggerMilestone();
    }
  }, [amount]);

  const addGain = useCallback((value) => {
    const id = Date.now().toString();
    setGains((items) => [...items, { id, value }]);
  }, []);

  const onManualAdd = useCallback(() => {
    const value = Math.random() * 7 + 5;
    setAmount((prev) => prev + value);
    addGain(value);
    triggerShake();
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch {}
  }, []);

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));

  const popStyle = useAnimatedStyle(() => ({
    opacity: pop.value,
    transform: [{ scale: 0.6 + 0.4 * pop.value }],
  }));

  const barFill = overtime ? COLORS.gold : COLORS.neonGreen;
  const barBg = overtime ? '#2B1E00' : COLORS.progressBg;

  return (
    <Animated.View style={[{ flex: 1, backgroundColor: COLORS.bg, paddingTop: 54, paddingHorizontal: 20 }, shakeStyle]}>
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <Text style={{ color: overtime ? COLORS.gold : COLORS.muted, fontWeight: '800' }}>
          {overtime ? '🔥 MODO SURREAL' : 'Progresso do Corre'}
        </Text>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View style={scaleStyle}>
          <DigitalAmount value={amount} overtime={overtime} />
        </Animated.View>
        <View style={{ height: 30, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
          {milestoneVisible ? (
            <Text style={{ color: COLORS.gold, fontSize: 18, fontWeight: '900' }}>
              BOOM! +R$ 5! 🍻
            </Text>
          ) : null}
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: COLORS.text, fontWeight: '700' }}>Progresso do Corre</Text>
          <Text style={{ color: COLORS.text, fontWeight: '700' }}>
            {overtime ? `+${extraPercent}% EXTRA!` : `${Math.floor(progress * 100)}%`}
          </Text>
        </View>
        <ProgressBar progress={overtime ? 1 : progress} fillColor={barFill} bgColor={barBg} height={18} />
      </View>

      <View style={{ gap: 14, marginTop: 24, paddingBottom: 26 }}>
        <Pressable
          onPress={onManualAdd}
          style={({ pressed }) => [
            {
              backgroundColor: overtime ? '#2A1B00' : COLORS.panel,
              borderColor: COLORS.gold,
              borderWidth: 1,
              paddingVertical: 16,
              borderRadius: 18,
              alignItems: 'center',
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <Text style={{ color: COLORS.gold, fontSize: 18, fontWeight: '900' }}>
            + Nova Corrida/Entrega
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onClockOut(amount)}
          style={({ pressed }) => [
            {
              backgroundColor: '#2C2C2C',
              paddingVertical: 18,
              borderRadius: 18,
              alignItems: 'center',
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <Text style={{ color: COLORS.muted, fontSize: 18, fontWeight: '900' }}>
            Encerrar o Corre
          </Text>
        </Pressable>
      </View>

      <View pointerEvents="none" style={{ position: 'absolute', top: '38%', left: 0, right: 0, alignItems: 'center' }}>
        {gains.map((item) => (
          <FloatingGain
            key={item.id}
            value={item.value}
            overtime={overtime}
            onDone={() => setGains((items) => items.filter((g) => g.id !== item.id))}
          />
        ))}
      </View>

      {milestoneVisible ? (
        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: 'absolute',
              top: '30%',
              left: 0,
              right: 0,
              alignItems: 'center',
            },
            popStyle,
          ]}
        >
          <Text style={{ fontSize: 48 }}>🍻</Text>
          <View
            style={{
              marginTop: 10,
              paddingHorizontal: 18,
              paddingVertical: 10,
              borderRadius: 999,
              backgroundColor: COLORS.gold,
            }}
          >
            <Text style={{ color: '#101010', fontWeight: '900' }}>BOOM! +R$ 5! 🍻</Text>
          </View>
        </Animated.View>
      ) : null}
    </Animated.View>
  );
}
