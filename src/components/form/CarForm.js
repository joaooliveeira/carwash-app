import React, { useState } from "react";
import { View, Keyboard, StyleSheet } from "react-native";
import { TextInput, Card, HelperText, Divider } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import ButtonCustom from "../ButtonCustom";
import { themes } from "../../assets/themes";
import { clearNumber } from "../../utils/formatter";
import {
  getCarByLicensePlate,
  getCarByCardNumber
} from "../../services/car/carLocalDb";
import { createCar } from "../../services/car/carService";
import { FONT_FAMILY_REGULAR } from "../../styles/typography";

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
      if (carIsValid()) {
        Keyboard.dismiss();
        await createCar(car);
        props.onUpdate("Veículo alterado com sucesso.");
        props.dismissModal();
      }
    } else {
      Keyboard.dismiss();
      props.dismissModal();
    }

    setLoading(false);
  };

  const carIsValid = () => {
    const modelError =
      car.model.length >= 2
        ? false
        : "O modelo deve conter pelo menos dois caracteres.";

    const licensePlateError =
      car.licensePlate.length == 7 ? false : "Placa inválida.";

    const cardNumberError =
      car.cardNumber.length !== 0 && clearNumber(car.cardNumber).length !== 16
        ? "Número do cartão inválido."
        : false;

    setError({
      model: modelError,
      licensePlate: licensePlateError,
      cardNumber: cardNumberError
    });

    return !(modelError || licensePlateError || cardNumberError);
  };

  return (
    <Card style={styles.card}>
      <Card.Title title="Editar veículo" />

      <Divider />

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
          O modelo deve conter pelo menos dois caracteres.
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
              const carFromStorage = await getCarByLicensePlate(text);
              if (carFromStorage && text !== props.car.licensePlate) {
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
              const carFromStorage = await getCarByCardNumber(text);
              if (carFromStorage && text !== props.car.cardNumber) {
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
          label="CANCELAR"
          mode="text"
          style={{ flexGrow: 1, marginHorizontal: 15 }}
          onPress={() => {
            Keyboard.dismiss();
            props.dismissModal();
          }}
        />

        <ButtonCustom
          label="CADASTRAR"
          icon="account-plus"
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
    margin: 2,
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
