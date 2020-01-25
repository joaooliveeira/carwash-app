import React, { useState } from "react";
import { View, ScrollView, Keyboard, Text } from "react-native";
import { Card, TextInput, Snackbar } from "react-native-paper";
import { styles } from "./styles";
import ButtonCustom from "../../components/ButtonCustom";
import { themes } from "../../assets/themes";
import { TextInputMask } from "react-native-masked-text";

export default function Expense(props) {
  const [expenseValue, setExpenseValue] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const createNewExpense = () => {
    setLoading(true);

    Keyboard.dismiss();

    setTimeout(() => {
      setLoading(false);
      setSnackbar(true);
      clearAllInputs();
    }, 1200);
  };

  const clearAllInputs = () => {
    setExpenseValue('');
    setExpenseType('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Card elevation={2} style={styles.card}>
          <Card.Title title="Registrar nova despesa" />
          <Card.Content>
            <TextInput
              label="Valor"
              theme={themes.input}
              style={styles.input}
              error={false}
              value={expenseValue}
              render={props => (
                <TextInputMask
                  {...props}
                  type={'money'}
                  onChangeText={text => setExpenseValue(text)}
                />
              )}
            />
            <TextInput
              label="Tipo"
              theme={themes.input}
              style={styles.input}
              error={false}
              value={expenseType}
              onChangeText={text => setExpenseType(text)}
            />
            <TextInput
              label="Descrição"
              theme={themes.input}
              style={styles.input}
              value={description}
              onChangeText={text => setDescription(text)}
              render={props => (
                <TextInputMask {...props} type={'only-numbers'} />
              )}
            />
          </Card.Content>

          <View style={{ marginVertical: 30, marginHorizontal: 15 }}>
            <ButtonCustom
              mode="contained"
              icon="cash-register"
              loading={loading}
              onPress={createNewExpense}
              label="REGISTRAR"
            />
          </View>
        </Card>
      </ScrollView>
      <Snackbar
        visible={snackbar}
        onDismiss={() => setSnackbar(false)}
        duration={5000}
        action={{
          label: 'OK',
          onPress: () => setSnackbar(false)
        }}
      >
        <Text>Despesa registrada com sucesso.</Text>
      </Snackbar>
    </View>
  );
}
