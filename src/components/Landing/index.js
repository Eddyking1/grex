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
      <LearnMore />
    </ButtonPos>

    <LearnMoreInfo>

  <h2>Lorem ipsum </h2>
  <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   Vivamus vitae purus nunc.
   Etiam elementum quam sed imperdiet volutpat. 
  Curabitur eu eros vitae dolor dictum hendrerit quis eget ligula. 
  Pellentesque sed leo interdum, aliquam ipsum non, blandit dolor.
   Vivamus non congue nulla. 
   </p>
   
   <p> 
  Praesent sit amet justo sit amet orci dignissim lacinia. Ut magna dolor,
   pretium ac nibh at, condimentum rutrum felis. Nulla sed tellus at est iaculis elementum nec in
   nibh. Morbi faucibus at elit a aliquam. Praesent feugiat gravida urna at lacinia.
    Morbi sed justo placerat, dignissim nunc non, tempus sapien. Duis tincidunt, magna quis ultrices ullamcorper,
     ante odio viverra orci, in pretium quam nisl ac velit.
</p>
      <button>
        <Link to={ROUTES.SIGN_UP}>  Sign Up</Link>
      </button>
    </LearnMoreInfo>
  </LandingPage>
);

export default Landing;
