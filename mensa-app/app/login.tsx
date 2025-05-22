import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import * as Haptics from 'expo-haptics';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterScreen() {
  const theme = useColorScheme() || 'light';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleRegister = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Fehler', 'Bitte fülle alle Felder aus.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Fehler', 'Die Passwörter stimmen nicht überein.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Registrierung erfolgreich 🎉', 'Dein Account wurde erstellt.');

      // Eingabefelder zurücksetzen
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      Alert.alert('Fehler bei der Registrierung ❌', message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: Colors[theme].background }]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: '#fb8d30' }]}>Registrieren</Text>

        {[
          { placeholder: 'Vorname', value: firstName, setValue: setFirstName, field: 'firstName' },
          { placeholder: 'Nachname', value: lastName, setValue: setLastName, field: 'lastName' },
          {
            placeholder: 'E-Mail',
            value: email,
            setValue: setEmail,
            field: 'email',
            keyboardType: 'email-address' as const,
            autoCapitalize: 'none' as const,
          },
          {
            placeholder: 'Passwort',
            value: password,
            setValue: setPassword,
            field: 'password',
            secureTextEntry: true,
          },
          {
            placeholder: 'Passwort wiederholen',
            value: confirmPassword,
            setValue: setConfirmPassword,
            field: 'confirmPassword',
            secureTextEntry: true,
          },
        ].map((input, index) => (
          <TextInput
            key={index}
            style={[
              styles.input,
              {
                backgroundColor: Colors[theme].surface,
                color: Colors[theme].text,
                borderColor: focusedField === input.field ? '#fb8d30' : Colors[theme].icon,
              },
            ]}
            placeholder={input.placeholder}
            placeholderTextColor={Colors[theme].icon}
            value={input.value}
            onChangeText={input.setValue}
            onFocus={() => setFocusedField(input.field)}
            onBlur={() => setFocusedField(null)}
            secureTextEntry={input.secureTextEntry}
            keyboardType={input.keyboardType}
            autoCapitalize={input.autoCapitalize ?? 'sentences'}
          />
        ))}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#fb8d30' }]}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Jetzt registrieren</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
