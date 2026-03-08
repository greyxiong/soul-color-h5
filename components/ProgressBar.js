import { View } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { COLORS } from '../theme/colors';

export default function ProgressBar({ progress = 0, fillColor = COLORS.neonGreen, bgColor = COLORS.progressBg, height = 16 }) {
  const width = useSharedValue(progress);
  const style = useAnimatedStyle(() => ({
    width: `${Math.max(0, Math.min(1, width.value)) * 100}%`,
  }));

  width.value = withTiming(progress, { duration: 250 });

  return (
    <View
      style={{
        height,
        width: '100%',
        backgroundColor: bgColor,
        borderRadius: height / 2,
        overflow: 'hidden',
      }}
    >
      <Animated.View
        style={[
          {
            height: '100%',
            backgroundColor: fillColor,
          },
          style,
        ]}
      />
    </View>
  );
}
