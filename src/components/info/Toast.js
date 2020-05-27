import { Toast } from 'native-base';

const typesT = {DANGER: 'danger', SUCCESS: 'success', WARNING: 'warning'};
const paramsDefault = {position: 'bottom', duration: 5000};

export default class ToastMessage {
  constructor() {}

  /**
   * Exibe uma mensagem informativa
   * do tipo toast notification para o usuário
   * @param {string} descricao - da mensagem
   * @param {string} [position] - posição do Toast.
   * @param {number} [duration] - tempo de exibição do Toast
   */
  static info(
    msg,
    position = paramsDefault.position,
    duration = paramsDefault.duration,
  ) {
    Toast.show({
      text: msg,
      buttonText: 'Ok',
      duration,
      position,
    });
  }

  /**
   * Exibe uma mensagem informativa de atenção
   * do tipo toast notification para o usuário
   * @param {string} descricao - da mensagem
   * @param {string} [position] - posição do Toast.
   * @param {number} [duration] - tempo de exibição do Toast
   */
  static warning(
    msg,
    position = paramsDefault.position,
    duration = paramsDefault.duration,
  ) {
    Toast.show({
      text: msg,
      buttonText: 'Ok',
      type: typesT.WARNING,
      duration,
      position,
    });
  }

  /**
   * Exibe uma mensagem informativa de erro
   * do tipo toast notification para o usuário
   * @param {string} descricao - da mensagem
   * @param {string} [position] - posição do Toast.
   * @param {number} [duration] - tempo de exibição do Toast
   */
  static danger(
    msg,
    position = paramsDefault.position,
    duration = paramsDefault.duration,
  ) {
    Toast.show({
      text: msg,
      buttonText: 'Ok',
      type: typesT.DANGER,
      duration,
      position,
    });
  }

  /**
   * Exibe uma mensagem informativa de sucesso
   * do tipo toast notification para o usuário
   * @param {string} descricao - da mensagem
   * @param {string} [position] - posição do Toast.
   * @param {number} [duration] - tempo de exibição do Toast
   */
  static success(
    msg,
    position = paramsDefault.position,
    duration = paramsDefault.duration,
  ) {
    Toast.show({
      text: msg,
      buttonText: 'Ok',
      type: typesT.SUCCESS,
      duration,
      position,
    });
  }
}