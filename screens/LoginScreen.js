import { View, Text, Pressable } from 'react-native';
import { COLORS } from '../theme/colors';

function LoginButton({ label, bg, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          width: '100%',
          paddingVertical: 16,
          borderRadius: 18,
          alignItems: 'center',
          backgroundColor: bg,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <Text style={{ color, fontSize: 16, fontWeight: '800' }}>{label}</Text>
    </Pressable>
  );
}

export default function LoginScreen({ onContinue }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.bg,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        gap: 16,
      }}
    >
      <Text style={{ fontSize: 64 }}>💸</Text>
      <Text style={{ color: COLORS.text, fontSize: 24, fontWeight: '900' }}>
        Bem-vindo ao Corre
      </Text>
      <View style={{ width: '100%', gap: 12, marginTop: 16 }}>
        <LoginButton label="Continuar com Google" bg={COLORS.white} color="#111" onPress={onContinue} />
        <LoginButton label="Continuar com WhatsApp" bg="#25D366" color="#0A0A0A" onPress={onContinue} />
        <LoginButton label="Continuar com Facebook" bg="#1877F2" color={COLORS.white} onPress={onContinue} />
      </View>
    </View>
  );
}

