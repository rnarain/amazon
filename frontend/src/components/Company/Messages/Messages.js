import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import MessagesNavbar from './MessagesNavbar';
// import JobList from './JobList';
import backendServer from '../../../webConfig'
import {dateTimeToDate} from '../../../helperMethods'
import IndividualMessage from './IndividualMessage'


class Messages extends Component {
    constructor(props) {
        //Call the constrictor of Super classNameName i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            messages: [],
            selectedMessage: {
              chats:[],
              user1:{
                id:null,
                name:null
              },
              user2:{
                id:null,
                name:null
              }
            },
        }

        this.showMessageDetail = this.showMessageDetail.bind(this);

    }
    //Call the Will Mount to set the auth Flag to false
    async componentWillMount() {

        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        await axios.get(`${backendServer}/api/message/getMessages/${localStorage.getItem('id')}`)
            .then(response => {
                console.log(response);
                this.setState({
                    messages: response.data.data,
                    selectedMessage: response.data.data[0],
                })
              

                // this.props.updateFilteredJobs({jobs:this.state.jobList});
            }
            ).catch(ex => {
                alert("error");
            });
    }

    showMessageDetail = (e) => {
      this.setState({
        selectedMessage: e
      })
    }

    render(){
      let messageList = this.state.messages.map(message => {
        let chattingWith = {};
        if(message.user1.id === localStorage.getItem('id')){
          chattingWith = message.user2
        }
        else{
          chattingWith = message.user1
        }
        return (
          //active_chat
          <div className="chat_list "  key={message._id} onClick={()=>this.showMessageDetail(message)}>
                <div className="chat_people">
                  <div className="chat_img"> <img src={  chattingWith.profile_img_url == null ? 'https://ptetutorials.com/images/user-profile.png' : chattingWith.profile_img_url} className="img-circle"/> </div>
                  <div className="chat_ib">
                    <h5>{chattingWith.name} <span className="chat_date">{message.chats.length > 0 ? dateTimeToDate(message.chats[message.chats.length - 1].time) :""}</span></h5>
                    <p>{message.chats.length > 0 ? message.chats[message.chats.length - 1].chat : ""}</p>
                  </div>
                </div>
              </div>
        )
    });

    let messageFrom= null;
    if(this.state.selectedMessage.user1.id===localStorage.getItem('id')){
      messageFrom = this.state.selectedMessage.user2.name
    }
    else{
      messageFrom = this.state.selectedMessage.user1.name
    }

        return (
            <div className="handshake-body">
                <div className=" col-sm-10 col-sm-offset-1 card-columns margin20">
                    <div className="col-sm-12 card">
                        <div className="message-heading margin20 container-fluid">
                            <div className="row ">
                                <div className="col-sm-4 message-heading-left">
                                    <h4>Messages</h4>
                                </div>
                                <div className="col-sm-8 message-heading-right">

                                <h4>{messageFrom}</h4>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-sm-12 card">
                        <div className="message-box">
                                <div className="col-sm-4 messageListLeft white-back nopadding">
            
                                {messageList}</div>

                                <div className="col-sm-8 white-back">
                                <IndividualMessage individualMessage={this.state.selectedMessage} />
                                </div>


                            </div>

                        </div>
                    </div>
                </div>

        )
    }
}
export default Messages;
