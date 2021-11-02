import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function render(props = {}) {
  let {container} = props;
  ReactDOM.render(
      <App/>,
    container ? container.querySelector('#root'):document.getElementById('root')
  );
};
export async function bootstrap(){}
export async function mount(props){
  render(props);
}
export async function unmount(props){
  let {container} = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root'):document.getElementById('root'));
}
