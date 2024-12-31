import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'


function InputField({ ...proops }) {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={"#626262"}
      style={[
        {
          fontFamily: "poppins-regular",
          fontSize: 14,
          padding: 10 * 2,
          backgroundColor: "#f1f4ff",
          borderRadius: 10,
          marginVertical: 10,
          color: 'black'
        },
        focused && {
          borderWidth: 1,
          shadowOffset: { width: 4, height: 10 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
          borderColor: 'blue',
          color: 'black'
        },
      ]}
      {...proops}

    />
  )
}
export default InputField


