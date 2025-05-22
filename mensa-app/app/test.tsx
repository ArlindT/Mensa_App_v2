import React from 'react';
import { View, Button, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

export default function TestScreen() {
  const handleAddTestData = async () => {
    try {
      Alert.alert("Klick erkannt", "Die Funktion wurde ausgelöst ✅");
      console.log("Versuche, Gericht zu speichern...");

      const docRef = await addDoc(collection(db, 'gerichte'), {
        name: 'Spaghetti Bolognese',
        bewertung: 4.5,
        datum: new Date().toISOString(),
      });

      console.log("Gespeichert mit ID:", docRef.id);
      Alert.alert('Erfolg 🎉', `Gespeichert mit ID: ${docRef.id}`);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      console.error("Fehler beim Speichern:", message);
      Alert.alert('Fehler ❌', message);
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 100 }}>
      <Button title="Testgericht speichern" onPress={handleAddTestData} />
    </View>
  );
}
