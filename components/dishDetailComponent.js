import React, { Component , useState  } from "react";
import {useDispatch} from 'react-redux'
import { Card, Icon } from "react-native-elements";
import { View, Text, ScrollView, FlatList , StyleSheet ,Modal , Button } from "react-native";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postComment, postFavorite } from '../redux/ActionCreators';
import {  AirbnbRating  , Input} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),

})

const RenderDish = (props) => {
  
  const dispatch = useDispatch()
  const [showModal,setShowModal] = useState(false)
  const [rating , setRating] = useState(0)
  const [author , setAuthor] = useState("")
  const [comment , setComment] = useState("")

const handleComment= () => {
dispatch(postComment({
  author,
  comment,
  rating,
 dishId: props.dish.id
}))
}

const resetForm = () => {
  setAuthor("")
  setComment("")
  setRating(0)
}
  const toggleModal = () => {
    setShowModal( !showModal);
  }

  const ratingCompleted  = (rating)  => {
    setRating(rating)
  }
  const dish = props.dish;
  if (dish != null)
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}> {dish.description} </Text>
        <View  style={styles.iconContainer} > 
        <Icon
          raised
          reverse
          name={props.favorite ? "heart" : "heart-o"}
          color='#f50'
          type='font-awesome'
          onPress={() =>
            props.favorite ? console.log("already favorite") : props.onPress()
          }
        />
         <Icon
          raised
          reverse
          name={"pencil"}
          color='#512DA8'
          type='font-awesome'
          onPress={() => toggleModal()
           
          }
          
        />
        </View>
        <Modal  visible={showModal}   
        onDismiss = {() => toggleModal() }
        onRequestClose = {() => toggleModal() }
        >
        <View style = {styles.modal}>
        <AirbnbRating
    onFinishRating={() => ratingCompleted()}
    
   /> 
   <View style={styles.inputContainer} >
   <Input
   placeholder="Author"
   leftIcon={{ type: 'font-awesome', name: 'user' }}
   
   onChangeText={value => setAuthor(value)}
  />
     <Input
   placeholder="comment"
   leftIcon={{ type: 'font-awesome', name: 'comment' }}
   
   onChangeText={value => setComment(value)}
  />
   </View>
   <View  style={styles.btnContainer} ><Button 
                          
                          color="#512DA8"
                          title="submit" 
                          onPress={() => { handleComment();toggleModal() ; }
           
                          }
                          /></View>
  
  <View  style={styles.btnContainer} ><Button 
                         onPress={() => {resetForm();toggleModal()}
           
                         } 
                          color="grey"
                          title="cancel" 
                          /></View></View>
       
        </Modal>
   
      </Card>
      </Animatable.View>
    );
  else {
    return <View />;
  }
};

const RenderComments = (props) => {
  const comments = props.comments;
  const renderItemComments = ({ item, index }) => {
    return (
      <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card style={{ margin: 10 }} key={index}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <AirbnbRating
    defaultRating={item.rating}
   /> 
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}
        </Text>
      </Card>
      </Animatable.View>
    );
  };
  if (!comments) return <View />;
  else
    return (
      <Animatable.View animation="fadeInUp" duration={2000} delay={1000}> 
      <Card>
        <FlatList
          data={comments}
          renderItem={renderItemComments}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
      </Animatable.View>
    );
};

class DishDetail extends Component {
 
  markFavorite(dishId) {
    this.props.postFavorite(dishId);
}
  render() {
    const { dishId } = this.props.route.params;
    console.log(this.props)
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some(el => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer : {
    alignItems:"center",
    justifyContent:"center",
    flex : 1,
    flexDirection:"row"
    
  },
  modal: {
    justifyContent: 'center',
    margin: 20
 },
 inputContainer : {
   margin:20,
   justifyContent:'center',
   alignItems:'center'
 },
 btnContainer : {
   margin:10
 }
})

export default connect(mapStateToProps,mapDispatchToProps)(DishDetail);
