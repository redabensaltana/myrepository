import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    formContainer : {
        width: "100%",
        height: "100%",
        backgroundColor: '#fff',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        flex:1,
    },
    inputContainer : {
        width: 340,
        borderWidth:1,
        borderRadius:16,
        borderColor: "#cccccc",
        marginTop: 20,
        marginBottom: 20,
        padding: 16,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
    },
    input : {
        height: 26,
        width: "auto",
        fontSize : 19,
    },
    heading : {
        marginTop:40,
        backgroundColor: "#6dd6ff",
        borderRadius : 20,
        height:45,
        width: 340, 
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    actionBtn : {
        backgroundColor: "#6dd6ff",
        borderRadius : 20,
        height:40,
        width:160,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    actionBtnTxt : {
        fontSize: 18,
        color : '#fff',
    },
    line : {
        borderBottomWidth : 0.5,
        borderBottomColor : "#75a5cf",
        marginTop : 5,
        width : "100%"
    },
    returnBtn : {
        marginTop : 50,
        marginBottom : 50,
        marginRight : 300,
        backgroundColor: "#75a5cf",
        borderRadius : 20,
        height:40,
        width:120,
        flexDirection: 'row',
        justifyContent:"space-evenly",
        alignItems: "center",
    },
    headingTxt : {
        fontSize: 20,
        color : '#fff',
        fontWeight:"900",
    },
    inputError : {
        marginTop : 5, 
        color: "red",
        marginBottom : 20,

    },
    
})

export default styles;