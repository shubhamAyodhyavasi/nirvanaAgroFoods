import { StyleSheet ,Dimensions} from "react-native";
import { colors } from "../../styles";
const screenWidth = Math.round(Dimensions.get('window').width);
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent:"center"
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "6%"
  },
  step1: {
  },
  step2: {
    flex: 1
  },
  step3: {
    flex: 1
  },
  step4: {
    flex: 1
  },
  input: {
    width: "80%",
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 6,
    paddingHorizontal: 8,
    marginTop: "6%"
  },
  btnStyle: {
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 100,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  btnImage: {
    width: "40%",
    height: "40%"
  },
  backBtn: {
    transform: [{ rotate: "180deg" }]
  },
  marginAround: {
    width: "40%",
    justifyContent: "space-between"
  },
  currentStepText: {
    color: "#fff",
    fontSize: 22
  },
  formView:{
    marginTop:20,
    width:screenWidth
  },
  formFieldView:{
    width:screenWidth-30
  },
  selectStyle:{
    width:300,
    padding: 12,
     borderBottomColor: colors.yellow,
    borderBottomWidth: 2,
    color:colors.yellow
},
iconBtn:{
  backgroundColor:colors.yellow,
},
list:{
  marginTop:10,
  paddingBottom:10
},
listText:{
  color:colors.white,
  paddingBottom:5
},
addAddressButton:{
  width:screenWidth-30,
  marginTop:20
},
centeredView: {
  flex: 1,
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginTop: 22,
  backgroundColor: '#ed7d3185',
},
modalView: {
  margin: 20,
  backgroundColor: 'white',
  padding: 35,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  elevation: 5,
},
modalHeading: {
  fontSize: 25,
  width: screenWidth - 110,
},

buttonGroup:{
  marginTop:20
},
currentLocationButton:{
  width: screenWidth - 110,
},
currentBackButton:{
  width: screenWidth - 110,
  marginTop:10,
  borderColor: colors.yellow,
  borderWidth: 2
},
errorMessage:{
  color:colors.pink
},
whiteColot:{
  color:colors.white
},
centerButton:{
  flex:1,
  justifyContent:"center",
  alignItems:"center"
},
confirmHeading:{
  textAlign:"center",
  padding:10,
  color:colors.white,
  borderBottomColor:colors.white,
  borderBottomWidth:2
},
scrollWRapper: {
  height: 250,
},
scrollView: {
  height: 100,
},
scrollWRapperBig: {
  height: 300,
},
scrollViewBig: {
  height: 150,
}
});