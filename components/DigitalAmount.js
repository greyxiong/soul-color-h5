import { Text, View, Platform } from 'react-native';
import { COLORS } from '../theme/colors';

function formatAmount(value) {
  const fixed = value.toFixed(4);
  const main = fixed.slice(0, -2);
  const micro = fixed.slice(-2);
  return { main, micro };
}

export default function DigitalAmount({ value, overtime }) {
  const { main, micro } = formatAmount(value);
  const fontFamily = Platform.select({
    ios: 'Menlo',
    android: 'monospace',
    default: 'monospace',
  });

  const mainColor = overtime ? COLORS.gold : COLORS.neonGreen;
  const microColor = overtime ? COLORS.goldDeep : '#1F8A11';

  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      <Text
        style={{
          fontSize: 64,
          fontWeight: '900',
          color: mainColor,
          textShadowColor: overtime ? COLORS.goldDeep : COLORS.neonGreen,
          textShadowRadius: overtime ? 22 : 12,
          letterSpacing: 1,
          fontFamily,
        }}
      >
        R$ {main}
      </Text>
      <Text
        style={{
          fontSize: 32,
          fontWeight: '900',
          color: microColor,
          marginTop: 18,
          marginLeft: 2,
          fontFamily,
        }}
      >
        {micro}
      </Text>
    </View>
  );
}

