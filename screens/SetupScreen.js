import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { COLORS } from '../theme/colors';

export default function SetupScreen({ onStart }) {
  const [goal, setGoal] = useState('150');
  const [hours, setHours] = useState('8');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.bg,
        paddingHorizontal: 24,
        paddingTop: 80,
      }}
    >
      <Text style={{ color: COLORS.text, fontSize: 24, fontWeight: '900', marginBottom: 24 }}>
        Configurar seu corre
      </Text>

      <View style={{ backgroundColor: COLORS.panel, borderRadius: 16, padding: 16, marginBottom: 16 }}>
        <Text style={{ color: COLORS.muted, fontSize: 14, marginBottom: 8 }}>
          Meta Diária (R$)
        </Text>
        <TextInput
          value={goal}
          onChangeText={setGoal}
          keyboardType="numeric"
          style={{
            color: COLORS.text,
            fontSize: 32,
            fontWeight: '900',
            borderBottomWidth: 2,
            borderBottomColor: COLORS.neonGreen,
            paddingBottom: 6,
          }}
        />
      </View>

      <View style={{ backgroundColor: COLORS.panel, borderRadius: 16, padding: 16, marginBottom: 24 }}>
        <Text style={{ color: COLORS.muted, fontSize: 14, marginBottom: 8 }}>
          Horas de Trabalho
        </Text>
        <TextInput
          value={hours}
          onChangeText={setHours}
          keyboardType="numeric"
          style={{
            color: COLORS.text,
            fontSize: 32,
            fontWeight: '900',
            borderBottomWidth: 2,
            borderBottomColor: COLORS.neonGreen,
            paddingBottom: 6,
          }}
        />
      </View>

      <Pressable
        onPress={() => onStart({ goal: parseFloat(goal) || 150, hours: parseFloat(hours) || 8 })}
        style={({ pressed }) => [
          {
            backgroundColor: COLORS.neonGreen,
            paddingVertical: 18,
            borderRadius: 18,
            alignItems: 'center',
            opacity: pressed ? 0.85 : 1,
          },
        ]}
      >
        <Text style={{ color: '#0B0B0B', fontSize: 18, fontWeight: '900' }}>
          🚀 Começar o Corre
        </Text>
      </Pressable>
    </View>
  );
}

