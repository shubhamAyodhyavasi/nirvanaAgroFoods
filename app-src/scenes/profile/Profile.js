import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, Image ,ImageBackground} from 'react-native'
import Button from '../../components/Button'
import { colors, images ,ScrollView} from '../../styles'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import Carousel ,{ Pagination } from 'react-native-snap-carousel';

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#f3f3f3",
  },
  categoryWrapper:{
     flexDirection: 'row',
     justifyContent:"space-evenly",
     flexWrap:"wrap",
     alignItems:"center",
     overflow:"scroll",
     
     paddingTop:5
  },
  singleCategory:{
    borderWidth:1,
    margin:6,
    marginTop:10,
    textAlign:"center",
    alignItems:"center",
    borderWidth: 2,
    borderRadius: 3,
    borderColor:colors.yellow,
    backgroundColor:"#fff"
   },
  categoryImage:{
    width:120,
    height:100
  },
  title:{
    height:25,
  },
  bannerImage:{
    height:180,
    
  },
  bannerTitle:{
    backgroundColor:"#ed7d316e",
    color:"#fff",
    textAlign:"left",
    marginTop:140,
    paddingLeft:10,
    fontSize:30
  },
  headingSection:{
    flexDirection: 'row',
     justifyContent:"space-between",
     flexWrap:"wrap",
     alignItems:"center",
     paddingTop:10,
     paddingLeft:2,
     paddingRight:10
 },
 catTitle:{
   fontSize:18
 },
 catLink:{
   color:colors.yellow,
 },
 offerButton:{
  marginLeft:8,
  marginRight:8
 }

})

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeIndex:1,
      carouselItems: [
      {
          title:"Item 1",
          text: "Text 1",
          image:images.frut
      },
      {
          title:"Item 2",
          text: "Text 2",
          image:images.grapes
      },
      {
          title:"Item 3",
          text: "Text 3",
          image:images.grapes
      },
      {
          title:"Item 4",
          text: "Text 4",
          image:images.frut
      },
      {
        title:"Item 1",
        text: "Text 1",
        image:images.frut
    },
    {
        title:"Item 2",
        text: "Text 2",
        image:images.grapes
    },
      
    ]
  }
}
_renderItem({item,index}){
  return (
    <View style={{
          backgroundColor:'#ed7d31',
          borderRadius: 5,
         }}>
          
          <ImageBackground source={{ uri: "https://f91.in/grocery/assets/uploads/users/vegetables1.jpg" }} style={styles.bannerImage}>
                <Text style={styles.bannerTitle}>{item.title}</Text>
          </ImageBackground>
    
    </View>

  )
}


  render() {
    const { navigation } = this.props
    return (
          <View style={styles.container}>
              <View style={{  flexDirection:'row', justifyContent: 'center'}}> 
              <Carousel
                  layout={'default'} layoutCardOffset={`9`}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={405}
                  autoplay={true}
                  itemWidth={415}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
                 
              </View>
                <View style={styles.headingSection}> 
                   <View style={styles.headingLeft}>
                      <Text style={styles.catTitle}> Popular categories</Text>
                   </View>
                   <View style={styles.headingLink}>
                      <Text style={styles.catLink}>Browse All { " "}   
                      <FontIcon
                name="arrow-right"
                 
              /></Text>
                   </View>
                   
                </View>
                 <View style={styles.categoryWrapper}>
                    
                    {
                      this.state.carouselItems.map((itm,index)=>
                       
                        <View style={styles.singleCategory}>
                          <Image
                          source={itm.image}
                          style={styles.categoryImage}
                        />
                        <Text style={styles.title} >{itm.title}</Text>
                     </View>
                       
                      )
                    }
                  </View>
                  <View style={styles.offerButton}>
                      <Button  title="VIEW ALL OFFERS"
                          color="white"
                          backgroundColor={colors.yellow}
                          onPress={() => {
                            navigation.goBack()
                          }}>
                           

                          </Button>
                   </View>
            </View>
            
         
    )
  }
}

Profile.propTypes = {
  navigation: PropTypes.object,
}

Profile.defaultProps = {
  navigation: {},
}

export default Profile
