import { Linking } from 'react-native';

const Share = {
  whatsApp: (phone: string, ddd?: string) =>
    Linking.openURL(`whatsapp://send?&phone=55${ddd}${phone}`),
  mail: (email: string) =>
    Linking.openURL(`mailto:${email}?subject=${''}&body=${''}`),
  phone: (phoneNumber: string) => Linking.openURL(`tel:${phoneNumber}`),
};

export default Share;
