import { Pressable, Text } from 'react-native';
import { COLORS } from '../theme/colors';

export default function BigActionButton({ label, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? COLORS.secondary : COLORS.primary,
          paddingVertical: 18,
          paddingHorizontal: 24,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: COLORS.secondary,
          shadowOpacity: 0.7,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 18,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: COLORS.bg,
          fontSize: 18,
          fontWeight: '900',
          letterSpacing: 0.5,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

