import { Segment, Header, Grid, Input, TextArea, Button, Form } from "semantic-ui-react";


const ContactusPage = (props) => {
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
                        <Form>
                            <Form.Group>
                                <Form.Field width="16" control={Input} label="NAME" >
                                </Form.Field>
                            </Form.Group>
                        </Form>
                        <p>NAME</p>
                        <Input type="text" style={{width:"100%", marginBottom:"1em"}}></Input>
                        <p>EMAIL</p>
                        <Input type="email" style={{width:"100%", marginBottom:"1em"}}></Input>
                        <p>SUBJECT</p>
                        <Input type="text" style={{width:"100%", marginBottom:"1em"}}></Input>
                        <p>MESSAGE</p>
                        <TextArea style={{width:"100%", marginBottom:"1em"}}></TextArea>
                        <Button style={{color: "white", backgroundColor: "#1b1c1d"}}>SEND</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    );

};

export default ContactusPage;