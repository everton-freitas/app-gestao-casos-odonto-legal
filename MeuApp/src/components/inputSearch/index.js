import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../Colors';

const InputSearch = ({
  placeholder,
  variant = 'primary',
  value,
  onChangeText,
  onSubmitEditing,
  style,
}) => {
  return (
    <View style={[styles.searchContainer, style]}>
      <TextInput
        style={[
          styles.input,
          variant === 'secondary' && styles.secondary,
          variant === 'primary' && styles.primary,
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholderTextColor={COLORS.disabledColor}
      />
    </View>
  );
};

export default InputSearch;