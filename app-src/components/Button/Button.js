import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'

const styles = {
  root: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  }
}

const Button = ({
  title,
  width,
  height,
  color,
  backgroundColor,
  onPress,
  children,
  textStyle,
  style,
  disabled,
}) => {
  const btnStyle = [styles.root, { width, height, backgroundColor }, style, {
    opacity: disabled ? 0.7: 1,
  }]
  const txtStyle = [styles.text, { color }, textStyle]
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={btnStyle}>
      {title && <Text style={txtStyle}>{title}</Text>}
      {children}
    </TouchableOpacity>
  )
}

Button.propTypes = {
  title: PropTypes.any,
  width: PropTypes.any,
  height: PropTypes.any,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  onPress: PropTypes.func,
  children: PropTypes.any,
  textStyle: PropTypes.object,
  style: PropTypes.object,
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  title: null,
  width: 'auto',
  height: 'auto',
  color: 'black',
  backgroundColor: '#cacaca',
  onPress: () => {},
  children: null,
  textStyle: {},
  style: {},
}

export default Button
