import { useEffect } from 'react';
import { Text } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
} from 'react-native-reanimated';
import { COLORS } from '../theme/colors';

const AnimatedText = Animated.createAnimatedComponent(Text);

function formatBRL(value) {
  try {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `R$ ${value.toFixed(2)}`;
  }
}

export default function RollingCurrency({ value, fontSize = 64 }) {
  const animated = useSharedValue(value);

  useEffect(() => {
    animated.value = withTiming(value, { duration: 300 });
  }, [value]);

  const animatedProps = useAnimatedProps(() => {
    return {
      text: formatBRL(animated.value),
    };
  });

  const isWeb = typeof document !== 'undefined';

  if (isWeb) {
    return (
      <Text
        style={{
          fontSize,
          color: COLORS.primary,
          fontWeight: '900',
          textShadowColor: COLORS.secondary,
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 18,
          letterSpacing: 1,
        }}
      >
        {formatBRL(value)}
      </Text>
    );
  }

  return (
    <AnimatedText
      animatedProps={animatedProps}
      style={{
        fontSize,
        color: COLORS.primary,
        fontWeight: '900',
        textShadowColor: COLORS.secondary,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 18,
        letterSpacing: 1,
      }}
    />
  );
}
