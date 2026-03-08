import { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  withDelay,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { COLORS } from '../theme/colors';

function Coin({ delay = 0, angle = 0 }) {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withDelay(delay, withTiming(1, { duration: 800, easing: Easing.out(Easing.quad) }));
  }, []);
  const style = useAnimatedStyle(() => {
    const r = 120;
    const dx = Math.cos(angle) * r * t.value;
    const dy = Math.sin(angle) * r * t.value;
    const scale = 1 + 0.5 * (1 - t.value);
    const opacity = 1 - t.value;
    return {
      transform: [{ translateX: dx }, { translateY: dy }, { scale }],
      opacity,
    };
  });
  return (
    <Animated.Text style={[{ position: 'absolute', fontSize: 24 }, style]}>
      🪙
    </Animated.Text>
  );
}

export default function BurstEffect({ visible }) {
  if (!visible) return null;
  const coins = Array.from({ length: 10 }).map((_, i) => {
    const angle = (i / 10) * Math.PI * 2;
    return <Coin key={i} delay={i * 20} angle={angle} />;
    });
  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        top: '45%',
        left: '50%',
        width: 0,
        height: 0,
      }}
    >
      {coins}
    </View>
  );
}

