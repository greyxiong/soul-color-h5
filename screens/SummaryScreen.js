import { View, Text, Pressable } from 'react-native';
import { COLORS } from '../theme/colors';

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

export default function SummaryScreen({ total, onReset }) {
  const beers = Math.max(0, Math.floor(total / 4));
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F68A2C',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 90,
        paddingHorizontal: 24,
        paddingBottom: 28,
      }}
    >
      <View style={{ alignItems: 'center', gap: 16 }}>
        <Text style={{ color: '#4A1C00', fontSize: 22, fontWeight: '900' }}>
          Dia Concluído, Guerreiro!
        </Text>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 40,
            fontWeight: '900',
            textShadowColor: '#5A2E00',
            textShadowRadius: 18,
            textAlign: 'center',
          }}
        >
          Hoje você fez {formatBRL(total)}!
        </Text>
        <Text
          style={{
            color: '#4A1C00',
            fontSize: 18,
            fontWeight: '800',
            textAlign: 'center',
          }}
        >
          Isso paga {beers} latas de Skol gelada e um churrasco! 🥩
        </Text>
      </View>

      <Pressable
        onPress={onReset}
        style={({ pressed }) => [
          {
            backgroundColor: COLORS.white,
            paddingVertical: 16,
            paddingHorizontal: 24,
            borderRadius: 999,
            width: '100%',
            alignItems: 'center',
            opacity: pressed ? 0.85 : 1,
          },
        ]}
      >
        <Text style={{ color: '#F05A00', fontSize: 18, fontWeight: '900' }}>
          Descansar agora
        </Text>
      </Pressable>
    </View>
  );
}
