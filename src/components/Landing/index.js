import React from "react";
import { LandingPage, ButtonPos, LearnMoreInfo } from "./styles";
import { LearnMore } from "../../styles/Icons";

import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const Landing = () => (
  <LandingPage>
    <img src={require("../../assets/egg.svg")} alt="app logo" />
    <h1>Egg hunting Game</h1>
    <p> The only game you need, sign up now! </p>
    <button> 
        <Link to={ROUTES.SIGN_UP}> Sign Up</Link>
      </button>
    <ButtonPos>
      <h2> Learn More </h2>
      <a href="#lowerPage"> <LearnMore /> </a>
    </ButtonPos>
 
    <LearnMoreInfo>

  <h2 id="lowerPage">Instructions </h2>
  <p> Pick up an Egg and bring it to it´s end destionation, or bring it as fas as you can.
  You can drop the Egg whenever you want and you collects points on how far you have brought it. 
  Chat with other players, help each other out to bring the Egg to its destination. 

   </p>
   
   <p > 
You are allowed to use any transport ways...
</p>
      <button>
        <Link to={ROUTES.SIGN_UP}>  Sign Up</Link>
      </button>
    </LearnMoreInfo>
  </LandingPage>
);

export default Landing;
