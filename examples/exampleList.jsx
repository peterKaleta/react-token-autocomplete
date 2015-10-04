import React from 'react';
import radium from 'radium';
import Samples from './samples';
import Example from './example';
import PropsTable from './propTable';
import StateTable from './stateTable';

const styles = {
  wrapper: {
    maxWidth: 600,
    margin: 'auto',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: 200
  },
  code: {
    margin: 10,
    padding: 10,
    background: '#fff'
  },
  badge: {
    marginRight: 15,
    maxWidth: 90,
    display: 'inline-block'
  }
};


@radium
export default class Examples extends React.Component {

  static displayName = 'examples';


  render() {
    return (
      <div ref="wrapper" style={styles.wrapper}>

        <h1>react-token-autocomplete</h1>

        <p>
          An easily stylable React select / token / autocomplete ready to
          work with flux flow.
          <br />
          All examples below were created with the awesome <a target="_blank" href="https://github.com/FormidableLabs/component-playground">component playground</a> so feel free to <b>change the code around and play with it in real time</b>.
          If you are not really into examples go directly to <a href="#props">props listing</a> and <a href="#props">component state</a>.
        </p>
        <div style={styles.badge}>
          <iframe src="https://ghbtns.com/github-btn.html?user=peterKaleta&repo=react-token-autocomplete&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
        </div>
        <div style={styles.badge}>
          <img src="https://img.shields.io/github/release/peterKaleta/react-token-autocomplete.svg"/>
        </div>
        <div style={styles.badge}>
          <img src="https://img.shields.io/codecov/c/github/peterKaleta/react-token-autocomplete.svg"/>
        </div>
        <div style={styles.badge}>
          <img src="https://travis-ci.org/peterKaleta/react-token-autocomplete.svg"/>
        </div>


        <h2>Install me, please</h2>

        <div>
          <code style={styles.code}>
            npm install react-token-autocomplete
          </code>
        </div>

        <h2 id="basic">Basic config</h2>

        <Example
          title="simplest use case"
          sample={Samples.basic}>
          Dropdown with options to add custom tags and filter suggestions on the fly.
        </Example>

        <Example
          title="Limit to suggestions"
          sample={Samples.limitToSuggestions}>
          You can also limit user choices to suggestions.
        </Example>

        <Example
            title="Use it like good ol' Dropdown"
          sample={Samples.simulateSelect}>
          It can work as a simple select (with or without filtering).
        </Example>


        <h2 id="additional">Additional fun</h2>

        <Example
          title="Suggestions treshold"
          sample={Samples.treshold}>
          Set minimal term length user needs to type before showing suggestions
        </Example>

        <Example
          title="processing indicator"
          sample={Samples.processing}>
          Show users when you are processing stuff
        </Example>

        <h2 id="callbacks">Callbacks</h2>

        <Example
          title="input change"
          sample={Samples.inputChange}>
            React to input changes
        </Example>

        <Example
          title="add/remove token"
          sample={Samples.addRemoveToken}>
            Callback when user is either adding or removing value
        </Example>

        <h2 id="parse">Parsing</h2>

        <Example
          title="parse tokens and options"
          sample={Samples.parse}>
            Callback when user is either adding or removing value
        </Example>


        <h2 id="state">Component state </h2>

        <StateTable/>

        <h2 id="props">Available props</h2>

        <PropsTable/>

        <h2>have fun!</h2>

        <a className="githubRibbon"href="https://github.com/peterKaleta/react-token-autocomplete">
          <img src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"/>
        </a>

      </div>
    );
  }
}
