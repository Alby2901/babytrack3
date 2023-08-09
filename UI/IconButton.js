import { Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';


function IconButton({icon, size, color, onPress}) {

    // console.log('IconName: ', {icon}, {size}, color={color})
    
    return (
        <Pressable onPress={onPress} style={(pressed) => pressed && styles.pressed}>
            <View style={styles.buttonContainer}>
                <Ionicons name={icon} size={size} color={color} />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 8,
        // borderColor: 'red',
        // borderWidth:1,
        padding: 2,
        marginHorizontal: 0,
        marginVertical: 0
        ,
    },
    pressed: {
        opacity: 0.75,
    }
})

export default IconButton;