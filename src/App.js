
import './App.css';
import TabActive from './components/TabActive';

function App() {
  let tabItem = {
    items: [
      {
        value: "html",
        label: "HTML",
        desc: "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser."
      },
      {
        value: "css",
        label: "CSS",
        desc: "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML."
      },
      {
        value: "js",
        label: "JS",
        desc: "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS."
      }
    ]
  }
  return (
    <div className="App">
      <TabActive items={tabItem} />
    </div>
  );
}

export default App;
