import React, { useState } from "react";
import { View, Keyboard, StyleSheet } from "react-native";
import { TextInput, Card, HelperText, Divider } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import ButtonCustom from "../ButtonCustom";
import { themes } from "../../assets/themes";
import { clearNumber } from "../../utils/formatter";
import { FONT_FAMILY_REGULAR } from "../../styles/typography";
import { getCarByLicensePlate, saveCar, getCarByCardNumber } from "../../services/requests";
import ToastMessage from "../info/Toast";

export default function CarForm(props) {
  const [car, setCar] = useState(props.car);
  const [carHasBeenChanged, setCarHasBeenChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    model: false,
    licensePlate: false,
    cardNumber: false
  });

  const updateCar = async () => {
    setLoading(true);

    if (carHasBeenChanged) {
      if (await validateData()) {
        Keyboard.dismiss();
        saveCar(car).then(response => {
          ToastMessage.success("Veículo alterado com sucesso");
          props.onFinished(response);
          props.goBack();
        }).finally(() => setLoading(false))
      } else {
        setLoading(false);
      }
    } else {
      ToastMessage.warning("Nenhuma informação foi alterada")
      props.goBack();
    }
  };

  const validateData = async () => {
    const modelError = validateModel();
    const licensePlateError = await validateLicensePlate();
    const cardNumberError = await validateCardNumber();

    setError({
      model: modelError,
      licensePlate: licensePlateError,
      cardNumber: cardNumberError
    });

    return !(modelError || licensePlateError || cardNumberError);
  };

  const validateModel = () => {
    return car.model.length >= 2 ? false : "O modelo deve conter pelo menos dois caracteres.";
  }

  const validateLicensePlate = async () => {
    if (car.licensePlate.length == 7) {
      const carFromDb = await getCarByLicensePlate(car.licensePlate);
      if (carFromDb && carFromDb.id !== props.car.id) {
        return "Placa já cadastrada."
      } else {
        return false;
      }
    } else {
      return "Placa inválida.";
    }
  }

  const validateCardNumber = async () => {
    if (clearNumber(car.cardNumber).length === 16) {
      const carFromDb = await getCarByCardNumber(clearNumber(car.cardNumber));
      if (carFromDb && carFromDb.id != props.car.id) {
        return "Cartão já cadastrado."
      } else {
        return false
      }
    } else if (car.cardNumber.length === 0) {
      return false;
    } else {
      return "Cartão inválido."
    }
  }

  return (
    <Card style={styles.card}>
      <Card.Title title="Alterar dados" />

      <Divider style={{ marginVertical: 5 }}/>

      <Card.Content>
        <TextInput
          label="Modelo *"
          theme={themes.input}
          style={styles.input}
          error={error.model}
          autoCapitalize="words"
          value={car.model}
          onChangeText={text => {
            setCar({ ...car, model: text });
            setCarHasBeenChanged(true);

            if (error.model) {
              setError({ ...error, model: text.length <= 1 });
            }
          }}
        />
        <HelperText
          type="error"
          visible={error.model}
          padding="none"
          style={styles.helperText}
        >
          Insira pelo menos dois caracteres para modelo.
        </HelperText>

        <TextInput
          label="Placa *"
          theme={themes.input}
          style={styles.input}
          error={error.licensePlate}
          value={car.licensePlate}
          autoCapitalize="characters"
          onChangeText={async text => {
            setCar({ ...car, licensePlate: text });
            setCarHasBeenChanged(true);

            if (text.length === 7) {
              const carFromDb = await getCarByLicensePlate(text);
              if (carFromDb && carFromDb.id != props.car.id) {
                setError({
                  ...error,
                  licensePlate: "Placa já cadastrada."
                });
              } else if (error.licensePlate) {
                setError({
                  ...error,
                  licensePlate: false
                });
              }
            } else if (text.length > 7) {
              setError({
                ...error,
                licensePlate: "Placa inválida."
              });
            } else if (text.length < 7) {
              setError({
                ...error,
                licensePlate: false
              });
            }
          }}
        />
        <HelperText
          type="error"
          visible={error.licensePlate}
          padding="none"
          style={styles.helperText}
        >
          {error.licensePlate}
        </HelperText>

        <TextInput
          label="Número do cartão"
          theme={themes.input}
          style={styles.input}
          error={error.cardNumber}
          keyboardType="numeric"
          value={car.cardNumber}
          onChangeText={async text => {
            setCar({ ...car, cardNumber: text });
            setCarHasBeenChanged(true);

            if (text.length === 19) {
              const carFromDb = await getCarByCardNumber(clearNumber(text));
              if (carFromDb && carFromDb.id !== props.car.id) {
                setError({
                  ...error,
                  cardNumber: "Número de cartão já cadastrado."
                });
              } else if (error.cardNumber) {
                setError({
                  ...error,
                  cardNumber: false
                });
              }
            }
          }}
          render={props => (
            <TextInputMask
              {...props}
              type={"custom"}
              options={{
                mask: "9999 9999 9999 9999"
              }}
            />
          )}
        />
        <HelperText
          type="error"
          visible={error.cardNumber}
          padding="none"
          style={styles.helperText}
        >
          {error.cardNumber}
        </HelperText>
      </Card.Content>

      <Divider style={{ marginTop: 10 }} />

      <View style={styles.buttonsContainer}>
        <ButtonCustom
          label="LIMPAR"
          mode="text"
          style={{ flexGrow: 1, marginHorizontal: 15 }}
          onPress={() => {
            setCar({...car, model: '', licensePlate: '', cardNumber: '' });
            setCarHasBeenChanged(true);
          }}
        />

        <ButtonCustom
          label="SALVAR"
          icon="content-save"
          mode="contained"
          style={{ flexGrow: 1, marginRight: 15 }}
          loading={loading}
          onPress={updateCar}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 8
  },
  helperText: {
    marginHorizontal: 5
  },
  input: {
    paddingVertical: 0,
    paddingHorizontal: 5,
    fontFamily: FONT_FAMILY_REGULAR
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20
  }
});
