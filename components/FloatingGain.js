import { useEffect } from 'react';
import { Text } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';
import { COLORS } from '../theme/colors';

export default function FloatingGain({ value, onDone, overtime }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) });
    const id = setTimeout(onDone, 820);
    return () => clearTimeout(id);
  }, [onDone]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: -80 * progress.value }, { scale: 1 + 0.4 * progress.value }],
    opacity: 1 - progress.value,
  }));

  return (
    <Animated.View style={[{ position: 'absolute', top: -10, left: 0, right: 0, alignItems: 'center' }, style]}>
      <Text
        style={{
          fontSize: 26,
          fontWeight: '900',
          color: overtime ? COLORS.gold : COLORS.neonGreen,
          textShadowColor: overtime ? COLORS.goldDeep : COLORS.neonGreen,
          textShadowRadius: 12,
        }}
      >
        +R$ {value.toFixed(2)}
      </Text>
    </Animated.View>
  );
}

