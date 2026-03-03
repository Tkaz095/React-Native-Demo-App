import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from "react-native";

export interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  testID?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  testID,
  style,
  textStyle,
}) => {
  const buttonStyles = [
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    disabled && styles.buttonDisabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    disabled && styles.textDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={buttonStyles}
      testID={testID}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#fff" : "#1976D2"} />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button_primary: {
    backgroundColor: "#1976D2",
  },
  button_secondary: {
    backgroundColor: "#F5F5F5",
  },
  button_outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#1976D2",
  },
  button_sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  button_md: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  button_lg: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: "600",
    fontSize: 14,
  },
  text_primary: {
    color: "#fff",
  },
  text_secondary: {
    color: "#333",
  },
  text_outline: {
    color: "#1976D2",
  },
  text_sm: {
    fontSize: 12,
  },
  text_md: {
    fontSize: 14,
  },
  text_lg: {
    fontSize: 16,
  },
  textDisabled: {
    color: "#999",
  },
});

export default Button;
