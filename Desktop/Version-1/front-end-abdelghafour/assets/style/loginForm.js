import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    formContainer : {
        maxWidth: 390,
        maxHeight: 560,
        backgroundColor: '#fff',
        borderRadius: 40,
        flex:1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
    },
    input : {
        height: 50,
        width: 340,
        borderWidth:1,
        borderRadius:16,
        borderColor: "#cccccc",
        padding: 10,
        fontSize : 19,
    },
    actionBtn : {
        backgroundColor: "#6dd6ff",
        borderRadius : 20,
        height:40,
        width:160,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        marginTop : 30,
    },
    actionBtnTxt : {
        fontSize: 18,
        color : '#fff',
    },
    line : {
        borderBottomWidth : 2,
        borderBottomColor : "#cccccc",
        marginTop : 60,
        width : "80%"
    },
    link : {
        marginTop : 5,
        fontSize : 19,
        color : "#75a5cf",
    },
    inputError : {
        marginTop : 5, 
        color: "red",
        marginBottom : 20,
    },
    
})

export default styles;