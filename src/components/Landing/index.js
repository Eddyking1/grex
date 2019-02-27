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

    <img src={require("../../assets/Destination.svg")} alt="app logo" />
  <p>Lorem ipsum gay</p>
      <button>
        <Link to={ROUTES.SIGN_UP}> Sign Up</Link>
      </button>
    </LearnMoreInfo>
  </LandingPage>
);

export default Landing;
