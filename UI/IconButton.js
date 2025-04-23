import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function IconButton({ icon, size, color, onPress, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={[styles.button, style]}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} // generoso!
    >
      <Ionicons name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 12, // questo rende l’area tappabile visibile + ampia
    // backgroundColor: 'white', // visibile per test
    // borderRadius: 50, // estetica (tonda)
    // borderWidth: 1,
    // borderColor: 'red',
  },
  pressed: {
    opacity: 0.6,
  },
});



// import { Pressable, View, StyleSheet } from "react-native";
// import { Ionicons } from '@expo/vector-icons';


// function IconButton({icon, size, color, onPress}) {

//     // console.log('IconName: ', {icon}, {size}, color={color})
    
//     return (
//         <Pressable onPress={onPress} style={(pressed) => pressed && styles.pressed}>
//             <View style={styles.buttonContainer}>
//                 <Ionicons name={icon} size={size} color={color} />
//             </View>
//         </Pressable>
//     )
// }

// const styles = StyleSheet.create({
//     buttonContainer: {
//         borderRadius: 8,
//         // borderColor: 'red',
//         // borderWidth:1,
//         padding: 2,
//         marginHorizontal: 0,
//         marginVertical: 0
//         ,
//     },
//     pressed: {
//         opacity: 0.75,
//     }
// })

// export default IconButton;