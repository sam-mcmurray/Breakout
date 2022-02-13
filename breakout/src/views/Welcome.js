import React from "react";

import Card from "../components/elements/Card";

import "./Welcome.css"
function Welcome() {
  return (
    <Card className="welcome__content">
      <h1>Welcome To Breakout!</h1>
      <p>
        Breakout is an arcade video game developed and published by Atari, Inc.[7] and released on May 13, 1976.[2]
        It was designed by Steve Wozniak, based on conceptualization from Nolan Bushnell and Steve Bristow who were
        influenced by the seminal 1972 Atari arcade game Pong. In Breakout, a layer of bricks lines the top third of
        the screen and the goal is to destroy them all by repeatedly bouncing a ball off a paddle into them. The
        arcade game was released in Japan by Namco. Breakout was a worldwide commercial success, among the top five
        highest-grossing arcade video games of 1976 in both the United States and Japan and then among the top three
        highest-grossing arcade video games of 1977 in the US and Japan. The 1978 Atari VCS port uses color graphics
        instead of a monochrome screen with colored overlay.
      </p>
      <p>
        Breakout begins with eight rows of bricks, with each two rows a different kinds of color. The color order
        from the bottom up is yellow, green, orange and red. Using a single ball, the player must knock down as many
        bricks as possible by using the walls and/or the paddle below to hit the ball against the bricks and eliminate
        them. If the player's paddle misses the ball's rebound, they will lose a turn. The player has three turns to
        try to clear two screens of bricks. Yellow bricks earn one point each, green bricks earn three points, orange
        bricks earn five points and the top-level red bricks score seven points each. The paddle shrinks to one-half
        its size after the ball has broken through the red row and hit the upper wall. Ball speed increases at specific
        intervals: after four hits, after twelve hits, and after making contact with the orange and red rows.
      </p>
      <p>
        The highest score achievable for one player is 896; this is done by eliminating two screens of bricks worth 448
        points per screen. Once the second screen of bricks is destroyed, the ball in play harmlessly bounces off empty
        walls until the player restarts the game, as no additional screens are provided. However, a secret way to score
        beyond the 896 maximum is to play the game in two-player mode. If "Player One" completes the first screen on their
        third and last ball, then immediately and deliberately allows the ball to "drain", Player One's second screen is
        transferred to "Player Two" as a third screen, allowing Player Two to score a maximum of 1,344 points if they are
        adept enough to keep the third ball in play that long. Once the third screen is eliminated, the game is over.
      </p>
    </Card>
  );
}

export default Welcome;
