import React from "react";
import { Segment, Header, Grid, Input, TextArea, Button, Form } from "semantic-ui-react";

const buttonSubmit = async (formInputs) => {
    let response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formInputs)
      });
    console.log(response);
};

const fieldOnChange = (target, formInputs, setFormInputs) => {
    setFormInputs({...formInputs, [target.name]: target.value});
}

const ContactusPage = (props) => {
    let [formInputs, setFormInputs] = React.useState({name: "", email: "", subject: "", message: ""});
    return (
        <Segment>
            <Header style={{textAlign: "center", color: "#B3B6B6", marginTop: "2em"}}>
                CONTACT US
            </Header>
            <br></br><br></br><br></br>
            <Grid>
                <Grid.Row centered  columns={2} style={{margin: "3em"}}>
                    <Grid.Column width={6} style={{marginRight: "2em"}} >
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
                    <Grid.Column width={6} style={{marginLeft: "2em"}}>
                        <Header style={{textAlign: "center", color: "#CD5858"}}>
                            EMAIL FORM
                        </Header>
                        <hr color= "#ECF0F0"></hr><br></br>
                        <Form as="form" acceptCharset="UTF-8" action="https://domdevstore.myshopify.com/contact" method="post">
                            <input name="form_type" type="hidden" value="contact" />
                            <input name="utf8" type="hidden" value="✓" />
                            <input   width="16" name="control[Name]" />
                            <input   width="16" type="email" name="control[email]" />
                            <input   width="16" name="control[Phone Number]" pattern="[0-9\-]*"/>
                            <textarea   width="16" name="control[Message]" />
                            <input type="submit" style={{color: "white", backgroundColor: "#1b1c1d"}} value="SEND"/>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    );

};

export default ContactusPage;