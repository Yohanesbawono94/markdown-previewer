import React, { Component } from 'react';
import marked from 'marked';
import './css/App.css';

// Editor component
class Editor extends Component {
  render () {
    return (
     <section className={this.props.window}>
          <header>
            <h2>{this.props.heading}</h2>
            <nav>
              <i className={this.props.icon}
                onClick={this.props.handleIcon}>
              </i>
            </nav>
          </header>
          <textarea id='editor'
            value={this.props.markdown}
            onChange={this.props.handleChange} />
       </section>
    );
  }
}

// Preview component
class Preview extends Component {
  render () {
    return (
      <section className={this.props.window}>
        <header>
          <h2>{this.props.heading}</h2>
          <nav>
            <i className={this.props.icon} 
              onClick={this.props.handleIcon}>
            </i>
          </nav>
       </header>
       <div
         id='preview'
         className='previewer'
         dangerouslySetInnerHTML={
            { __html: marked(this.props.markdown, {
              sanitze: true,
			        gfm: true,
			        breaks: true,
			        headerIds: true
		        })
            }}/>
      </section>
    );
  }
}

// Grandparent component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeHolder,
      editorMaxed: false,
      previewMaxed: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaxed = this.handleEditorMaxed.bind(this);
    this.handlePreviewMaxed = this.handlePreviewMaxed.bind(this);
  }
  
  handleChange(e) {
    this.setState({
      markdown: e.target.value
    })
  }
  
  handleEditorMaxed() {
    this.setState({
      editorMaxed: !this.state.editorMaxed
    })
  }
  
  handlePreviewMaxed() {
    this.setState({
      previewMaxed: !this.state.previewMaxed
    })
  }
  
  render() {
    const minMaxed = this.state.editorMaxed ?
          [
            ['fa fa-compress',
             'fa fa-arrows-alt'],
            'editor maximized',
            'preview hide'
          ] :
          this.state.previewMaxed ?
          [
            ['fa fa-arrows-alt',
             'fa fa-compress'],
            'editor hide',
            'preview maximized'
          ] :
          [
            ['fa fa-arrows-alt',
             'fa fa-arrows-alt'],
            'editor',
            'preview'
          ]
    
    return (
     <main className='container'> 
      <Editor 
        heading='EDITOR'
        markdown={this.state.markdown}
        handleChange={this.handleChange}
        icon={minMaxed[0][0]}
        handleIcon={this.handleEditorMaxed}
        window={minMaxed[1]}
        />
      <Preview 
        heading='PREVIEWER'
        markdown={this.state.markdown}
        icon={minMaxed[0][1]}
        handleIcon={this.handlePreviewMaxed}
        window={minMaxed[2]}
        />
    </main>   
    );
  }
}

const placeHolder = `# HELLO CODERS!

## first thing first, these potatoes for you
![potato's getting stabbed](https://images.pexels.com/photos/111130/potatoes-ketchup-murder-blood-111130.jpeg?auto=compress&cs=tinysrgb&h=350)

this is HTML markdown previewer so you can write html code just like this \`<div></div>\`

You can try your own code in editor's window, for better understanding to write some code on it, you can read the [documentation](https://marked.js.org/#/README.md)

you can do this also:

\`\`\`javascript
myName = (firstName, lastName) => {
console.log(firstName + " " + lastName)
\`\`\`

or this :
- 1st list
- 2nd list
- 3rd list

well, It's a very simple markdown previewer, I'm using <strong>React.js</strong> and <strong>Marked.js</strong> to create this app.

It's never easy to start something but it doesn't matter until you've done it!

so here's my favorite quote for you to boost up your motivation:

> **"The best time to plant a tree was 20 years ago, and the second best time is now"** - Chinese Proverb

and here's a potato again for you!
![Potato's mutilation](https://images.pexels.com/photos/162971/potatoes-french-mourning-funny-162971.jpeg?auto=compress&cs=tinysrgb&h=350)`

export default App;
