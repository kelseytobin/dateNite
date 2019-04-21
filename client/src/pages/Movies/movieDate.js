import React, {Component} from "react";
import {FormBtn, Input} from "../../components/Form";
import {List, ListItem} from "../../components/List";
import {Container,Row, Col} from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import API from "../../utils/API";
import movieJson from "../../movies.json";
import SaveBtn from "../../components/SaveBtn";

class MoviesTv extends Component {
    state = {
        movies: [],
        search: "",
        
      };

     

      handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };
    
      handleApiSubmit = query => {
        
        API.getMovie(query).then( res => this.setState({movies: res.data}))
        console.log(this.state.movies)
      }
    
      handleFormSubmit = event => {
        event.preventDefault();
        this.handleApiSubmit(this.state.search)
        console.log(this.state.search);
      }
     
    
      render() {
        return (
          <Container fluid>
            <Row>
              <Col size="md-12">
                <Jumbotron>
                  <h1>Movies and Tv Date Ideas!</h1>
                  </Jumbotron>

                  </Col>
                  </Row>
                  <Row>
                   <Col size= "md-12">
                  <List>
                      
                    {movieJson.map( dates => {
                      console.log(dates)
                      
                      return (
                        <ListItem key={dates.title}  >
                           
                           <strong><h1>{dates.title}</h1></strong> 
                           <p>{dates.description}</p>

                           <br></br>
                           <br></br>
                            <p>What you Need: {dates.whatYouNeed}</p>
                           
                           <br></br>
                           
                           <br></br>
                           <br></br>
                        
                          <SaveBtn   
                            onClick={() => API.saveDates({title: dates.title, type: dates.type, description: dates.description, whatYouNeed: dates.whatYouNeed})}                                     
                          >Save</SaveBtn>
                        </ListItem>
                      );
                    })}
                  </List>
                </Col>
                  </Row>
                  <br></br>
                  <br></br>
                  <Row>
                 <Col size="md-6">
                <form>
                  <Input
                    value={this.state.search}
                    onChange={this.handleInputChange}
                    name="search"
                    placeholder="The-Matrix"
                  />
              
                  <FormBtn
                    onClick={this.handleFormSubmit}
                  >
                    Find Movies
                  </FormBtn>
                </form>
              </Col>
              <Col size="md-6 sm-12">
               
                {this.state.movies.length ? (
                    <List>
                    {this.state.movies.map(movie => (
                        <ListItem key={movie.title}  >
                           
                          <strong>{movie.title}</strong> 
                           
                           <br></br>
                           <img src={movie.image_url} alt={movie.title}></img>
                           <br></br>
                           <br></br>
                         <a href={movie.publisher_url} target="_blank"><button className="btn btn-sm btn-primary" >view</button></a>
                          
                        </ListItem>
                    ))}
                  </List>
                ) : (
                  <h3>No Results to Display</h3>
                )}
              </Col>
            </Row>
          </Container>
        );
      }
    }
    
    export default MoviesTv;