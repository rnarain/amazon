import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import backendServer from '../../../webConfig'
import { connect } from 'react-redux';
import {dateTimeToDate} from '../../../helperMethods'


class IndividualMessage extends Component {
    constructor(props) {
        //Call the constrictor of Super classNameName i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            selectedMessage: {},
            newMessage:null,
            typing:false,
            chatFrom:null,
            messageId:null,
            individualMessage:{
                chats:[],
                user1:{
                  id:null,
                  name:null
                },
                user2:{
                  id:null,
                  name:null
                }
            }
        }
    }
    //Call the Will Mount to set the auth Flag to false
     componentDidUpdate() {
        if(this.state.messageId !=this.props.individualMessage._id ){
            if(this.props.individualMessage.user1.id!==localStorage.getItem('id')){
                this.setState({
                    chatFrom :this.props.individualMessage.user1.id,
                    messageId : this.props.individualMessage._id,
                    individualMessage : this.props.individualMessage

                })
             }
             else{
                this.setState({
                    chatFrom :this.props.individualMessage.user2.id,
                    messageId : this.props.individualMessage._id,
                    individualMessage : this.props.individualMessage


                }) 
             }
        }
    }

    submitEdit = () => {
        var data = {
            from :localStorage.getItem('id'),
            to : this.state.chatFrom,
            chat : this.state.newMessage,
            id : this.state.messageId
        }
        
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        axios.post(`${backendServer}/api/message/addMessage`, data)
            .then(response => {
                console.log(response);
                if (response.status == 200) {
                    let newIM = this.state.individualMessage;
                    let temp = newIM.chats.concat({
                        from :localStorage.getItem('id'),
                        to : this.state.chatFrom,
                        chat : this.state.newMessage,
                        time: new Date()
                    })
                    this.setState({
                        individualMessage : {
                            chats : temp
                        },
                        newMessage:""
                    })
                }
            }
            ).catch(ex => {
                alert(ex);
            });
        this.setState({
            typing: false,
        })
    }

    cancelEdit = (e) => {
        this.setState({
            typing: false,
            newMessage:""
        })
    }
    typingHandler = (e) => {
        this.setState({
            newMessage: e.target.value,
            typing:true
        })
      }

    render(){
      let chats = this.state.individualMessage.chats.map(chat => {
        if(chat.to === localStorage.getItem('id')){
            return (
                <div className="incoming_msg">
                <div className="incoming_msg_img"> <img src={chat.profile_img_url == null ? 'https://ptetutorials.com/images/user-profile.png' : chat.profile_img_url } alt="sunil" /> </div>
                <div className="received_msg">
                  <div className="received_withd_msg">
                    <p>{chat.chat}</p>
                    <span className="time_date float-left">{dateTimeToDate(chat.time)}</span></div>
                </div>
              </div>
            )
        }
        else{
            return(
                <div className="outgoing_msg">
              <div className="sent_msg">
              <p>{chat.chat}</p>
                    <span className="time_date float-right">{dateTimeToDate(chat.time)}</span></div>
            </div>
            )
        }
    });

    


    let buttons= null;
        if(this.state.typing){
            buttons= 
                <p>
                    <button onClick={this.submitEdit} className="btn btn-success edit-button">Send</button>
                    <button onClick={this.cancelEdit} className="btn btn-danger edit-button">Cancel</button>
                </p>
        }
        return (
            <div>
            <div className=" row messageListRight">
                {chats}
           </div>
            <div className="row messageTextBox">
            <textarea className="form-control" value={this.state.newMessage} onChange={this.typingHandler} placeholder="Type Here" rows="2"></textarea>
                    {buttons}
            </div>
            </div>
        )
    }
}
export default IndividualMessage;
