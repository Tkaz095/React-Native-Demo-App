import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ComponentProps<typeof MaterialIcons>["name"];
  rightIcon?: React.ComponentProps<typeof MaterialIcons>["name"];
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  isPassword = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!isPassword);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
        ]}
      >
        {icon && (
          <MaterialIcons
            name={icon}
            size={20}
            color="#999"
            style={styles.iconLeft}
          />
        )}
        <TextInput
          {...props}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[styles.input, icon && styles.inputWithLeftIcon]}
          placeholderTextColor="#CCC"
        />
        {isPassword ? (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconRight}
          >
            <MaterialIcons
              name={showPassword ? "visibility" : "visibility-off"}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity onPress={onRightIconPress} style={styles.iconRight}>
            <MaterialIcons name={rightIcon} size={20} color="#999" />
          </TouchableOpacity>
        ) : null}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingRight: 12,
    backgroundColor: "#FFF",
    height: 48,
  },
  inputContainerFocused: {
    borderColor: "#1976D2",
    backgroundColor: "#F8FBFF",
  },
  inputContainerError: {
    borderColor: "#FF3B30",
  },
  icon: {
    marginRight: 8,
  },
  iconLeft: {
    marginLeft: 12,
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    paddingHorizontal: 12,
    height: "100%",
  },
  inputWithLeftIcon: {
    marginLeft: 0,
  },
  error: {
    fontSize: 12,
    color: "#FF3B30",
    marginTop: 6,
  },
});

export default Input;
