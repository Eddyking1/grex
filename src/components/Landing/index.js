import React from "react";
import { LandingPage, LandUp } from "./styles";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const Landing = () => (
  <LandingPage>
    <h1>Egg hunting Game</h1>
    <h2>Join us in the egg hunting game. Sign up now </h2>
    <ul>
      <li>
        <img src={require("../../assets/ball-spotted.png")} alt="app logo" />
        <p>
          Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro.
          De carne lumbering animata corpora quaeritis. Summus brains sit​​,
          morbo vel maleficia?
        </p>
      </li>
      <li>
        <img src={require("../../assets/ball-spotted.png")} alt="app logo" />
        <p>
          Cum horribilem walking dead resurgere de crazed sepulcris creaturis,
          zombie sicut de grave feeding iride et serpens. Pestilentia, shaun
          ofthe dead scythe animated corpses ipsa screams.
        </p>
      </li>
      <li>
        <img src={require("../../assets/ball-spotted.png")} alt="app logo" />
        <p>
          Lucio fulci tremor est dark vivos magna. Expansis creepy arm yof
          darkness ulnis witchcraft missing carnem armis Kirkman Moore and
          Adlard caeruleum in locis.
        </p>
      </li>
    </ul>
    <LandUp>
      <button>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </button>
      <button>
        <Link to={ROUTES.SIGN_UP}> Sign Up</Link>
      </button>
    </LandUp>
  </LandingPage>
);

export default Landing;