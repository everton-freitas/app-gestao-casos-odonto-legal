import { Platform } from 'react-native';

let Dialog, Toast, ALERT_TYPE;

if (Platform.OS !== 'web') {
  const alert = require('react-native-alert-notification');
  Dialog = alert.Dialog;
  Toast = alert.Toast;
  ALERT_TYPE = alert.ALERT_TYPE;
}

export const showNotification = ({ type = 'INFO', title, message, dialog = false, onHide = null }) => {
  if (Platform.OS === 'web') {
    // Notificação para web — você pode customizar ou usar react-toastify, etc.
    alert(`${title}\n\n${message}`);
    if (onHide) onHide();
    return;
  }

  if (dialog) {
    Dialog.show({
      type: ALERT_TYPE[type],
      title,
      textBody: message,
      button: 'OK',
      onHide,
    });
  } else {
    Toast.show({
      type: ALERT_TYPE[type],
      title,
      textBody: message,
    });
  }
};