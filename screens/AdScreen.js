import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '../theme/colors';

export default function AdScreen({ onFinish }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(id);
          onFinish();
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [onFinish]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0F0F0F',
        paddingTop: 60,
        paddingHorizontal: 24,
      }}
    >
      <View style={{ alignItems: 'flex-end' }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#2B2B2B',
            borderRadius: 999,
            paddingHorizontal: 12,
            paddingVertical: 6,
          }}
        >
          <Text style={{ color: COLORS.muted }}>Ad • Skip in {count}s</Text>
        </View>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <Text style={{ fontSize: 64 }}>🎰</Text>
        <Text style={{ color: COLORS.gold, fontSize: 24, fontWeight: '900' }}>Cassino Épico</Text>
        <Text style={{ color: COLORS.muted, fontSize: 16 }}>Só um instante...</Text>
      </View>
    </View>
  );
}

