import React from "react";
import { Message, Icon, Segment, Header, Grid, Input, TextArea, Button, Form } from "semantic-ui-react";

const buttonSubmit = async (formInputs, setPageState) => {
    setPageState({messageSent: false, loading: true, error: false});
    let response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formInputs)
      });
    if (response.status == 200) {
        setPageState({messageSent: true, loading: false, error: false});
    } else {
        setPageState({messageSent: true, loading: false, error: true});
    }
    console.log(response);
};

const fieldOnChange = (target, formInputs, setFormInputs) => {
    setFormInputs({...formInputs, [target.name]: target.value});
}

const ContactusPage = (props) => {
    console.log(props.isMobile);
    let [formInputs, setFormInputs] = React.useState({name: "", email: "", subject: "", message: ""});
    let [pageState, setPageState] = React.useState({messageSent: false, loading: false, error: false})
    return (
        <Segment>
            <Header style={{textAlign: "center", color: "#B3B6B6", marginTop: "2em"}}>
                CONTACT US
            </Header>
            <br></br><br></br><br></br>
            <Grid>
                <Grid.Row centered  columns={props.isMobile? 1:2} style={{margin: "3em"}}>
                    <Grid.Column width={props.isMobile? 16:6} style={{marginRight: "2em"}} >
                        <Header style={{textAlign: "center", color: "#CD5858"}}>
                            CONTACT INFO
                        </Header>
                        <hr color= "#ECF0F0"></hr><br></br>
                        <p>Phone: (777) 777-7777</p>
                        <p>Hours of Operation: 10am-6pm Monday-Friday</p>
                        <p>MyStore</p>
                        <p>777 Streetname</p>
                        <p>Neighbourhood, City, 55555</p>
                        <hr color= "#ECF0F0"></hr>
                        <Header style={{color: "#B3B6B6"}}>
                            QUESTIONS AND CONCERNS
                        </Header>
                        <p>Email us at email@MyStore.com (Please allow 1 business day to respond)</p>
                    </Grid.Column>
                    <Grid.Column width={props.isMobile? 16:6} style={props.isMobile? {marginTop: "4em"}:{marginLeft: "2em"}}>
                        <Header style={{textAlign: "center", color: "#CD5858"}}>
                            EMAIL FORM
                        </Header>
                        <hr color= "#ECF0F0"></hr><br></br>
                        {pageState.messageSent? 
                        <Message icon>
                          <Icon name='check' />
                          <Message.Content>
                            <Message.Header>Message Received</Message.Header>
                            Your message is received, we will come back to you
                          </Message.Content>
                        </Message>: (pageState.loading? 
                          <Message icon>
                            <Icon name='circle notched' loading />
                          </Message>:(
                              pageState.error?
                              <Message icon>
                                <Icon name='x' />
                                <Message.Content>
                                  <Message.Header>Message unsent</Message.Header>
                                  Message could not be sent, please send it later !
                                </Message.Content>
                              </Message>:<></>
                          )
                        )
                        }
                        <Form>
                            <Form.Field onChange={(e) => fieldOnChange(e.target, formInputs, setFormInputs)} name="name" width="16" control={Input} label="NAME" />
                            <Form.Field onChange={(e) => fieldOnChange(e.target, formInputs, setFormInputs)} name="email" width="16" control={Input} type="email" label="EMAIL" />
                            <Form.Field onChange={(e) => fieldOnChange(e.target, formInputs, setFormInputs)} name="subject" width="16" control={Input} label="SUBJECT" />
                            <Form.Field onChange={(e) => fieldOnChange(e.target, formInputs, setFormInputs)} name="message" width="16" control={TextArea} label="MESSAGE" />
                            <Form.Field type="submit" onClick={() => buttonSubmit(formInputs, setPageState)} control={Button} style={{color: "white", backgroundColor: "#1b1c1d"}}>SEND</Form.Field>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    );

};

export default ContactusPage;