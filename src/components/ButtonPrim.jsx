import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ButtonPrim = (props) => {
    const { onPress, buttonStyles } = props;

    return (
        <TouchableOpacity style={{...styles.button, ...buttonStyles}} onPress={onPress}>
            <Text style={styles.text}>{props.children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor: 'hsl(550, 100%, 50%)',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 10,
      alignSelf: 'baseline',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold'
    }
  });

export default ButtonPrim;